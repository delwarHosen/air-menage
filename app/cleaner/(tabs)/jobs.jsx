import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../assets/Colors';
import AllJobs from '../../../components/AllJobs/AllJobs';
import { Body2 } from '../../../components/typo/typography';
import { AllJobsData } from '../../../store/ALLjobData';

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
        {["all", "accept", "progress"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.jobButton, activeTab === tab && styles.activeButton]}
            onPress={() => setActiveTab(tab)}
          >
            <Body2 style={[styles.buttonText, activeTab === tab && styles.activeText]}>
              {t(`jobs.${tab}`)}
            </Body2>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flex: 1 }}>
        <AllJobs
          data={getFilteredData()}
          activeTab={activeTab}
          headerText={t("jobs.urgent")} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingTop: 15,
  },
  buttonSection: {
    flexDirection: "row",
    gap: 17,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "#737373",
    paddingBottom: 15,
    paddingHorizontal: "5%",
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
  buttonText: { textAlign: "center" },
  activeButton: { backgroundColor: "#3F3F3F", borderColor: "#3F3F3F" },
  activeText: { color: "#FFFFFF" }
});