import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    FlatList,
    Image, // Changed from ScrollView
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../assets/Colors';
import Heading from '../../components/Heading/Heading';
import { Body2 } from '../../components/typo/typography';
import { IMAGE_CONSTANTS } from '../../constants/image.index';

const WalletPaymentSummary = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('My Payment');

    const payments = [
        {
            id: '1',
            name: 'Hridoy ',
            rating: 4.8,
            reviews: 3241,
            amount: 220,
            transactionId: '2349123',
            date: '21-JUN-2025 7:09 PM',
            location: 'Private room in San Francisco',
            status: 'Success',
        },
        {
            id: '2',
            name: 'Delwar',
            rating: 4.8,
            reviews: 3241,
            amount: 220,
            transactionId: '2349123',
            date: '21-JUN-2025 7:09 PM',
            location: 'Private room in San Francisco',
            status: 'Success',
        },
        {
            id: '3',
            name: 'Rashid',
            rating: 4.8,
            reviews: 3241,
            amount: 220,
            transactionId: '2349123',
            date: '21-JUN-2025 7:09 PM',
            location: 'Private room in San Francisco',
            status: 'Pending',
        },
        {
            id: '4',
            name: 'Rashid',
            rating: 4.8,
            reviews: 3241,
            amount: 220,
            transactionId: '2349123',
            date: '21-JUN-2025 7:09 PM',
            location: 'Private room in San Francisco',
            status: 'Refound',
        },
    ];

    // FIX: Filter logic corrected for 'Refound'
    const filteredPayments = payments.filter(p => {
        if (activeTab === 'Pending') return p.status === 'Pending';
        if (activeTab === 'Refound') return p.status === 'Refound'; // Match exact status string
        return true; // Shows all for "My Payment"
    });

    const renderPaymentItem = ({ item }) => (
        <View style={styles.paymentCard}>
            <View style={styles.cardHeader}>
                <View style={styles.authorText}>
                    <Body2 style={styles.nameText}>{item.name}</Body2>
                    <MaterialIcons name="verified" size={22} color="#FDBA45" />
                </View>
                <Body2 style={styles.statusBadge}>{item.status}</Body2>
            </View>

            <View style={styles.ratingContainer}>
                <View style={styles.ratingCard}>
                    <Body2 style={styles.ratingText}>{item.rating}</Body2>
                    <Ionicons name="star" size={16} color="#FFD700" />
                </View>
                <View style={styles.authorContainer}>
                    <Image
                        style={{ width: 14, height: 14, borderRadius: 7 }}
                        source={IMAGE_CONSTANTS.clientImg}
                    />
                    <Body2 style={styles.reviewText}>{item.name}</Body2>
                </View>
            </View>

            <Body2 style={styles.amountText}>Total Price - ₹{item.amount}</Body2>
            <Body2 style={styles.detailText}>Transaction ID : {item.transactionId}</Body2>
            <Body2 style={styles.detailText}>📅 {item.date}</Body2>
            <Body2 style={styles.detailText}>📍 {item.location}</Body2>

            <TouchableOpacity style={styles.deleteButton}>
                <Body2 style={styles.deleteButtonText}>Delete</Body2>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            {/* Headding */}
            <View style={{ marginHorizontal: 20 }}>
                <Heading title={"Wallet & Payment Summary"} />
            </View>
            <View style={styles.tabContainer}>
                <View style={styles.tabWrapper}>
                    {['My Payment', 'Pending', 'Refound'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, activeTab === tab && styles.activeTab]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* FlatList Implementation */}
            <FlatList
                data={filteredPayments}
                keyExtractor={(item) => item.id}
                renderItem={renderPaymentItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text style={styles.emptyText}>No transactions found.</Text>}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
   
    tabContainer: {
        // backgroundColor: '#FFF',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    tabWrapper: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 25,
        backgroundColor: '#FFF',
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 23,
    },
    activeTab: {
        backgroundColor: '#00AFF5',
    },
    tabText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#FFF',
    },
    listContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 20,
    },
    paymentCard: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    authorText: {
        flexDirection: "row",
        alignItems: "center"
    },
    nameText: {
        fontWeight: '600',
    },
    statusBadge: {
        backgroundColor: '#00BCD4',
        color: '#FFF',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        fontSize: 11,
        fontWeight: '600',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    ratingCard: {
        flexDirection: "row",
        alignItems: 'center',
        gap: 4,
        backgroundColor: "#F7F7F7",
        paddingHorizontal: 8,
        height: 25,
        borderRadius: 10
    },
    ratingText: {
        fontSize: 11,
        fontWeight: '500',
    },
    authorContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: "#F7F7F7",
        paddingHorizontal: 8,
        height: 25,
        borderRadius: 10
    },
    reviewText: {
        fontSize: 11,
        color: '#666',
    },
    amountText: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        color: Colors.SECONDARY
    },
    detailText: {
        fontSize: 12,
        color: Colors.TEXT_COLOR,
        marginBottom: 4,
        fontWeight:"600"
    },
    deleteButton: {
        width: "40%",
        borderWidth: 1,
        borderColor: Colors.TEXT_COLOR,
        borderRadius: 14,
        paddingVertical: 8,
        alignItems: 'center',
        marginTop: 12,
    },
    deleteButtonText: {
        fontSize: 14,
        color: Colors.TEXT_COLOR,
        fontWeight: '500',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#999'
    }
});

export default WalletPaymentSummary;