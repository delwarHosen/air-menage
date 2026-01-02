import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Body1, Body2, H4 } from "../../../components/typo/typography";

export default function Home() {
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <View style={styles.header}>
            <H4>Hello, Theo!</H4>
            <View style={styles.addIcon}>
              <AntDesign name="plus" size={20} color={"#4B5563"} />
            </View>
          </View>

          {/* --- Separated Tab Buttons --- */}
          <View style={styles.tabWrapper}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.tabButton,
                activeTab === 'pending' ? styles.activeTab : styles.inactiveTab
              ]}
              onPress={() => setActiveTab('pending')}
            >
              <Body2 style={[
                styles.tabText,
                activeTab === 'pending' ? styles.activeTabText : styles.inactiveTabText
              ]}>
                Pending
              </Body2>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.tabButton,
                activeTab === 'confirm' ? styles.activeTab : styles.inactiveTab
              ]}
              onPress={() => setActiveTab('confirm')}
            >
              <Body2 style={[
                styles.tabText,
                activeTab === 'confirm' ? styles.activeTabText : styles.inactiveTabText
              ]}>
                Confirm
              </Body2>
            </TouchableOpacity>
          </View>

          {/* Tab Content Display */}
          <View style={styles.contentBody}>
            {activeTab === 'pending' ? (
              <Body2>Showing Pending List...</Body2>
            ) : (
              <Body1>Showing Confirmed List...</Body1>
            )}
          </View>

          <View style={styles.content}>
            <H4 style={styles.contentHeader}>No Request ...yet!</H4>
            <Body2 style={{ textAlign: "center" }}>Stay up-date- with the latest listings that match what youreyou’re looking for.</Body2>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
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
    color: "#4B5563",
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
    height: 34,             // Fixed Height 34px
    borderRadius: 4,        // Radius 4px
    borderWidth: 1,         // Border 1px
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6
  },
  activeTab: {
    backgroundColor: '#3F3F3F', // Active tab color
    borderColor: '#3F3F3F',
  },
  inactiveTab: {
    backgroundColor: '#F2F2F2', // Default Tab bg
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