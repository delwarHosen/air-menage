import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import Heading from '../../components/Heading/Heading';
import { Body1, Body2, H3, H5 } from '../../components/typo/typography';

const { width } = Dimensions.get('window');

// Chart Data with labels
const chartData = [
    { label: 'Ja', value: 60, full: true },
    { label: 'Feb', value: 100, full: true },
    { label: 'Mar', value: 45, full: true },
    { label: 'Apr', value: 55, full: false },
    { label: 'May', value: 0, full: false },
];

const toComeTransactions = [
    { id: '1', date: 'December 21', amount: '1,000', label: 'Programme' },
    { id: '2', date: 'December 21', amount: '1,000', label: 'Programme' },
    { id: '3', date: 'December 23', amount: '5,00', label: 'Programme' },
];

const effectedTransactions = [
    { id: '4', date: 'December 18', amount: '1,000', label: 'Programme' },
    { id: '5', date: 'December 16', amount: '2,00', label: 'Programme' },
    { id: '6', date: 'December 15', amount: '5,00', label: 'Programme' },
];

export default function MyIncome() {

    const renderTransactionItem = (item) => (
        <View key={item.id} style={styles.transactionItem}>
            <View style={styles.transRow}>
                <H5 style={styles.transDate}>{item.date}</H5>
                <Body2 style={styles.transAmount}>{item.amount} €</Body2>
            </View>
            <Body2 style={styles.transLabel}>{item.label}</Body2>
        </View>
    );

    return (
        <ScrollView
            style={styles.mainContainer}
            showsVerticalScrollIndicator={false}
            // 1. Sticky header index set korun (0 mane prothom View-ti sticky hobe)
            stickyHeaderIndices={[0]}
        >
            {/* 2. Header Section: Eti ekhon sticky thakbe scroll korleও */}
            <View style={{ backgroundColor: "#FAFAFA", paddingHorizontal: 15, paddingBottom: 10 }}>
                <Heading title={"Revenue"} />
            </View>

            <View style={{ marginHorizontal: 15 }}>
                <View style={styles.headerRow}>
                    <H3 style={styles.mainHeading}>Revenue</H3>
                    <H3 style={styles.mainHeading}>this Month:</H3>
                    <H3 style={styles.boldAmount}>50,25 €</H3>
                    <Body2 style={styles.grayText}>coming Soon: 50,25 €</Body2>
                </View>

                {/* --- CUSTOM BAR CHART --- */}
                <View style={styles.chartWrapper}>
                    <View style={styles.yAxis}>
                        <Body2 style={styles.axisText}>€ 1,000</Body2>
                        <Body2 style={styles.axisText}>€ 0,00</Body2>
                    </View>

                    <View style={styles.chartBox}>
                        {chartData.map((item, i) => (
                            <View key={i} style={styles.barColumn}>
                                <View style={styles.barBackground}>
                                    <View style={[styles.barBase, { backgroundColor: '#E5E7EB' }]} />
                                    <View style={[
                                        styles.barBase,
                                        {
                                            height: `${item.value}%`,
                                            backgroundColor: '#2DBEFF',
                                            position: 'absolute',
                                            bottom: 0
                                        }
                                    ]} />
                                </View>
                                <Body2 style={styles.xLabel}>{item.label}</Body2>
                            </View>
                        ))}
                        <View style={styles.dottedLine} />
                    </View>
                </View>

                {/* --- RECAP LINK --- */}
                <TouchableOpacity style={styles.recapBtn}>
                    <Body1 style={styles.recapText}>Afficher Le récapitulatif revenus</Body1>
                </TouchableOpacity>

                {/* --- TRANSACTIONS --- */}
                <View style={styles.sectionContainer}>
                    <H5 style={styles.sectionTitle}>Transaction to come</H5>
                    {toComeTransactions.map(renderTransactionItem)}
                </View>

                <View style={styles.sectionContainer}>
                    <H5 style={styles.sectionTitle}>Transaction effected</H5>
                    {effectedTransactions.map(renderTransactionItem)}
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.recapBtn}>
                        <Body1 style={styles.recapText}>Afficher toutes les transactions effected</Body1>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.blueButton}>
                        <Body2 style={styles.blueBtnText}>Consult tous les rapports</Body2>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#FAFAFA"
    },
    headerRow: {
        marginBottom: 20,
        marginTop: 20
    },
    mainHeading: {
        color: '#0F243E'
    },
    boldAmount: {
        fontWeight: '600',
        color: Colors.PRIMARY
    },
    grayText: {
        color: "#6B7280",
        marginTop: 5
    },

    // --- CHART STYLES (MATCHING IMAGE) ---
    chartWrapper: {
        flexDirection: 'row',
        height: 200,
        marginTop: 20,
        alignItems: 'center',
    },
    yAxis: {
        justifyContent: 'space-between',
        height: '75%',
        paddingRight: 10,
    },
    axisText: {
        color: Colors.PRIMARY,
        fontSize: 12, fontWeight: '600'
    },
    chartBox: {
        flex: 1,
        height: '75%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        position: 'relative',
    },
    barColumn: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'flex-end'
    },
    barBackground: {
        width: 45,

        height: '85%',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: -25,
    },
    barBase: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    xLabel: {
        marginTop: 30,
        color: '#4B5563',
        fontSize: 13
    },
    dottedLine: {
        position: 'absolute',
        left: '50%',
        top: -40,
        height: 40,
    },

    // --- REST OF STYLES ---
    recapBtn: {
        marginTop: 12,
        alignItems: 'center',
        backgroundColor: "#F3F4F6",
        width: "100%",
        borderRadius: 12,
        padding: 15,
        marginBottom: 10
    },
    recapText: {
        color: '#0F243E',
        fontWeight: '500'
    },
    sectionContainer: {
        marginTop: 25
    },
    sectionTitle: {
        color: '#0F243E',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10
    },
    transactionItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB'
    },
    transRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    transDate: {
        color: '#0F243E',
        fontWeight: '500'
    },
    transAmount: {

        color: '#6B7280'
    },
    transLabel: {
        fontSize: 12,
        color: '#7E8792',
        marginTop: 2
    },
    footer: {
        paddingVertical: 20,
        gap: 10
    },
    blueButton: {
        backgroundColor: '#2DBEFF',
        borderRadius: 12,
        alignItems: 'center',
        padding: 18
    },
    blueBtnText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600'
    },
});