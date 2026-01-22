import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from "../../assets/Colors";
import AuthHeading from "../../components/AuthHeading/AuthHeading";
import { Body1, Body2 } from "../../components/typo/typography";

export default function VerificationCodeScreen() {
    const router = useRouter();
    const { t } = useTranslation();

    const [code, setCode] = useState("");
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const inputRef = useRef(null);
    const CODE_LENGTH = 4;

    // Timer Logic
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        } else {
            setCanResend(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleResend = () => {
        if (canResend) {
            setTimer(30);
            setCanResend(false);
            setCode("");
            if (Platform.OS === 'android') {
                ToastAndroid.show(t("verification.verificationResent"), ToastAndroid.SHORT);
            }
        }
    };

    const handleVerify = () => {
        if (code.length !== CODE_LENGTH) {
            if (Platform.OS === 'android') {
                ToastAndroid.show(t("verification.enterCodeError"), ToastAndroid.SHORT);
            }
            return;
        }
        router.push("/(auth)/set-new-password");
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
                            title={t("verification.title")}
                            description={t("verification.description")}
                        />
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => inputRef.current?.focus()}
                            style={styles.otpContainer}
                        >
                            {Array(CODE_LENGTH).fill(0).map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.otpBox,
                                        code.length === index && styles.activeOtpBox
                                    ]}
                                >
                                    <Body1 weight="bold" style={styles.otpText}>
                                        {code[index] || ""}
                                    </Body1>
                                </View>
                            ))}
                        </TouchableOpacity>

                        <TextInput
                            ref={inputRef}
                            value={code}
                            onChangeText={text => setCode(text.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH))}
                            keyboardType="number-pad"
                            style={styles.hiddenInput}
                            autoFocus
                        />

                        <View style={styles.resendContainer}>
                            <Body2 style={{ color: Colors.TEXT_COLOR }}>{t("verification.notReceived")}</Body2>

                            {canResend ? (
                                <TouchableOpacity onPress={handleResend} style={styles.resendButton}>
                                    <Body1 color="#00AFF5" weight="semiBold">
                                        {t("verification.resendCode")}
                                    </Body1>
                                </TouchableOpacity>
                            ) : (
                                <View style={styles.timerWrapper}>
                                    <Body1 color="#94A3B8">{t("verification.resendIn")}</Body1>
                                    <Body1 color="#00AFF5" weight="bold">
                                        {`${timer}s`}
                                    </Body1>
                                </View>
                            )}
                        </View>

                        <TouchableOpacity
                            onPress={handleVerify}
                            style={styles.submitButton}
                            activeOpacity={0.8}
                        >
                            <Body1 style={styles.buttonText}>{t("verification.verifyButton")}</Body1>
                        </TouchableOpacity>
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
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 30,
        marginTop: 20
    },
    otpBox: {
        width: 70,
        height: 55,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E9E9E9"
    },
    activeOtpBox: {
        borderColor: Colors.PRIMARY,
        backgroundColor: "#FFFFFF",
        borderWidth: 2
    },
    otpText: {
        fontSize: 24,
        color: "#1E293B",

    },
    hiddenInput: {
        position: 'absolute',
        opacity: 0,
        height: 0,
        width: 0,
        fontFamily: 'SyneRegular'
    },
    resendContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 40,
    },
    resendButton: {
        marginTop: 8,
    },
    timerWrapper: {
        flexDirection: 'row',
        marginTop: 8,
        gap: 4
    },
    submitButton: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: '700'
    }
});