import { Link, useRouter } from "expo-router";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Body2, H2 } from "../../components/typo/typography";
// import { Body2, H2 } from "../../components/typo/Typography.jsx";
// import { Body2, H2 } from "../../components/typo/Typography";

export default function LoginScreen() {
    const router = useRouter();

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
                        <View style={styles.header}>
                            <H2 style={styles.title}>Login with Email</H2>
                        </View>

                        <View style={styles.form}>
                            {/* Email input */}
                            <View style={{ marginBottom: 16 }}>
                                <Body2>Email</Body2>
                                <View style={styles.fakeInput} />
                            </View>

                            {/* Password input */}
                            <View style={{ marginBottom: 16 }}>
                                <Body2>Password</Body2>
                                <View style={styles.fakeInput} />
                            </View>

                            {/* Login Button */}
                            <TouchableOpacity
                                onPress={() => router.push("")} // validation skip
                                style={styles.submitButton}
                            >
                                <Text style={styles.buttonText}>Go to Home</Text>
                            </TouchableOpacity>

                            {/* Sign Up / Forgot Password */}
                            <View style={styles.footerLinksContainer}>
                                <View style={styles.signUpContainer}>
                                    <Link href="/(auth)/register" asChild>
                                        <TouchableOpacity>
                                            <Body2 style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Sign Up</Body2>
                                        </TouchableOpacity>
                                    </Link>
                                </View>
                                <View style={styles.forgotPasswordContainer}>
                                    <Link href="/(auth)/forgot-password" asChild>
                                        <TouchableOpacity>
                                            <Body2 style={{ textDecorationLine: 'underline' }}>Forgot password?</Body2>
                                        </TouchableOpacity>
                                    </Link>
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
    safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
    container: { flex: 1 },
    scrollContent: { flexGrow: 1 },
    content: { flex: 1, paddingHorizontal: 24, paddingVertical: 32 },
    header: { marginBottom: 40 },
    title: { marginBottom: 8 },
    form: { marginBottom: 40 },
    fakeInput: { height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginTop: 8 },
    submitButton: {
        backgroundColor: "#00AFF5",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 5,
    },
    buttonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
    footerLinksContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
    signUpContainer: {},
    forgotPasswordContainer: {},
});
