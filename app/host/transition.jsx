// import { useStripe } from '@stripe/stripe-react-native';
// import { useEffect, useState } from 'react';
// import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function Transaction() {
//     const { initPaymentSheet, presentPaymentSheet } = useStripe();
//     const [loading, setLoading] = useState(false);

//     // This function simulates fetching payment details from your backend
//     const fetchPaymentSheetParams = async () => {
//         // In a real app: const response = await fetch(`${API_URL}/payment-sheet`, { ... });
//         // For now, we mock the response data structure Stripe expects
//         return {
//             paymentIntent: 'pi_example_secret_...', // Client Secret from your backend
//             ephemeralKey: 'ek_example_...',
//             customer: 'cus_example_...',
//             publishableKey: 'pk_test_your_key',
//         };
//     };

//     const initializePaymentSheet = async () => {
//         setLoading(true);
//         const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

//         const { error } = await initPaymentSheet({
//             merchantDisplayName: "Your App Name",
//             customerId: customer,
//             customerEphemeralKeySecret: ephemeralKey,
//             paymentIntentClientSecret: paymentIntent,
//             allowsDelayedPaymentMethods: true,
//             defaultBillingDetails: { name: 'Jane Doe' }
//         });

//         if (!error) {
//             setLoading(false);
//         } else {
//             Alert.alert("Error", error.message);
//         }
//     };

//     const openPaymentSheet = async () => {
//         const { error } = await presentPaymentSheet();

//         if (error) {
//             Alert.alert(`Error code: ${error.code}`, error.message);
//         } else {
//             Alert.alert('Success', 'Your order is confirmed!');
//         }
//     };

//     useEffect(() => {
//         initializePaymentSheet();
//     }, []);

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Payment Transaction</Text>

//             <View style={styles.card}>
//                 <Text style={styles.amount}>Total: $25.00</Text>

