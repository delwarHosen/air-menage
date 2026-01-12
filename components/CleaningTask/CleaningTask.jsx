import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native'
import { Colors } from "../../assets/Colors"
import { BedIcon, ClockIcon, CreatePropertyIcon, LocationIcon } from '../../assets/icons/Icons'
import { Body1, Caption, H4, H5, H6 } from "../../components/typo/typography"
import { cleanerDetailsData } from "../../store/CleanerRequestData"

export default function CleaningTask({ HeaderContent }) {
    const { t } = useTranslation();
    const router = useRouter();

    // Data check korchi jate targetId undefined na hoy
    const targetId = cleanerDetailsData && cleanerDetailsData.length > 0 ? cleanerDetailsData[0].id : null;

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => router.push(`/cleaner/peopertyOverview/${item.id}`)}>
            <View style={styles.card}>
                <H5>{item.date}</H5>
                <View style={styles.divider} />

                <View style={styles.middleRow}>
                    <Image source={item.image} style={styles.propertyImage} />
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

                        {/* Text must be inside Typography component */}
                        <Caption>Laundry: {item.laundryIncluded ? "Included" : "No"}</Caption>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.bottomRow}>
                    <View style={styles.propertiContent}>
                        <Image source={{ uri: item.cleanerImage }} style={styles.cleanerImage} />
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
            <FlatList
                data={cleanerDetailsData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
                // Header ebong List components er moddhe kono khali text rakha jabe na
                ListHeaderComponent={
                    <View>
                        {HeaderContent}

                        <TouchableOpacity
                            onPress={() => {
                                if (targetId) router.push(`/cleaner/peopertyOverview/${targetId}`);
                            }}
                            style={styles.pendingText}
                        >
                            <Body1 style={{ textDecorationLine: "underline" }}>
                                Pending Applications
                            </Body1>
                            <Body1 style={styles.pendingCount}>3</Body1>
                        </TouchableOpacity>
                    </View>
                }
            />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // backgroundColor: '#fff'
    },
    card: {
        padding: 12,
        marginBottom: 20,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: Colors.BORDER_COLOR,
    },
    divider: {
        height: 1,
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
        gap: 2,
    },
    propeertiDetailcontent: {
        flexDirection: "row",
        gap: 20,
        marginBottom: 5,
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
    },
    pendingText: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        marginBottom:10
    },
    pendingCount: {
        backgroundColor: "#C72D65",
        height: 24,
        width: 24,
        borderRadius: 12,
        textAlign: "center",
        color: "white",
        lineHeight: 24,
        overflow: 'hidden'
    }
});