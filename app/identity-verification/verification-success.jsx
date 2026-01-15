import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from 'react-redux';
import { Colors } from "../../assets/Colors";
import { BackArrowIcon } from "../../assets/icons/Icons";
import { Body2, H3 } from "../../components/typo/typography";
import { IMAGE_CONSTANTS } from "../../constants/image.index";

export default function VerificationSuccess() {
    const router = useRouter();
    const { t } = useTranslation();

    const selectedRole = useSelector((state) => state.role.selectedRole);

    const handleDone = () => {
        if (selectedRole === "host") {
            router.replace("/host/(tabs)/menu");
        } else {
            router.replace("/cleaner/(tabs)/menu");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => router.back()}
                style={{ marginHorizontal: 20, marginTop: 10 }}>
                <BackArrowIcon style={{ height: 32, width: 30 }} />
            </TouchableOpacity>

            {/* Center Image */}
            <Image
                source={IMAGE_CONSTANTS.verifySeccessImg}
                style={styles.image}
                contentFit="contain"
            />

            {/* Heading */}
            <H3 style={styles.title}>
                {t("verificationSuccess.title")}
            </H3>

            {/* Description */}
            <Body2 style={styles.description}>
                {t("verificationSuccess.description")}
            </Body2>

            {/* Button */}
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity
                    onPress={handleDone}
                    style={styles.button}>
                    <Body2 style={styles.buttonText}>
                        {t("verificationSuccess.done")}
                    </Body2>
                </TouchableOpacity>
            </View>
        </View>
    );
}


/* ---------- Styles ---------- */
const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: "2.5%",
        flex: 1,
        backgroundColor: '#fff'
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
        marginHorizontal: "5%",
    },

    button: {
        backgroundColor: "#1D1D1D",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "50%",
        gap: 8,
        marginTop: 16,
        borderRadius: 30,
        padding: 12,
    },

    buttonText: {
        color: "#FFFFFF",
    },
});