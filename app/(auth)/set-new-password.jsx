import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTranslation } from "react-i18next";

import { Colors } from "../../assets/Colors";
import AuthHeading from "../../components/AuthHeading/AuthHeading";
import { Body1, ButtonText, H3 } from "../../components/typo/typography";
import { FormInput } from "../../components/ui/FormInput";
import { FORM_FIELDS } from "../../constants/form";

export default function SetNewPasswordScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            [FORM_FIELDS.PASSWORD]: "",
            [FORM_FIELDS.CONFIRM_PASSWORD]: "",
        },
    });

    const password = watch(FORM_FIELDS.PASSWORD);

    const onSubmit = (data) => {
        console.log("Resetting Password:", data);
        setIsModalVisible(true);
    };

    const handleModalDone = () => {
        setIsModalVisible(false);
        router.replace("/(auth)/login");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.content}>
                        <AuthHeading
                            title={t("setNewPasswords.title")}
                            description={t("setNewPasswords.description")}
                        />

                        <View style={styles.form}>
                            <Controller
                                control={control}
                                name={FORM_FIELDS.PASSWORD}
                                rules={{
                                    required: t("formErrors.passwordRequired"),
                                    minLength: { value: 6, message: t("formErrors.passwordMin") }
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <FormInput
                                        label={t("formLabels.newPassword")}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder={t("formPlaceholders.newPassword")}
                                        type="password"
                                        error={errors[FORM_FIELDS.PASSWORD]?.message}
                                        required
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name={FORM_FIELDS.CONFIRM_PASSWORD}
                                rules={{
                                    required: t("formErrors.confirmPasswordRequired"),
                                    validate: (val) => val === password || t("formErrors.passwordMismatch")
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <FormInput
                                        label={t("formLabels.confirmPassword")}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder={t("formPlaceholders.confirmPassword")}
                                        type="password"
                                        error={errors[FORM_FIELDS.CONFIRM_PASSWORD]?.message}
                                        required
                                    />
                                )}
                            />

                            <TouchableOpacity
                                onPress={handleSubmit(onSubmit)}
                                disabled={!isValid}
                                style={[
                                    styles.submitButton,
                                    !isValid && styles.disabledButton
                                ]}
                            >
                                <ButtonText style={styles.buttonText}>
                                    {t("buttons.resetPassword")}
                                </ButtonText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Bottom Slide Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.bottomSheet}>
                        <View style={styles.dragHandle} />

                        <View style={styles.successIconCircle}>
                            <Ionicons name="checkmark-circle" size={80} color="#00AFF5" />
                        </View>

                        <H3 style={styles.modalTitle}>
                            {t("passwordReset.title")}
                        </H3>

                        <Body1 style={styles.modalSubtitle}>
                            {t("passwordReset.description")}
                        </Body1>

                        <TouchableOpacity
                            style={styles.doneButton}
                            onPress={handleModalDone}
                        >
                            <ButtonText style={styles.buttonText}>
                                {t("passwordReset.backToLogin")}
                            </ButtonText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
    container: { flex: 1 },
    scrollContent: { flexGrow: 1, paddingBottom: 80 },
    content: { flex: 1, paddingHorizontal: 24, paddingVertical: 40 },
    form: { flex: 1, marginTop: 20 },
    submitButton: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 18,
        marginTop: 30,
    },
    disabledButton: { backgroundColor: "#A0E1FB" },
    buttonText: { color: "#FFF", fontWeight: "600" },

    // Modal & Bottom Sheet Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    bottomSheet: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30,
        alignItems: 'center',
        paddingBottom: 50,
    },
    dragHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#E2E8F0',
        borderRadius: 10,
        marginBottom: 20,
    },
    successIconCircle: {
        marginBottom: 20,
    },
    modalTitle: { marginBottom: 10, textAlign: 'center' },
    modalSubtitle: {
        textAlign: 'center',
        marginBottom: 30,
        color: '#64748B',
        lineHeight: 22,
    },
    doneButton: {
        backgroundColor: Colors.PRIMARY,
        width: '100%',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    }
});
