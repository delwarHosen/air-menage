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
import { Body1, Caption, H4, H5, H6 } from '../typo/typography';


export default function AllJobs({ data, activeTab, headerText }) {
    const router = useRouter();
    const { t } = useTranslation();

    const handleNavigation = (item) => {
        if (activeTab === 'progress') {
            router.push(`/cleaner/leaveReview/${item.id}`);
        } else if (activeTab === 'accept') {
            router.push(`/cleaner/accept-job-details/${item.id}`);
        } else {
            router.push(`/cleaner/peopertyOverview/${item.id}`);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleNavigation(item)}>
            <H5>{item.date}</H5>
            <View style={styles.divider} />

            <View style={styles.middleRow}>
                <Image source={item.image} style={styles.propertyImage} contentFit="cover" />
                <View style={styles.rightContent}>
                    <Body1>{item.city}</Body1>

                    <View style={styles.propeertiDetailcontent}>
                        <View style={styles.propertiContent}>
                            <CreatePropertyIcon />
                            <Caption>{item.area}</Caption>
                        </View>
                        <View style={styles.propertiContent}>
                            <BedIcon />
                            <Caption>{item.beds} {t('allJobs.beds')}</Caption>
                        </View>
                    </View>

                    <View style={styles.propeertiDetailcontent}>
                        <View style={styles.propertiContent}>
                            <BedIcon />
                            <Caption>{item.bedrooms} {t('allJobs.bedrooms')}</Caption>
                        </View>
                        <View style={styles.propertiContent}>
                            <BedIcon />
                            <Caption>{item.bathrooms} {t('allJobs.bathrooms')}</Caption>
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
                        {t('allJobs.laundry')}: {item.laundryIncluded ? t('allJobs.included') : t('allJobs.no')}
                    </Caption>
                </View>
            </View>

            <View style={styles.bottomRow}>
                <View style={styles.propertiContent}>
                    <LinearGradient
                        colors={['#FAFF0A', '#FEAD4E', '#ED1B1B', '#FB1274', '#A61D5F', '#F109DA']}
                        style={styles.gradientBorder}
                    >
                        <Image 
                            source={typeof item.cleanerImage === 'string' ? { uri: item.cleanerImage } : item.cleanerImage} 
                            style={styles.cleanerImage}
                            contentFit="cover"
                        />
                    </LinearGradient>

                    <View>
                        <H6 style={{ color: Colors.SECONDARY }}>{item.cleanerName}</H6>
                        <Caption>{item.country}</Caption>
                    </View>
                </View>

                <View>
                    <H4 style={{ color: "#6B7280" }}> {item.price} €</H4>
                </View>

                <View style={styles.priceActionWrapper}>
                    <View style={[styles.btn, { backgroundColor: activeTab === 'progress' ? Colors.SECONDARY : Colors.PRIMARY }]}>
                        <Caption style={styles.btnText}>
                            {activeTab === 'progress' ? t('allJobs.leaveReview') : t('allJobs.validate')}
                        </Caption>
                    </View>
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
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    headerText ? <H4 style={styles.headerStyle}>{headerText}</H4> : null
                }
                contentContainerStyle={{ paddingBottom: 30 }}
            />
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    mainContainer: { flex: 1, paddingHorizontal: "5%" },
    headerStyle: {
        marginVertical: 20,
    },
    card: {
        padding: 8,
        marginBottom: 20,
        width: '100%',
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        
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
        width: "30%",
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
        alignItems: "center",
        marginTop: 15
    },
    gradientBorder: {
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cleanerImage: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f0f0f0'
    },
    priceActionWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    btn: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 14,
    },
    btnText: {
        color: '#FFF',
        fontWeight: 'bold',
    }
});