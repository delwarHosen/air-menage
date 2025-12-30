import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
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
// import { Body1, H2 } from "../../components/typo/Typography";
import { Body1, H2 } from "../../components/typo/typography";
import { FormInput } from "../../components/ui/FormInput";
import { FORM_FIELDS, FORM_LABELS, FORM_PLACEHOLDERS } from "../../constants/form";
import { validateEmail } from "../../utils/validation";

export default function ForgotPasswordScreen() {
    const router = useRouter();

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
            [FORM_FIELDS.EMAIL]: "",
        },
        validationRules: {
            [FORM_FIELDS.EMAIL]: validateEmail,
        },
        onSubmit: async formValues => {
            if (!formValues[FORM_FIELDS.EMAIL]) {
                ToastAndroid.show("Please enter your email", ToastAndroid.SHORT);
                return;
            }
            try {
                // এখানে আপনার API কল হবে
                ToastAndroid.show("Verification code sent!", ToastAndroid.SHORT);
                // ওটিপি স্ক্রিনে নেভিগেট করতে পারেন
                // router.push("/(auth)/verify-otp"); 
            } catch (error) {
                ToastAndroid.show("Failed to send code", ToastAndroid.SHORT);
            }
        }
    });

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
                        {/* Heading */}
                        <View style={styles.header}>
                            <H2 style={styles.title}>Forgot Password</H2>
                            <Body1 color="#4B4B4B" style={{textAlign:"center"}}>
                                Please enter your email address to receive a verification code.
                            </Body1>
                        </View>

                        {/* Email Input */}
                        <View style={styles.form}>
                            <FormInput
                                label={FORM_LABELS[FORM_FIELDS.EMAIL]}
                                value={values?.[FORM_FIELDS.EMAIL] || ""}
                                onChangeText={text => handleChange(FORM_FIELDS.EMAIL, text)}
                                onBlur={() => handleBlur(FORM_FIELDS.EMAIL)}
                                placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.EMAIL]}
                                type="email"
                                error={errors?.[FORM_FIELDS.EMAIL]}
                                touched={touched?.[FORM_FIELDS.EMAIL]}
                                required
                            />

                            {/* Get Code Button (Always Enabled) */}
                            <TouchableOpacity
                                // onPress={handleSubmit}
                                onPress={()=>router.push("/(auth)/email-verification")}
                                style={styles.submitButton}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.buttonText}>
                                    {isSubmitting ? "Sending..." : "Get Code"}
                                </Text>
                            </TouchableOpacity>
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
        paddingVertical: 40 
    },
    header: { 
        marginBottom: 32 ,
       
    },
    title: { 
        marginBottom: 12,
        fontSize: 28,
        fontWeight: "bold",
         textAlign:"center"
    },
    form: { 
        flex: 1 
    },
    submitButton: {
        backgroundColor: "#00AFF5", 
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        paddingVertical: "5.5%", // বাটন সাইজ বড় করার জন্য
        elevation: 2, // অ্যান্ড্রয়েড শ্যাডো
        shadowColor: "#000", // আইওএস শ্যাডো
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5
    }
});