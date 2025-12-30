import { useRouter } from "expo-router";
import { useForm } from "react-hook-form"; // আপনার কাস্টম হুক
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Body1, H2 } from "../../components/typo/Typography";
import { Body1, H2 } from "../../components/typo/typography";
import { FormInput } from "../../components/ui/FormInput";
import { FORM_FIELDS, FORM_LABELS, FORM_PLACEHOLDERS } from "../../constants/form";
import { validatePassword } from "../../utils/validation";

export default function SetNewPasswordScreen() {
    const router = useRouter();

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
            // পাসওয়ার্ড ম্যাচিং চেক
            if (formValues[FORM_FIELDS.PASSWORD] !== formValues[FORM_FIELDS.CONFIRM_PASSWORD]) {
                ToastAndroid.show("Passwords do not match!", ToastAndroid.SHORT);
                return;
            }

            try {
                // এখানে আপনার API কল (Password Reset) হবে
                ToastAndroid.show("Password reset successful!", ToastAndroid.SHORT);
                // লগইন পেজে পাঠিয়ে দিন
                router.replace("/(auth)/login");
            } catch (error) {
                ToastAndroid.show("Failed to reset password", ToastAndroid.SHORT);
            }
        }
    });

    // রিয়েল-টাইম পাসওয়ার্ড ম্যাচিং চেক
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
                        {/* Header Section */}
                        <View style={styles.header}>
                            <H2 style={styles.title}>Set New Password</H2>
                            <Body1 color="#64748B" style={{ textAlign: "center" }}>
                                Your new password must be different from previous used passwords.
                            </Body1>
                        </View>

                        {/* Input Fields */}
                        <View style={styles.form}>
                            <FormInput
                                label={FORM_LABELS[FORM_FIELDS.PASSWORD]}
                                value={values?.[FORM_FIELDS.PASSWORD] || ""}
                                onChangeText={text => handleChange(FORM_FIELDS.PASSWORD, text)}
                                onBlur={() => handleBlur(FORM_FIELDS.PASSWORD)}
                                placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.PASSWORD]}
                                type="password"
                                error={errors?.[FORM_FIELDS.PASSWORD]}
                                touched={touched?.[FORM_FIELDS.PASSWORD]}
                                required
                            />

                            <FormInput
                                label={FORM_LABELS[FORM_FIELDS.CONFIRM_PASSWORD]}
                                value={values?.[FORM_FIELDS.CONFIRM_PASSWORD] || ""}
                                onChangeText={text => handleChange(FORM_FIELDS.CONFIRM_PASSWORD, text)}
                                onBlur={() => handleBlur(FORM_FIELDS.CONFIRM_PASSWORD)}
                                placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.CONFIRM_PASSWORD]}
                                type="password"

                                error={
                                    touched?.[FORM_FIELDS.CONFIRM_PASSWORD] && !passwordsMatch
                                        ? "Passwords do not match"
                                        : ""
                                }
                                touched={touched?.[FORM_FIELDS.CONFIRM_PASSWORD]}
                                required
                            />

                            {/* Reset Password Button */}
                            <TouchableOpacity
                                onPress={() => router.push("/home")}
                                // onPress={handleSubmit}
                                disabled={!isFormValid || isSubmitting}
                                style={[
                                    styles.submitButton,
                                    (!isFormValid || isSubmitting) && styles.disabledButton
                                ]}
                            >
                                <Text style={styles.buttonText}>
                                    {isSubmitting ? "Updating..." : "Reset Password"}
                                </Text>
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
        backgroundColor: "#FFFFFF"
    },
    container: {
        flex: 1
    },
    scrollContent: {
        flexGrow: 1
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 40
    },
    header: {
        marginBottom: 40
    },
    title: {
        marginBottom: 12,
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center"
    },
    form: {
        flex: 1
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    disabledButton: {
        // backgroundColor: "#94A3B8",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700"
    }
});