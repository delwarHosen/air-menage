import { Platform, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
// import CreateCleaningRequest from "../../components/CreateCleaningRequest/CreateCleaningRequest";
import CreateCleaningRequest from "../../components/CreateCleaningRequest/CreateCleaningRequest";
import Heading from '../../components/Heading/Heading';

export default function CreateCleaning() {
    return (
        // SafeAreaView ke mukhio container hisebe bebohar korun
        < >
            <ScrollView
                stickyHeaderIndices={[0]}
                contentContainerStyle={{ paddingBottom: 30 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Sticky Header */}
                <View style={styles.headerContainer}>
                    <Heading title="Create a Cleaning Request" />
                </View>

                {/* Scrollable content */}
               <CreateCleaningRequest/>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FAFAFA", // Header er sathe mil rakha bhalo
        // Android er jonno StatusBar padding
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    headerContainer: {
        paddingHorizontal: 16,
        paddingBottom: 5,
        backgroundColor: "#FAFAFA",
        zIndex: 5,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
});