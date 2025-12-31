import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Body1, Body2, H2 } from "../../components/typo/typography";
// import { Body1, Body2, H2 } from "../../components/typo/Typography";

export default function VerificationCodeScreen() {
    const router = useRouter();
    const [code, setCode] = useState("");
    const [timer, setTimer] = useState(30); // ৩০ সেকেন্ডের টাইমার
    const [canResend, setCanResend] = useState(false);
    const inputRef = useRef(null);
    const CODE_LENGTH = 4;

    // টাইমার লজিক
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
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
            setCode(""); // রিসেন্ড করলে কোড ক্লিয়ার করে দেওয়া ভালো
            ToastAndroid.show("Verification code resent!", ToastAndroid.SHORT);
        }
    };

    const handleVerify = () => {
        if (code.length !== CODE_LENGTH) {
            ToastAndroid.show("Please enter the 4-digit code", ToastAndroid.SHORT);
            return;
        }
        // সফল ভেরিফিকেশন হলে নেভিগেট করুন
        ToastAndroid.show("Verification Successful!", ToastAndroid.SHORT);
        // router.push("/(auth)/reset-password");
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
                >
                    <View style={styles.content}>
                        {/* Header Section */}
                        <View style={styles.header}>
                            <H2 style={styles.title}>Verify Code</H2>
                            <Body1 color="#64748B" style={{ textAlign: "center" }}>
                                Please enter the 4-digit code sent to your email address.
                            </Body1>
                        </View>

                        {/* Custom OTP Boxes */}
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
                                    <Text style={styles.otpText}>
                                        {code[index] || ""}
                                    </Text>
                                </View>
                            ))}
                        </TouchableOpacity>

                        {/* Hidden Real Input for Keyboard Control */}
                        <TextInput
                            ref={inputRef}
                            value={code}
                            onChangeText={(text) => setCode(text.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH))}
                            keyboardType="number-pad"
                            style={styles.hiddenInput}
                            autoFocus={true}
                        />

                        {/* Resend Code Section (Column Format) */}
                        <View style={styles.resendContainer}>
                            <Body2 color="#64748B">Didn't receive the code?</Body2>

                            {canResend ? (
                                <TouchableOpacity onPress={handleResend} style={styles.resendButton}>
                                    <Body2 color="#00AFF5" style={{ fontWeight: 'bold' }}>
                                        Resend Code
                                    </Body2>
                                </TouchableOpacity>
                            ) : (
                                <View style={styles.timerWrapper}>
                                    <Body2 color="#94A3B8">Resend in </Body2>
                                    <Body2 color="#00AFF5" style={{ fontWeight: 'bold' }}>
                                        {timer}s
                                    </Body2>
                                </View>
                            )}
                        </View>

                        {/* Verify Button */}
                        <TouchableOpacity
                            onPress={() => router.push("/(auth)/set-new-password")}
                            // onPress={handleVerify}
                            style={styles.submitButton}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>Verify</Text>
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
    header: {
        marginBottom: 40
    },
    title: {
        marginBottom: 12,
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center"
    },

    // OTP Box Styles
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 30,
    },
    otpBox: {
        width: 65,
        height: 65,
        borderWidth: 1.5,
        borderColor: "#E2E8F0",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8FAFC"
    },
    activeOtpBox: {
        borderColor: "#00AFF5",
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
    },
    otpText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1E293B"
    },
    hiddenInput: {
        position: 'absolute',
        opacity: 0,
        height: 0,
        width: 0
    },

    // Resend Section (Column)
    resendContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 40,
        marginTop: 10
    },
    resendButton: {
        marginTop: 10,
        padding: 5
    },
    timerWrapper: {
        flexDirection: 'row',
        marginTop: 10
    },

    // Submit Button
    submitButton: {
        backgroundColor: "#00AFF5",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 18,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700"
    }
});