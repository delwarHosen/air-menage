import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, View } from "react-native";
import Heading from "../../components/Heading/Heading";
import { Body2, Caption } from "../../components/typo/typography";

export default function PrivecyPilicy() {
    const { t } = useTranslation();

    const sections = t("about_us.sections", { returnObjects: true });

    return (
        <View style={styles.container}>
            <FlatList
                data={Array.isArray(sections) ? sections : []}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={styles.headerWrapper}>
                        <Heading title={t("about_us.title")} />
                    </View>
                }
                renderItem={({ item }) => (
                    <View style={styles.sectionItem}>
                        <Body2 style={styles.sectionTitle}>
                            {`${item.id}. ${item.title}`}
                        </Body2>
                        <Caption style={styles.sectionContent}>
                            {item.content}
                        </Caption>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        paddingHorizontal: "5%", 
        paddingVertical: 20,
    },
    headerWrapper: {
        marginBottom: 20,
    },
    sectionItem: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#0F243E",
        marginBottom: 6,
    },
    sectionContent: {
        lineHeight: 22,
        color: "#4B5563",
    },
});