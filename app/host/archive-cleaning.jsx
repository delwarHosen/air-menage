import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native'
import { Colors } from '../../assets/Colors'
import { BedIcon, ClockIcon, CreatePropertyIcon, LocationIcon } from '../../assets/icons/Icons'
import Heading from '../../components/Heading/Heading'
import { Body1, Caption, H4, H5, H6 } from '../../components/typo/typography'
import { cleanerDetailsData } from "../../store/CleanerRequestData"

export default function ArchiveCleaning() {
    const router = useRouter()

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => router.push("/host/property-overview")}>
            <View style={[styles.card]}>

                {/* Top Date */}
                <H5>{item.date}</H5>

                <View style={styles.divider} />

                {/* Middle Section */}
                <View style={styles.middleRow}>
                    <Image
                        source={item.image}
                        style={styles.propertyImage}
                    />

                    <View style={styles.rightContent}>
                        <Body1>{item.city}</Body1>

                        <View style={styles.propeertiDetailcontent}>
                            <View style={styles.propertiContent}>
                                <CreatePropertyIcon />
                                <Caption>{item.area}</Caption>
                            </View>
                            <View style={styles.propertiContent}>
                                <BedIcon />
                                <Caption>{item.beds} Beds</Caption>
                            </View>
                        </View>

                        <View style={styles.propeertiDetailcontent}>
                            <View style={styles.propertiContent}>
                                <BedIcon />
                                <Caption>{item.bedrooms} Bedrooms</Caption>
                            </View>
                            <View style={styles.propertiContent}>
                                <BedIcon />
                                <Caption>{item.bathrooms} Bathrooms</Caption>
                            </View>
                        </View>

                        <View style={styles.propertiContent}>
                            <LocationIcon />
                            <Caption>{item.buildingName}</Caption>
                        </View>

                        <View style={styles.propertiContent}>
                            <ClockIcon />
                            <Caption>{item.timeSlot}</Caption>
                        </View>
                        <View style={styles.propertiContent}>
                            <ClockIcon />
                            <Caption>{item.duration}</Caption>
                        </View>

                        <Caption>
                            Laundry: {item.laundryIncluded ? "Included" : "No"}
                        </Caption>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Bottom Section */}
                <View style={styles.bottomRow}>
                    <View style={styles.propertiContent}>
                        <Image
                            source={{ uri: item.cleanerImage }}
                            style={styles.cleanerImage}
                        />
                        <View>
                            <H6 style={{ color: Colors.SECONDARY }}>{item.cleanerName}</H6>
                            <Caption>{item.country}</Caption>
                        </View>
                    </View>
                    <H4>€ {item.price}</H4>
                </View>

            </View>
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.mainContainer}
        >
            <View>
                <Heading title="Archived Cleaning" />
            </View>
            <FlatList
                    data={cleanerDetailsData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 30 }}
                />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    card: {
        borderRadius: 12,
        padding: 12,
        marginBottom: 20,
        marginHorizontal: 16,
    },
    divider: {
        height: 2,
        backgroundColor: Colors.BORDER_COLOR,
        marginVertical: 14
    },
    middleRow: {
        flexDirection: "row",
        gap: 12
    },
    propertyImage: {
        width: 116,
        height: 181,
        borderRadius: 8
    },
    rightContent: {
        flex: 1,
        gap: 2
    },
    propeertiDetailcontent: {
        flexDirection: "row",
        gap: 20,
        marginBottom: 5
    },
    propertiContent: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
        gap: 6
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    cleanerImage: {
        width: 36,
        height: 36,
        borderRadius: 18
    }
});