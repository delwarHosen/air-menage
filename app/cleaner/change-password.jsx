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
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../assets/Colors";
import { BigVerifyIcon } from "../../assets/icons/Icons";
import Heading from "../../components/Heading/Heading";
import { Body2, ButtonText, H5 } from "../../components/typo/typography";
import { FORM_FIELDS } from "../../constants/form";

export default function ChangePassword() {
    const router = useRouter();
    const { t } = useTranslation();

    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const { control, handleSubmit, formState: { isSubmitting } } = useForm({
        defaultValues: {
            [FORM_FIELDS.CURRENT_PASSWORD]: "",
            [FORM_FIELDS.PASSWORD]: "",
            [FORM_FIELDS.CONFIRM_PASSWORD]: "",
        }
    });

    const passwordFields = [
        {
            id: '1',
            key: FORM_FIELDS.CURRENT_PASSWORD,
            stateKey: 'current',
            label: t("change_password.fields.currentPassword"),
            placeholder: t("form.placeholders.currentPassword")
        },
        {
            id: '2',
            key: FORM_FIELDS.PASSWORD,
            stateKey: 'new',
            label: t("change_password.fields.newPassword"),
            placeholder: t("form.placeholders.password")
        },
        {
            id: '3',
            key: FORM_FIELDS.CONFIRM_PASSWORD,
            stateKey: 'confirm',
            label: t("change_password.fields.confirmPassword"),
            placeholder: t("form.placeholders.confirmPassword")
        }
    ];

    const toggleVisibility = (key) => {
        setShowPassword(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        setIsSuccessModalVisible(true);
    };

    const renderItem = (item) => (
        <View key={item.id} style={styles.inputWrapper}>
            <Body2 style={styles.labelOutside}>{item.label}</Body2>
            <View style={styles.inputCard}>
                <Controller
                    control={control}
                    name={item.key}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.textInput}
                            value={value}
                            onChangeText={onChange}
                            placeholder={item.placeholder}
                            placeholderTextColor="#7E8792"
                            secureTextEntry={!showPassword[item.stateKey]}
                        />
                    )}
                />
                <TouchableOpacity onPress={() => toggleVisibility(item.stateKey)}>
                    <Ionicons
                        name={showPassword[item.stateKey] ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color="#7E8792"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.mainContent}>
                        <Heading title={t("change_password.title")} />

                        <View style={styles.iconSection}>
                            <View style={styles.lockCircle}>
                                <Ionicons name="lock-closed" size={40} color={Colors.PRIMARY} />
                            </View>
                        </View>

                        {passwordFields.map(item => renderItem(item))}

                        <TouchableOpacity
                            onPress={handleSubmit(onSubmit)}
                            style={styles.submitButton}
                            activeOpacity={0.8}
                        >
                            <ButtonText style={styles.buttonText}>
                                {isSubmitting
                                    ? t("change_password.buttons.updating")
                                    : t("change_password.buttons.saveChanges")}
                            </ButtonText>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Bottom Sheet Success Modal */}
            <Modal
                transparent={true}
                visible={isSuccessModalVisible}
                animationType="slide"
                onRequestClose={() => setIsSuccessModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.bottomSheet}>
                        <View style={styles.handleBar} />
                        
                        <View style={styles.successIconCircle}>
                            <BigVerifyIcon/>
                        </View>

                        <H5 style={{ marginBottom: 10 }}>{t("modal.successTitle")}</H5>
                        <Body2 style={{ textAlign: 'center', color: '#7E8792', marginBottom: 30 }}>
                            {t("modal.successDescription")}
                        </Body2>

                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                setIsSuccessModalVisible(false);
                                router.replace("/cleaner/menu");
                            }}
                        >
                            <ButtonText style={{ color: '#FFF' }}>{t("common.validate")}</ButtonText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    scrollContainer: {
        flexGrow: 1,
    },
    mainContent: {
        flex: 1,
        paddingHorizontal: "5%", 
        paddingBottom: 40,
    },
    iconSection: {
        marginVertical: 30,
        alignItems: 'center'
    },
    lockCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#F0F7FF",
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputWrapper: {
        width: "100%",
        marginBottom: 20,
    },
    labelOutside: {
        fontSize: 14,
        color: "#0F243E",
        marginBottom: 8,
        fontWeight: '500'
    },
    inputCard: {
        flexDirection: 'row',
        height: 52,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#CACACB",
        backgroundColor: "#FFF",
        paddingHorizontal: 15,
        alignItems: "center",
    },
    textInput: {
        flex: 1,
        fontSize: 14,
        color: "#0F243E"
    },
    submitButton: {
        width: "100%",
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "600"
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    bottomSheet: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 25,
        alignItems: 'center',
        paddingBottom: 40,
    },
    handleBar: {
        width: 40,
        height: 5,
        backgroundColor: '#E2E8F0',
        borderRadius: 10,
        marginBottom: 20,
    },
    successIconCircle: {
        marginBottom: 20,
    },
    modalButton: {
        width: '100%',
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
});