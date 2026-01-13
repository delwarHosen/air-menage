import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../../assets/Colors";
import { BedIcon, CalenderIcon, ClockIcon, CreatePropertyIcon, ForwarArrowIcon, KeyIcon, LocationIcon, TikMarkIcon } from "../../assets/icons/Icons";
import { IMAGE_COMPONENTS } from "../../assets/image.index";
import PropertyTypePicker from "../AddCleaningProperty/PropertyTypePicker";
import { Body1, Body2, ButtonText, Caption, H4 } from "../typo/typography";



export default function LeaveReviewPageView({ cleanerRequest }) {
    const { t } = useTranslation();
    const router = useRouter();

    if (!cleanerRequest) return null;

    return (
        <View style={styles.container}>
            <Image
                source={cleanerRequest.propertyImage}
                style={styles.mainImage}
                contentFit="cover"
            />
            <H4 style={{ marginVertical: 10 }}>{cleanerRequest.city}</H4>

            <Body2 style={styles.body2}>{cleanerRequest.description}</Body2>

            <View style={styles.propertyType}>
                <PropertyTypePicker />
            </View>

            <View style={styles.infoRow}>
                <CalenderIcon />
                <Body1 style={styles.infoText}>{cleanerRequest.day}</Body1>
            </View>

            <View style={styles.infoRow}>
                <ClockIcon />
                <Body1 style={styles.infoText}>{cleanerRequest.timeSlot}</Body1>
            </View>

            <View style={styles.infoRow}>
                <ClockIcon />
                <View>
                    <Body2 style={styles.infoSubText}>{t("allJobs.estimated_cleaning_time")}</Body2>
                    <Body1 style={styles.infoText}>{cleanerRequest.duration}</Body1>
                </View>
            </View>

            {/* Map button */}
            <View style={styles.infoMapRow}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <LocationIcon />
                    <View>
                        <Body2 style={styles.infoSubText}>{t("allJobs.location")}</Body2>
                        <Body1 style={styles.infoText}>{`${cleanerRequest.city}, ${cleanerRequest.country}`}</Body1>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => router.push("/cleaner/map")}
                    style={styles.mapBtn}>
                    <Caption style={{ textAlign: "center", color: "white" }}>{t("allJobs.view_map")}</Caption>
                </TouchableOpacity>
            </View>

            <View style={styles.infoRow}>
                <CreatePropertyIcon />
                <Body1 style={styles.infoText}>{cleanerRequest.area}</Body1>
            </View>

            <View style={styles.infoRow}>
                <BedIcon />
                <Body1 style={styles.infoText}>{`${cleanerRequest.bedrooms} ${t("allJobs.bedrooms")}`}</Body1>
            </View>

            <View style={styles.infoRow}>
                <BedIcon />
                <Body1 style={styles.infoText}>{`${cleanerRequest.beds} ${t("allJobs.beds")}`}</Body1>
            </View>

            <View style={styles.infoRow}>
                <BedIcon />
                <Body1 style={styles.infoText}>{`${cleanerRequest.bathrooms} ${t("allJobs.bathrooms")}`}</Body1>
            </View>

            <View style={styles.infoRow}>
                <H4>{`${cleanerRequest.price}€`}</H4>
            </View>

            <View style={styles.infoRowkey}>
                <KeyIcon />
                <View>
                    <Body1 style={styles.infoText}>{cleanerRequest.lock_system}</Body1>
                    <Caption>{cleanerRequest.password}</Caption>
                </View>
                <TikMarkIcon />
            </View>

            <TouchableOpacity
                onPress={() => router.push("/cleaner/report-problem")}
                style={styles.infoRowkey}>
                <Image
                    source={IMAGE_COMPONENTS.warniongImage}
                    style={{ height: 40, width: 40 }}
                />
                <View>
                    <Body1>
                        {t('allJobs.report_problem')}
                    </Body1>

                    <Caption>
                        {t('allJobs.extra_fee_requested')}
                    </Caption>
                </View>
                <ForwarArrowIcon />
            </TouchableOpacity>


            <View>
                <TouchableOpacity
                    onPress={() => router.push("/cleaner/checList")}
                    style={styles.validateButton}>
                    <ButtonText style={{ textAlign: "center", color: "white" }}>
                        {t('allJobs.checklist')}
                    </ButtonText>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    mainImage: { width: "100%", height: 234, borderRadius: 12, marginBottom: 12 },
    body2: { fontSize: 14, color: "#5E5E5E" },
    propertyType: { marginVertical: 12 },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        height: 56,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingHorizontal: 12,
        marginTop: 10,
    },
    infoRowkey: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 56,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingHorizontal: 12,
        marginTop: 10,
    },

    infoText: { fontSize: 14, color: "#5E5E5E" },
    infoSubText: { fontSize: 10, fontWeight: "bold", color: "#A3A9B0" },
    infoMapRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        height: 56,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingHorizontal: 12,
        marginTop: 10,
    },
    mapBtn: {
        width: "30%",
        height: 36,
        padding: 10,
        borderRadius: 14,
        backgroundColor: Colors.PRIMARY
    },

    validateButton: {
        width: "100%",
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        marginTop: 55,
        padding: 20
    }
});
