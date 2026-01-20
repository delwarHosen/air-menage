import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";


import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

const { width } = Dimensions.get("window");
export default function IdentityVerificationBanner1() {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>

                {/* Header Back Button */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}>
                    <BackArrowIcon style={{ height: 32, width: 30 }} />
                </TouchableOpacity>

                {/* Main Illustration */}
                <Image
                    source={IMAGE_CONSTANTS.verificationBanner1}
                    style={styles.image}
                    contentFit="contain"
                />

                {/* Content Section */}
                <View style={styles.contentContainer}>
                    <H4 style={styles.title}>
                        {t("identityVerification.title")}
                    </H4>

                    <Body2 style={styles.description}>
                        {t("identityVerification.description")}
                    </Body2>

                    {/* Action Button */}
                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                        <TouchableOpacity
                            onPress={() => router.push("./identity-verification-banner2")}
                            style={styles.button}
                            activeOpacity={0.8}>
                            <Body2 style={styles.buttonText}>
                                {t("identityVerification.getVerified")}
                            </Body2>
                            <RightArrowIcon />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Benefit Card */}
                <View style={styles.card}>
                    <Body2 style={styles.unlockText}>
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

                    {/* Withdrawal Row with Specific Value */}
                    <View style={styles.rowNoBorder}>
                        <View style={styles.rowLeft}>
                            <WithDRawIcon />
                            <Body2 style={styles.rowText}>
                                {t("identityVerification.features.withdraw")}
                            </Body2>
                        </View>
                        <Body2 style={styles.withdrawValue}>
                            500,000 HKD / 24H
                        </Body2>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ---------- Feature Row Component ---------- */
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

/* ---------- ---------- */
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
      
        backgroundColor: "#F9F9F9", 
    },
    container: {
        paddingTop: 0,           
        backgroundColor: "#F9F9F9",
        flexGrow: 1,
          paddingHorizontal:"5%",
    },
    backButton: {
        marginLeft: 0,           
        marginTop: 0,           
        paddingVertical: 10,    
    },
    image: {
        width: width * 0.6,
        aspectRatio: 1.6,
        alignSelf: "center",
        marginTop: 5,         
    },
    contentContainer: {
        alignItems: "center",
        marginTop: 0,          
    },
    title: {
        textAlign: "center",
        marginTop: 10,         
        color: Colors.SECONDARY
    },
    description: {
        textAlign: "center",
        marginTop: 5,            
        color: "#1D1D1D66",
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: width < 700 ? "80%" : "70%",
        gap: 8,
        marginTop: 15,          
        borderRadius: 30,
        paddingVertical: 12,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,   
        marginTop: 20,          
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,    
        borderBottomWidth: 1,
        borderBottomColor: "#00000014",
    },
    rowNoBorder: {              
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
    },
    rowLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        flexShrink: 1,
    },
    rowText: {
        color: "#333",
        fontSize: width < 700 ? 13 : 14,
    },
    withdrawValue: {            
        color: Colors.PRIMARY,
        fontSize: width < 700 ? 12 : 14,
        fontWeight: "600"
    },
    unlockText: {
        marginBottom: 8,         
        color: "#1D1D1D66",
    }
});