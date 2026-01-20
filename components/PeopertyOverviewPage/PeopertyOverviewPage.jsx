import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
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

const { width, height } = Dimensions.get('window');
const isSmallDevice = height < 700;

export default function PeopertyOverviewPage({ cleanerRequest, hideValidateButton }) {
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
            
            <H4 style={styles.cityTitle}>{cleanerRequest.city}</H4>

            <Body2 style={styles.descriptionText}>{cleanerRequest.description}</Body2>

            <View style={styles.propertyType}>
                <PropertyTypePicker />
            </View>

            {/* Info Cards - ফিক্সড হাইট কমিয়ে প্যাডিং ব্যবহার করা হয়েছে */}
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
                <View style={styles.infoColumn}>
                    <Body2 style={styles.infoSubText}>{t("properties.estimated_cleaning_time")}</Body2>
                    <Body1 style={styles.infoText}>{cleanerRequest.duration}</Body1>
                </View>
            </View>

            <View style={styles.infoRow}>
                <LocationIcon />
                <View style={styles.infoColumn}>
                    <Body2 style={styles.infoSubText}>{t("properties.location")}</Body2>
                    <Body1 style={styles.infoText}>{`${cleanerRequest.city}, ${cleanerRequest.country}`}</Body1>
                </View>
            </View>

            <View style={styles.infoRow}>
                <CreatePropertyIcon />
                <Body1 style={styles.infoText}>{cleanerRequest.area}</Body1>
            </View>

            {/* Room Info - এগুলোতে গ্যাপ এবং সাইজ রেসপনসিভ */}
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

            <View style={styles.priceRow}>
                <H4 style={styles.priceText}>{`${cleanerRequest.price}€`}</H4>
            </View>

            <View style={styles.infoRowkey}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <KeyIcon />
                    <Body1 style={styles.infoText}>{cleanerRequest.lock_system}</Body1>
                </View>
                <TikMarkIcon />
            </View>

            {/* Assign Cleaner Section */}
            <H5 style={styles.assignTitle}>{t("properties.assign_cleaner")}</H5>
            <TouchableOpacity
                onPress={() => router.push(`/host/cleaner/${cleanerRequest?.id}`)}
                style={styles.profileContainer}
                activeOpacity={0.7}
            >
                <View style={styles.profileLeft}>
                    <LinearGradient
                        colors={['#FAFF0A', '#FEAD4E', '#ED1B1B', '#FB1274', '#A61D5F', '#F109DA']}
                        style={styles.gradientBorder}
                    >
                        <Image
                            source={{ uri: cleanerRequest.cleanerImage }}
                            style={styles.cleanerImage}
                        />
                    </LinearGradient>

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

            {/* Gallery Section - হাইট পারসেন্টেজে রাখা হয়েছে */}
            <View style={styles.gallery}>
                <Image source={cleanerRequest.images[0]} style={styles.galleryLarge} />
                <View style={styles.galleryRow}>
                    {cleanerRequest.images[1] && <Image source={cleanerRequest.images[1]} style={styles.gallerySmall} />}
                    {cleanerRequest.images[2] && <Image source={cleanerRequest.images[2]} style={styles.gallerySmall} />}
                </View>
            </View>

            {!hideValidateButton && (
                <TouchableOpacity
                    style={styles.validateButton}
                    onPress={() => router.push("/feedback/feedback")}
                >
                    <ButtonText style={styles.validateButtonText}>
                        {t("common.validate")}
                    </ButtonText>
                </TouchableOpacity>
            )}
        </View>
    );
}

function ServiceSection({ title, data }) {
    if (!data?.length) return null;
    return (
        <View style={styles.serviceSectionContainer}>
            <H5 style={styles.sectionTitle}>{title}</H5>
            {data.map((item) => (
                <View key={item.id} style={styles.serviceRow}>
                    <CheckMarkIcon />
                    <Body2 style={styles.serviceItemText}>{item.name}</Body2>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingBottom: 20 },
    mainImage: {
        width: "100%",
        height: isSmallDevice ? 180 : 234, // ছোট ডিভাইসে ইমেজের হাইট কমানো হয়েছে
        borderRadius: 12,
        marginBottom: 12
    },
    cityTitle: { 
        marginVertical: 8,
        fontSize: isSmallDevice ? 18 : 20 
    },
    descriptionText: {
        fontSize: 14,
        color: "#5E5E5E",
        lineHeight: 20
    },
    propertyType: {
        marginVertical: 8
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        minHeight: 50, // ফিক্সড হাইট বদলে মিন-হাইট দেওয়া হয়েছে
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginTop: 10,
    },
    infoColumn: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    infoRowkey: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: 50,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginTop: 10,
    },
    infoText: { 
        fontSize: isSmallDevice ? 13 : 14, 
        color: "#5E5E5E" 
    },
    infoSubText: { 
        fontSize: 10, 
        fontWeight: "bold", 
        color: "#A3A9B0",
        marginBottom: 2
    },
    priceRow: {
        marginTop: 15,
        marginBottom: 5,
        paddingHorizontal: 5
    },
    priceText: {
        color: Colors.TEXT_COLOR,
        fontSize: 22
    },
    assignTitle: { 
        marginTop: 25,
        marginBottom: 5
    },
    profileContainer: {
        backgroundColor: "#F9FAFB", 
        padding: 12,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#F3F4F6'
    },
    profileLeft: { 
        flexDirection: "row", 
        gap: 12, 
        alignItems: 'center' 
    },
    gradientBorder: {
        height: 46,
        width: 46,
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cleanerImage: { width: 42, height: 42, borderRadius: 21 },
    cleanerName: { fontSize: 14, fontWeight: "600" },
    cleanerLocation: { fontSize: 12, color: "#6B7280" },
    
    serviceSectionContainer: { marginTop: 20 },
    sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
    serviceRow: { 
        flexDirection: "row", 
        alignItems: "center", 
        gap: 10, 
        marginBottom: 8 
    },
    serviceItemText: {
        fontSize: 14,
        color: "#5E5E5E"
    },
    
    gallery: { marginTop: 25 },
    galleryLarge: { 
        width: "100%", 
        height: isSmallDevice ? 160 : 200, 
        borderRadius: 12, 
        marginBottom: 8 
    },
    galleryRow: { flexDirection: "row", gap: 8 },
    gallerySmall: { flex: 1, height: isSmallDevice ? 80 : 100, borderRadius: 12 },
    
    validateButton: {
        width: "100%",
        backgroundColor: Colors.PRIMARY,
        borderRadius: 12,
        marginTop: 40,
        paddingVertical: isSmallDevice ? 16 : 20,
        shadowColor: Colors.PRIMARY,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5
    },
    validateButtonText: { 
        textAlign: "center", 
        color: "white",
        fontWeight: '600',
        fontSize: 16
    }
});