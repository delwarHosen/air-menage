import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import { CalenderIcon } from '../../assets/icons/Icons';
import { Body1, Body2, Caption, H1, H5 } from '../typo/typography';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default function DatePicker({ selectedDate, onSelectDate }) {
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];
        for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
        for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d));
        return days;
    };

    const isSameDay = (d1, d2) => d1 && d2 && d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();

    const formatDate = (d) => {
        if (!d) return '';
        return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`;
    };

    return (
        <>
            <View>
                <H5 style={{ marginBottom: 5 }}>Date</H5>
                <TouchableOpacity style={styles.inputContainer} onPress={() => setCalendarVisible(true)}>
                    <H5 style={styles.inputText}>{selectedDate ? formatDate(selectedDate) : 'Select Date'}</H5>
                    <CalenderIcon />
                </TouchableOpacity>
            </View>

            <Modal animationType="fade" transparent visible={calendarVisible}>
                <View style={styles.calendarOverlay}>
                    <View style={styles.calendarModal}>
                        <View style={styles.dateContainer}>
                            <Body2>Select Date</Body2>
                            <H1 style={styles.dateHeading}>{selectedDate ? formatDate(selectedDate) : 'Select Date'}</H1>
                        </View>
                        <View style={styles.monthNavigation}>
                            <TouchableOpacity onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}><Text style={styles.navArrow}>‹</Text></TouchableOpacity>
                            <Body1 style={styles.monthYear}>{MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}</Body1>
                            <TouchableOpacity onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}><Body2 style={styles.navArrow}>›</Body2></TouchableOpacity>
                        </View>

                        <View style={styles.dayLabels}>{DAYS.map(d => <Caption key={d} style={styles.dayLabel}>{d}</Caption>)}</View>

                        <View style={styles.calendarGrid}>
                            {getDaysInMonth(currentMonth).map((d, i) => (
                                <TouchableOpacity key={i} style={[styles.dayCell, !d && styles.emptyDayCell, d && isSameDay(d, selectedDate) && styles.selectedDayCell]} onPress={() => d && onSelectDate(d)} disabled={!d}>
                                    {d && <Body1 style={[styles.dayText, isSameDay(d, selectedDate) && styles.selectedDayText]}>{d.getDate()}</Body1>}
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.calendarFooter}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setCalendarVisible(false)}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.okButton} onPress={() => setCalendarVisible(false)}>
                                <Text style={styles.okButtonText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        borderColor:Colors.BORDER_COLOR
    },

    inputText: {
        color: Colors.PLACE_HOLDER,
    },

    calendarOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    calendarModal: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 15,
        maxHeight: '80%',
    },

    dateContainer: {
        paddingBottom: 8,
        borderBottomWidth: 2,
        borderBottomColor: '#6C6C6C',
    },

    dateHeading: {
        color: Colors.PLACE_HOLDER,
        marginBottom: 15,
    },

    monthNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },

    

    navArrow: {
        fontSize: 22,
        color: '#6C6C6C',
        paddingHorizontal: 12,
    },

    dayLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },

    dayLabel: {
        width: 32,
        textAlign: 'center',
        fontSize: 12,
    },

    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 15,
    },

    dayCell: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 4,
    },

    emptyDayCell: {
        backgroundColor: 'transparent',
    },

    selectedDayCell: {
        backgroundColor: '#6C6C6C',
    },

    dayText: {
        fontSize: 14,
    },

    selectedDayText: {
        color: '#fff',
    },

    calendarFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    cancelButton: {
        flex: 1,
        marginRight: 5,
        backgroundColor: '#edf2ff',
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: 'center',
    },

    cancelButtonText: {
        color: '#6C6C6C',
    },

    okButton: {
        flex: 1,
        marginLeft: 5,
        backgroundColor: '#6C6C6C',
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: 'center',
    },

    okButtonText: {
        color: '#fff',
    },
});


