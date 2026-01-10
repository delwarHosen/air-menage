import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../assets/Colors";
import Heading from "../../components/Heading/Heading";
import { Body2, ButtonText } from "../../components/typo/typography";
import { FORM_FIELDS, FORM_PLACEHOLDERS } from "../../constants/form";

const { width } = Dimensions.get('window');

export default function ChangePassword() {
    const router = useRouter();
    const { t } = useTranslation();

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const passwordFields = [
        { id: '1', key: FORM_FIELDS.CURRENT_PASSWORD, stateKey: 'current', label: t("change_password.fields.currentPassword") },
        { id: '2', key: FORM_FIELDS.PASSWORD, stateKey: 'new', label: t("change_password.fields.newPassword") },
        { id: '3', key: FORM_FIELDS.CONFIRM_PASSWORD, stateKey: 'confirm', label: t("change_password.fields.confirmPassword") },
    ];

    const { control, handleSubmit, formState: { isSubmitting } } = useForm({
        defaultValues: {
            [FORM_FIELDS.CURRENT_PASSWORD]: "",
            [FORM_FIELDS.PASSWORD]: "",
            [FORM_FIELDS.CONFIRM_PASSWORD]: "",
        }
    });

    const toggleVisibility = (key) => {
        setShowPassword(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        router.replace("/cleaner/menu");
    };

    const renderItem = ({ item }) => (
        <View style={styles.inputWrapper}>
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
                            placeholder={FORM_PLACEHOLDERS[item.key]}
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }} edges={['top']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={0}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={{ width: '100%' }}>
                        <View style={{ marginHorizontal: 20 }}>
                            <Heading title={t("change_password.title")} />
                        </View>
                        <View style={styles.headerContainer}>
                            <View style={styles.iconSection}>
                                <View style={styles.lockCircle}>
                                    <Ionicons name="lock-closed" size={40} color={Colors.PRIMARY} />
                                </View>
                            </View>
                        </View>
                    </View>

                    {passwordFields.map((item) => renderItem({ item }))}

                    <View style={styles.footerContainer}>
                        <TouchableOpacity
                            onPress={handleSubmit(onSubmit)}
                            style={styles.submitButton}
                        >
                            <ButtonText style={styles.buttonText}>
                                {isSubmitting ? t("change_password.buttons.updating") : t("change_password.buttons.saveChanges")}
                            </ButtonText>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 40,
        alignItems: 'center',
        flexGrow: 1,
    },
    headerContainer: {
        width: '100%',
        alignItems: 'center',
    },
    iconSection: {
        marginVertical: 30
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
        width: width * 0.92,
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
        width: '100%',
    },
    textInput: {
        flex: 1,
        fontSize: 14,
        color: "#0F243E"
    },
    footerContainer: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 20,
        marginTop: 10,
    },
    submitButton: {
        width: width * 0.92,
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
});