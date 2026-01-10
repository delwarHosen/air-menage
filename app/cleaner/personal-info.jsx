import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";

import { Colors } from "../../assets/Colors";
import { IMAGE_COMPONENTS } from "../../assets/image.index";
import Heading from "../../components/Heading/Heading";
import { Body2, ButtonText, Caption } from "../../components/typo/typography";
// import { IMAGE_CONSTANTS } from "../../constants/image.index";

export default function PersonalInfo() {
    const router = useRouter();
    const { t } = useTranslation();

    const fields = [
        { id: "1", key: "fullName", value: "John Doe" },
        { id: "2", key: "age", value: "20" },
        { id: "3", key: "email", value: "johndoe@example.com" },
        { id: "4", key: "verification_Your_SIRET_Number", value: "5251521326" },
        { id: "5", key: "gender", value: "Male" },
        { id: "6", key: "phone", value: "+1 234 567 890" },
        { id: "7", key: "address", value: "123 Main Street" },
        { id: "8", key: "city", value: "New York" },
        { id: "9", key: "country", value: "United States" }
    ];


    const renderInfoCard = ({ item }) => (
        <View style={styles.infoCard}>
            <Caption style={styles.labelStyle}>
                {t(`host_personal_info.fields.${item.key}`)}
            </Caption>
            <Body2 style={styles.valueText}>{item.value}</Body2>
        </View>
    );

    const Header = () => (
        <>
            <Heading title={t("host_personal_info.title")} />
            <View style={styles.profileSection}>
                <Image source={IMAGE_COMPONENTS.cleanerImg} style={styles.profileImage} />
            </View>
        </>
    );

    const Footer = () => {
        const params = Object.fromEntries(fields.map(f => [f.key, f.value]));

        return (
            <>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => router.push({
                        pathname: "/cleaner/personal-edit-info",
                        params
                    })}
                >
                    <ButtonText style={styles.buttonText}>
                        {t("host_personal_info.actions.edit")}
                    </ButtonText>
                </TouchableOpacity>
                <View style={{ height: 40 }} />
            </>
        );
    };

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <FlatList
                    data={fields}
                    renderItem={renderInfoCard}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={Header}
                    ListFooterComponent={Footer}
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                />
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({

    scrollContainer: {
        paddingHorizontal: "2.5%",
        backgroundColor: "#FAFAFA"
    },
    profileSection: {
        alignItems: "center",
        marginBottom: 30
    },
    profileImage: {
        height: 120,
        width: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: Colors.PRIMARY
    },
    infoCard: {
        width: "100%",
        height: 65,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 12,
        justifyContent: "center"
    },
    labelStyle: {
        color: "#0F243E",
        marginBottom: 1,
        textTransform: "uppercase"
    },
    valueText: {
        fontSize: 16,
        color: "#0F243E",
        fontWeight: "500",
        marginTop: 3
    },
    submitButton: {
        width: "100%",
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 30
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "500"
    }
});
