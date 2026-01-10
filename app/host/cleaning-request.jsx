import { Image } from "expo-image";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from "../../assets/Colors";
import { BedIcon, ClockIcon, CreatePropertyIcon, LocationIcon } from '../../assets/icons/Icons';
import { Body1, Caption, H4, H5, H6 } from '../../components/typo/typography';

// { data } receive kora hoyeche Home theke
export default function CleaningRequest({ data, allData, activeTab }) {
    const { t } = useTranslation();
    const router = useRouter();

    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push(`/host/propertiDetails/${item.id}`)}
        >
            <View style={styles.card}>
                <H5>{item.date}</H5>
                <View style={styles.divider} />
                <View style={styles.middleRow}>
                    <Image source={item?.image} style={styles.propertyImage} />
                    <View style={styles.rightContent}>
                        <Body1>{item.city}</Body1>
                        <View style={styles.propeertiDetailcontent}>
                            <View style={styles.propertiContent}>
                                <CreatePropertyIcon />
                                <Caption>{item.area}</Caption>
                            </View>
                            <View style={styles.propertiContent}>
                                <BedIcon />
                                <Caption>{item.beds} {t('Beds')}</Caption>
                            </View>
                        </View>
                        <View style={styles.propeertiDetailcontent}>
                            <View style={styles.propertiContent}>
                                <BedIcon />
                                <Caption>{item.bathrooms} bathrooms</Caption>
                            </View>
                            <View style={styles.propertiContent}>
                                <BedIcon />
                                <Caption>{item.bedrooms} bedrooms</Caption>
                            </View>
                        </View>
                        <View style={styles.propertiContent}>
                            <LocationIcon />
                            <Caption>{item.buildingName}</Caption>
                        </View>
                        <View style={styles.propertiContent}>
                            <ClockIcon />
                            <Caption>{item.timeSlot} ({item.duration})</Caption>
                        </View>
                        <View style={styles.propertiContent}>
                            <ClockIcon />
                            <Caption>({item.duration})</Caption>
                        </View>
                    </View>
                </View>

                <View style={styles.bottomRow}>
                    <View style={styles.requestCountContainer}>
                        <H6 style={{ color: "#ffffff", lineHeight: 20 }}>
                            {String(item.cleaner_request ? item.cleaner_request.length : 0)}
                        </H6>
                    </View>
                    <H4 style={{ color: "#6B7280" }}>{item?.price} €</H4>
                </View>
            </View>
        </TouchableOpacity>
    );


    const renderFooter = () => {
        if (activeTab !== "pending") return null;

        return (
            <>
                <View style={{ marginTop: 20 }}>
                    <H4 style={{ marginBottom: 15 }}> {t("tasks.yourConfirmedTasks")}</H4>

                    {allData?.map((item) =>
                        item.completed_tasks?.map((task) => (
                            <View key={task.id} style={styles.completeCliningCard}>
                                <View style={styles.completeTaskInfo}>
                                    <Body1 style={{ color: "#323135" }}>
                                        {task.property_name}
                                    </Body1>
                                    <Caption style={{ color: "#64748B" }}>
                                        {task.task_title}
                                    </Caption>
                                </View>

                                <View style={styles.imageStackContainer}>
                                    <LinearGradient
                                        colors={[
                                            '#FAFF0A',
                                            '#FEAD4E',
                                            '#ED1B1B',
                                            '#FB1274',
                                            '#A61D5F',
                                            '#F109DA'
                                        ]}
                                        style={styles.gradientBorder}
                                    >
                                        <Image
                                            source={{ uri: item?.cleanerImage }}
                                            style={styles.cleanerImg}
                                        />
                                    </LinearGradient>

                                    <View style={styles.taskOverlayWrapper}>
                                        <Image
                                            source={task?.task_image}
                                            style={styles.smallTaskImg}
                                        />
                                    </View>
                                </View>
                            </View>
                        ))
                    )}
                </View>
            </>



        );
    };


    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            scrollEnabled={false}
            ListFooterComponent={renderFooter}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        marginTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.BORDER_COLOR,
        marginVertical: 12
    },
    middleRow: {
        flexDirection: "row",
        alignItems: 'flex-start'
    },
    propertyImage: {
        width: 110,
        height: 150,
        borderRadius: 8,
        marginRight: 12
    },
    rightContent: {
        flex: 1,
    },
    propeertiDetailcontent: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        marginTop: 4,
        gap: 5
    },
    propertiContent: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15,
        marginBottom: 4,
        gap: 5
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 14,
    },
    requestCountContainer: {
        backgroundColor: Colors.PRIMARY,
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    completeCliningCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    completeTaskInfo: {
        flex: 1,
        marginRight: 15,
    },
    imageStackContainer: {
        width: 65,
        height: 65,
        position: 'relative',
    },
    cleanerImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
    },
    gradientBorder: {
        height: 54,
        width: 54,
        borderRadius: 27,
        justifyContent: 'center',
        alignItems: 'center',
    },
    taskOverlayWrapper: {
        position: 'absolute',
        bottom: 1,
        right: 5,
        borderRadius: 6,
        overflow: 'hidden',
    },
    smallTaskImg: {
        width: 30,
        height: 30,
    },
})