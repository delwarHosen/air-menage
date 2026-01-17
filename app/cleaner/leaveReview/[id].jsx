import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import LeaveReviewPageView from '../../../components/AllJobs/LeaveReviewPageView';
import Heading from '../../../components/Heading/Heading';
import { cleanerDetailsData } from '../../../store/CleanerRequestData';


export default function leaveReview() {
    const { t } = useTranslation();
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
                    <Heading title={t('properties.completed_job')} />
                </View>

                <View style={styles.contentWrapper}>
                    <LeaveReviewPageView cleanerRequest={cleanerRequest} />
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
        paddingHorizontal: "4%",
        paddingTop: Platform.OS === 'ios' ? 5 : 1,
    },
    scrollContent: {
        paddingBottom: 10,
    },
    contentWrapper: {
        marginHorizontal: "4%",
        marginVertical: 15,
    }
});