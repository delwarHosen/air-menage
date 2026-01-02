import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthHeading from "../../components/AuthHeading/AuthHeading";
import { ButtonText } from "../../components/typo/typography";
import { FormInput } from "../../components/ui/FormInput";
import { FORM_FIELDS } from "../../constants/form";
import { validateEmail } from "../../utils/validation";

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const { t } = useTranslation();

    const {
        values = {},
        errors = {},
        touched = {},
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
    } = useForm({
        initialValues: {
            [FORM_FIELDS.EMAIL]: "",
        },
        validationRules: {
            [FORM_FIELDS.EMAIL]: validateEmail,
        },
        onSubmit: async formValues => {
            if (!formValues[FORM_FIELDS.EMAIL]) {
                ToastAndroid.show(t("forgotPassword.enterEmailError"), ToastAndroid.SHORT);
                return;
            }
            try {
                ToastAndroid.show(t("forgotPassword.verificationSent"), ToastAndroid.SHORT);
                // router.push("/(auth)/verify-otp"); 
            } catch (error) {
                ToastAndroid.show(t("forgotPassword.verificationFailed"), ToastAndroid.SHORT);
            }
        }
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.content}>
                        <AuthHeading
                            title={t("forgotPassword.title")}
                            description={t("forgotPassword.description")}
                        />

                        <View style={styles.form}>
                            <FormInput
                                label={t("forgotPassword.emailLabel")}
                                value={values?.[FORM_FIELDS.EMAIL] || ""}
                                onChangeText={text => handleChange(FORM_FIELDS.EMAIL, text)}
                                onBlur={() => handleBlur(FORM_FIELDS.EMAIL)}
                                placeholder={t("forgotPassword.emailPlaceholder")}
                                type="email"
                                error={errors?.[FORM_FIELDS.EMAIL]}
                                touched={touched?.[FORM_FIELDS.EMAIL]}
                                required
                            />

                            <TouchableOpacity
                                onPress={() => router.push("/(auth)/email-verification")}
                                style={styles.submitButton}
                                activeOpacity={0.7}
                            >
                                <ButtonText style={styles.buttonText}>
                                    {isSubmitting ? t("forgotPassword.sending") : t("forgotPassword.getCode")}
                                </ButtonText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

// Styles remain unchanged
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
    container: { flex: 1 },
    scrollContent: { flexGrow: 1 },
    content: { flex: 1, paddingHorizontal: 24, paddingVertical: 40 },
    form: { flex: 1 },
    submitButton: {
        backgroundColor: "#00AFF5",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        paddingVertical: "5.5%",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonText: { color: "#FFF", fontSize: 16, fontWeight: "700", letterSpacing: 0.5 }
});
