import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { Colors } from '../../assets/Colors';
import { BedIcon, ClockIcon, CreatePropertyIcon, LocationIcon } from '../../assets/icons/Icons';
import { cleanerDetailsData } from '../../store/CleanerRequestData';
import { Body1, Caption, H4, H5, H6 } from '../typo/typography';


export default function AllCleaningRequests({ hideValidateButtonInDetails = false }) {
    const { t } = useTranslation();
    const router = useRouter();

    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push({
                pathname: `/host/peopertyOverview/${item.id}`,
                params: { fromAchive: hideValidateButtonInDetails ? 'true' : 'false' }
            })}
        >
            <View style={styles.card}>
                {/* Top Date Section */}
                <H5>{item.date}</H5>

                <View style={styles.divider} />

                {/* Middle Content Section */}
                <View style={styles.middleRow}>
                    <Image
                        source={item.image}
                        style={styles.propertyImage}
                        contentFit="cover"
                        transition={500}
                    />

                    <View style={styles.rightContent}>
                        <Body1 style={styles.cityText}>{item.city}</Body1>

                        {/* Area & Beds Row */}
                        <View style={styles.detailRow}>
                            <View style={styles.iconInfo}>
                                <CreatePropertyIcon size={16} />
                                <Caption>{item.area}</Caption>
                            </View>
                            <View style={styles.iconInfo}>
                                <BedIcon size={16} />
                                <Caption>{t("archive_cleaning.beds", { count: item.beds })}</Caption>
                            </View>
                        </View>

                        {/* Bedrooms & Bathrooms Row */}
                        <View style={styles.detailRow}>
                            <View style={styles.iconInfo}>
                                <BedIcon size={16} />
                                <Caption>{t("archive_cleaning.bedrooms", { count: item.bedrooms })}</Caption>
                            </View>
                            <View style={styles.iconInfo}>
                                <BedIcon size={16} />
                                <Caption>{t("archive_cleaning.bathrooms", { count: item.bathrooms })}</Caption>
                            </View>
                        </View>

                        {/* Location */}
                        <View style={styles.iconInfo}>
                            <LocationIcon size={16} />
                            <Caption numberOfLines={1}>{item.buildingName}</Caption>
                        </View>

                        {/* Time & Duration */}
                        <View style={styles.iconInfo}>
                            <ClockIcon size={16} />
                            <Caption>{item.timeSlot} ({item.duration})</Caption>
                        </View>

                        {/* Laundry Status */}
                        <Caption style={styles.laundryText}>
                            {t("archive_cleaning.laundry")}: {item.laundryIncluded ? t("archive_cleaning.included") : t("archive_cleaning.not_included")}
                        </Caption>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Bottom Footer Section */}
                <View style={styles.bottomRow}>
                    <View style={styles.cleanerInfo}>
                        <LinearGradient
                            colors={['#FAFF0A', '#FEAD4E', '#ED1B1B', '#FB1274', '#A61D5F', '#F109DA']}
                            style={styles.gradientBorder}
                        >
                            <Image
                                source={{ uri: item.cleanerImage }}
                                style={styles.cleanerImage}
                            />
                        </LinearGradient>

                        <View>
                            <H6 style={{ color: Colors.SECONDARY }}>{item.cleanerName}</H6>
                            <Caption>{item.country}</Caption>
                        </View>
                    </View>
                    <H4>{t("archive_cleaning.price_symbol")}{item.price}</H4>
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
                contentContainerStyle={styles.listContainer}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#FAFAFA",
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 40
    },
    card: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,

    },
    divider: {
        height: 1,
        backgroundColor: Colors.BORDER_COLOR,
        marginVertical: 12
    },
    middleRow: {
        flexDirection: "row",
        gap: 16
    },
    propertyImage: {
        width: 110,
        height: 160,
        borderRadius: 10
    },
    rightContent: {
        flex: 1,
        justifyContent: 'space-between'
    },
    cityText: {
        fontWeight: '700',
        marginBottom: 4
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        gap: 12,
    },
    iconInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 4
    },
    laundryText: {
        marginTop: 4,
        color: Colors.PRIMARY,
        fontWeight: '500'
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    cleanerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    gradientBorder: {
        height: 42,
        width: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cleanerImage: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#EEE'
    }
});