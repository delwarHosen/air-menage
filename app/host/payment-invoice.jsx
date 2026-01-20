import * as Print from 'expo-print';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import {
    CalenderIcon,
    CalenderIconForPayment,
    DownloadIconIcon,
    HomeForInvoiceIcon,
    LocationIcon
} from '../../assets/icons/Icons';
import Heading from '../../components/Heading/Heading';
import { Body2, H6 } from '../../components/typo/typography';

export default function PaymentInvoice() {
    const { t } = useTranslation();
    const router = useRouter();
    const { paymentId } = useLocalSearchParams();

    // 1. DYNAMIC DATA (In a real app, you would fetch this using paymentId)
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

    // 2. DYNAMIC HTML GENERATOR
    const generateHtml = (data) => `
        <html>
        <head>
            <style>
                body { font-family: 'Helvetica'; padding: 40px; color: #1A3352; }
                .header { border-bottom: 2px solid #F0F0F0; padding-bottom: 20px; margin-bottom: 30px; }
                .label { color: #7C7C7C; font-size: 14px; margin-bottom: 4px; }
                .value { font-weight: bold; font-size: 16px; margin-bottom: 20px; }
                .row { display: flex; flex-direction: row; justify-content: space-between; }
                .column { flex: 1; }
                .price-section { margin-top: 40px; padding-top: 20px; border-top: 1px solid #F0F0F0; }
            </style>
        </head>
        <body>
            <div class="header"><h1>Payment Summary Invoice</h1></div>
            <div class="row">
                <div class="column">
                    <div class="label">Cleaning ID</div>
                    <div class="value">${data.id}</div>
                </div>
                <div class="column">
                    <div class="label">Property Name</div>
                    <div class="value">${data.propertyName}</div>
                </div>
            </div>
            <div class="label">Property Address</div>
            <div class="value">${data.address}</div>
            <div class="row">
                <div class="column">
                    <div class="label">Cleaning Date</div>
                    <div class="value">${data.date}</div>
                </div>
                <div class="column">
                    <div class="label">Time Slot</div>
                    <div class="value">${data.timeSlot}</div>
                </div>
            </div>
            <div class="price-section">
                <h2>Price List</h2>
                <div class="row">
                    <div class="column"><div class="label">Property Type</div><div class="value">${data.propertyType}</div></div>
                    <div class="column"><div class="label">Surface</div><div class="value">${data.surface}</div></div>
                </div>
                <div class="label">Total Price</div>
                <div class="value" style="font-size: 24px; color: ${Colors.PRIMARY};">${data.price}</div>
            </div>
        </body>
        </html>
    `;

    // 3. DOWNLOAD HANDLER
    const handleDownload = async () => {
        try {
            const html = generateHtml(invoiceData);
            const { uri } = await Print.printToFileAsync({ html });

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri);
            } else {
                Alert.alert("Error", "Sharing is not available on your device");
            }
        } catch (error) {
            Alert.alert("Error", "Could not generate PDF");
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ paddingHorizontal: "3%", marginBottom: 10 }}>
                <Heading title="Payment Summary Invoice" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Download Button now calls handleDownload */}
                <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
                    <DownloadIconIcon />
                    <H6 style={{ color: '#fff', marginLeft: 8 }}>Download as PDF</H6>
                </TouchableOpacity>

                <View style={styles.invoiceCard}>
                    <View style={styles.section}>
                        <HomeForInvoiceIcon />
                        <Body2 style={styles.greyText}>Home</Body2>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Body2 style={styles.label}>Cleaning ID</Body2>
                            <H6 style={styles.value}>{invoiceData.id}</H6>
                        </View>
                        <View style={styles.col}>
                            <Body2 style={styles.label}>Property Name</Body2>
                            <H6 style={styles.value}>{invoiceData.propertyName}</H6>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <LocationIcon />
                            <Body2 style={styles.label}>Property Address</Body2>
                        </View>
                        <H6 style={[styles.value, { marginTop: 4 }]}>{invoiceData.address}</H6>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.col}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <CalenderIcon />
                                <Body2 style={styles.label}>Cleaning Date</Body2>
                            </View>
                            <H6 style={styles.value}>{invoiceData.date}</H6>
                        </View>
                        <View style={styles.col}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <CalenderIconForPayment />
                                <Body2 style={styles.label}>Time Slot</Body2>
                            </View>
                            <H6 style={styles.value}>{invoiceData.timeSlot}</H6>
                        </View>
                    </View>

                    <View style={styles.priceSection}>
                        <H6 style={styles.priceTitle}>Price List</H6>
                        <View style={styles.row}>
                            <View style={styles.col}>
                                <Body2 style={styles.label}>Property Type</Body2>
                                <H6 style={styles.value}>{invoiceData.propertyType}</H6>
                            </View>
                            <View style={styles.col}>
                                <Body2 style={styles.label}>Surface (m²)</Body2>
                                <H6 style={styles.value}>{invoiceData.surface}</H6>
                            </View>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Body2 style={styles.label}>Price</Body2>
                            <H6 style={styles.value}>{invoiceData.price}</H6>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FAFAFA", paddingTop: 10 },
    scrollContent: { paddingHorizontal: "5%", paddingBottom: 30 },
    downloadButton: {
        backgroundColor: Colors.PRIMARY,
        flexDirection: 'row',
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    section: { marginBottom: 30 },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30
    },
    col: {
        flex: 1
    },
    label: {
        color: '#7C7C7C',
        fontSize: 13
    },
    value: {
        color: '#1A3352',
        fontSize: 15,
        marginTop: 2
    },
    greyText: {
        color: '#7C7C7C',
        fontSize: 12,
        marginTop: 4
    },
    priceSection: {
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingTop: 20
    },
    priceTitle: {
        fontSize: 16,
        color: '#1A3352',
        marginBottom: 15
    }
});