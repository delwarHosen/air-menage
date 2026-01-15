import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../../assets/Colors";
import { BackArrowIcon, DotIcon } from "../../assets/icons/Icons";
import { Body2, H4 } from "../../components/typo/typography";
import { IMAGE_CONSTANTS } from "../../constants/image.index";

export default function IdentityVerificationBanner2() {
    const router = useRouter();
    const { t } = useTranslation();

    const handleTakePhoto = () => {
        router.push('./scan-nid-front');
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <BackArrowIcon style={{ height: 32, width: 30 }} />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Image
                    source={IMAGE_CONSTANTS.verificationBanner1}
                    style={styles.image}
                    contentFit="contain"
                />

                <H4 style={styles.title}>
                    {t("identityVerificationStep2.title")}
                </H4>

                <View style={styles.description}>
                    <View style={styles.descriptionText}>
                        <DotIcon />
                        <Body2>
                            {t("identityVerificationStep2.rules.notExpired")}
                        </Body2>
                    </View>

                    <View style={styles.descriptionText}>
                        <DotIcon />
                        <Body2>
                            {t("identityVerificationStep2.rules.clearPhoto")}
                        </Body2>
                    </View>

                    <View style={styles.descriptionText}>
                        <DotIcon />
                        <Body2>
                            {t("identityVerificationStep2.rules.goodLighting")}
                        </Body2>
                    </View>
                </View>
            </View>

            {/* Bottom Button */}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity
                    onPress={handleTakePhoto}
                    style={styles.button}>
                    <Body2 style={styles.buttonText}>
                        {t("identityVerificationStep2.takePhoto")}
                    </Body2>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
        position: "relative",
    },

    backBtn: {
        zIndex: 1,
    },



    content: {
        flex: 1,
        paddingHorizontal: "5%",
    },

    image: {
        width: "70%",
        height: "50%",
        alignSelf: "center",
        // marginBottom: 24,
    },

    title: {
        color: Colors.SECONDARY,
        textAlign: "start",
        marginBottom: 24,
    },

    description: {
        marginBottom: 24,
    },

    descriptionText: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 10
    },

    bottomButtonContainer: {
        paddingHorizontal: "5%",
        paddingBottom: 20,
    },

    button: {
        backgroundColor: Colors.PRIMARY,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        gap: 8,
        borderRadius: 30,
        padding: 12,
    },

    buttonText: {
        color: "#FFFFFF",
    },
});


