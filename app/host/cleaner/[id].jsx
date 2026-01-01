import { useLocalSearchParams, useRouter } from "expo-router";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../assets/Colors";
import Heading from "../../../components/Heading/Heading";
import { Body1, Body2 } from "../../../components/typo/typography";
import { cleaners } from "../../../store/Cleaners";
import CleanerDetails from "./CleanerDetails";

export default function Cleaner() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const cleaner = cleaners.find((item) => item.id.toString() === id);

  if (!cleaner) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Body2>Cleaner not found</Body2>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <Heading title={"Cleaner details"} />

        {/* Whole content wrapper with 2.5% margin */}
        <View style={styles.contentWrapper}>
          {/* Profile Card */}
          <CleanerDetails cleaner={cleaner} />

          {/* Cleaner info below the profile */}
          <View style={styles.cleanerInfoWrapper}>
            <Body1 style={styles.nameText}>{cleaner.name}, 26</Body1>
            <Body2 style={styles.cleanerEmail}>{cleaner.email}</Body2>

            <FlatList
              data={cleaner?.workType || []}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              renderItem={({ item }) => (
                <Body2 style={styles.workType}>{item.type}</Body2>
              )}
              contentContainerStyle={{ paddingVertical: 5 }}
              columnWrapperStyle={{ justifyContent: "flex-start" }}
            />

            <View>
              <Body1 style={styles.desTitle}>Service Description</Body1>
              <FlatList
                key="serviceDescription"   // Add a unique key
                data={cleaner?.serviceDescription || []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.desItem}>
                    <View style={styles.square} />
                    <Body2 style={styles.cleanerDes}>{item.details}</Body2>
                  </View>
                )}
                contentContainerStyle={{ paddingVertical: 5 }}
              />
              <TouchableOpacity>
                <Body2 style={styles.seeMoreBtn}>See More</Body2>
              </TouchableOpacity>
            </View>
            {/* Reviews Section */}
            <View style={{ marginTop: 20 }}>
              <Body1 style={styles.desTitle}>Reviews</Body1>

              <FlatList
                key="reviews"
                data={cleaner?.reviews || []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.reviewCard}>
                    {/* Top row: image, name, date */}
                    <View style={styles.reviewHeader}>
                      <View style={styles.reviewRow}>
                        <Image
                          source={{ uri: item.image }}
                          style={styles.reviewImg}
                        />
                        <View style={{ marginLeft: 10 }}>
                          <Body2 style={styles.reviewName}>{item.customer}</Body2>
                          <Body2 style={styles.reviewDate}>{item.date}</Body2>
                        </View>
                      </View>
                    </View>

                    {/* Review text */}
                    <Body2 style={styles.reviewComment}>{item.comment}</Body2>
                  </View>
                )}
                contentContainerStyle={{ paddingVertical: 5 }}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },

  contentWrapper: {
    flex: 1,
    margin: "2.5%",
  },

  cleanerInfoWrapper: {
    marginTop: 25,
    marginLeft: 10
  },

  nameText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.SECONDARY,
  },
  cleanerEmail: {
    fontSize: 12,
    fontWeight: "400",
    color: Colors.TEXT_COLOR
  },
  workType: {
    borderWidth: 1,
    borderColor: "#CACACB",
    padding: 5,
    borderRadius: 12,
    // marginHorizontal:5,
    marginRight: 10,
    marginTop: 10
  },
  desTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 15
  },
  desItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },

  square: {
    width: 6,
    height: 6,
    backgroundColor: Colors.TEXT_COLOR,
    marginRight: 4,
    borderRadius: 1,
  },

  cleanerDes: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.TEXT_COLOR
  },
  seeMoreBtn: {
    color: Colors.PRIMARY,
    textDecorationLine: "underline",
    fontWeight: "600",
    fontSize: 12,
    marginTop: 10
  },

  // Review section
  reviewCard: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    // No shadow
  },

  reviewRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  reviewImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  reviewName: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.SECONDARY,
  },

  reviewDate: {
    fontSize: 12,
    color: Colors.TEXT_COLOR,
  },

  reviewComment: {
    fontSize: 14,
    color: Colors.TEXT_COLOR,
    marginTop: 5,
  },


});
