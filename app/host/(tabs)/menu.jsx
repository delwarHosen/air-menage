import {
    Ionicons
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";

import { Colors } from "../../../assets/Colors";
import { AboutUsIcon, GetHeloIcon, HeartIcon, IdentityIcon, LanguageIcon, LeagelNoticeIcon, PasswrodIcon, PaymentIcon, PrivecyIcon, ProfileIcon, ProfileVerifiedIconWithPrimary, TermsUsesIcon } from "../../../assets/icons/Icons";
import { Body1, Body2, ButtonText, H5 } from "../../../components/typo/typography";
import { IMAGE_CONSTANTS } from "../../../constants/image.index";

export default function Menu() {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <Image
                        source={IMAGE_CONSTANTS.profile}
                        style={styles.profileImage}
                    />
                    <H5 style={styles.hostContent}>Delwar</H5>

                    <View style={styles.statsContainer}>
                        <View style={styles.row}>
                           <ProfileVerifiedIconWithPrimary/>
                            <Body1 style={styles.statText}>4.72</Body1>
                        </View>
                        <Body1 style={styles.hostContent}>
                            {t("menu.profile.comments")}
                        </Body1>
                    </View>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}
                >
                    {/* Account Settings */}
                    <View style={styles.settingContent}>
                        <H5 style={styles.settingTitle}>
                            {t("menu.sections.accountSettings")}
                        </H5>

                        <MenuItem
                            icon={<ProfileIcon />}
                            label={t("menu.items.personalInfo")}
                            onPress={() => router.push("/host/personal-info")}
                        />

                        <MenuItem
                            icon={<PaymentIcon/>}
                            label={t("menu.items.payment")}
                            onPress={() => router.push("/host/payment")}
                        />

                        <MenuItem
                            icon={<PasswrodIcon/>}
                            label={t("menu.items.passwordSecurity")}
                            onPress={() => router.push("/host/password-security")}
                        />

                        <MenuItem
                            icon={<GetHeloIcon/>}
                            label={t("menu.items.getHelp")}
                            onPress={() => router.push("/host/contact")}
                        />

                        <MenuItem
                            icon={<IdentityIcon/>}
                            label={t("menu.items.identityVerification")}
                        />
                    </View>

                    {/* Preferences */}
                    <View style={styles.settingContent}>
                        <H5 style={styles.settingTitle}>
                            {t("menu.sections.preferences")}
                        </H5>

                        <MenuItem
                            icon={<LanguageIcon/>}
                            label={t("menu.items.language")}
                            onPress={() => router.push("/host/language")}
                        />

                        <MenuItem
                            icon={<HeartIcon/>}
                            label={t("menu.items.favoriteCleaner")}
                            onPress={() => router.push("/host/favourite-cleaner")}
                        />
                    </View>

                    {/* Legal */}
                    <View style={styles.settingContent}>
                        <H5 style={styles.settingTitle}>
                            {t("menu.sections.legal")}
                        </H5>

                        <MenuItem
                            icon={<AboutUsIcon/>}
                            label={t("menu.items.aboutUs")}
                            onPress={() => router.push("/host/about-us")}
                        />

                        <MenuItem
                            icon={<TermsUsesIcon/>}
                            label={t("menu.items.terms")}
                            onPress={() => router.push("/host/Term-and-uses")}
                        />

                        <MenuItem
                            icon={<PrivecyIcon/>}
                            label={t("menu.items.privacy")}
                             onPress={() => router.push("/host/privecy-pilicy")}
                        />

                        <MenuItem
                            icon={<LeagelNoticeIcon/>}
                            label={t("menu.items.legalNotices")}
                        />
                    </View>

                    {/* Logout */}
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => router.push("/host/home")}
                    >
                        <ButtonText style={styles.buttonText}>
                            {t("menu.actions.logout")}
                        </ButtonText>
                    </TouchableOpacity>

                    <View style={{ height: 20 }} />
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}

/*  Reusable Menu Item */
const MenuItem = ({ icon, label, onPress }) => (
    <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.7}
        onPress={onPress}
    >
        {icon}
        <Body2 style={styles.textStyle}>{label}</Body2>
        <Ionicons name="chevron-forward" size={20} color="gray" />
    </TouchableOpacity>
);


const styles = StyleSheet.create({
   
    scrollContainer: {
        paddingHorizontal: "5%",
        paddingBottom: 20
    },
    profileSection: {
        alignItems: "center",
        marginTop: 20
    },
    profileImage: {
        height: 120,
        width: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        backgroundColor: "#E1E1E1",
        marginBottom: 10
    },
    hostContent: {
        marginBottom: 5,
        color: Colors.SECONDARY,
        fontWeight: "600"
    },
    statsContainer: {
        alignItems: "center"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4
    },
    statText: {
        marginLeft: 4,
        color: Colors.SECONDARY,
        fontWeight: "500"
    },
    settingContent: {
        marginTop: "5%"
    },
    settingTitle: {
        color: "#0F243E",
        marginBottom: 8,
        marginTop: 8
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        height: 48,
        borderRadius: 12,
        backgroundColor: Colors.BACKGROUND_COLOR,
        paddingHorizontal: "3.5%",
        elevation: 1
    },
    textStyle: {
        flex: 1,
        marginLeft: "3%",
        color: Colors.TEXT_COLOR
    },
    submitButton: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 30
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "600"
    }
});
