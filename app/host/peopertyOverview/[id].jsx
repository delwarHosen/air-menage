import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import Heading from '../../../components/Heading/Heading';
import PeopertyOverviewPage from '../../../components/PeopertyOverviewPage/PeopertyOverviewPage';
import { cleanerDetailsData } from '../../../store/CleanerRequestData';

export default function PropertyOverviewDetails() {
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
                    <Heading title={t("properties.overview")} />
                </View>

                
                <View style={styles.contentWrapper}>
                    <PeopertyOverviewPage cleanerRequest={cleanerRequest} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // backgroundColor: '#fff', 
    },
    headerWrapper: {
        backgroundColor: '#fff', 
        paddingHorizontal: "2.5%",
        paddingTop: Platform.OS === 'ios' ? 50 : 10, 
    },
    scrollContent: {
        paddingBottom: 30,
    },
    contentWrapper: {
        marginHorizontal: "2.5%",
        marginVertical: 15,
    }
});