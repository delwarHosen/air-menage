import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Colors } from "../../../assets/Colors";
import { BlueVerifyIcon } from "../../../assets/icons/Icons";
import { Body2 } from "../../../components/typo/typography";

export default function CleanerDetails({ cleaner }) {
    const { t } = useTranslation();

    return (
        <View style={styles.profileCardRow}>
            {/* Profile Info */}
            <View style={styles.profileInfo}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: cleaner.profileImg }}
                        style={styles.profileImage}
                    />
                    <View style={styles.verifyBadge}>
                        <BlueVerifyIcon/>
                    </View>
                </View>

                <Body2 style={styles.cleanerName}>{cleaner.name}</Body2>
                <Body2 style={styles.cleanerEmail}>
                    {cleaner.location.city}, {cleaner.location.country}
                </Body2>
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <Body2 style={styles.statValue}>{cleaner.workManage}</Body2>
                    <Body2 style={styles.statTitle}>{t("cleaner_details.workManaged")}</Body2>
                    <View style={styles.underline} />
                </View>

                <View style={styles.statItem}>
                    <Body2 style={styles.statValue}>{cleaner.evaluation}</Body2>
                    <Body2 style={styles.statTitle}>{t("cleaner_details.evaluation")}</Body2>
                    <View style={styles.underline} />
                </View>

                <View style={styles.statItem}>
                    <Body2 style={styles.statValue}>{cleaner.overallScore}</Body2>
                    <Body2 style={styles.statTitle}>{t("cleaner_details.overallScore")}</Body2>
                    <View style={styles.underline} />
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    profileCardRow: {
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#ffffff",
        padding: 16,
        borderRadius: 14,
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },

    /* Profile Info */
    profileInfo: {
        flex: 1,
        alignItems: "center",
    },

    imageContainer: {
        position: "relative",
        height: 90,
        width: 90,
        marginBottom: 10,
    },

    profileImage: {
        height: 90,
        width: 90,
        borderRadius: 45,
        borderWidth: 1,
        borderColor: "#ddd",
    },

    verifyBadge: {
        position: "absolute",
        bottom: 2,
        right: 2,
        backgroundColor: "#fff",
        borderRadius: 12,
        height: 24,
        width: 24,
        justifyContent: "center",
        alignItems: "center",
    },

    cleanerName: {
        fontSize: 18,
        fontWeight: "500",
        color: Colors.TEXT_COLOR,
        marginTop: 6,
        textAlign: "center",
    },

    cleanerEmail: {
        fontSize: 15,
        color: Colors.TEXT_COLOR,
        marginTop: 2,
        textAlign: "center",
    },

    /* Stats Row */
    statsRow: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
    },

    statItem: {
        alignItems: "center",
        marginBottom: 20,
    },

    statValue: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.TEXT_COLOR,
        textAlign: "center",
    },

    statTitle: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 2,
        textAlign: "center",
    },

    underline: {
        width: "60%",
        height: 2,
        backgroundColor: Colors.PRIMARY,
        marginTop: 6,
        borderRadius: 1,
    },
})