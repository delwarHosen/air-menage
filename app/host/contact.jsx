import { Image } from "expo-image";
import { useRouter } from "expo-router";
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
import { SafeAreaView } from "react-native-safe-area-context";

// Assets & Components
import { useForm } from "react-hook-form";
import { Colors } from "../../assets/Colors";
import Heading from "../../components/Heading/Heading";
import { Body1, ButtonText } from "../../components/typo/typography";
import { FormInput } from "../../components/ui/FormInput";
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_PLACEHOLDERS,
} from "../../constants/form";
import { IMAGE_CONSTANTS } from "../../constants/image.index";
// import { useForm } from "../../hooks/useForm";

/* ---------------- Email Validation ---------------- */
const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email) ? "" : "Invalid email address";
};

export default function ContactScreen() {
  const router = useRouter();

  const {
    // values,
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
      [FORM_FIELDS.FULL_NAME]: (v) => (v ? "" : "Full name is required"),
      [FORM_FIELDS.EMAIL]: validateEmail,
      [FORM_FIELDS.DESCRIPTION]: (v) => (v ? "" : "Description is required"),
    },
    onSubmit: async () => {
      if (Platform.OS === "android") {
        ToastAndroid.show("Message Sent!", ToastAndroid.SHORT);
      }
      router.back();
    },
  });

  // const isFormValid =
  //   values[FORM_FIELDS.FULL_NAME] &&
  //   values[FORM_FIELDS.EMAIL] &&
  //   values[FORM_FIELDS.DESCRIPTION] &&
  //   !errors[FORM_FIELDS.EMAIL];

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Headding */}
        <View style={{marginHorizontal:20}}>
          <Heading title={"Contact"} />
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
              label={FORM_LABELS[FORM_FIELDS.FULL_NAME]}
              placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.FULL_NAME]}
              // value={values[FORM_FIELDS.FULL_NAME]}
              // onChangeText={(t) =>
              //   handleChange(FORM_FIELDS.FULL_NAME, t)
              // }
              // onBlur={() => handleBlur(FORM_FIELDS.FULL_NAME)}
              // error={errors[FORM_FIELDS.FULL_NAME]}
              required
            />

            <FormInput
              label={FORM_LABELS[FORM_FIELDS.EMAIL]}
              placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.EMAIL]}
              // value={values[FORM_FIELDS.EMAIL]}
              // onChangeText={(t) =>
              //   handleChange(FORM_FIELDS.EMAIL, t)
              // }
              // onBlur={() => handleBlur(FORM_FIELDS.EMAIL)}
              // error={errors[FORM_FIELDS.EMAIL]}
              type="email"
              required
            />

            <View style={styles.container}>
              <Body1 style={styles.label}>Message</Body1>
              <TextInput
                placeholder="message"
                multiline
                style={styles.textArea}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                // (!isFormValid || isSubmitting) &&
                styles.disabledButton,
              ]}
              onPress={handleSubmit}
            // disabled={!isFormValid || isSubmitting}
            >
              <ButtonText style={styles.submitText}>Send Message</ButtonText>
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
    backgroundColor: Colors.BACKGROUND_COLOR,
  },

  scrollContainer: {
    paddingHorizontal: 16,
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
