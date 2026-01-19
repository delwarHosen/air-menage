import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
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

    return (
        <View style={styles.container}>
            {/* Header with Heading */}
            <View style={{ paddingHorizontal: "3%", marginBottom: 10 }}>
                <Heading title="Payment Summary Invoice" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Download Button */}
                <TouchableOpacity style={styles.downloadButton}>
                    <DownloadIconIcon />
                    <H6 style={{ color: '#fff', marginLeft: 8 }}>Download as PDF</H6>
                </TouchableOpacity>

                <View style={styles.invoiceCard}>
                    {/* Home Icon Section */}
                    <View style={styles.section}>
                        <HomeForInvoiceIcon />
                        <Body2 style={styles.greyText}>Home</Body2>
                    </View>

                    {/* ID & Property Name Row */}
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Body2 style={styles.label}>Cleaning ID</Body2>
                            <H6 style={styles.value}>CLN-20260105-789</H6>
                        </View>
                        <View style={styles.col}>
                            <Body2 style={styles.label}>Property Name</Body2>
                            <H6 style={styles.value}>Cozy Apartment Marais</H6>
                        </View>
                    </View>

                    {/* Address Section */}
                    <View style={styles.section}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <LocationIcon />
                            <Body2 style={styles.label}>Property Address</Body2>
                        </View>
                        <H6 style={[styles.value, { marginTop: 4 }]}>45 Rue de Rivolio 75004 Paris France</H6>
                    </View>

                    {/* Date & Time Row */}
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <CalenderIcon />
                                <Body2 style={styles.label}>Cleaning Date</Body2>
                            </View>
                            <H6 style={styles.value}>Monday Jan 2026</H6>
                        </View>
                        <View style={styles.col}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <CalenderIconForPayment />
                                <Body2 style={styles.label}>Time Solt</Body2>
                            </View>
                            <H6 style={styles.value}>10:00-12:00</H6>
                        </View>
                    </View>

                    {/* Duration & Cleaner Row */}
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Body2 style={styles.label}>Estimate Duration</Body2>
                            <H6 style={styles.value}>2 Hours</H6>
                        </View>
                        <View style={styles.col}>
                            <Body2 style={styles.label}>Cleaner</Body2>
                            <H6 style={styles.value}>Sophie Martin</H6>
                        </View>
                    </View>

                    {/* Price List Section */}
                    <View style={styles.priceSection}>
                        <H6 style={styles.priceTitle}>Price List</H6>

                        <View style={styles.row}>
                            <View style={styles.col}>
                                <Body2 style={styles.label}>Property Type</Body2>
                                <H6 style={styles.value}>Studio / T1</H6>
                            </View>
                            <View style={styles.col}>
                                <Body2 style={styles.label}>Suface (m’2)</Body2>
                                <H6 style={styles.value}>0-30m’2</H6>
                            </View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <Body2 style={styles.label}>Price</Body2>
                            <H6 style={styles.value}>20-35€</H6>
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

    invoiceCard: {
        // backgroundColor: '#fff',

    },

    section: { marginBottom: 30 },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },

    col: { flex: 1 },

    label: {
        color: '#7C7C7C',
        fontSize: 13,
    },

    value: {
        color: '#1A3352',
        fontSize: 15,
        marginTop: 2,
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