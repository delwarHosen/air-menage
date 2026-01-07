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
import HostTabs from "../../../components/HostTabs/HostTabs";
import { Body2, H4 } from "../../../components/typo/typography";

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
              onPress={() => router.navigate("/host/addProperty")}
            >
              <AddIcon />
            </TouchableOpacity>
          </View>

          {/* Tabs */}

          <HostTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            styles={styles}
          />

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
    paddingHorizontal: "2.5%"
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