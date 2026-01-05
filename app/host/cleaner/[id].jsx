import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
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
    return (
      <>
        <Body2>{t("cleaner_details.notFound")}</Body2>
      </>
    );
  }

  const renderHeader = () => (
    <View style={styles.contentWrapper}>
      <CleanerDetails cleaner={cleaner} />

      <View style={styles.cleanerInfoWrapper}>
        <Body1 style={styles.nameText}>{cleaner.name}, 26</Body1>
        <Body2 style={styles.cleanerEmail}>{cleaner.email}</Body2>

        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
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

        <TouchableOpacity>
          <Body2 style={styles.seeMoreBtn}>{t("cleaner_details.seeMore")}</Body2>
        </TouchableOpacity>

        <Body1 style={styles.desTitle}>{t("cleaner_details.reviews")}</Body1>
      </View>
    </View>
  );

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
       <View style={{marginHorizontal:"3%"}}>
         <Heading title={t("cleaner_details.title")} />
       </View>

        <FlatList
          data={cleaner?.reviews || []}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }) => (
            <View style={styles.reviewCard}>
              <View style={styles.reviewRow}>
                <Image source={{ uri: item.image }} style={styles.reviewImg} />
                <View style={{ marginLeft: 10 }}>
                  <Body2 style={styles.reviewName}>{item.customer}</Body2>
                  <Body2 style={styles.reviewDate}>{item.date}</Body2>
                </View>
              </View>
              <Body2 style={styles.reviewComment}>{item.comment}</Body2>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </>
  );
}


const styles = StyleSheet.create({
 
  flatListContent: {
    paddingBottom: 30,
    paddingHorizontal: "3%",
  },
  contentWrapper: {
    flex: 1,
  },
  cleanerInfoWrapper: {
    marginTop: 25,
    marginLeft: 10,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.SECONDARY,
  },
  cleanerEmail: {
    fontSize: 12,
    fontWeight: "400",
    color: Colors.TEXT_COLOR,
  },
  workType: {
    borderWidth: 1,
    borderColor: "#CACACB",
    padding: 5,
    borderRadius: 12,
    marginRight: 10,
    marginTop: 10,
  },
  desTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 15,
  },
  desItem: {
    flexDirection: "row",
    alignItems: "center",
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
    color: Colors.TEXT_COLOR,
  },
  seeMoreBtn: {
    color: Colors.PRIMARY,
    textDecorationLine: "underline",
    fontWeight: "600",
    fontSize: 12,
    marginTop: 10,
  },
  reviewCard: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
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
    color: Colors.SECONDARY,
  },
  reviewDate: {
    fontSize: 12,
    color: Colors.TEXT_COLOR,
  },
  reviewComment: {
    fontSize: 14,
    color: Colors.TEXT_COLOR,
    marginTop: 8,
  },
});