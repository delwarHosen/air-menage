import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Body2, H5 } from '../../../components/typo/typography';
import { propertiesData } from '../../../store/PropertyData';

export default function PropertiDetails() {
    const { id } = useLocalSearchParams();
    const propertyData = propertiesData.find((item) => item.id.toString() === id);

    if (!propertiesData) {
        return (
            <>
                <Body2>{t("cleaner_details.notFound")}</Body2>
            </>
        );
    }
    return (
        <View>
            <View style={styles.PropertyCard}>
                <Image source={propertyData.img} style={styles.image} contentFit="cover" />
                <H5 style={styles.title}>{propertyData.title}</H5>
                <Body2 style={styles.location}>{propertyData.location}</Body2>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
        marginTop: 11
    },
    location: {
        marginTop: 6
    }
})