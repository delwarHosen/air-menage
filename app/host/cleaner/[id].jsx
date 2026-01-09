import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";

import { Colors } from "../../../assets/Colors";
import Heading from "../../../components/Heading/Heading";
import { Body1, Body2 } from "../../../components/typo/typography";
import { cleaners } from "../../../store/Cleaners";
import CleanerDetails from "./CleanerDetails";


export default function Cleaner() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();

  const cleaner = cleaners.find((item) => item.id.toString() === id);

  if (!cleaner) {
    return <Body2 style={{ textAlign: 'center', marginTop: 20 }}>{t("cleaner_details.notFound")}</Body2>;
  }

  const renderHeader = () => (
    <View style={styles.contentWrapper}>
      <CleanerDetails cleaner={cleaner} />

      <View style={styles.cleanerInfoWrapper}>
        <Body1 style={styles.nameText}>{cleaner.name},</Body1>
        <Body2 style={styles.cleanerEmail}>{cleaner.email}</Body2>

        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}>
          {cleaner?.workType?.map((item, index) => (
            <Body2 key={index} style={styles.workType}>
              {item.type}
            </Body2>
          ))}
        </View>

        <Body1 style={styles.desTitle}>{t("cleaner_details.serviceDescription")}</Body1>
        {cleaner?.serviceDescription?.map((item, index) => (
          <View key={index} style={styles.desItem}>
            <View style={styles.square} />
            <Body2 style={styles.cleanerDes}>{item.details}</Body2>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: 'white' }}
    >
      <View style={{ marginHorizontal: "3%" }}>
        <Heading title={t("cleaner_details.title")} />
      </View>

      <FlatList
        data={cleaner?.reviews ? cleaner.reviews.slice(0, 3) : []}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
              <View style={styles.reviewRow}>
                <Image source={{ uri: item.image }} style={styles.reviewImg} />
                <View style={{ marginLeft: 10 }}>
                  <Body2 style={styles.reviewName}>{item.customer}</Body2>
                  <Body2 style={styles.reviewDate}>{item.date}</Body2>
                </View>
              </View>

              {cleaner?.reviews?.length > 1 && (
                <TouchableOpacity onPress={() => router.push("/host/all-reviews")}>
                  <Body2 style={styles.seeMoreBtn}>{t("cleaner_details.seeMore")}</Body2>
                </TouchableOpacity>
              )}
            </View>
            <Body2 style={styles.reviewComment}>{item.comment}</Body2>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flatListContent: {
    paddingBottom: 30,
    paddingHorizontal: "3%",
  },
  contentWrapper: {
    flex: 1,
    marginBottom: 20,
  },
  cleanerInfoWrapper: {
    marginTop: 25,
    paddingHorizontal: 10,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.SECONDARY,
  },
  cleanerEmail: {
    fontSize: 12,
    color: Colors.TEXT_COLOR,
  },
  workType: {
    borderWidth: 1,
    borderColor: "#CACACB",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
    marginTop: 10,
    fontSize: 12,
  },
  desTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
    marginBottom: 5,
  },
  desItem: {
    flexDirection: "row",
    alignItems: "flex-start", 
    marginVertical: 4,
  },
  square: {
    width: 6,
    height: 6,
    backgroundColor: Colors.TEXT_COLOR,
    marginRight: 8,
    marginTop: 6, 
    borderRadius: 1,
  },
  cleanerDes: {
    flex: 1, 
    fontSize: 14,
    color: Colors.TEXT_COLOR,
  },
  reviewCard: {
    // backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#EBEBEE",
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
  },
  reviewRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  reviewName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.SECONDARY,
  },
  reviewDate: {
    fontSize: 11,
    color: Colors.TEXT_COLOR,
  },
  seeMoreBtn: {
    color: Colors.PRIMARY,
    textDecorationLine: "underline",
    fontWeight: "600",
    fontSize: 12,
  },
  reviewComment: {
    fontSize: 13,
    color: "#4B5563",
    marginTop: 10,
    lineHeight: 18,
  },
});