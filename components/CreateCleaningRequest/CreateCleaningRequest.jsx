import { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';

import { Colors } from '../../assets/Colors';
import { Body1, Body2, ButtonText, H2, H3, H5, H6 } from '../typo/typography';

import { IMAGE_COMPONENTS } from '../../assets/image.index';
import DatePicker from './DatePicker';
import LinenHandlingForm from './LinenHandlingForm';
import PriceListModal from './PriceListModal';
import PropertySelector from './PropertySelector';
import TimePicker from './TimePicker';

const properties = [
    { id: '1', name: 'San Francisco', img: IMAGE_COMPONENTS.selectPropertiImage, area: '50 m²', beds: '2 Bed', featured: true },
    { id: '2', name: 'New York Loft', img: IMAGE_COMPONENTS.selectPropertiImage, area: '75 m²', beds: '3 Bed', featured: true },
    { id: '3', name: 'Miami Beach House', img: IMAGE_COMPONENTS.selectPropertiImage, area: '120 m²', beds: '4 Bed', featured: false },
    { id: '4', name: 'Los Angeles Studio', img: IMAGE_COMPONENTS.selectPropertiImage, area: '35 m²', beds: '1 Bed', featured: false },
    { id: '5', name: 'Chicago Apartment', img: IMAGE_COMPONENTS.selectPropertiImage, area: '60 m²', beds: '2 Bed', featured: true },
];

export default function PropertyBookingScreens() {
    const [selectedProperty, setSelectedProperty] = useState(properties[0]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startTime, setStartTime] = useState('10:30');
    const [endTime, setEndTime] = useState('12:00');
    const [cleaningTime, setCleaningTime] = useState('');
    const [selectedOption, setSelectedOption] = useState('collect');
    const [dropOffAddress, setDropOffAddress] = useState('');
    const [rate, setRate] = useState(50);
    const [sendToFavorites, setSendToFavorites] = useState(false);
    const [priceListVisible, setPriceListVisible] = useState(false);

    
    useEffect(() => {
        const [sh, sm] = startTime.split(':').map(Number);
        const [eh, em] = endTime.split(':').map(Number);

        let startMinutes = sh * 60 + sm;
        let endMinutes = eh * 60 + em;

        if (endMinutes <= startMinutes) {
            endMinutes += 12 * 60;
        }

        const diff = endMinutes - startMinutes;
        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;

        if (hours && minutes) {
            setCleaningTime(`${hours} Hour${hours > 1 ? 's' : ''} ${minutes} min`);
        } else if (hours) {
            setCleaningTime(`${hours} Hour${hours > 1 ? 's' : ''}`);
        } else {
            setCleaningTime(`${minutes} min`);
        }
    }, [startTime, endTime]);

    
    const handleCreateBooking = () => {
        const bookingPayload = {
            propertyDetails: {
                id: selectedProperty.id,
                name: selectedProperty.name,
                image: selectedProperty.img, 
                area: selectedProperty.area,
                beds: selectedProperty.beds
            },
            bookingDate: selectedDate.toDateString(),
            timing: {
                start: startTime,
                end: endTime,
                totalDuration: cleaningTime
            },
            linenService: {
                type: selectedOption,
                address: selectedOption === 'deliver' ? dropOffAddress : 'Inside Property'
            },
            rateDetails: {
                amount: rate,
                currency: '€'
            },
            settings: {
                sendToFavorites: sendToFavorites
            }
        };

        console.log("======= ALL BOOKING DATA (WITH IMAGE) =======");
        console.log(JSON.stringify(bookingPayload, null, 2));
        console.log("================================");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <H6 style={{ marginBottom: 8 }}>Select Property</H6>
                    
                    <PropertySelector
                        properties={properties}
                        selectedProperty={selectedProperty}
                        onSelect={setSelectedProperty}
                    />

                    <DatePicker
                        selectedDate={selectedDate}
                        onSelectDate={setSelectedDate}
                    />

                    <TimePicker
                        startTime={startTime}
                        endTime={endTime}
                        setStartTime={setStartTime}
                        setEndTime={setEndTime}
                        cleaningTime={cleaningTime}
                    />

                    <LinenHandlingForm
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                        dropOffAddress={dropOffAddress}
                        setDropOffAddress={setDropOffAddress}
                    />

                    <View style={styles.bottomSection}>
                        <H5 style={styles.sectionTitle}>Select a rate</H5>

                        <View style={styles.rateSelector}>
                            <Pressable
                                style={styles.rateButton}
                                onPress={() => setRate(prev => Math.max(0, prev - 5))}
                            >
                                <H3>-</H3>
                            </Pressable>

                            <H2>{rate}€</H2>

                            <Pressable
                                style={styles.rateButton}
                                onPress={() => setRate(prev => prev + 5)}
                            >
                                <H3>+</H3>
                            </Pressable>
                        </View>

                        <Pressable
                            style={styles.priceListButton}
                            onPress={() => setPriceListVisible(true)}
                        >
                            <Body1 style={styles.priceListText}>Price List</Body1>
                        </Pressable>

                        <Pressable
                            style={styles.favoriteSection}
                            onPress={() => setSendToFavorites(prev => !prev)}
                        >
                            <View>
                                <H5 style={styles.favoriteTitle}>
                                    Send To My Favorite Cleaners
                                </H5>
                                <Body2 style={styles.favoriteSubtitle}>
                                    Favorite Cleaners
                                </Body2>
                            </View>

                            <View style={[styles.toggle, sendToFavorites && styles.toggleActive]}>
                                <View
                                    style={[
                                        styles.toggleThumb,
                                        sendToFavorites && styles.toggleThumbActive
                                    ]}
                                />
                            </View>
                        </Pressable>

                        <Pressable style={styles.createButton} onPress={handleCreateBooking}>
                            <ButtonText style={styles.createButtonText}>
                                Create Now
                            </ButtonText>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>

            <PriceListModal
                visible={priceListVisible}
                onClose={() => setPriceListVisible(false)}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    content: { padding: '4%', paddingTop: 22 },
    bottomSection: { marginTop: 20 },
    sectionTitle: { marginBottom: 16 },
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
        backgroundColor: '#FFF'
    },
    rateButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    priceListButton: { alignItems: 'center', marginBottom: 24 },
    priceListText: { textDecorationLine: 'underline', marginTop: 30 },
    favoriteSection: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: '#E5E5E5',
        padding: 16,
        marginBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    favoriteTitle: { marginBottom: 4 },
    favoriteSubtitle: { color: '#999' },
    toggle: {
        width: 50,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#E5E5E5',
        padding: 2,
        justifyContent: 'center',
    },
    toggleActive: { backgroundColor: '#1A1A1A' },
    toggleThumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFF',
    },
    toggleThumbActive: { alignSelf: 'flex-end' },
    createButton: {
        backgroundColor: Colors.PRIMARY || '#1A1A1A',
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        marginBottom: 32,
    },
    createButtonText: { color: '#FFF' },
});