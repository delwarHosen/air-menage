import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthHeading from "../../components/AuthHeading/AuthHeading";
import { ButtonText } from "../../components/typo/typography";
import { FormInput } from "../../components/ui/FormInput";
import { FORM_FIELDS } from "../../constants/form";
import { validatePassword } from "../../utils/validation";

export default function SetNewPasswordScreen() {
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
            [FORM_FIELDS.PASSWORD]: "",
            [FORM_FIELDS.CONFIRM_PASSWORD]: "",
        },
        validationRules: {
            [FORM_FIELDS.PASSWORD]: validatePassword,
        },
        onSubmit: async formValues => {
            if (formValues[FORM_FIELDS.PASSWORD] !== formValues[FORM_FIELDS.CONFIRM_PASSWORD]) {
                ToastAndroid.show(t("setNewPassword.passwordsMismatch"), ToastAndroid.SHORT);
                return;
            }

            try {
                ToastAndroid.show(t("setNewPassword.success"), ToastAndroid.SHORT);
                router.replace("/(auth)/login");
            } catch (error) {
                ToastAndroid.show(t("setNewPassword.failed"), ToastAndroid.SHORT);
            }
        }
    });

    const passwordsMatch =
        values[FORM_FIELDS.PASSWORD] === values[FORM_FIELDS.CONFIRM_PASSWORD] &&
        values[FORM_FIELDS.PASSWORD] !== "";

    const isFormValid =
        values[FORM_FIELDS.PASSWORD] &&
        !errors[FORM_FIELDS.PASSWORD] &&
        passwordsMatch;

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.content}>
                        <AuthHeading
                            title={t("setNewPassword.title")}
                            description={t("setNewPassword.description")}
                        />

                        <View style={styles.form}>
                            <FormInput
                                label={t("setNewPassword.passwordLabel")}
                                value={values?.[FORM_FIELDS.PASSWORD] || ""}
                                onChangeText={text => handleChange(FORM_FIELDS.PASSWORD, text)}
                                onBlur={() => handleBlur(FORM_FIELDS.PASSWORD)}
                                placeholder={t("setNewPassword.passwordPlaceholder")}
                                type="password"
                                error={errors?.[FORM_FIELDS.PASSWORD]}
                                touched={touched?.[FORM_FIELDS.PASSWORD]}
                                required
                            />

                            <FormInput
                                label={t("setNewPassword.confirmPasswordLabel")}
                                value={values?.[FORM_FIELDS.CONFIRM_PASSWORD] || ""}
                                onChangeText={text => handleChange(FORM_FIELDS.CONFIRM_PASSWORD, text)}
                                onBlur={() => handleBlur(FORM_FIELDS.CONFIRM_PASSWORD)}
                                placeholder={t("setNewPassword.confirmPasswordPlaceholder")}
                                type="password"
                                error={
                                    touched?.[FORM_FIELDS.CONFIRM_PASSWORD] && !passwordsMatch
                                        ? t("setNewPassword.passwordsMismatch")
                                        : ""
                                }
                                touched={touched?.[FORM_FIELDS.CONFIRM_PASSWORD]}
                                required
                            />

                            <TouchableOpacity
                                onPress={handleSubmit}
                                disabled={!isFormValid || isSubmitting}
                                style={[
                                    styles.submitButton,
                                    (!isFormValid || isSubmitting) && styles.disabledButton
                                ]}
                            >
                                <ButtonText style={styles.buttonText}>
                                    {isSubmitting ? t("setNewPassword.updating") : t("setNewPassword.resetButton")}
                                </ButtonText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    form: {
        flex: 1,
    },
    submitButton: {
        backgroundColor: "#00AFF5",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 18,
        marginTop: 20,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    disabledButton: {
        
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "500",
    },
});
