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
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../assets/Colors";
import { CalenderIconView } from "../../../assets/icons/Icons";
import { Body2, Caption, H5, H6 } from "../../../components/typo/typography";
import { calenderCardData } from "../../../store/CalenderCard";

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();

  const renderItem = ({ item }) => (

    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.propertyCard}
      onPress={() => router.push("/host/calender-property")}
    >
      <Image
        source={item.Image}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />

      <View style={styles.textContainer}>
        <H6 style={styles.title} numberOfLines={1}>{String(item.Title)}</H6>
        <Body2 style={styles.host}>{String(item.HostName)}</Body2>
        <Caption>{String(item.Location)}</Caption>
      </View>

      <View style={styles.iconWrapper}>
        <CalenderIconView />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.mainContainer}
      >
        <FlatList
          data={calenderCardData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          // Header section (Title) ekhane thakbe
          ListHeaderComponent={() => (
            <View style={styles.headerContainer}>
              <H5>{t("tabs.calender")}</H5>
            </View>
          )}
          // List-er side padding ekhane hobe
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  listContent: {
    paddingHorizontal: "2.5%",
    paddingBottom: 40,
  },
  propertyCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    marginVertical: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR || "#E5E5E5",
    borderRadius: 12,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 2,
  },
  host: {
    marginBottom: 2,
    color: "#666",
  },
  iconWrapper: {
    paddingLeft: 10,
  }
});