import { Ionicons } from "@expo/vector-icons";
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
                                onPress={() => router.push("/host/home")}
                                style={styles.submitButton}
                            >
                                <Text style={styles.buttonText}>Login</Text>
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

                            {/* Divider */}
                            <View style={styles.dividerContainer}>
                                <View style={styles.divider} />
                                <Text style={styles.dividerText}>or</Text>
                                <View style={styles.divider} />
                            </View>

                            {/* Social icon */}
                            <View style={styles.socialContaier}>
                                <View style={styles.socialIcon}>
                                    <Ionicons name="logo-google" size={32} color={"#2DBEFF"} />
                                </View>
                                <View style={styles.socialIcon}>
                                    <Ionicons name="logo-apple" size={32} color="black" />
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
        paddingVertical: 32
    },
    header: {
        marginBottom: 40
    },
    title: {
        marginBottom: 8
    },
    form: {
        marginBottom: 40
    },
    fakeInput: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginTop: 8
    },
    submitButton: {
        backgroundColor: "#00AFF5",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 5,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600"
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 25
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: "#2DBEFF"
    },
    dividerText: {
        marginHorizontal: 16,
        color: "#94A3B8"
    },
    footerLinksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 8,
        marginBottom: 20
    },
    socialContaier: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        marginTop: 20,
    },
    socialIcon: {
        backgroundColor: "#F7F7F7",
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
});