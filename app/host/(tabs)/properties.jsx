import { useTranslation } from "react-i18next";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { AddWhiteIcon } from "../../../assets/icons/Icons";
import { Body2, Caption, H5, H6 } from "../../../components/typo/typography";
import { propertiesData } from "../../../store/PropertyData";

export default function Properties() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* Sticky Header */}
      <View style={styles.stickyHeader}>
        <View style={styles.header}>
          <H6>{t("properties.my_properties")}</H6>
        </View>

        <View style={styles.topButtonSection}>
          <TouchableOpacity
            onPress={() => router.push("/host/create-cleaning-request")}
            style={styles.createCleaningRequest}
          >
            <Caption>{t("properties.create_cleaning_request")}</Caption>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/host/addProperty")}
            style={styles.addProperties}
          >
            <AddWhiteIcon />
            <Caption style={styles.addPropertiesText}>
              {t("properties.add_properties")}
            </Caption>
          </TouchableOpacity>
        </View>
      </View>

      {/* Properties List */}
      <FlatList
        data={propertiesData}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: `/host/propertiDetails/${item.id}`,
                params: { property: JSON.stringify(item) },
              })
            }
          >
            <View style={styles.propertyCard}>
              <Image
                source={item.img}
                style={styles.image}
                contentFit="cover"
              />
              <H5 style={styles.title}>{item.title}</H5>
              <Body2 style={styles.location}>{item.location}</Body2>
            </View>
          </TouchableOpacity>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  stickyHeader: {
    paddingHorizontal: "2.5%",
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#FFF",
    zIndex: 10,
    elevation: 10,
  },

  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  topButtonSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  createCleaningRequest: {
    width: "47%",
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#6B7280",
    justifyContent: "center",
    alignItems: "center",
  },

  addProperties: {
    width: "47%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#3F3F3F",
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  addPropertiesText: {
    color: "#FFFFFF",
    marginLeft: 6,
  },

  listContainer: {
    paddingHorizontal: "3%",
    paddingTop: 20,
    paddingBottom: 40,
  },

  propertyCard: {
    width: "100%",
    marginVertical: 15,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#FFF",
    elevation: 2,
  },

  image: {
    width: "100%",
    height: 250,
  },

  title: {
    marginTop: 10,
    marginHorizontal: 10,
  },

  location: {
    marginTop: 4,
    marginHorizontal: 10,
    marginBottom: 10,
    color: "#6B7280",
  },
});
