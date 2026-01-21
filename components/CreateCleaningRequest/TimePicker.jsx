import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import { Body1, Body2, H5 } from '../typo/typography';

export default function TimePicker({ startTime, endTime, setStartTime, setEndTime, cleaningTime }) {
    const { t } = useTranslation();
   
    const [showStartModal, setShowStartModal] = useState(false);
    const [showEndModal, setShowEndModal] = useState(false);

    const timeOptions = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'];

    const getEndTimeOptions = () => {
        if (!startTime) return [];
        const startIndex = timeOptions.indexOf(startTime);
        return timeOptions.slice(startIndex + 1);
    };

    

    return (
        <>
            <View style={styles.formGroup}>
                <H5 style={styles.label}>{t('timepicker.start_time')}</H5>
                <Pressable style={styles.pickerContainer} onPress={() => setShowStartModal(true)}>
                    <H5 style={[styles.pickerText, !startTime && styles.placeholderText]}>{startTime || "Select Start"}</H5>
                </Pressable>
            </View>

            <View style={styles.formGroup}>
                <H5 style={styles.label}>{t('timepicker.end_time')}</H5>
                <Pressable style={[styles.pickerContainer, !startTime && styles.disabledPicker]} onPress={() => startTime && setShowEndModal(true)} disabled={!startTime}>
                    <H5 style={[styles.pickerText, !endTime && styles.placeholderText]}>{endTime || "Select End"}</H5>
                </Pressable>
            </View>

            <View style={styles.formGroup}>
                <H5 style={styles.label}>{t('timepicker.estimated_cleaning_time')}</H5>
                <View style={styles.readonlyInput}>
                    <Body1 style={""}>{String(cleaningTime || '0h')}</Body1>
                </View>
            </View>

            {/* Modal Logic (Shortened for brevity) */}
            <Modal visible={showStartModal} transparent animationType="fade">
                <Pressable style={styles.modalOverlay} onPress={() => setShowStartModal(false)}>
                    <View style={styles.modalContent}>
                        <ScrollView>{timeOptions.map(time => (
                            <Pressable key={time} style={styles.optionItem} onPress={() => { setStartTime(time); setShowStartModal(false); }}>
                                <Body2 style={styles.optionText}>{time}</Body2>
                            </Pressable>
                        ))}</ScrollView>
                    </View>
                </Pressable>
            </Modal>

            <Modal visible={showEndModal} transparent animationType="fade">
                <Pressable style={styles.modalOverlay} onPress={() => setShowEndModal(false)}>
                    <View style={styles.modalContent}>
                        <ScrollView>{getEndTimeOptions().map(time => (
                            <Pressable key={time} style={styles.optionItem} onPress={() => { setEndTime(time); setShowEndModal(false); }}>
                                <Body2 style={styles.optionText}>{time}</Body2>
                            </Pressable>
                        ))}</ScrollView>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    formGroup: {
        marginBottom: 18,
    },

    label: {
        color: Colors.TEXT_COLOR,
        marginBottom: 8,
    },

    pickerContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        padding: 16,
    },

    disabledPicker: {
        opacity: 0.5,
    },

    pickerText: {
        fontSize: 16,
    },

    placeholderText: {
        color: Colors.PLACE_HOLDER,
    },

    readonlyInput: {
        borderRadius: 12,
        padding: 16,
        borderWidth: 1.5,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor:"#FFFFFF"
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        backgroundColor: 'white',
        borderRadius: 16,
        width: '80%',
        maxHeight: '50%',
        padding: 10,
    },

    optionItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },

    optionText: {
        textAlign: 'center',
        fontSize: 16,
    },
});
