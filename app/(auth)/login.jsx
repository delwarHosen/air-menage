import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
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
import { GoogleIcon } from "../../assets/icons/Icons";
import { Body1, Body2, ButtonText, H3, H4 } from "../../components/typo/typography";

export default function LoginScreen() {
    const { t } = useTranslation();
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
                            <H3 style={styles.title}>{t("login.title")}</H3>
                        </View>

                        <View style={styles.form}>
                            {/* Email input */}
                            <View style={{ marginBottom: 4 }}>
                                <Body1>{t("login.label")}</Body1>
                                <View style={styles.fakeInput} />
                            </View>

                            {/* Password input */}
                            <View style={{ marginBottom: 16 }}>
                                <Body2>{t("login.password")}</Body2>
                                <View style={styles.fakeInput} />
                            </View>

                            {/* Login Button */}
                            <TouchableOpacity
                                onPress={() => router.push("/host/home")}
                                style={styles.submitButton}
                            >
                                <ButtonText style={styles.buttonText}>{t("login.button")}</ButtonText>
                            </TouchableOpacity>

                            {/* Sign Up / Forgot Password */}
                            <View style={styles.footerLinksContainer}>
                                <View style={styles.signUpContainer}>
                                    <Link href="/(auth)/register" asChild>
                                        <TouchableOpacity>
                                            <H4 style={{ fontWeight: '500', textDecorationLine: 'underline' }}>{t("login.signup")}</H4>
                                        </TouchableOpacity>
                                    </Link>
                                </View>
                                <View>
                                    <Link href="/(auth)/forgot-password" asChild>
                                        <TouchableOpacity>
                                            <H4 style={{ textDecorationLine: 'underline' }}>{t("login.Forgot_Password")}?</H4>
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
                                    <GoogleIcon/>
                                </View>
                                <View style={styles.socialIcon}>
                                   <Ionicons name="logo-apple" size={32} color="#0F243E"/>
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
        marginBottom: 20
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
        fontWeight: "500"
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
        marginTop: 10,
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