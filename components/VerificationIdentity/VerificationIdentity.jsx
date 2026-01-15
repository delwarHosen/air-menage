import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Colors } from "../../assets/Colors";
import { API_TrendingIcon, BackArrowIcon, DepositeIcon, PrimaryTickMarkIcon, RightArrowIcon, SpotTrendingIcon, WithDRawIcon, } from "../../assets/icons/Icons";
import { Body2, H4 } from "../../components/typo/typography";
import { IMAGE_CONSTANTS } from "../../constants/image.index";


export default function VerificationIdentity() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => router.back()}
                style={{ marginHorizontal: 20, marginTop: 10 }}>
                <BackArrowIcon style={{ height: 32, width: 30 }} />
            </TouchableOpacity>
            {/* Center Image */}
            <Image
                source={IMAGE_CONSTANTS.verificationBanner1}
                style={styles.image}
                contentFit="contain"
            />

            {/* Heading */}
            <H4 style={styles.title}>Identity Verification</H4>

            {/* Description */}
            <Body2 style={styles.description}>
                Complete identity verification to increase account security and get access to more services.
            </Body2>

            {/* Button */}
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity
                onPress={()=>router.push("./cleaner/identity-verification-banner2")}
                style={styles.button}>
                    <Body2 style={styles.buttonText}>Get verified</Body2>
                    <RightArrowIcon />
                </TouchableOpacity>
            </View>

            {/* White Card */}
            <View style={styles.card}>

                {/* Card Heading */}
                <Body2 style={styles.description}>
                    Unlock limits and features after get verified
                </Body2>

                {/* Feature Rows */}
                <FeatureRow
                    title="Spot trading"
                    Icon={<SpotTrendingIcon />}
                />
                <FeatureRow
                    title="API trading"
                    Icon={<API_TrendingIcon />}
                />
                <FeatureRow
                    title="Deposit & Withdraw"
                    Icon={<DepositeIcon />}
                />
                <View style={styles.row}>
                    <View style={styles.rowLeft}>
                        <WithDRawIcon />
                        <Body2 style={styles.rowText}>Withdraw</Body2>
                    </View>
                    <Body2 style={styles.withdrawText}>500,000 HKD / 24H</Body2>
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
        paddingHorizontal: "2.5%",
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
        marginBottom:10
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