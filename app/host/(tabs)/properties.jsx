import { useTranslation } from "react-i18next";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";

import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { AddWhiteIcon } from "../../../assets/icons/Icons";
// import { IMAGE_COMPONENTS } from "../../../assets/image.index";
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
      {/* Sticky Header + Buttons */}
      <View style={styles.stickyHeader}>
        <View style={styles.header}>
          <H6>My Properties</H6>
        </View>

        <View style={styles.topButtonSection}>
          <TouchableOpacity
            onPress={() => router.push("/host/create-cleaning-request")}
            style={styles.createCleaningRequest}
          >
            <Caption>Create Cleaning Request</Caption>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/host/addProperty")}
            style={styles.addProperties}>
            <AddWhiteIcon />
            <Caption style={{ color: "#FFFFFF" }}>Add Properties</Caption>
          </TouchableOpacity>
        </View>
      </View>

      {/* Properties List */}
      <FlatList
        data={propertiesData}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: "3%", paddingTop: 20, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push({
              pathname: `/host/propertiDetails/${item.id}`, 
              params: { property: JSON.stringify(item) },
            })}
          >
            <View style={styles.PropertyCard}>
              <Image source={item.img} style={styles.image} contentFit="cover" />
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

  // Sticky header container
  stickyHeader: {
    paddingHorizontal: "3%",
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
    justifyContent: "center",
    alignItems: "center",
    gap: 22
  },

  createCleaningRequest: {
    width: "47%",
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: "#6B7280",
    justifyContent: "center",
    alignItems: "center",
  },

  addProperties: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "47%",
    height: 40,
    borderWidth: 1,
    backgroundColor: "#3F3F3F",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 13,
    gap: 6,
  },

  PropertyCard: {
    width: "100%",
    marginVertical: 20
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12
  },
  title: {
    marginTop: 11
  },
  location: {
    marginTop: 6
  }
});
