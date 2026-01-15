import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
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
import { Colors } from "../../assets/Colors";
import { AppleIcons, GoogleIcon } from "../../assets/icons/Icons";
import { Body1, Body2, ButtonText, H3 } from "../../components/typo/typography";
import { FormInput } from "../../components/ui/FormInput";
import { IMAGE_CONSTANTS } from "../../constants/image.index";

export default function SignUpScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const [checked, setChecked] = useState(false);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        router.push("/(auth)/login");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.flex1}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.content}>
                        <H3 style={styles.title}>{t("auth.signup_with_email")}</H3>

                        <View style={styles.imageContainer}>
                            <View style={styles.profileWrapper}>
                                <Image
                                    source={IMAGE_CONSTANTS.profile}
                                    style={styles.profileImage}
                                />
                                <TouchableOpacity style={styles.cameraIconContainer} activeOpacity={0.7}>
                                    <Ionicons name="camera" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.form}>
                            <Controller
                                control={control}
                                name="fullName"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <FormInput
                                        label={t("auth.full_name")}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder={t("auth.enter_full_name")}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <FormInput
                                        label={t("auth.email")}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder={t("auth.enter_email")}
                                        keyboardType="email-address"
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="password"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <FormInput
                                        label={t("auth.password")}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder={t("auth.enter_password")}
                                        secureTextEntry
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="confirmPassword"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <FormInput
                                        label={t("auth.confirm_password")}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder={t("auth.confirm_password")}
                                        secureTextEntry
                                    />
                                )}
                            />

                            <TouchableOpacity
                                onPress={handleSubmit(onSubmit)}
                                style={styles.submitButton}
                            >
                                <ButtonText style={styles.buttonText}>{t("auth.signup")}</ButtonText>
                            </TouchableOpacity>

                            <View style={styles.termsContainer}>
                                <TouchableOpacity
                                    onPress={() => setChecked(!checked)}
                                    style={[
                                        styles.checkbox,
                                        { backgroundColor: checked ? Colors.PRIMARY : "transparent" }
                                    ]}
                                >
                                    {checked && <Ionicons name="checkmark" size={14} color="#fff" />}
                                </TouchableOpacity>

                                <View style={styles.termsTextContainer}>
                                    <Body1>
                                        {t("auth.accept")}{" "}
                                        <Body2
                                            style={styles.linkText}
                                            onPress={() => router.push("/terms")}
                                        >
                                            {t("auth.terms_conditions")}
                                        </Body2>
                                    </Body1>
                                </View>
                            </View>

                            <View style={styles.dividerContainer}>
                                <View style={styles.divider} />
                                <Body1 style={styles.dividerText}>{t("auth.or")}</Body1>
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
        </SafeAreaView>
    );
}

// styles same as before
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
    flex1: { flex: 1 },
    scrollContent: { flexGrow: 1, paddingHorizontal: "5%" },
    content: { flex: 1, paddingTop: 20, paddingBottom: 50 },
    imageContainer: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 20, marginBottom: 10 },
    profileWrapper: { position: 'relative' },
    profileImage: { height: 120, width: 120, borderRadius: 60, borderWidth: 1, borderColor: Colors.PRIMARY, backgroundColor: "#E1E1E1" },
    cameraIconContainer: { position: 'absolute', bottom: 5, right: 3, backgroundColor: Colors.PRIMARY, width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#fff', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 },
    title: { fontWeight: "500" },
    form: { marginTop: 40 },
    submitButton: { backgroundColor: Colors.PRIMARY, paddingVertical: 16, borderRadius: 12, alignItems: "center", marginTop: 10 },
    buttonText: { color: "#fff" },
    termsContainer: { flexDirection: "row", alignItems: "center", marginTop: 15 },
    checkbox: { height: 20, width: 20, borderRadius: 4, borderWidth: 1.5, borderColor: Colors.PRIMARY, justifyContent: "center", alignItems: "center", marginRight: 10 },
    termsTextContainer: { flexDirection: "row", flex: 1 },
    linkText: { color: "#2DBEFF" },
    dividerContainer: { flexDirection: "row", alignItems: "center", marginVertical: 25 },
    divider: { flex: 1, height: 1, backgroundColor: Colors.BORDER_COLOR },
    dividerText: { marginHorizontal: 16, color: "#94A3B8" },
    socialContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 5 },
    socialIcon: { backgroundColor: "#F7F7F7", height: 60, width: 60, borderRadius: 30, justifyContent: "center", alignItems: "center" },
});
