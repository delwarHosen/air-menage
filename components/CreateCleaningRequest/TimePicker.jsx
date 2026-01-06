import { Syne_500Medium, useFonts } from '@expo-google-fonts/syne';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import { H5 } from '../typo/typography';

export default function TimePicker({ startTime, endTime, setStartTime, setEndTime, cleaningTime }) {
    let [fontsLoaded] = useFonts({ Syne_500Medium });
    const [showStartModal, setShowStartModal] = useState(false);
    const [showEndModal, setShowEndModal] = useState(false);

    const timeOptions = [
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
        '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
    ];

    const getEndTimeOptions = () => {
        if (!startTime) return timeOptions;
        const startIndex = timeOptions.indexOf(startTime);
        return timeOptions.slice(startIndex + 1);
    };

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    const TimePickerModal = ({ visible, onClose, options, onSelect, title }) => (
        <Modal visible={visible} transparent animationType="fade">
            <Pressable style={styles.modalOverlay} onPress={onClose}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <ScrollView style={styles.optionsList}>
                        {options.map(time => (
                            <Pressable
                                key={time}
                                style={styles.optionItem}
                                onPress={() => {
                                    onSelect(time);
                                    onClose();
                                }}
                            >
                                <Text style={styles.optionText}>{time}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            </Pressable>
        </Modal>
    );

    return (
        <>
            <View style={styles.formGroup}>
                <H5 style={styles.label}>Start Time</H5>
                <Pressable 
                    style={styles.pickerContainer}
                    onPress={() => setShowStartModal(true)}
                >
                    <H5 style={[
                        styles.pickerText,
                        !startTime && styles.placeholderText
                    ]}>
                        {startTime || 'Select Start Time'}
                    </H5>
                </Pressable>
            </View>

            <TimePickerModal
                visible={showStartModal}
                onClose={() => setShowStartModal(false)}
                options={timeOptions}
                onSelect={setStartTime}
                title="Select Start Time"
            />

            <View style={styles.formGroup}>
                <H5 style={styles.label}>End Time</H5>
                <Pressable 
                    style={[
                        styles.pickerContainer,
                        !startTime && styles.disabledPicker
                    ]}
                    onPress={() => startTime && setShowEndModal(true)}
                    disabled={!startTime}
                >
                    <Text style={[
                        styles.pickerText,
                        !endTime && styles.placeholderText
                    ]}>
                        {endTime || (startTime ? 'Select End Time' : 'Select Start Time First')}
                    </Text>
                </Pressable>
            </View>

            <TimePickerModal
                visible={showEndModal}
                onClose={() => setShowEndModal(false)}
                options={getEndTimeOptions()}
                onSelect={setEndTime}
                title="Select End Time"
            />

            <View style={styles.formGroup}>
                <H5 style={styles.label}>Estimated Cleaning Time</H5>
                <View style={[styles.inputContainer, styles.readonlyInput]}>
                    <H5 style={styles.inputText}>{cleaningTime}</H5>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    formGroup: { marginBottom: 25 },
    label: { color: Colors.TEXT_COLOR, marginBottom: 10 },
    pickerContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.BORDER_COLOR,
        padding: 16,
        justifyContent: 'center',
    },
    disabledPicker: {
        opacity: 0.5,
    },
    pickerText: {
        fontSize: 18,
        fontFamily: 'Syne_500Medium',
        color: Colors.TEXT_COLOR,
    },
    placeholderText: {
        color: Colors.PLACE_HOLDER,
    },
    inputContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        borderWidth: 2,
        borderColor: Colors.BORDER_COLOR,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    readonlyInput: { backgroundColor: "#ffffff" },
    inputText: { color: Colors.PLACE_HOLDER },
    
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 16,
        width: '80%',
        maxHeight: '70%',
        padding: 20,
    },
    modalTitle: {
        fontSize: 16,
        fontFamily: 'Syne_500Medium',
        color: Colors.TEXT_COLOR,
        marginBottom: 15,
        textAlign: 'center',
    },
    optionsList: {
        maxHeight: 300,
    },
    optionItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.BORDER_COLOR,
    },
    optionText: {
        fontSize: 16,
        fontFamily: 'Syne_500Medium',
        color: Colors.TEXT_COLOR,
        textAlign: 'center',
    },
    
   
});