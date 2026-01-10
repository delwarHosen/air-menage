import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    View
} from "react-native";
import { Colors } from "../../assets/Colors";
import Heading from "../../components/Heading/Heading";
import { Body2 } from "../../components/typo/typography";
import { cleaners } from "../../store/Cleaners";

export default function AllReviews() {
    const router = useRouter();
    const { t } = useTranslation();

    // 1. flatMap logic ke useMemo te rakha jate performance bhalo hoy
    const allReviews = useMemo(() => {
        if (!cleaners) return [];
        return cleaners.flatMap(cleaner =>
            (cleaner.reviews || []).map(review => ({
                ...review,
                cleanerName: cleaner.name
            }))
        );
    }, []);

    // 2. Loading state check (jodi cleaners array load hote deri hoy)
    if (!cleaners) {
        return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Heading title={`${t("cleaner_details.reviews")} (${allReviews.length})`} />
            </View>

            <FlatList
                data={allReviews}
                keyExtractor={(item, index) => `${item.customer}-${index}`}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.reviewCard}>
                        <View style={styles.reviewHeader}>
                            <View style={styles.userInfo}>
                                {/* Image handle kora holo */}
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.reviewImg}
                                    contentFit="cover"
                                    transition={200}
                                />
                                <View style={{ marginLeft: 12 }}>
                                    <Body2 style={styles.reviewName}>{item.customer}</Body2>
                                    <Body2 style={styles.reviewDate}>{item.date}</Body2>
                                </View>
                            </View>

                            <View style={styles.forCleanerBadge}>
                                <Body2 style={styles.forText}>To: {item.cleanerName}</Body2>
                            </View>
                        </View>

                        <Body2 style={styles.reviewComment}>{item.comment}</Body2>
                    </View>
                )}
                // Reviews na thakle eita dekhabe
                ListEmptyComponent={() => (
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Body2>No reviews available.</Body2>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: "5%",
        paddingVertical: 10, // padding add kora hoyeche visibility jonno
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    listContent: {
        padding: "4%",
        paddingBottom: 40,
    },
    reviewCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#F3F4F6",
        // Shadow add kora hoyeche card ke better dekhate
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    reviewHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    reviewImg: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F3F4F6'
    },
    reviewName: {
        fontWeight: "600",
        color: Colors.SECONDARY || "#000",
    },
    reviewDate: {
        fontSize: 11,
        color: "#9CA3AF",
    },
    forCleanerBadge: {
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    forText: {
        fontSize: 10,
        color: "#6B7280",
        fontWeight: '500'
    },
    reviewComment: {
        fontSize: 14,
        lineHeight: 20,
        color: Colors.TEXT_COLOR || "#4B5563",
    },
});