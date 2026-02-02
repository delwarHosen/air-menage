import { Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { useSelector } from "react-redux";
import { Colors } from "../../assets/Colors";
import { AppleIcons, GoogleIcon } from "../../assets/icons/Icons";
import { ButtonText, H3, H4 } from "../../components/typo/typography";
import { FormInput } from "../../components/ui/FormInput";
import { FORM_FIELDS } from "../../constants/form";
import { validateEmail, validatePassword } from "../../utils/validation"; // Import validation

const { height } = Dimensions.get('window');
const isSmallDevice = height < 700;

export default function LoginScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const selectedRole = useSelector((state) => state.role.selectedRole);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            [FORM_FIELDS.EMAIL]: "",
            [FORM_FIELDS.PASSWORD]: "",
        },
        mode: 'onChange' // Enable real-time validation
    });

    // Watch form values
    const values = watch();

    // Check if form is valid
    const isFormValid =
        values[FORM_FIELDS.EMAIL] &&
        values[FORM_FIELDS.PASSWORD] &&
        !errors[FORM_FIELDS.EMAIL] &&
        !errors[FORM_FIELDS.PASSWORD];

    const onSubmit = (values) => {
        const payload = {
            email: values[FORM_FIELDS.EMAIL],
            password: values[FORM_FIELDS.PASSWORD],
            role: selectedRole
        };
        if (selectedRole === "cleaner") {
            router.replace("/cleaner/home");
        } else {
            router.replace("/host/home");
        }
        console.log(payload)
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
                                rules={{
                                    validate: validateEmail
                                }}
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
                                rules={{
                                    validate: validatePassword
                                }}
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
                                onPress={() => onSubmit(values)} // Direct call, no validation
                                // disabled={!isFormValid || isSubmitting}  // Comment out
                                style={[
                                    styles.submitButton,
                                    // (!isFormValid || isSubmitting) && { opacity: 0.5 }  // Comment out
                                ]}
                                activeOpacity={0.8}
                            >
                                <ButtonText style={styles.buttonText}>
                                    {t("auth.login")}
                                </ButtonText>
                            </TouchableOpacity>

                            <View style={styles.footerLinksContainer}>
                                <Link href="/(auth)/register" asChild>
                                    <TouchableOpacity>
                                        <H4 style={styles.underlineText}>
                                            {t("auth.sign_up")}
                                        </H4>
                                    </TouchableOpacity>
                                </Link>
                                <Link href="/(auth)/forgot-password" asChild>
                                    <TouchableOpacity>
                                        <H4 style={styles.underlineText}>
                                            {t("auth.forgot_password")}
                                        </H4>
                                    </TouchableOpacity>
                                </Link>
                            </View>

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

// styles same thakbe...

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: "5%",
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 30,
        justifyContent: isSmallDevice ? 'flex-start' : 'center',
    },
    header: {
        marginBottom: isSmallDevice ? 20 : 30,
    },
    title: {
        fontSize: isSmallDevice ? 22 : 28,
        textAlign: 'left',
    },
    form: {
        width: '100%',
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
        textDecorationLine: 'underline',
        fontWeight: '500',
    },
    footerLinksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        backgroundColor: '#E2E8F0',
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
        borderColor: '#F1F5F9',
    },
});