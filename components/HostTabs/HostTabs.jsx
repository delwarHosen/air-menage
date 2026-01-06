import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Body2 } from "../typo/typography";

export default function HostTabs({ activeTab, setActiveTab}) {
    const { t } = useTranslation();
    // const [activeTab, setActiveTab] = useState("pending");

    return (
        <>
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
                    <Body2>{t("host_home.content.confirm")}</Body2>
                )}
            </View>
        </>
    );
}



const styles = StyleSheet.create({


    // --- New Tab Styles ---
    tabWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 20,
    },
    tabButton: {
        flex: 1,
        height: 44,
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
   
});