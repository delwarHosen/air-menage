import { useTranslation } from "react-i18next";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import Heading from "../../components/Heading/Heading";
import { Body2, Caption } from "../../components/typo/typography";

const { width, height } = Dimensions.get("window");
const CONTENT_MARGIN = width * 0.03; 
const CONTENT_VERTICAL = height * 0.03; 

export default function AboutUsScreen() {
    const { t } = useTranslation();
    const sections = t("about_us.sections", { returnObjects: true });

    return (
        <FlatList
            data={sections}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
                <View style={{ marginVertical: 16, }}>
                    <Heading title={t("about_us.title")} />
                </View>
            }
            contentContainerStyle={{
                paddingHorizontal: CONTENT_MARGIN,
                paddingVertical: CONTENT_VERTICAL,
            }}
            renderItem={({ item }) => (
                <View style={{ marginBottom: 16 }}>
                    <Body2>{`${item.id}. ${item.title}`}</Body2>
                    <Caption style={{ lineHeight: 22 }}>{item.content}</Caption>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
