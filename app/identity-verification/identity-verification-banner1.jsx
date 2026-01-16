import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../../assets/Colors";
import {
    API_TrendingIcon,
    BackArrowIcon,
    DepositeIcon,
    PrimaryTickMarkIcon,
    RightArrowIcon,
    SpotTrendingIcon,
    WithDRawIcon
} from "../../assets/icons/Icons";
import { Body2, H4 } from "../../components/typo/typography";
import { IMAGE_CONSTANTS } from "../../constants/image.index";

export default function IdentityVerificationBanner1() {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => router.back()}
                style={{ marginHorizontal: 20, marginTop: 10 }}>
                <BackArrowIcon style={{ height: 32, width: 30 }} />
            </TouchableOpacity>

            {/* Image */}
            <Image
                source={IMAGE_CONSTANTS.verificationBanner1}
                style={styles.image}
                contentFit="contain"
            />

            {/* Title */}
            <H4 style={styles.title}>
                {t("identityVerification.title")}
            </H4>

            {/* Description */}
            <Body2 style={styles.description}>
                {t("identityVerification.description")}
            </Body2>

            {/* Button */}
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity
                    onPress={() => router.push("./identity-verification-banner2")}
                    style={styles.button}>
                    <Body2 style={styles.buttonText}>
                        {t("identityVerification.getVerified")}
                    </Body2>
                    <RightArrowIcon />
                </TouchableOpacity>
            </View>

            {/* Card */}
            <View style={styles.card}>
                <Body2 style={styles.description}>
                    {t("identityVerification.unlockText")}
                </Body2>

                <FeatureRow
                    title={t("identityVerification.features.spotTrading")}
                    Icon={<SpotTrendingIcon />}
                />
                <FeatureRow
                    title={t("identityVerification.features.apiTrading")}
                    Icon={<API_TrendingIcon />}
                />
                <FeatureRow
                    title={t("identityVerification.features.depositWithdraw")}
                    Icon={<DepositeIcon />}
                />

                <View style={styles.row}>
                    <View style={styles.rowLeft}>
                        <WithDRawIcon />
                        <Body2 style={styles.rowText}>
                            {t("identityVerification.features.withdraw")}
                        </Body2>
                    </View>
                    <Body2 style={styles.withdrawText}>
                        500,000 HKD / 24H
                    </Body2>
                </View>
            </View>
        </View>
    );
}

/* ---------- Feature Row ---------- */
function FeatureRow({ title, Icon }) {
    return (
        <View style={styles.row}>
            <View style={styles.rowLeft}>
                {Icon}
                <Body2 style={styles.rowText}>{title}</Body2>
            </View>
            <PrimaryTickMarkIcon />
        </View>
    );
}


/* ---------- Styles ---------- */
const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        paddingHorizontal: "4%",
        backgroundColor: ""
    },

    image: {
        width: 240,
        height: 144,
        alignSelf: "center",
        marginTop: 10,
    },

    title: {
        textAlign: "center",
        marginTop: 25,
        color: Colors.SECONDARY
    },

    description: {
        textAlign: "center",
        marginTop: 10,
        color: "#1D1D1D66",

    },

    button: {
        backgroundColor: Colors.PRIMARY,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "60%",
        gap: 8,
        marginTop: 16,
        borderRadius: 30,
        padding: 12,

    },

    buttonText: {
        color: "#FFFFFF",
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 16,
        marginTop: 40,
    },

    cardTitle: {
        marginBottom: 12,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#00000014",
        marginBottom: 10
    },

    rowLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    rowText: {
        color: "",
    },
    withdrawText: {
        color: Colors.PRIMARY
    }
});