import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
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

export default function SignUpScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const [checked, setChecked] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const selectedRole = useSelector((state) => state.role.selectedRole);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            profileImage: ""
        }
    });


    const onSubmit = (data) => {
        console.log("Form Data:", data);
        setIsModalVisible(true);
    };

    const handleModalDone = () => {
        setIsModalVisible(false);
        
        if (selectedRole === "host") {
            router.replace("/identity-verification/identity-verification-banner1");
        } else {
            router.replace("/(auth)/login");
        }

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
                                <Controller
                                    control={control}
                                    name="profileImage"
                                    render={({ field: { onChange, value } }) => (
                                        <ImageUpload
                                            image={value}
                                            onImageSelect={onChange}
                                            shape="circle"
                                            showIcon={false}
                                        />
                                    )}
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
                                        required
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
                                        required
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
                                        required
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder={t("auth.enter_password")}
                                        secureTextEntry
                                        type="password"
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
                                        required
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder={t("auth.confirm_password")}
                                        secureTextEntry
                                        type="password"
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

            {/* -----\\modal----- */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.successIconCircle}>
                            <Ionicons name="checkmark" size={50} color="#fff" />
                        </View>

                        <H3 style={styles.modalTitle}>
                            {t("signupSuccess.title")}
                        </H3>

                        <Body1 style={styles.modalSubtitle}>
                            {t("signupSuccess.subtitle")}
                        </Body1>

                        <TouchableOpacity
                            style={styles.doneButton}
                            onPress={handleModalDone}
                        >
                            <ButtonText style={styles.buttonText}>
                                {t("common.done")}
                            </ButtonText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

// styles same as before
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    flex1: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: "4%",
    },

    content: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 50,
    },

    imageContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10,
    },

    profileWrapper: {
        position: "relative",
    },

    profileImage: {
        height: 150,
        width: 150,
        borderRadius: 75,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        backgroundColor: "#E1E1E1",
    },

    cameraIconContainer: {
        position: "absolute",
        bottom: 20,
        right: 3,
        backgroundColor: Colors.PRIMARY,
        width: 34,
        height: 34,
        borderRadius: 17,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#fff",
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },

    title: {
        fontWeight: "500",
    },

    form: {
        marginTop: 40,
    },

    submitButton: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#fff",
    },

    termsContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
    },

    checkbox: {
        height: 20,
        width: 20,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: Colors.PRIMARY,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },

    termsTextContainer: {
        flexDirection: "row",
        flex: 1,
    },

    linkText: {
        color: "#2DBEFF",
    },

    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 25,
    },

    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.BORDER_COLOR,
    },

    dividerText: {
        marginHorizontal: 16,
        color: "#94A3B8",
    },

    socialContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        marginTop: 5,
    },

    socialIcon: {
        backgroundColor: "#F7F7F7",
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },

    modalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30,
        alignItems: "center",
        elevation: 5,
    },

    successIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.PRIMARY,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },

    modalTitle: {
        marginBottom: 10,
        color: "#1F2937",
    },

    modalSubtitle: {
        textAlign: "center",
        color: "#6B7280",
        marginBottom: 30,
    },

    doneButton: {
        backgroundColor: Colors.PRIMARY,
        width: "100%",
        paddingVertical: 16,
        marginBottom:50,
        borderRadius: 12,
        alignItems: "center",
    },
});
