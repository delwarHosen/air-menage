import { useRouter } from "expo-router";
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
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthHeading from "../../components/AuthHeading/AuthHeading";
import { ButtonText } from "../../components/typo/typography";
import { FormInput } from "../../components/ui/FormInput";
import { FORM_FIELDS } from "../../constants/form";

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const { t } = useTranslation();

    const { control, handleSubmit } = useForm({
        defaultValues: {
            [FORM_FIELDS.EMAIL]: "",
        }
    });

    // This function runs immediately when the button is pressed
    const onSubmit = (data) => {
        // Even without validation, we can access the email if needed
        console.log("Routing with email:", data[FORM_FIELDS.EMAIL]);
        
        // Direct routing
        router.push("/(auth)/email-verification");
    };

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
                            <Controller
                                control={control}
                                name={FORM_FIELDS.EMAIL}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <FormInput
                                        label={t("forgotPassword.emailLabel")}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder={t("forgotPassword.emailPlaceholder")}
                                        type="email"
                                    />
                                )}
                            />

                            <TouchableOpacity
                                onPress={handleSubmit(onSubmit)}
                                style={styles.submitButton}
                                activeOpacity={0.7}
                            >
                                <ButtonText style={styles.buttonText}>
                                    {t("forgotPassword.getCode")}
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
    form: { 
        flex: 1 
    },
    submitButton: {
        backgroundColor: "#00AFF5",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        paddingVertical: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonText: { 
        color: "#FFF", 
        fontSize: 16, 
        fontWeight: "700", 
        letterSpacing: 0.5 
    }
});