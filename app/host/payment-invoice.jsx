import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import Heading from '../../components/Heading/Heading';
import InvoiceCard from '../../components/invoice/InvoiceCard';
import InvoiceDownloadButton from '../../components/invoice/InvoiceDownloadButton';

export default function PaymentInvoice() {
    const { paymentId } = useLocalSearchParams();
    const {t} = useTranslation()

    const invoiceData = {
        id: "CLN-20260105-789",
        propertyName: "Cozy Apartment Marais",
        address: "45 Rue de Rivolio 75004 Paris France",
        date: "Monday Jan 2026",
        timeSlot: "10:00-12:00",
        duration: "2 Hours",
        cleaner: "Sophie Martin",
        propertyType: "Studio / T1",
        surface: "0-30m²",
        price: "20-35€"
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Heading title={t("invoice.title")} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <InvoiceCard data={invoiceData} />
                <InvoiceDownloadButton invoiceData={invoiceData} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingTop: 10
    },
    headerContainer: {
        paddingHorizontal: "3%",
        marginBottom: 10
    },
    scrollContent: {
        paddingHorizontal: "5%",
        paddingBottom: 30
    }
});