import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form"; // নিশ্চিত করুন আপনার custom hook টি সঠিক
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Body2, H2 } from "../../components/typo/typography";
import { FormInput } from "../../components/ui/FormInput";
import { FORM_FIELDS, FORM_LABELS, FORM_PLACEHOLDERS } from "../../constants/form";
import { validateEmail, validatePassword } from "../../utils/validation";

export default function SignUpScreen() {
    const router = useRouter();
    const [checked, setChecked] = useState(false);


    
    const {
        values = {},
        errors = {},
        touched = {},
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
    } = useForm({
        initialValues: {
            [FORM_FIELDS.EMAIL]: "dev@yopmail.com",
            [FORM_FIELDS.PASSWORD]: "1234567",
        },
        validationRules: {
            [FORM_FIELDS.EMAIL]: validateEmail,
            [FORM_FIELDS.PASSWORD]: validatePassword,
        },
        onSubmit: async formValues => {
            try {
                ToastAndroid.show("Login successful!", ToastAndroid.SHORT);
                router.push("/(app)/home");
            } catch (error) {
                ToastAndroid.show("Login failed", ToastAndroid.SHORT);
            }
        }
    });


    const isFormValid =
        values?.[FORM_FIELDS.EMAIL] &&
        values?.[FORM_FIELDS.PASSWORD] &&
        !errors?.[FORM_FIELDS.EMAIL] &&
        !errors?.[FORM_FIELDS.PASSWORD];

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
                            <H2 style={styles.title}>Sign up with Email</H2>
                            {/* <Body1 color="#64748B">Sign in to continue your journey</Body1> */}
                        </View>

                        <View style={styles.form}>
                            <FormInput
                                label={FORM_LABELS[FORM_FIELDS.FULL_NAME]}
                                value={values?.[FORM_FIELDS.FULL_NAME] || ""}
                                // onChangeText={text => handleChange(FORM_FIELDS.EMAIL, text)}
                                onBlur={() => handleBlur(FORM_FIELDS.FULL_NAME)}
                                placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.FULL_NAME]}
                                type="email"
                                error={errors?.[FORM_FIELDS.FULL_NAME]}
                                touched={touched?.[FORM_FIELDS.FULL_NAME]}
                                required
                            />

                            <FormInput
                                label={FORM_LABELS[FORM_FIELDS.EMAIL]}
                                value={values?.[FORM_FIELDS.EMAIL] || ""}
                                // onChangeText={text => handleChange(FORM_FIELDS.EMAIL, text)}
                                onBlur={() => handleBlur(FORM_FIELDS.EMAIL)}
                                placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.EMAIL]}
                                type="email"
                                error={errors?.[FORM_FIELDS.EMAIL]}
                                touched={touched?.[FORM_FIELDS.EMAIL]}
                                required
                            />

                            <FormInput
                                label={FORM_LABELS[FORM_FIELDS.PASSWORD]}
                                value={values?.[FORM_FIELDS.PASSWORD] || ""}
                                // onChangeText={text => handleChange(FORM_FIELDS.PASSWORD, text)}
                                onBlur={() => handleBlur(FORM_FIELDS.PASSWORD)}
                                placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.PASSWORD]}
                                type="password"
                                error={errors?.[FORM_FIELDS.PASSWORD]}
                                touched={touched?.[FORM_FIELDS.PASSWORD]}
                                required
                            />

                            <FormInput
                                label={FORM_LABELS[FORM_FIELDS.CONFIRM_PASSWORD]}
                                value={values[FORM_FIELDS.CONFIRM_PASSWORD]}
                                // onChangeText={(text) => handleChange(FORM_FIELDS.CONFIRM_PASSWORD, text.trim())}
                                placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.CONFIRM_PASSWORD]}
                                type="password"
                                // error={
                                //     errors[FORM_FIELDS.CONFIRM_PASSWORD] ||
                                //     (values[FORM_FIELDS.CONFIRM_PASSWORD] && !passwordsMatch ? 'Passwords do not match' : '')
                                // }
                                touched={touched[FORM_FIELDS.CONFIRM_PASSWORD]}
                                required
                            />

                            <TouchableOpacity
                                onPress={handleSubmit}
                                disabled={!isFormValid || isSubmitting}
                                style={[
                                    styles.submitButton,
                                    (!isFormValid || isSubmitting) && styles.disabledButton
                                ]}
                            >
                                <Text style={styles.buttonText}>
                                    {isSubmitting ? "Signing In..." : "Sign In"}
                                </Text>
                            </TouchableOpacity>


                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}>
                                {/* Checkbox */}
                                <TouchableOpacity
                                    onPress={() => setChecked(!checked)}
                                    style={{
                                        height: 20,
                                        width: 20,
                                        borderRadius: 4,
                                        borderWidth: 1.5,
                                        borderColor: "#2DBEFF",
                                        backgroundColor: checked ? "#2DBEFF" : "transparent",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: 10,
                                    }}
                                >
                                    {checked && <Ionicons name="checkmark" size={14} color="#fff" />}
                                </TouchableOpacity>

                                {/* Text */}
                                <Body2>
                                    Agree with{" "}
                                    <Text style={{ color: "#2DBEFF" }}>
                                        Terms & Conditions
                                    </Text>
                                </Body2>
                            </View>

                            {/* forgot route and forgot pass container */}
                            <View style={styles.footerLinksContainer}>
                                {/* Sign Up Link */}
                                {/* <View style={styles.signUpContainer}>
                                    <Link href="/(auth)/register" asChild >
                                        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                            <Body2 color="#323135" style={{ fontWeight: 'bold', fontSize: 16, textDecorationLine: 'underline', }}>Sign Up</Body2>
                                        </TouchableOpacity>
                                    </Link>
                                </View> */}

                                {/* Forgot Password Link */}
                                {/* <View style={styles.forgotPasswordContainer}>
                                    <Link
                                        href={{
                                            pathname: "/(auth)/forgot-password",
                                            params: { email: values?.[FORM_FIELDS.EMAIL] || "" }
                                        }}
                                        asChild
                                    >
                                        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                            <Body2 color="323135" style={styles.forgotPassword}>
                                                Forgot password?
                                            </Body2>
                                        </TouchableOpacity>
                                    </Link>
                                </View> */}
                            </View>

                            {/* DEvider */}
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
    safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
    container: { flex: 1 },
    scrollContent: { flexGrow: 1 },
    content: { flex: 1, paddingHorizontal: 24, paddingVertical: 32 },
    header: { marginBottom: 40 },
    title: { marginBottom: 8 },
    form: { marginBottom: 40 },
    submitButton: {
        backgroundColor: "#00AFF5",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 5,
        paddingVertical: "6%"
    },
    // disabledButton: { backgroundColor: "#94A3B8" },
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
    signUpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    forgotPasswordContainer: {

    },
    forgotPassword: {
        fontWeight: "600",
        textDecorationLine: 'underline',
        fontSize: 16
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