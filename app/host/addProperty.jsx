import { Platform, StatusBar, StyleSheet, View } from 'react-native';
// import AddCleaningProperty from '../../components/AddCleaningProperty/AddCleaningProperty';
import AddCleaningProperty from "../../components/AddCleaningProperty/AddCleaningProperty";

import Heading from '../../components/Heading/Heading';

import { useTranslation } from 'react-i18next';

export default function AddProperty() {
    const { t } = useTranslation();

    return (
        <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
           
            <View style={styles.headerContainer}>
                <Heading title={t('add_property.title')} />
            </View>

            {/* Content */}
            <View style={{ flex: 1 }}>
                <AddCleaningProperty />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    headerContainer: {
        paddingHorizontal: "5%",
        paddingBottom: 1,
        backgroundColor: "#FAFAFA",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        paddingTop: 10,
    },
});