import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../../assets/Colors";
import { BlueVerifyIcon } from "../../../assets/icons/Icons";
import { Body2 } from "../../../components/typo/typography";

export default function CleanerDetails({ cleaner }) {
    const { t } = useTranslation();

    return (
        <View style={styles.profileCardRow}>
            {/* Profile Info */}
            <View style={styles.profileInfo}>

                <LinearGradient
                    colors={['#FAFF0A', '#FEAD4E', '#ED1B1B', '#FB1274', '#A61D5F', '#F109DA']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientBorder}
                >

                    <View style={styles.whiteInnerCircle}>
                        <Image
                            source={{ uri: cleaner.profileImg }}
                            style={styles.profileImage}
                        />
                    </View>


                    <View style={styles.verifyBadge}>
                        <BlueVerifyIcon />
                    </View>
                </LinearGradient>

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
        padding: 16,
        borderRadius: 8,
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR
    },

    /* Profile Info */
    profileInfo: {
        flex: 1,
        alignItems: "center",
    },

    gradientBorder: {
        height: 98, 
        width: 98,
        borderRadius: 49,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', 
    },

    whiteInnerCircle: {
        height: 94, 
        width: 94,
        borderRadius: 47,
        // backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },

    profileImage: {
        height: 92, 
        width: 92,
        borderRadius: 45,
    },

    verifyBadge: {
        position: "absolute",
        bottom: 8,
        right: 0,
        height: 24,
        width: 24,
        borderRadius: 12,
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