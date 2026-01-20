import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import AllCleaningRequests from '../../components/AllCleaningRequests/AllCleaningRequests';
import Heading from '../../components/Heading/Heading';

export default function AchiveCleaning() {
    const { t } = useTranslation();
    return (

        <View style={styles.container}>
            <View style={{ paddingHorizontal: "4%" }}>
                <Heading title={t("cleanings.archived")} />
            </View>

            <AllCleaningRequests
                hideValidateButtonInDetails={true}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});