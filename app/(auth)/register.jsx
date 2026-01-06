import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import { Colors } from "../../assets/Colors";
import { AppleIcons, GoogleIcon } from "../../assets/icons/Icons";
import { Body1, Body2, ButtonText, H3 } from "../../components/typo/typography";
import { FormInput } from "../../components/ui/FormInput";

export default function SignUpScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const [checked, setChecked] = useState(false);

    const { control, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const passwordsMatch = watch("password") === watch("confirmPassword");

    const isFormValid = watch("fullName") && watch("email") && watch("password") && watch("confirmPassword") && passwordsMatch && checked;

    const onSubmit = async (data) => {
        if (!checked) {
            ToastAndroid.show("Please accept Terms & Conditions", ToastAndroid.SHORT);
            return;
        }

        if (!passwordsMatch) {
            ToastAndroid.show(t("signup.errors.passwordMismatch"), ToastAndroid.SHORT);
            return;
        }

        ToastAndroid.show(t("signup.signingUp"), ToastAndroid.SHORT);
        router.push("/(app)/login");
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
                        <H3 style={styles.title}>{t("signup.title")}</H3>

                        <View style={styles.form}>
                            <Controller
                                control={control}
                                name="fullName"
                                rules={{ required: t("signup.errors.required") }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <FormInput
                                        label={t("signup.fullName")}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder={t("signup.fullName")}
                                        error={errors.fullName?.message}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="email"
                                rules={{
                                    required: t("signup.errors.required"),
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t("signup.errors.invalidEmail") }
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <FormInput
                                        label={t("signup.email")}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder={t("signup.email")}
                                        type="email"
                                        error={errors.email?.message}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="password"
                                rules={{
                                    required: t("signup.errors.required"),
                                    minLength: { value: 6, message: t("signup.errors.passwordMin") }
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <FormInput
                                        label={t("signup.password")}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder={t("signup.password")}
                                        type="password"
                                        error={errors.password?.message}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="confirmPassword"
                                rules={{ required: t("signup.errors.required") }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <FormInput
                                        label={t("signup.confirmPassword")}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder={t("signup.confirmPassword")}
                                        type="password"
                                        error={!passwordsMatch ? t("signup.errors.passwordMismatch") : errors.confirmPassword?.message}
                                    />
                                )}
                            />

                            {/* Button + Terms + Divider + Social */}
                            <TouchableOpacity
                                onPress={handleSubmit(onSubmit)}
                                disabled={!isFormValid || isSubmitting}
                                style={[styles.submitButton, (!isFormValid || isSubmitting) && styles.disabledButton]}
                            >
                                <ButtonText style={styles.buttonText}>
                                    {isSubmitting ? t("signup.signingUp") : t("signup.signUp")}
                                </ButtonText>
                            </TouchableOpacity>

                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}>
                                <TouchableOpacity
                                    onPress={() => setChecked(!checked)}
                                    style={{
                                        height: 20,
                                        width: 20,
                                        borderRadius: 4,
                                        borderWidth: 1.5,
                                        borderColor: Colors.PRIMARY,
                                        backgroundColor: checked ? Colors.PRIMARY : "transparent",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: 10,
                                    }}
                                >
                                    {checked && <Ionicons name="checkmark" size={14} color="#fff" />}
                                </TouchableOpacity>


                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Body1>{t("signup.terms")}{" "}</Body1>
                                    <Body2
                                        style={{ color: "#2DBEFF" }}
                                        onPress={() => router.push("/terms")}
                                    >
                                        {t("signup.teems_cond")}
                                    </Body2>
                                </View>

                            </View>

                            <View style={styles.dividerContainer}>
                                <View style={styles.divider} />
                                <Body1 style={styles.dividerText}>{t("signup.or")}</Body1>
                                <View style={styles.divider} />
                            </View>

                            <View style={styles.socialContaier}>
                                <View style={styles.socialIcon}>
                                    <GoogleIcon />
                                </View>
                                <View style={styles.socialIcon}>
                                    <AppleIcons />
                                </View>
                            </View>

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
        backgroundColor: "#fff"
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
        paddingVertical: 50
    },
    title: {
        marginBottom: 50
    },
    form: {
        marginBottom: 40
    },
    submitButton: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10
    },
    disabledButton: {
        backgroundColor: "#6fd6ffff"
    },
    buttonText: {
        color: "#fff",
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 25
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.PRIMARY
    },
    dividerText: {
        marginHorizontal: 16,
        color: "#94A3B8"
    },
    socialContaier: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        marginTop: 20
    },
    socialIcon: {
        backgroundColor: "#F7F7F7",
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    }
});
