import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import AcceptJobOverView from '../../../components/AllJobs/AcceptJobOverView';
import Heading from '../../../components/Heading/Heading';
import { cleanerDetailsData } from '../../../store/CleanerRequestData';

export default function AcceptJobDetails() {
    const { t } = useTranslation(); // use the 'allJobs' namespace
    const { id } = useLocalSearchParams();
    const cleanerRequest = cleanerDetailsData.find((item) => item.id.toString() === id);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.mainContainer}
        >
            <ScrollView
                stickyHeaderIndices={[0]}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.headerWrapper}>
                    <Heading title={t("allJobs.propertiesOverview")} />
                </View>
                <View style={styles.contentWrapper}>
                    <AcceptJobOverView cleanerRequest={cleanerRequest} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headerWrapper: {
        backgroundColor: '#fff',
        paddingHorizontal: "2.5%",
        paddingTop: Platform.OS === 'ios' ? 5 : 1,
    },
    scrollContent: {
        paddingBottom: 10,
    },
    contentWrapper: {
        marginHorizontal: "2.5%",
        marginVertical: 15,
    }
});
