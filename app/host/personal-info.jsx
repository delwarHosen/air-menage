import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";

import { Colors } from "../../assets/Colors";
import Heading from "../../components/Heading/Heading";
import { Body2, ButtonText } from "../../components/typo/typography";
import { IMAGE_CONSTANTS } from "../../constants/image.index";

export default function PersonalInfo() {
  const router = useRouter();
  const { t } = useTranslation();

  const fields = [
    { id: "1", key: "fullName", value: "John Doe" },
    { id: "2", key: "email", value: "johndoe@example.com" },
    { id: "3", key: "phone", value: "+1 234 567 890" },
    { id: "4", key: "address", value: "123 Main Street" },
    { id: "5", key: "city", value: "New York" },
    { id: "6", key: "country", value: "United States" }
  ];

  const renderInfoCard = ({ item }) => (
    <View style={styles.infoCard}>
      <Body2 style={styles.labelStyle}>
        {t(`host_personal_info.fields.${item.key}`)}
      </Body2>
      <Body2 style={styles.valueText}>{item.value}</Body2>
    </View>
  );

  const Header = () => (
    <>
      <Heading title={t("host_personal_info.title")} />
      <View style={styles.profileSection}>
        <Image source={IMAGE_CONSTANTS.profile} style={styles.profileImage} />
      </View>
    </>
  );

  const Footer = () => {
    const params = Object.fromEntries(fields.map(f => [f.key, f.value]));

    return (
      <>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => router.push({
            pathname: "/host/personal-edit-info",
            params
          })}
        >
          <ButtonText style={styles.buttonText}>
            {t("host_personal_info.actions.edit")}
          </ButtonText>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </>
    );
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <FlatList
          data={fields}
          renderItem={renderInfoCard}
          keyExtractor={item => item.id}
          ListHeaderComponent={Header}
          ListFooterComponent={Footer}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
 
  scrollContainer: {
    paddingHorizontal: "5%"
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30
  },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    backgroundColor: "#E1E1E1"
  },
  infoCard: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CACACB",
    backgroundColor: "#FFFFFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: "center"
  },
  labelStyle: {
    fontSize: 12,
    color: "#0F243E",
    marginBottom: 1,
    fontWeight: "400",
    textTransform: "uppercase"
  },
  valueText: {
    fontSize: 14,
    color: "#0F243E",
    fontWeight: "500"
  },
  submitButton: {
    width: "100%",
    backgroundColor: "#00AFF5",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "500"
  }
});
