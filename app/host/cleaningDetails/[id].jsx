import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from '../../../assets/Colors';
import { BedIcon, CreatePropertyIcon, KeyIcon, LocationIcon, TikMarkIcon } from '../../../assets/icons/Icons';
import PropertyTypePicker from '../../../components/AddCleaningProperty/PropertyTypePicker';
import AllCleaner from '../../../components/AllCleaner/AllCleaner';
import Heading from '../../../components/Heading/Heading';
import { Body2, Caption, H5 } from '../../../components/typo/typography';
import { propertiesData } from '../../../store/PropertyData';


const { height: screenHeight } = Dimensions.get('window');
const isSmallDevice = screenHeight < 700;

export default function CleaningDetails() {
    const { t } = useTranslation();
    const { id, hideCleaner, property } = useLocalSearchParams();
    console.log("HideCleaner status:", hideCleaner);
    // console.log("hide cleanerrrrrrr", hideCleaner)

    const propertyData = propertiesData.find((item) => item.id.toString() === id);

    if (!propertyData) {
        return (
            <View style={styles.centered}>
                <Body2>{t("cleaner_details.notFound")}</Body2>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ paddingHorizontal: 20 }}>
                <Heading title={t("properties.overview")} />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                <View style={styles.PropertyCard}>
                    <Image
                        source={propertyData.img}
                        style={[styles.image, { height: isSmallDevice ? 200 : 250 }]}
                        contentFit="cover"
                    />

                    <View>
                        <H5 style={styles.title}>{propertyData.title}</H5>
                        <Body2 style={styles.description}>{propertyData.description}</Body2>

                        <View style={{ marginBottom: 5 }}>
                            <PropertyTypePicker />
                        </View>

                        {/* Location Card */}
                        <View style={styles.prpertyCard}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, flex: 1 }}>
                                <LocationIcon />
                                <View style={{ flex: 1 }}>
                                    <Caption style={{ color: Colors.PLACE_HOLDER }}>{t("properties.location")}</Caption>
                                    <Body2 style={styles.propertyText} numberOfLines={1}>{propertyData.location}</Body2>
                                </View>
                            </View>
                        </View>

                        {/* Size Card */}
                        <View style={styles.prpertyCard}>
                            <CreatePropertyIcon />
                            <Body2 style={styles.propertyText}>{propertyData.propertySize}</Body2>
                        </View>

                        {/* Bedrooms Card */}
                        <View style={styles.prpertyCard}>
                            <BedIcon />
                            <Body2 style={styles.propertyText}>
                                {propertyData.bedrooms} {t("properties.bedrooms")}
                            </Body2>
                        </View>

                        {/* bathRoom Card */}
                        <View style={styles.prpertyCard}>
                            <BedIcon />
                            <Body2 style={styles.propertyText}>
                                {propertyData.bathrooms} {t("properties.bathrooms")}
                            </Body2>
                        </View>
                        {/* Lock/Key Card */}
                        <View style={styles.keyCard}>
                            <View style={styles.leftContent}>
                                <KeyIcon />
                                <View style={{ flex: 1 }}>
                                    <Body2 style={styles.propertyText} numberOfLines={1}>
                                        {propertyData.lockType}
                                    </Body2>
                                    <Caption style={styles.caption}>
                                        {t("properties.meetKey")}
                                    </Caption>
                                </View>
                            </View>
                            <TikMarkIcon />
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <AllCleaner propertyData={propertyData} />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollContainer: {
        paddingHorizontal: "5%",
        paddingBottom: 40
    },
    PropertyCard: {
        width: "100%",
    },
    image: {
        width: "100%",
        borderRadius: 12
    },
    title: {
        marginTop: 15,
        marginBottom: 8
    },
    description: {
        color: Colors.PLACE_HOLDER,
        lineHeight: 22,
        marginBottom: 15
    },
    prpertyCard: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        minHeight: 56,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "#FFFFFF",
        marginTop: 12,
        gap: 10
    },
    keyCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        minHeight: 56,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "#FFFFFF",
        marginTop: 12,
        gap: 10
    },
    leftContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flex: 1
    },
    propertyText: {
        color: Colors.PLACE_HOLDER,
        fontSize: 14
    },
    caption: {
        color: "#6B7280",
        fontSize: 11,
    },
})