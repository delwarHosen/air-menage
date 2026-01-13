import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../assets/Colors';
import AllJobs from '../../../components/AllJobs/AllJobs';
import { Body2, H4 } from '../../../components/typo/typography';
import { AllJobsData } from '../../../store/ALLjobData';

import { useTranslation } from "react-i18next"; // localization hook

export default function Jobs() {
  const [activeTab, setActiveTab] = useState("all");
  const { t } = useTranslation();

  const getFilteredData = () => {
    if (activeTab === "all") return AllJobsData;
    if (activeTab === "accept") return AllJobsData.filter(item => item.status === "Accept");
    if (activeTab === "progress") return AllJobsData.filter(item => item.status === "InProgress");
    return AllJobsData;
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={[styles.jobButton, activeTab === "all" && styles.activeButton]}
          onPress={() => setActiveTab("all")}
        >
          <Body2 style={[styles.buttonText, activeTab === "all" && styles.activeText]}>
            {t("jobs.all")}
          </Body2>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.jobButton, activeTab === "accept" && styles.activeButton]}
          onPress={() => setActiveTab("accept")}
        >
          <Body2 style={[styles.buttonText, activeTab === "accept" && styles.activeText]}>
            {t("jobs.accept")}
          </Body2>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.jobButton, activeTab === "progress" && styles.activeButton]}
          onPress={() => setActiveTab("progress")}
        >
          <Body2 style={[styles.buttonText, activeTab === "progress" && styles.activeText]}>
            {t("jobs.progress")}
          </Body2>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <View>
          <H4 style={{ margin: 20 }}>{t("jobs.urgent")}</H4>
        </View>
        <AllJobs data={getFilteredData()} activeTab={activeTab} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    marginTop: 15,

  },
  buttonSection: {
    flexDirection: "row",
    gap: 17,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "#737373",
    paddingBottom: 15,
    marginHorizontal: "2.5%"
  },
  jobButton: {
    width: "28%",
    minWidth: 94,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  buttonText: {
    textAlign: "center",
  },
  activeButton: {
    backgroundColor: "#3F3F3F",
    borderColor: "#3F3F3F",
  },
  activeText: {
    color: "#FFFFFF",
  }
});
