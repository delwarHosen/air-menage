import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import CleaningTask from '../../components/CleaningTask/CleaningTask';
import Heading from '../../components/Heading/Heading';
import { cleanerDetailsData } from "../../store/CleanerRequestData";

export default function PendingHouseholds() {
    const router = useRouter();
    const pendingData = cleanerDetailsData.filter(item => item.laundryIncluded === true);

    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: "2.5%" }}>
                <Heading title="Pending Households" />
            </View>
            <CleaningTask data={pendingData} isPendingScreen={true} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA"
    },

});