import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Body2 } from "../typo/typography";

export default function HostTabs({ activeTab, setActiveTab }) {
    const { t } = useTranslation();
    return (
        <View style={styles.tabWrapper}>
            <TouchableOpacity
                style={[styles.tabButton, activeTab === "pending" && styles.activeTab]}
                onPress={() => setActiveTab("pending")}
            >
                <Body2 style={[styles.tabText, activeTab === "pending" && styles.activeTabText]}>
                    {t("host_home.tabs.pending")}
                </Body2>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tabButton, activeTab === "confirm" && styles.activeTab]}
                onPress={() => setActiveTab("confirm")}
            >
                <Body2 style={[styles.tabText, activeTab === "confirm" && styles.activeTabText]}>
                    {t("host_home.tabs.confirm")}
                </Body2>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({



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