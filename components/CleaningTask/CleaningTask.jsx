import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Colors } from "../../assets/Colors";
import { BedIcon, ClockIcon, CreatePropertyIcon, LocationIcon, ThreeDotsIcon } from '../../assets/icons/Icons';
import { Body1, Caption, H4, H5, H6 } from "../../components/typo/typography";
import { cleanerDetailsData } from "../../store/CleanerRequestData";

export default function CleaningTask({
    HeaderContent,
    data = cleanerDetailsData,
    isPendingScreen = false
}) {
    const router = useRouter();
    const { t } = useTranslation();
    const [openMenuId, setOpenMenuId] = useState(null);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
                if (openMenuId) {
                    setOpenMenuId(null);
                } else {
                    router.push(`/cleaner/peopertyOverview/${item.id}`);
                }
            }}
        >
            <View style={styles.card}>

                {isPendingScreen && (
                    <View style={styles.menuWrapper}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                            style={styles.dotButton}
                        >
                            <ThreeDotsIcon />
                        </TouchableOpacity>

                        {openMenuId === item.id && (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.deletePopup}
                                onPress={() => {
                                    console.log("Delete ID:", item.id);
                                    setOpenMenuId(null);
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="delete-outline"
                                    size={20}
                                    color="red"
                                />
                                <Text style={{ color: 'red', fontWeight: '500' }}>
                                    {t("common.delete")}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}

                <H5>{item.date}</H5>
                <View style={styles.divider} />

                <View style={styles.middleRow}>
                    <Image source={item.image} style={styles.propertyImage} />
                    
                    
                    <View style={[styles.rightContent, { flex: 1 }]}>
                        <Body1 numberOfLines={1}>{item.city}</Body1>

                        
                        <View style={[styles.propeertiDetailcontent, { flexWrap: 'wrap' }]}>
                            <View style={styles.propertiContent}>
                                <CreatePropertyIcon />
                                <Caption>{item.area}</Caption>
                            </View>
                            <View style={styles.propertiContent}>
                                <BedIcon />
                                <Caption>
                                    {item.beds} {t("cleaner.beds")}
                                </Caption>
                            </View>
                        </View>

                        <View style={[styles.propeertiDetailcontent, { flexWrap: 'wrap' }]}>
                            <View style={styles.propertiContent}>
                                <BedIcon />
                                <Caption>
                                    {item.bedrooms} {t("cleaner.bedrooms")}
                                </Caption>
                            </View>
                            <View style={styles.propertiContent}>
                                <BedIcon />
                                <Caption>
                                    {item.bathrooms} {t("cleaner.bathrooms")}
                                </Caption>
                            </View>
                        </View>

                        <View style={styles.propertiContent}>
                            <LocationIcon />
                            <Caption numberOfLines={1}>{item.buildingName}</Caption>
                        </View>

                        <View style={styles.propertiContent}>
                            <ClockIcon />
                            <Caption>{item.timeSlot}</Caption>
                        </View>

                        <View style={styles.propertiContent}>
                            <ClockIcon />
                            <Caption>{item.duration}</Caption>
                        </View>

                        <Caption numberOfLines={1}>
                            {t("cleaner.laundry")}:{" "}
                            {item.laundryIncluded
                                ? t("cleaner.included")
                                : t("cleaner.notIncluded")}
                        </Caption>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.bottomRow}>
                    <View style={styles.propertiContent}>
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
                            <H6 style={{ color: Colors.SECONDARY }}>
                                {item.cleanerName}
                            </H6>
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
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 30,
                    paddingHorizontal: "4%"
                }}
                ListHeaderComponent={HeaderContent}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    mainContainer: { flex: 1 },
    card: {
        backgroundColor: "#FFFFFF",
        padding: 12,
        marginBottom: 20,
        width: '100%',
        borderRadius: 10,
        position: 'relative',
    },
    menuWrapper: {
        position: 'absolute',
        top: 10,
        right: 5,
        zIndex: 50,
        alignItems: 'flex-end',
    },
    dotButton: {
        padding: 10,
    },
    deletePopup: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
        gap: 8,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        position: 'absolute',
        top: 35,
        right: 10,
        minWidth: 110,
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
        marginHorizontal: 10
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
        borderRadius: 18
    }
});