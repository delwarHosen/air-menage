import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
            <Text style={styles.headerTitle}>Hello, Theo!</Text>
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
              <Text style={[
                styles.tabText,
                activeTab === 'pending' ? styles.activeTabText : styles.inactiveTabText
              ]}>
                Pending
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.tabButton,
                activeTab === 'confirm' ? styles.activeTab : styles.inactiveTab
              ]}
              onPress={() => setActiveTab('confirm')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'confirm' ? styles.activeTabText : styles.inactiveTabText
              ]}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content Display */}
          <View style={styles.contentBody}>
            {activeTab === 'pending' ? (
              <Text>Showing Pending List...</Text>
            ) : (
              <Text>Showing Confirmed List...</Text>
            )}
          </View>

          <View style={styles.content}>
            <Text style={styles.contentHeader}>No Request ...yet!</Text>
            <Text style={{textAlign:"center"}}>Stay up-date- with the latest listings that match what youreyou’re looking for.</Text>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  addIcon: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  // --- New Tab Styles ---
  tabWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10, // বাটন দুটির মাঝখানের গ্যাপ
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,                // দুটি বাটন সমান জায়গা নিবে
    height: 34,             // Fixed Height 34px
    borderRadius: 4,        // Radius 4px
    borderWidth: 1,         // Border 1px
    justifyContent: 'center',
    alignItems: 'center',
    // আপনার দেওয়া Padding 138px অনেক বড়, তাই টেক্সট সেন্টার করা হয়েছে
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
    fontSize: 14,
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
    fontSize: 20,
    fontWeight: "600",
    textAlign:"center",
    marginBottom:10
  }
});