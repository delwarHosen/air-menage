import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";

// Assets & Components
import { useForm } from "react-hook-form";
import { Colors } from "../../assets/Colors";
import Heading from "../../components/Heading/Heading";
import { Body1, ButtonText } from "../../components/typo/typography";
import { FormInput } from "../../components/ui/FormInput";
import { FORM_FIELDS } from "../../constants/form";
import { IMAGE_CONSTANTS } from "../../constants/image.index";

const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email) ? "" : t("contact.fields.email.errorInvalid");
};

export default function ContactScreen() {
    const router = useRouter();
    const { t } = useTranslation();

    const {
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useForm({
        initialValues: {
            [FORM_FIELDS.FULL_NAME]: "",
            [FORM_FIELDS.EMAIL]: "",
            [FORM_FIELDS.DESCRIPTION]: "",
        },
        validationRules: {
            [FORM_FIELDS.FULL_NAME]: (v) =>
                v ? "" : t("contact.fields.fullName.errorRequired"),
            [FORM_FIELDS.EMAIL]: validateEmail,
            [FORM_FIELDS.DESCRIPTION]: (v) =>
                v ? "" : t("contact.fields.description.errorRequired"),
        },
        onSubmit: async () => {
            if (Platform.OS === "android") {
                ToastAndroid.show(t("contact.buttons.successToast"), ToastAndroid.SHORT);
            }
            router.back();
        },
    });

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                {/* Heading */}
                <View style={{ marginHorizontal: 20 }}>
                    <Heading title={t("contact.title")} />
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}
                >
                    {/* Banner Image */}
                    <View style={styles.banner}>
                        <Image
                            source={IMAGE_CONSTANTS.contactImage}
                            style={styles.bannerImage}
                        />
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        <FormInput
                            label={t("contact.fields.fullName.label")}
                            placeholder={t("contact.fields.fullName.placeholder")}
                            required
                        />
                        <FormInput
                            label={t("contact.fields.email.label")}
                            placeholder={t("contact.fields.email.placeholder")}
                            type="email"
                            required
                        />

                        <View style={styles.container}>
                            <Body1 style={styles.label}>
                                {t("contact.fields.description.label")}
                            </Body1>
                            <TextInput
                                placeholder={t("contact.fields.description.placeholder")}
                                multiline
                                style={styles.textArea}
                            />
                        </View>

                        <TouchableOpacity style={[styles.submitButton]} onPress={handleSubmit}>
                            <ButtonText style={styles.submitText}>
                                {t("contact.buttons.send")}
                            </ButtonText>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}



const styles = StyleSheet.create({

    scrollContainer: {
        paddingHorizontal: "2.5%",
        paddingBottom: 40,
    },

    /* Banner */
    banner: {
        alignItems: "center",
        marginVertical: 20,
    },

    bannerImage: {
        width: 260,
        height: 260,
    },

    /* Form */
    form: {
        width: "100%",
        gap: 16,

    },

    inputField: {
        borderWidth: 1,
        borderColor: Colors.TEXT_COLOR
    },
    label: {
        marginBottom: 8,
        color: "#333",
    },
    textArea: {
        height: 120,
        borderColor: "#CACACB",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        textAlignVertical: "top",
        fontFamily: "SyneRegular",
    },

    submitButton: {
        height: 48,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
    },



    submitText: {
        color: "#FFF",
    },
});
