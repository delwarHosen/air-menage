import { Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
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

export default function LoginScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const selectedRole = useSelector((state) => state.role.selectedRole);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            [FORM_FIELDS.EMAIL]: "",
            [FORM_FIELDS.PASSWORD]: "",
        },
    });

    const onSubmit = (values) => {
        const payload = {
            email: values[FORM_FIELDS.EMAIL],
            password: values[FORM_FIELDS.PASSWORD],
            role: selectedRole
        };

        console.log("Submitted Data:", payload);

        if (selectedRole === "cleaner") {
            router.replace("/cleaner/home");
        } else {
            router.replace("/host/home");
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
                        <View style={styles.header}>
                            <H3 style={styles.title}>{t("auth.login_with_email")}</H3>
                        </View>

                        <View style={styles.form}>
                            <Controller
                                control={control}
                                name={FORM_FIELDS.EMAIL}
                                render={({ field }) => (
                                    <FormInput
                                        label={t("auth.email")}
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        placeholder={t("auth.enter_email")}
                                        type="email"
                                        required
                                        error={errors[FORM_FIELDS.EMAIL]?.message}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name={FORM_FIELDS.PASSWORD}
                                render={({ field }) => (
                                    <FormInput
                                        label={t("auth.password")}
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        placeholder={t("auth.enter_password")}
                                        type="password" 
                                        required
                                        error={errors[FORM_FIELDS.PASSWORD]?.message}
                                    />
                                )}
                            />

                            <TouchableOpacity
                                onPress={handleSubmit(onSubmit)}
                                style={styles.submitButton}
                            >
                                <ButtonText style={styles.buttonText}>
                                    {t("auth.login")}
                                </ButtonText>
                            </TouchableOpacity>

                            <View style={styles.footerLinksContainer}>
                                <Link href="/(auth)/register" asChild>
                                    <TouchableOpacity>
                                        <H4 style={{ fontWeight: '400', textDecorationLine: 'underline' }}>
                                            {t("auth.sign_up")}
                                        </H4>
                                    </TouchableOpacity>
                                </Link>
                                <Link href="/(auth)/forgot-password" asChild>
                                    <TouchableOpacity>
                                        <H4 style={{ textDecorationLine: 'underline' }}>
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
        backgroundColor: '#FFFFFF',
        paddingTop: 24,
        paddingHorizontal: "5%",
    },
    scrollContent: {
        flexGrow: 1,
        marginVertical: 40
    },
    header: {
        marginBottom: 20
    },
    title: {
        marginBottom: 8
    },
    form: {
        marginBottom: 40
    },
    submitButton: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 5,
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "500"
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 25
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.BORDER_COLOR
    },
    dividerText: {
        marginHorizontal: 16,
        color: "#94A3B8"
    },
    footerLinksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal:2
    },
    socialContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        marginTop: 20,
    },
    socialIcon: {
        backgroundColor: "#F7F7F7",
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
});