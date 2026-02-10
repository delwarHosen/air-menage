import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";
import { useSelector } from "react-redux";
import { Colors } from "../../assets/Colors";
import { AppleIcons, GoogleIcon } from "../../assets/icons/Icons";
import { ButtonText, H3, H4 } from "../../components/typo/typography";
import { FormInput } from "../../components/ui/FormInput";
import { FORM_FIELDS } from "../../constants/form";
import { useSignInMutation } from "../../redux/services/authApis";
import { validateEmail, validatePassword } from "../../utils/validation";

const { height } = Dimensions.get("window");
const isSmallDevice = height < 700;

export default function LoginScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const selectedRole = useSelector((state) => state.role.selectedRole);

    const [loginUser, { isLoading: signInLoading }] = useSignInMutation();

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            [FORM_FIELDS.EMAIL]: "",
            [FORM_FIELDS.PASSWORD]: "",
        },
        mode: "onChange",
    });


    const onSubmit = async (formValues) => {
        try {
            const payload = {
                email: formValues[FORM_FIELDS.EMAIL],
                password: formValues[FORM_FIELDS.PASSWORD],
            };
            const res = await loginUser(payload).unwrap();

            // Token handle 
            await SecureStore.setItemAsync("accessToken", res.token);

            // Debug korar jonno role check kora
            console.log("User Role from Backend:", res.user.role);
            console.log("Selected Role from Redux:", selectedRole);

            // Navigation logic: backend role thakle sheta use kora priority
            const userRole = res.user.role || selectedRole;

            if (userRole === "cleaner") {
                router.replace("/cleaner/home");
            } else if (userRole === "host") {
                router.replace("/host/home");
            } else {
                // Default route jodi kono role na thake
                router.replace("/(auth)/login");
            }
            // Show success message
            ToastAndroid.showWithGravityAndOffset(
                res.msg || "Login successful",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );



        } catch (error) {
            const message =
                error?.data?.msg ||
                error?.message ||
                "Something went wrong while signing in!";
            ToastAndroid.showWithGravityAndOffset(
                message,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.content}>
                        {/* Header */}
                        <View style={styles.header}>
                            <H3 style={styles.title}>{t("auth.login_with_email")}</H3>
                        </View>

                        {/* Form Section */}
                        <View style={styles.form}>
                            <Controller
                                control={control}
                                name={FORM_FIELDS.EMAIL}
                                rules={{ validate: validateEmail }}
                                render={({ field }) => (
                                    <FormInput
                                        label={t("auth.email")}
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        placeholder={t("auth.enter_email")}
                                        onBlur={field.onBlur}
                                        type="email"
                                        required
                                        error={errors[FORM_FIELDS.EMAIL]?.message}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name={FORM_FIELDS.PASSWORD}
                                rules={{ validate: validatePassword }}
                                render={({ field }) => (
                                    <FormInput
                                        label={t("auth.password")}
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        placeholder={t("auth.enter_password")}
                                        type="password"
                                        required
                                        error={errors[FORM_FIELDS.PASSWORD]?.message}
                                    />
                                )}
                            />

                            <TouchableOpacity
                                onPress={handleSubmit(onSubmit)}
                                disabled={signInLoading}
                                style={[
                                    styles.submitButton,
                                    { opacity: signInLoading ? 0.6 : 1 },
                                ]}
                                activeOpacity={0.8}
                            >
                                <ButtonText style={styles.buttonText}>
                                    {signInLoading ? "Processing..." : t("auth.login")}
                                </ButtonText>
                            </TouchableOpacity>

                            {/* Footer Links */}
                            <View style={styles.footerLinksContainer}>
                                <Link href="/(auth)/register" asChild>
                                    <TouchableOpacity>
                                        <H4 style={styles.underlineText}>{t("auth.sign_up")}</H4>
                                    </TouchableOpacity>
                                </Link>
                                <Link href="/(auth)/forgot-password" asChild>
                                    <TouchableOpacity>
                                        <H4 style={styles.underlineText}>{t("auth.forgot_password")}</H4>
                                    </TouchableOpacity>
                                </Link>
                            </View>

                            {/* Divider */}
                            <View style={styles.dividerContainer}>
                                <View style={styles.divider} />
                                <ButtonText style={styles.dividerText}>{t("auth.or")}</ButtonText>
                                <View style={styles.divider} />
                            </View>

                            {/* Social Buttons */}
                            <View style={styles.socialContainer}>
                                <TouchableOpacity style={styles.socialIcon}>
                                    <GoogleIcon />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialIcon}>
                                    <AppleIcons />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: "5%",
        paddingTop: Platform.OS === "ios" ? 60 : 40,
        paddingBottom: 30,
        justifyContent: isSmallDevice ? "flex-start" : "center",
    },
    header: {
        marginBottom: isSmallDevice ? 20 : 30,
    },
    title: {
        fontSize: isSmallDevice ? 22 : 28,
        textAlign: "left",
    },
    form: {
        width: "100%",
    },
    submitButton: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: isSmallDevice ? 12 : 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "600",
    },
    underlineText: {
        fontSize: isSmallDevice ? 13 : 14,
        textDecorationLine: "underline",
        fontWeight: "500",
    },
    footerLinksContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        marginBottom: isSmallDevice ? 15 : 25,
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: isSmallDevice ? 15 : 25,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: "#E2E8F0",
    },
    dividerText: {
        marginHorizontal: 16,
        color: "#94A3B8",
        fontSize: 14,
    },
    socialContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
    },
    socialIcon: {
        backgroundColor: "#F8FAFC",
        height: isSmallDevice ? 50 : 60,
        width: isSmallDevice ? 50 : 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
});
