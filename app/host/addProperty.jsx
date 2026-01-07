import { Platform, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import AddCleaningProperty from '../../components/AddCleaningProperty/AddCleaningProperty';
import Heading from '../../components/Heading/Heading';

export default function AddProperty() {
    return (
      
        < >
            <ScrollView
                stickyHeaderIndices={[0]} 
                contentContainerStyle={{ paddingBottom: 30 }}
                showsVerticalScrollIndicator={false} 
            >
                {/* Sticky Header */}
                <View style={styles.headerContainer}>
                    <Heading title="Add Properties" />
                </View>

                {/* Scrollable content */}
                <AddCleaningProperty />
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FAFAFA", 
        
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    headerContainer: {
        paddingHorizontal: 16,
        paddingBottom: 12,
        backgroundColor: "#FAFAFA",
        zIndex: 10,         
        elevation: 4,       
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        paddingTop: 10, 
    },
});