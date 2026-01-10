import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../../assets/Colors";
import {
    BedIcon,
    CalenderIcon,
    CheckMarkIcon,
    ClockIcon,
    CreatePropertyIcon,
    ForwarAngleIcon,
    KeyIcon,
    LocationIcon,
    TikMarkIcon
} from "../../assets/icons/Icons";
import PropertyTypePicker from "../AddCleaningProperty/PropertyTypePicker";
import { Body1, Body2, ButtonText, H4, H5 } from "../typo/typography";

export default function PeopertyOverviewPage({ cleanerRequest }) {
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
                    <Body2 style={styles.infoSubText}>{t("properties.estimated_cleaning_time")}</Body2>
                    <Body1 style={styles.infoText}>{cleanerRequest.duration}</Body1>
                </View>
            </View>

            <View style={styles.infoRow}>
                <LocationIcon />
                <View>
                    <Body2 style={styles.infoSubText}>{t("properties.location")}</Body2>
                    <Body1 style={styles.infoText}>{`${cleanerRequest.city}, ${cleanerRequest.country}`}</Body1>
                </View>
            </View>

            <View style={styles.infoRow}>
                <CreatePropertyIcon />
                <Body1 style={styles.infoText}>{cleanerRequest.area}</Body1>
            </View>

            <View style={styles.infoRow}>
                <BedIcon />
                <Body1 style={styles.infoText}>{`${cleanerRequest.bedrooms} ${t("properties.bedrooms")}`}</Body1>
            </View>

            <View style={styles.infoRow}>
                <BedIcon />
                <Body1 style={styles.infoText}>{`${cleanerRequest.beds} ${t("properties.beds")}`}</Body1>
            </View>

            <View style={styles.infoRow}>
                <BedIcon />
                <Body1 style={styles.infoText}>{`${cleanerRequest.bathrooms} ${t("properties.bathrooms")}`}</Body1>
            </View>

            <View style={styles.infoRow}>
                <H4>{`${cleanerRequest.price}€`}</H4>
            </View>

            <View style={styles.infoRowkey}>
                <KeyIcon />
                <Body1 style={styles.infoText}>{cleanerRequest.lock_system}</Body1>
                <TikMarkIcon />
            </View>

            {/* Assign Cleaner */}
            <H5 style={{ marginTop: 25 }}>{t("properties.assign_cleaner")}</H5>
            <TouchableOpacity
                onPress={() => router.push(`/host/cleaner/${cleanerRequest?.id}`)}
                style={styles.profileContainer}>
                <View style={{ flexDirection: "row", gap: 10, alignItems: 'center' }}>
                    <Image
                        source={{ uri: cleanerRequest.cleanerImage }}
                        style={styles.cleanerImage}
                    />
                    <View>
                        <Body1 style={styles.cleanerName}>{cleanerRequest.cleanerName}</Body1>
                        <Body2 style={styles.cleanerLocation}>{cleanerRequest.city}</Body2>
                    </View>
                </View>
                <ForwarAngleIcon />
            </TouchableOpacity>

            <ServiceSection title={t("properties.general")} data={cleanerRequest.general_types} />
            <ServiceSection title={t("properties.bedroom")} data={cleanerRequest.bed_room} />
            <ServiceSection title={t("properties.bathroom")} data={cleanerRequest.living_room} />
            <ServiceSection title={t("properties.kitchen")} data={cleanerRequest.kitchen_room} />

            <View style={styles.gallery}>
                <Image source={cleanerRequest.images[0]} style={styles.galleryLarge} />
                <View style={styles.galleryRow}>
                    {cleanerRequest.images[1] && <Image source={cleanerRequest.images[1]} style={styles.gallerySmall} />}
                    {cleanerRequest.images[2] && <Image source={cleanerRequest.images[2]} style={styles.gallerySmall} />}
                </View>
            </View>

            <TouchableOpacity style={styles.validateButton}>
                <ButtonText style={{textAlign:"center",color:"white"}}>Validate</ButtonText>
            </TouchableOpacity>
        </View>
    );
}

function ServiceSection({ title, data }) {
    if (!data?.length) return null;
    return (
        <View style={{ marginTop: 22 }}>
            <H5 style={styles.sectionTitle}>{title}</H5>
            {data.map((item) => (
                <View key={item.id} style={styles.serviceRow}>
                    <CheckMarkIcon />
                    <Body2 style={styles.body2}>{item.name}</Body2>
                </View>
            ))}
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
    sectionTitle: { fontSize: 16, fontWeight: "600", marginTop: 22, marginBottom: 8 },
    profileContainer: {
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    cleanerImage: { width: 40, height: 40, borderRadius: 20 },
    cleanerName: { fontSize: 14, fontWeight: "600" },
    cleanerLocation: { fontSize: 12, color: "#6B7280" },
    serviceRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
    gallery: { marginTop: 30 },
    galleryLarge: { width: "100%", height: 200, borderRadius: 12, marginBottom: 8 },
    galleryRow: { flexDirection: "row", gap: 8 },
    gallerySmall: { flex: 1, height: 100, borderRadius: 12 },
    validateButton:{
        width:"100%", 
        backgroundColor:Colors.PRIMARY,
        borderRadius:10,
        marginTop:50,
padding:20
    }
});
