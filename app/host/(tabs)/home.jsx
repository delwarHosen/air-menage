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
import AllCleaningRequests from '../../../components/AllCleaningRequests/AllCleaningRequests';
import HostTabs from "../../../components/HostTabs/HostTabs";
import { Body2, Caption, H4 } from "../../../components/typo/typography";
import { useGetCleaningRequestsQuery } from '../../../redux/services/propertyApi';
import { cleanerDetailsData } from '../../../store/CleanerRequestData';
import { cleaners } from '../../../store/Cleaners';
import CleaningRequest from '../cleaning-request';


export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("pending");
  const { t } = useTranslation();

  const { data: bookings, isLoading, error } = useGetCleaningRequestsQuery();
  console.log("Booking from home", bookings);


  const displayData = cleanerDetailsData.filter((item) => {
    if (activeTab === "pending") {
      return item.status.toLowerCase() === "pending";
    } else if (activeTab === "confirm") {
      return item.status.toLowerCase() === "completed";
    }
    return true;
  });


  const renderCleanerItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => router.push(`/host/cleaner/${item?.id}`)}
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
        <View style={{ backgroundColor: 'white', paddingBottom: 0 }}>
          <View style={styles.header}>
            <H4>{t("host_home.header.greeting", { name: "Theo" })}</H4>
            <TouchableOpacity
              style={styles.addIcon}
              onPress={() => router.navigate("/host/addProperty")}
            >
              <AddIcon />
            </TouchableOpacity>
          </View>

          {/* Host tab */}

          <HostTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </View>
      );
    } else if (index === 1) {
      return (
        <View style={styles.listContainer}>
          {isLoading ? (
            <FlatList
              data={[1, 2, 3, 4, 5]}
              renderItem={() => <CleanerSkeleton />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12 }}
              keyExtractor={(item) => item.toString()}
            />
          ) : cleaners.length === 0 ? (
            <View style={styles.content}>
              <H4 style={styles.contentHeader}>{t("host_home.empty.title")}</H4>
              <Body2 style={{ textAlign: "center" }}>
                {t("host_home.empty.description")}
              </Body2>
            </View>
          ) : (
            <FlatList
              data={cleaners}
              renderItem={renderCleanerItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ gap: 12 }}
            />
          )}
        </View>
      );
    } else if (index === 2) {
      return (
        <View style={{ marginVertical: 10 }}>
          {activeTab === "pending" ? (
            <CleaningRequest
              data={displayData}
              allData={cleanerDetailsData}
              activeTab={activeTab}
              isLoading={isLoading}
            />
          ) : (

            <View>
              <AllCleaningRequests
                hiddenWorkCompletedButton={true}
              />
            </View>
          )}
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


const CleanerSkeleton = () => {
  <View style={styles.profileButton}>
    <View style={{ position: "relative" }}>
      <View style={[styles.gradientBorder, { backgroundColor: "#E1E9EE'" }]}>
        <View style={styles.whiteInnerCircle}>
          <View style={{ width: "100%", height: "100%", backgroundColor: "'#F2F2F2'" }} />
        </View>
      </View>
    </View>
    <View style={{
      width: 50,
      height: 10,
      backgroundColor: '#E1E9EE',
      marginTop: 8,
      borderRadius: 4
    }} />
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "4%",
    backgroundColor: "#FAFAFA",
  },
  scrollContent: {
    paddingBottom: 40
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 25
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
    // marginBottom: 10,
    marginTop: 10,
  },
  content: {
    alignItems: "center",
    paddingVertical: 100,
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