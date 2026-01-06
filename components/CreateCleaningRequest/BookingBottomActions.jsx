import { Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import { Body1, Body2, ButtonText, H2, H3, H5 } from '../typo/typography';

export default function BookingActions({
    rate,
    setRate,
    sendToFavorites,
    setSendToFavorites,
    onCreatePress
}) {
    return (
        <View>
            <H5 style={styles.sectionTitle}>Select a rate</H5>

            <View style={styles.rateSelector}>
                <Pressable
                    style={styles.rateButton}
                    onPress={() => setRate(Math.max(0, rate - 5))}
                >
                    <H3>-</H3>
                </Pressable>

                <H2>{rate}€</H2>

                <Pressable
                    style={styles.rateButton}
                    onPress={() => setRate(rate + 5)}
                >
                    <H3>+</H3>
                </Pressable>
            </View>

            <Pressable style={styles.priceListButton}>
                <Body1 style={styles.priceListText}>Price List</Body1>
            </Pressable>

            <Pressable
                style={styles.favoriteSection}
                onPress={() => setSendToFavorites(!sendToFavorites)}
            >
                <View>
                    <H5 style={styles.favoriteTitle}>Send To My Favorite Cleaners</H5>
                    <Body2 style={styles.favoriteSubtitle}>Favorite Cleaners</Body2>
                </View>
                <View style={[styles.toggle, sendToFavorites && styles.toggleActive]}>
                    <View style={[styles.toggleThumb, sendToFavorites && styles.toggleThumbActive]} />
                </View>
            </Pressable>

            <Pressable style={styles.createButton} onPress={onCreatePress}>
                <ButtonText style={styles.createButtonText}>Create Now</ButtonText>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        marginBottom: 16,
        marginTop: 30,
    },
    rateSelector: {
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: '#E5E5E5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    rateButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        alignItems: 'center',
    },
    priceListButton: {
        alignItems: 'center',
        marginBottom: 24,
    },
    priceListText: {
        textDecorationLine: 'underline',
    },
    favoriteSection: {
        backgroundColor: 'white',
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: '#E5E5E5',
        padding: 16,
        marginBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    favoriteTitle: {
        marginBottom: 4,
    },
    favoriteSubtitle: {
        color: '#999',
    },
    toggle: {
        width: 50,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#E5E5E5',
        padding: 2,
        justifyContent: 'center',
    },
    toggleActive: {
        backgroundColor: '#1A1A1A',
    },
    toggleThumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    toggleThumbActive: {
        alignSelf: 'flex-end',
    },
    createButton: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 8,
        padding: 18,
        alignItems: 'center',
        marginBottom: 32,
    },
    createButtonText: {
        color: 'white',
    },
});