//                 <TouchableOpacity 
//                     style={[styles.button, loading && { opacity: 0.5 }]} 
//                     onPress={openPaymentSheet}
//                     disabled={loading}
//                 >
//                     {loading ? (
//                         <ActivityIndicator color="#fff" />
//                     ) : (
//                         <Text style={styles.buttonText}>Pay Now</Text>
//                     )}
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: { 
//         flex: 1, 
//         backgroundColor: "#FAFAFA", 
//         justifyContent: "center", 
//         alignItems: "center",
//         padding: 20 
//     },
//     title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#1A3352' },
//     card: {
//         backgroundColor: '#fff',
//         padding: 30,
//         borderRadius: 15,
//         width: '100%',
//         alignItems: 'center',
//         elevation: 3, // Android shadow
//         shadowColor: '#000', // iOS shadow
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//     },
//     amount: { fontSize: 28, fontWeight: 'bold', marginBottom: 25 },
//     button: {
//         backgroundColor: '#5469d4', // Standard Stripe Blue
//         paddingVertical: 15,
//         paddingHorizontal: 40,
//         borderRadius: 10,
//         width: '100%',
//         alignItems: 'center'
//     },
//     buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' }
// });





import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Translation Hook
import {
    Modal,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../assets/Colors';
import { IMAGE_COMPONENTS } from '../../assets/image.index';
import Heading from '../../components/Heading/Heading';
import { Body1, Body2, ButtonText, Caption, H2, H4, H5 } from '../../components/typo/typography';

export default function PaymentScreen() {
    const { t } = useTranslation(); // Translation initialization
    const router = useRouter();
    const [modalVisible, setModalvisible] = useState(false);

    const modalOpen = () => {
        setModalvisible(!modalVisible);
    };

    const handleModalvisible = () => {
        setModalvisible(false);
        setTimeout(() => {
            router.back();
        }, 300);
    };

    const [fontsLoaded] = useFonts({
        'Syne-Regular': require("../../assets/fonts/Syne-Regular.ttf"),
    });

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Heading title={t('payment.header_title')} />
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

                {/* Balance Section */}
                <View style={styles.balanceContainer}>
                    <Body1 style={styles.greyText}>{t('payment.balance_label')}</Body1>
                    <H2 style={styles.balanceAmount}>$500</H2>
                </View>

                {/* Email Input */}
                <View style={styles.inputGroup}>
                    <Body1 style={styles.label}>{t('payment.email_label')}</Body1>
                    <TextInput
                        style={styles.textInput}
                        placeholder={t('payment.email_placeholder')}
                        placeholderTextColor="#B0B0B0"
                    />
                </View>

                <H5 style={styles.sectionTitle}>{t('payment.method_title')}</H5>

                {/* Card Information */}
                <View style={styles.inputGroup}>
                    <Body1 style={styles.label}>{t('payment.card_info_label')}</Body1>
                    <View style={styles.cardInputWrapper}>
                        <View style={styles.cardNumberRow}>
                            <TextInput
                                style={styles.cardNumberInput}
                                placeholder={t('payment.card_number_placeholder')}
                                keyboardType="numeric"
                            />
                            <View style={styles.cardLogos}>
                                <View style={[styles.miniLogo, { backgroundColor: '#EB001B' }]} />
                                <View style={[styles.miniLogo, { backgroundColor: '#1A1F71' }]} />
                            </View>
                        </View>
                        <View style={styles.cardDetailRow}>
                            <TextInput style={styles.detailInput} placeholder="MM/YY" />
                            <View style={styles.verticalDivider} />
                            <TextInput style={styles.detailInput} placeholder="CVC" />
                        </View>
                    </View>
                </View>

                {/* Cardholder Name */}
                <View style={styles.inputGroup}>
                    <Body1 style={styles.label}>{t('payment.cardholder_label')}</Body1>
                    <TextInput style={styles.textInput} placeholder={t('payment.cardholder_placeholder')} />
                </View>

                {/* Country Dropdown */}
                <View style={styles.inputGroup}>
                    <Body1 style={styles.label}>{t('payment.country_label')}</Body1>
                    <View style={styles.dropdown}>
                        <Body1>{t('payment.country_name')}</Body1>
                        <Ionicons name="chevron-down" size={20} color="#1A3352" />
                    </View>
                </View>

                {/* Save Information Checkbox */}
                <View style={styles.checkboxContainer}>
                    <View style={styles.checkbox} />
                    <View style={styles.checkboxTextContent}>
                        <Body2 style={styles.infoText}>{t('payment.save_info')}</Body2>
                        <Caption style={styles.subInfoText}>
                            {t('payment.save_info_sub')}
                        </Caption>
                    </View>
                </View>

                {/* Pay Button */}
                <TouchableOpacity style={styles.payButton} onPress={modalOpen}>
                    <H5 style={{ color: '#fff' }}>{t('payment.pay_button')}</H5>
                </TouchableOpacity>

                {/* Footer */}
                <View style={styles.footer}>
                    <Caption style={styles.footerText}>{t('payment.powered_by')} <Caption style={{ fontWeight: '700' }}>stripe</Caption></Caption>
                    <Caption style={styles.footerText}>{t('payment.terms')}</Caption>
                    <Caption style={styles.footerText}>{t('payment.privacy')}</Caption>
                </View>

            </ScrollView>

            {/* --------modal----------- */}
            <Modal
                animationType='fade'
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalvisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalcontent}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={IMAGE_COMPONENTS.paymentModalImage}
                                style={styles.modalImage}
                                resizeMode="contain"
                            />
                        </View>

                        <View style={styles.modalTextContainer}>
                            <H4 style={styles.titleText}>{t('payment.modal_title')}</H4>
                            <Body2 style={styles.descriptionText}>
                                {t('payment.modal_description')}
                            </Body2>
                        </View>

                        <TouchableOpacity onPress={handleModalvisible} style={styles.modalSuccessBtn}>
                            <ButtonText style={styles.modalButtonText}>{t('payment.modal_button')}</ButtonText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

// ... styles remain same as before ...
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 40
    },
    balanceContainer: {
        alignItems: 'center',
        marginVertical: 20
    },
    greyText: { color: '#7C7C7C' },
    balanceAmount: {
        marginTop: 5,
        color: '#1A3352'
    },
    sectionTitle: {
        marginTop: 25,
        marginBottom: 15
    },
    inputGroup: {
        marginBottom: 20
    },
    label: {

        marginBottom: 8,
        color: '#1A3352',
        fontWeight: '500'
    },

    textInput: {
        height: 55,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#1A3352',
        fontFamily: 'Syne-Regular',
    },

    cardInputWrapper: {
        borderWidth: 1,
        borderColor: '#D1D1D1',
        borderRadius: 10,
        overflow: 'hidden'
    },
    cardNumberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#D1D1D1'
    },
    cardNumberInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Syne-Regular',

    },
    cardLogos: {
        flexDirection: 'row',
        gap: 5
    },
    miniLogo: {
        width: 25,
        height: 15,
        borderRadius: 2
    },

    cardDetailRow: { flexDirection: 'row', height: 50 },
    detailInput: {
        fontFamily: 'Syne-Regular',
        flex: 1,
        paddingHorizontal: 15,
        fontSize: 16
    },
    verticalDivider: {
        width: 1,
        backgroundColor: '#D1D1D1'
    },

    dropdown: {
        height: 55,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        borderRadius: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    checkboxContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#D1D1D1',
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
        marginBottom: 30
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: '#D1D1D1',
        marginRight: 12
    },
    checkboxTextContent: { flex: 1 },
    infoText: { fontWeight: '600', color: '#1A3352' },
    subInfoText: { color: '#7C7C7C', marginTop: 2 },

    payButton: {
        backgroundColor: Colors.PRIMARY,
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 10
    },
    footerText: { color: '#7C7C7C' },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalcontent: {
        width: "85%",
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
    },
    imageContainer: {
        marginBottom: 10,
    },
    modalImage: {
        height: 135,
        width: 105,
    },
    modalTextContainer: {
        marginVertical: 30,
        alignItems: "center",
    },
    titleText: {
        marginBottom: 10,
        textAlign: 'center'
    },
    descriptionText: {
        textAlign: "center",
        lineHeight: 20,
        color: '#7C7C7C'
    },
    modalSuccessBtn: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 12,
        width: "100%",
        borderRadius: 10,
        marginTop: 10,
    },
    modalButtonText: {
        textAlign: "center",
        color: "#ffffff",
        fontWeight: 'bold'
    },
});