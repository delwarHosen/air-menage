import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from "react-redux";
import { Colors } from "../../assets/Colors";
import { AppleIcons, GoogleIcon } from "../../assets/icons/Icons";
import { Body1, Body2, ButtonText, H3 } from "../../components/typo/typography";
import { FormInput } from "../../components/ui/FormInput";
import { ImageUpload } from "../../components/ui/ImageUpload";
import { FORM_FIELDS } from "../../constants/form";
import { useSignUpMutation } from "../../redux/services/authApis";
// import { validateName } from "../../utils/validation";r
import { validateEmail, validateName, validatePassword } from "../../utils/validation";

const { height } = Dimensions.get('window');
const isSmallDevice = height < 750;

export default function SignUpScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const [checked, setChecked] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const selectedRole = useSelector((state) => state.role.selectedRole);
    const [registerUser, { loading: signUpLoading }] = useSignUpMutation();

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            [FORM_FIELDS.PROFILE_IMAGE]: "",
            [FORM_FIELDS.FULL_NAME]: "",
            [FORM_FIELDS.EMAIL]: "",
            [FORM_FIELDS.PASSWORD]: "",
            [FORM_FIELDS.CONFIRM_PASSWORD]: ""
        },
        mode: 'onChange' // Enable real-time validation
    });

    // Watch form values
    const values = watch();

    const onSubmit = async (formValues) => {
        const payload = {
            profileImage: formValues[FORM_FIELDS.PROFILE_IMAGE],
            fullName: formValues[FORM_FIELDS.FULL_NAME],
            email: formValues[FORM_FIELDS.EMAIL],
            password: formValues[FORM_FIELDS.PASSWORD],
            confirmPassword: formValues[FORM_FIELDS.CONFIRM_PASSWORD],
        };

        try {

            const res = await registerUser(payload).unwrap();
            setIsModalVisible(true);

            if (Platform.OS === 'android') {
                ToastAndroid.show(res?.msg || "Success", ToastAndroid.SHORT);
            }

        } catch (error) {

            console.log("Sign up error:", error);

            const errorMessage = error?.data?.msg || "Something went wrong";

            if (Platform.OS === 'android') {
                ToastAndroid.showWithGravityAndOffset(
                    errorMessage,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            } else {

                alert(errorMessage);
            }
        }
    };

    const handleModalDone = () => {
        setIsModalVisible(false);
        if (selectedRole === "host") {
            router.replace("/host/property-setup");
            // router.replace("/identity-verification/identity-verification-banner1");
        } else {
            router.replace("/(auth)/login");
        }
    };

    // const passwordsMatch = values[FORM_FIELDS.PASSWORD] === values[FORM_FIELDS.CONFIRM_PASSWORD];

    const isFormValid = true;
    // values[FORM_FIELDS.FULL_NAME] &&
    // values[FORM_FIELDS.EMAIL] &&
    // values[FORM_FIELDS.PASSWORD] &&
    // values[FORM_FIELDS.CONFIRM_PASSWORD] &&
    // passwordsMatch &&
    // // checked && // Checkbox must be checked
    // !errors[FORM_FIELDS.FULL_NAME] &&
    // !errors[FORM_FIELDS.EMAIL] &&
    // !errors[FORM_FIELDS.PASSWORD] &&
    // !errors[FORM_FIELDS.CONFIRM_PASSWORD];

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.flex1}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.content}>
                        <H3 style={[styles.title, { fontSize: isSmallDevice ? 20 : 24 }]}>
                            {t("auth.signup_with_email")}
                        </H3>


                        <View style={styles.imageContainer}>
                            <View style={styles.profileWrapper}>
                                <Controller
                                    control={control}
                                    name="profileImage"
                                    render={({ field: { onChange, value } }) => (
                                        <ImageUpload
                                            image={value}
                                            onImageSelect={onChange}
                                            shape="circle"
                                            showIcon={false}
                                            containerStyle={{
                                                height: isSmallDevice ? 100 : 130,
                                                width: isSmallDevice ? 100 : 130,
                                            }}
                                        />
                                    )}
                                />
                                <TouchableOpacity style={styles.cameraIconContainer} activeOpacity={0.7}>
                                    <Ionicons name="camera" size={isSmallDevice ? 16 : 20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[styles.form, { marginTop: isSmallDevice ? 20 : 30 }]}>
                            {/* Inputs */}
                            <Controller
                                control={control}
                                name={FORM_FIELDS.FULL_NAME}
                                rules={{
                                    validate: validateName
                                }}
                                render={({ field }) => (
                                    <FormInput
                                        label={t("auth.full_name")}
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        required
                                        placeholder={t("auth.enter_full_name")}
                                        keyboardType="default"
                                        error={errors[FORM_FIELDS.FULL_NAME]?.message}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name={FORM_FIELDS.EMAIL}
                                rules={{
                                    validate: validateEmail
                                }}
                                render={({ field }) => (
                                    <FormInput
                                        label={t("auth.email")}
                                        required
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        placeholder={t("auth.enter_email")}
                                        keyboardType="email-address"
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
                                        required
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        placeholder={t("auth.enter_password")}
                                        secureTextEntry
                                        type="password"
                                        error={errors[FORM_FIELDS.PASSWORD]?.message}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name={FORM_FIELDS.CONFIRM_PASSWORD}
                                rules={{
                                    validate: (value) =>
                                        value === values[FORM_FIELDS.PASSWORD] || 'Passwords do not match'
                                }}
                                render={({ field }) => (
                                    <FormInput
                                        label={t("auth.confirm_password")}
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        placeholder={t("auth.enter_password")}
                                        type="password"
                                        required
                                        secureTextEntry
                                        error={errors[FORM_FIELDS.CONFIRM_PASSWORD]?.message}
                                    />
                                )}
                            />


                            <TouchableOpacity
                                onPress={() => setIsModalVisible(true)} // Direct modal show
                                style={[styles.submitButton, { paddingVertical: isSmallDevice ? 14 : 16 }]}
                            >
                                <ButtonText style={styles.buttonText}>{t("auth.signup")}</ButtonText>
                            </TouchableOpacity>

                            {/* Terms */}
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
                                    <Body1 style={{ fontSize: isSmallDevice ? 12 : 14 }}>
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


                            <View style={[styles.dividerContainer, { marginVertical: isSmallDevice ? 15 : 25 }]}>
                                <View style={styles.divider} />
                                <Body1 style={styles.dividerText}>{t("auth.or")}</Body1>
                                <View style={styles.divider} />
                            </View>

                            <View style={styles.socialContainer}>
                                <TouchableOpacity style={[styles.socialIcon, isSmallDevice && { height: 50, width: 50 }]}>
                                    <GoogleIcon />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.socialIcon, isSmallDevice && { height: 50, width: 50 }]}>
                                    <AppleIcons />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Modal - Success */}
            <Modal animationType="fade" transparent visible={isModalVisible}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.successIconCircle}>
                            <Ionicons name="checkmark" size={40} color="#fff" />
                        </View>
                        <H3 style={styles.modalTitle}>{t("signupSuccess.title")}</H3>
                        <Body1 style={styles.modalSubtitle}>{t("signupSuccess.subtitle")}</Body1>
                        <TouchableOpacity style={styles.doneButton} onPress={handleModalDone}>
                            <ButtonText style={styles.buttonText}>{t("common.done")}</ButtonText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
    flex1: { flex: 1 },
    scrollContent: { flexGrow: 1, paddingHorizontal: "5%", paddingBottom: 20 },
    content: { flex: 1, paddingTop: 10 },
    imageContainer: { alignItems: "center", marginTop: 10 },
    profileWrapper: { position: "relative" },
    cameraIconContainer: {
        position: "absolute",
        bottom: isSmallDevice ? 20 : 10,
        right: isSmallDevice ? 5 : 10,
        backgroundColor: Colors.PRIMARY,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#fff",
    },
    title: { fontWeight: "500", textAlign: 'left' },
    form: { width: '100%' },
    submitButton: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 15,
    },
    buttonText: { color: "#fff", fontWeight: '600' },
    termsContainer: { flexDirection: "row", alignItems: "center", marginTop: 15 },
    checkbox: {
        height: 18,
        width: 18,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: Colors.PRIMARY,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    termsTextContainer: { flex: 1 },
    linkText: { color: "#2DBEFF", textDecorationLine: 'underline' },
    dividerContainer: { flexDirection: "row", alignItems: "center" },
    divider: { flex: 1, height: 1, backgroundColor: Colors.BORDER_COLOR },
    dividerText: { marginHorizontal: 12, color: "#94A3B8" },
    socialContainer: { flexDirection: "row", justifyContent: "center", gap: 15, marginBottom: 20 },
    socialIcon: {
        backgroundColor: "#F7F7F7",
        height: 55,
        width: 55,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#eee'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        paddingHorizontal: 20
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
    },
    successIconCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: Colors.PRIMARY,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    modalTitle: { marginBottom: 10, textAlign: 'center' },
    modalSubtitle: { textAlign: "center", color: "#6B7280", marginBottom: 20 },
    doneButton: {
        backgroundColor: Colors.PRIMARY,
        width: "100%",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
});