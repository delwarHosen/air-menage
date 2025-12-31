import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../assets/Colors.js';
import { Body2 } from '../../components/typo/typography.jsx';
import { IMAGE_CONSTANTS } from '../../constants/image.index.js';

export default function PersonalIfo() {
    const router = useRouter();

    const fields = [
        { id: '1', label: "Full Name", value: "John Doe" },
        { id: '2', label: "Email", value: "johndoe@example.com" },
        { id: '3', label: "Phone Number", value: "+1 234 567 890" },
        { id: '4', label: "Address", value: "123 Main Street" },
        { id: '5', label: "City", value: "New York" },
        { id: '6', label: "Country", value: "United States" },
    ];

    const renderInfoCard = ({ item }) => (
        <View style={styles.infoCard}>
            <Body2 style={styles.labelStyle}>{item.label}</Body2>
            <Body2 style={styles.valueText}>{item.value}</Body2>
        </View>
    );

    const Header = () => (
        <>
            <View style={styles.headerRow}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backIconContainer}
                >
                    <Ionicons name='arrow-back' size={24} color={"#7E8792"} />
                </TouchableOpacity>
                <Body2 style={styles.headerTitle}>Personal Information</Body2>
            </View>

            <View style={styles.profileSection}>
                <Image
                    source={IMAGE_CONSTANTS.profile}
                    style={styles.profileImage}
                />
            </View>
        </>
    );

   
    const Footer = () => (
        <>
            <TouchableOpacity
                onPress={() => router.push({
                    pathname: "/host/personal-edit-info",
                    params: {
                        fullName: fields.find(f => f.label === "Full Name")?.value,
                        email: fields.find(f => f.label === "Email")?.value,
                        phone: fields.find(f => f.label === "Phone Number")?.value,
                        address: fields.find(f => f.label === "Address")?.value,
                        city: fields.find(f => f.label === "City")?.value,
                        country: fields.find(f => f.label === "Country")?.value,
                    }
                })}
                style={styles.submitButton}>
                <Body2 style={styles.buttonText}>Edit Profile</Body2>
            </TouchableOpacity>
            <View style={{ height: 40 }} />
        </>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <FlatList
                    data={fields}
                    renderItem={renderInfoCard}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={Header}
                    ListFooterComponent={Footer}
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    // This maintains the gap between cards
                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FAFAFA"
    },
    scrollContainer: {
        paddingHorizontal: "5%",
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20,
        width: '100%',
        height: 43,
    },
    backIconContainer: {
        position: 'absolute',
        left: 0,
        width: 43,
        height: 43,
        borderRadius: 23,
        backgroundColor: "#EBEBEE",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#CACACB",
        zIndex: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: "#0F243E",
        textAlign: "center",
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImage: {
        height: 120,
        width: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        backgroundColor: '#E1E1E1',
    },
    infoCard: {
        width: "100%",
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#CACACB",
        backgroundColor: "#FFFFFF",
        paddingTop: 6,
        paddingBottom: 6,
        paddingHorizontal: 12,
        justifyContent: 'center',
    },
    labelStyle: {
        fontSize: 10,
        color: "#0F243E",
        marginBottom: 1,
        textTransform: 'uppercase',
    },
    valueText: {
        fontSize: 14,
        color: "#0F243E",
        fontWeight: "500",
    },
    submitButton: {
        width: "100%",
        alignSelf: 'center',
        backgroundColor: "#00AFF5",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 30,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600"
    },
});