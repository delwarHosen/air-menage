import { LinearGradient } from 'expo-linear-gradient';
import { useState } from "react";
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
import { Colors } from "../../../assets/Colors";
import { AddIcon, BlueVerifyIcon } from "../../../assets/icons/Icons";
import HostTabs from "../../../components/HostTabs/HostTabs";
import { Body2, Caption, H4 } from "../../../components/typo/typography";
import { cleanerDetailsData } from '../../../store/CleanerRequestData';
import { cleaners } from '../../../store/Cleaners';
import CleaningRequest from '../cleaning-request';
// 1. Data import korun
// import { cleanerDetailsData } from '../../../store/cleanerDetailsData';

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("pending");
  const { t } = useTranslation();

  // Ashol data (cleanerDetailsData) modify hobe na, shudhu dekhate filter kora hobe
  const displayData = cleanerDetailsData.filter((item) => {
    if (activeTab === "pending") {
      return item.status.toLowerCase() === "pending";
    } else if (activeTab === "confirm") {
      // Tab jodi confirm hoy, tahole Completed status er data dekhabe
      return item.status.toLowerCase() === "completed";
    }
    return true;
  });

  const renderCleanerItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => router.push(`/host/cleaner/${item.id}`)}
        style={styles.profileButton}>
        <View style={{ position: 'relative' }}>
          <LinearGradient
            colors={['#FAFF0A', '#FEAD4E', '#ED1B1B', '#FB1274', '#A61D5F', '#F109DA']}
            style={styles.gradientBorder}
          >
            <View style={styles.whiteInnerCircle}>
              <Image
                source={{ uri: item.profileImg }}
                style={styles.profileImage}
                placeholder="blur"
                transition={1000}
              />
            </View>
          </LinearGradient>
          <View style={styles.verifyBadge}>
            <BlueVerifyIcon />
          </View>
        </View>
        <Caption style={{ color: Colors.SECONDARY, marginTop: 5 }}>
          {item.name}
        </Caption>
      </TouchableOpacity>
    );
  };

  const renderMainItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <View style={{ backgroundColor: 'white', paddingBottom: 5 }}>
          <View style={styles.header}>
            <H4>{t("host_home.header.greeting", { name: "Theo" })}</H4>
            <TouchableOpacity
              style={styles.addIcon}
              onPress={() => router.navigate("/host/addProperty")}
            >
              <AddIcon />
            </TouchableOpacity>
          </View>

          <HostTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </View>
      );
    } else if (index === 1) {
      return (
        <>
          {cleaners.length === 0 ? (
            <View style={styles.content}>
              <H4 style={styles.contentHeader}>{t("host_home.empty.title")}</H4>
              <Body2 style={{ textAlign: "center" }}>
                {t("host_home.empty.description")}
              </Body2>
            </View>
          ) : (
            <View style={styles.listContainer}>
              <FlatList
                data={cleaners}
                renderItem={renderCleanerItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ gap: 12 }}
              />
            </View>
          )}
        </>
      );
    } else if (index === 2) {
      return (
        <View style={{ marginVertical: 10 }}>
          
          <CleaningRequest
            data={displayData}
            allData={cleanerDetailsData}
            activeTab={activeTab}
          />
        </View>
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <FlatList
          data={[{}, {}, {}]}
          renderItem={renderMainItem}
          keyExtractor={(item, index) => `main-${index}`}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          stickyHeaderIndices={[0]}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "2.5%",
    backgroundColor: "#FAFAFA",
  },
  scrollContent: {
    paddingBottom: 40
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  addIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  content: {
    alignItems: "center",
    paddingVertical: 20,
  },
  contentHeader: {
    fontWeight: "600",
    textAlign: "center",
  },
  profileButton: {
    alignItems: "center",
  },
  gradientBorder: {
    height: 64,
    width: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteInnerCircle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  profileImage: {
    height: '100%',
    width: '100%',
    borderRadius: 30,
    contentFit: 'cover',
  },
  verifyBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    height: 18,
    width: 18,
    backgroundColor: 'white',
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
});