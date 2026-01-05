import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";

import { useRouter } from "expo-router";
import { AddIcon } from "../../../assets/icons/Icons";
import { Body1, Body2, H4 } from "../../../components/typo/typography";

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("pending");
  const { t } = useTranslation();

  return (
    < >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <H4>
              {t("host_home.header.greeting", { name: "Theo" })}
            </H4>

            <TouchableOpacity
            style={styles.addIcon}
            onPress={()=>router.navigate("/host/addProperty")}
            >
              <AddIcon/>
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabWrapper}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.tabButton,
                activeTab === "pending"
                  ? styles.activeTab
                  : styles.inactiveTab
              ]}
              onPress={() => setActiveTab("pending")}
            >
              <Body2
                style={[
                  styles.tabText,
                  activeTab === "pending"
                    ? styles.activeTabText
                    : styles.inactiveTabText
                ]}
              >
                {t("host_home.tabs.pending")}
              </Body2>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.tabButton,
                activeTab === "confirm"
                  ? styles.activeTab
                  : styles.inactiveTab
              ]}
              onPress={() => setActiveTab("confirm")}
            >
              <Body2
                style={[
                  styles.tabText,
                  activeTab === "confirm"
                    ? styles.activeTabText
                    : styles.inactiveTabText
                ]}
              >
                {t("host_home.tabs.confirm")}
              </Body2>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          <View style={styles.contentBody}>
            {activeTab === "pending" ? (
              <Body2>{t("host_home.content.pending")}</Body2>
            ) : (
              <Body1>{t("host_home.content.confirm")}</Body1>
            )}
          </View>

          {/* Empty State */}
          <View style={styles.content}>
            <H4 style={styles.contentHeader}>
              {t("host_home.empty.title")}
            </H4>

            <Body2 style={{ textAlign: "center" }}>
              {t("host_home.empty.description")}
            </Body2>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    paddingHorizontal: "5%"
  },
  scrollContent: {
    flexGrow: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },

  addIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  // --- New Tab Styles ---
  tabWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    height: 34,            
    borderRadius: 4,        
    borderWidth: 1,       
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6
  },
  activeTab: {
    backgroundColor: '#3F3F3F', 
    borderColor: '#3F3F3F',
  },
  inactiveTab: {
    backgroundColor: '#F2F2F2', 
    borderColor: '#E5E7EB',
  },
  tabText: {
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  inactiveTabText: {
    color: '#4B5563',
  },
  contentBody: {
    marginTop: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  contentHeader: {
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10
  }
});