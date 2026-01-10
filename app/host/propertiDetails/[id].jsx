import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from "../../../assets/Colors";
import { BedIcon, CreatePropertyIcon, KeyIcon, LocationIcon, TikMarkIcon } from '../../../assets/icons/Icons';
import PropertyTypePicker from '../../../components/AddCleaningProperty/PropertyTypePicker';
import AllCleaner from '../../../components/AllCleaner/AllCleaner';
import Heading from "../../../components/Heading/Heading";
import { Body2, Caption, H5 } from '../../../components/typo/typography';
import { propertiesData } from '../../../store/PropertyData';

export default function PropertiDetails() {
    const { t } = useTranslation();
    const { id } = useLocalSearchParams();
    const propertyData = propertiesData.find((item) => item.id.toString() === id);

    if (!propertyData) {
        return (
            <>
                <Body2>{t("cleaner_details.notFound")}</Body2>
            </>
        );
    }

    return (
        <>
            <View style={{ paddingHorizontal: 20 }}>
                <Heading title={t("properties.overview")} />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                <View style={styles.PropertyCard}>
                    <Image source={propertyData.img} style={styles.image} contentFit="cover" />
                    <View style={{ marginHorizontal: "2%" }}>
                        <H5 style={styles.title}>{propertyData.title}</H5>
                        <Body2 style={styles.description}>{propertyData.description}</Body2>
                        <PropertyTypePicker />

                        <View style={styles.prpertyCard}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                <LocationIcon />
                                <View>
                                    <Caption style={Colors.PLACE_HOLDER}>{t("properties.location")}</Caption>
                                    <Body2 style={styles.propertyText}>{propertyData.location}</Body2>
                                </View>
                            </View>
                        </View>

                        <View style={styles.prpertyCard}>
                            <CreatePropertyIcon />
                            <Body2 style={styles.propertyText}>{propertyData.propertySize}</Body2>
                        </View>

                        <View style={styles.prpertyCard}>
                            <BedIcon />
                            <Body2 style={styles.propertyText}>
                                {propertyData.bedrooms} {t("properties.bedrooms")}
                            </Body2>
                        </View>

                        <View style={styles.prpertyCard}>
                            <BedIcon />
                            <Body2 style={styles.propertyText}>
                                {propertyData.bedrooms} {t("properties.beds")}
                            </Body2>
                        </View>

                        <View style={styles.keyCard}>
                            <View style={styles.leftContent}>
                                <KeyIcon />
                                <View>
                                    <Body2 style={styles.propertyText}>
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

                <AllCleaner propertyData={propertyData} />
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: "3%",
        paddingBottom: 60
    },
    PropertyCard: {
        width: "100%",
        marginVertical: 20
    },
    image: {
        width: "100%",
        height: 250,
        borderRadius: 12
    },
    title: {
        marginTop: 11,
        marginBottom: 10
    },
    description: {
        color: Colors.PLACE_HOLDER,
        lineHeight: 25,
        marginBottom: 15
    },
    // location: {
    //     marginTop: 6
    // },
    prpertyCard: {
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between", // ⭐ main key
        width: "100%",
        height: 56,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: "#FFFFFF",
        marginTop: 15,
        gap: 5
    },
    keyCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // ⭐ main key
        width: "100%",
        height: 56,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: "#FFFFFF",
        marginTop: 15,
        gap: 5
    },
    leftContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },

    propertyText: {
        color: Colors.PLACE_HOLDER
    },

    caption: {
        color: "#6B7280",
        fontSize: 12,
    },

})