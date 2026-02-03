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
import { Colors } from "../../assets/Colors";
import Heading from "../../components/Heading/Heading";
import { Body1, ButtonText } from "../../components/typo/typography";
import { FormInput } from "../../components/ui/FormInput";
import { FORM_FIELDS } from "../../constants/form";
import { IMAGE_CONSTANTS } from "../../constants/image.index";

import { useState } from "react";

export default function ContactScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  // State for form values
  const [values, setValues] = useState({
    [FORM_FIELDS.FULL_NAME]: "",
    [FORM_FIELDS.EMAIL]: "",
    [FORM_FIELDS.DESCRIPTION]: "",
  });

  const [errors, setErrors] = useState({});

  // Handle change
  const handleChange = (field) => (text) => {
    setValues(prev => ({ ...prev, [field]: text }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Validate and submit
  const handleSubmit = () => {
    const newErrors = {};

    if (!values[FORM_FIELDS.FULL_NAME]) {
      newErrors[FORM_FIELDS.FULL_NAME] = t("contact.fields.fullName.errorRequired");
    }

    if (!values[FORM_FIELDS.EMAIL]) {
      newErrors[FORM_FIELDS.EMAIL] = t("contact.fields.email.errorRequired");
    } else if (!validateEmail(values[FORM_FIELDS.EMAIL])) {
      newErrors[FORM_FIELDS.EMAIL] = t("contact.fields.email.errorInvalid");
    }

    if (!values[FORM_FIELDS.DESCRIPTION]) {
      newErrors[FORM_FIELDS.DESCRIPTION] = t("contact.fields.description.errorRequired");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit success
    if (Platform.OS === "android") {
      ToastAndroid.show(t("contact.buttons.successToast"), ToastAndroid.SHORT);
    }
    router.back();
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ marginHorizontal: 20 }}>
          <Heading title={t("contact.title")} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.banner}>
            <Image
              source={IMAGE_CONSTANTS.contactImage}
              style={styles.bannerImage}
            />
          </View>

          <View style={styles.form}>
            <FormInput
              label={t("contact.fields.fullName.label")}
              placeholder={t("contact.fields.fullName.placeholder")}
              value={values[FORM_FIELDS.FULL_NAME]}
              onChangeText={handleChange(FORM_FIELDS.FULL_NAME)}
              error={errors[FORM_FIELDS.FULL_NAME]}
              required
            />

            <FormInput
              label={t("contact.fields.email.label")}
              placeholder={t("contact.fields.email.placeholder")}
              type="email"
              value={values[FORM_FIELDS.EMAIL]}
              onChangeText={handleChange(FORM_FIELDS.EMAIL)}
              error={errors[FORM_FIELDS.EMAIL]}
              required
            />

            <View style={styles.container}>
              <Body1 style={styles.label}>
                {t("contact.fields.description.label")}
              </Body1>
              <TextInput
                placeholder={t("contact.fields.description.placeholder")}
                multiline
                value={values[FORM_FIELDS.DESCRIPTION]}
                onChangeText={handleChange(FORM_FIELDS.DESCRIPTION)}
                style={styles.textArea}
              />
              {errors[FORM_FIELDS.DESCRIPTION] && (
                <Body1 style={{ color: 'red', fontSize: 12 }}>
                  {errors[FORM_FIELDS.DESCRIPTION]}
                </Body1>
              )}
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              // onPress={handleSubmit}
              onPress={()=>router.back()}
            >
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
    paddingHorizontal: "5%",
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
    backgroundColor: "#FFFFFF",
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
