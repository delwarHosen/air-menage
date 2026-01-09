import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
    FlatList,
    StyleSheet,
    View
} from "react-native";
import { Colors } from "../../assets/Colors";
import Heading from '../../components/Heading/Heading';
import { Body2 } from "../../components/typo/typography";
import { cleaners } from "../../store/Cleaners";

export default function AllReviews() {
    const router = useRouter();
    const { t } = useTranslation();


    const allReviews = cleaners.flatMap(cleaner =>
        (cleaner.reviews || []).map(review => ({
            ...review,
            cleanerName: cleaner.name
        }))
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Heading   title={`${t("cleaner_details.reviews")} (${allReviews.length})`} />
            </View>

            <FlatList
                data={allReviews}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.reviewCard}>
                        <View style={styles.reviewHeader}>
                            <View style={styles.userInfo}>
                                <Image source={{ uri: item.image }} style={styles.reviewImg} />
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
        // paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    headerTitle: {
        fontSize: 18,
        marginLeft: 10,
        fontWeight: "600",
    },
    listContent: {
        padding: "2.5%",
        paddingBottom: 40,
    },
    reviewCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#F3F4F6",
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
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    reviewName: {
        fontWeight: "600",
        color: Colors.SECONDARY,
    },
    reviewDate: {
        fontSize: 11,
        color: "#9CA3AF",
    },
    forCleanerBadge: {
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
    },
    forText: {
        fontSize: 10,
        color: "#6B7280",
    },
    reviewComment: {
        fontSize: 14,
        lineHeight: 20,
        color: Colors.TEXT_COLOR,
    },
});