import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import { BackwordAngleIcon } from '../../assets/icons/Icons';
import { Body1, Caption } from '../typo/typography';

export default function Calendar() {
    const { t } = useTranslation();

    // const months = [
    //     "January", "February", "March", "April", "May", "June",
    //     "July", "August", "September", "October", "November", "December"
    // ];

    const months = t("calendar.months", { returnObjects: true });

    const realToday = new Date();
    const realDate = realToday.getDate();
    const realMonth = realToday.getMonth();

    const [activeMonthIndex, setActiveMonthIndex] = useState(realMonth);
    const [selectedDate, setSelectedDate] = useState(realDate);
    const [days, setDays] = useState([]);


    const handleNextMonth = () => {
        setActiveMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
    };

    const handlePrevMonth = () => {
        setActiveMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
    };

    useEffect(() => {
        const year = realToday.getFullYear();
        const monthDays = [];
        const dayLabels = t("calendar.days", { returnObjects: true });

        // const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        let startDay = (activeMonthIndex === realMonth) ? realDate - 3 : 1;

        for (let i = 0; i < 7; i++) {
            const d = new Date(year, activeMonthIndex, startDay + i);
            monthDays.push({
                day: dayLabels[d.getDay()],
                date: d.getDate(),
                month: d.getMonth()
            });
        }
        setDays(monthDays);


        if (activeMonthIndex === realMonth) {
            setSelectedDate(realDate);
        } else {
            setSelectedDate(null);
        }
    }, [activeMonthIndex]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handlePrevMonth}>
                        <BackwordAngleIcon />
                    </TouchableOpacity>

                    <Body1 style={styles.monthText}>
                        {months[activeMonthIndex]}
                    </Body1>

                    <TouchableOpacity onPress={handleNextMonth}>
                        <View style={{ transform: [{ rotate: '180deg' }] }}>
                            <BackwordAngleIcon />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Days Row */}
                <View style={styles.daysRow}>
                    {days.map((item, index) => {
                        const isActive = item.date === selectedDate && item.month === activeMonthIndex;

                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedDate(item.date)}
                                style={[
                                    styles.dayItem,
                                    isActive && styles.activeDay
                                ]}
                            >
                                <Body1 style={[styles.dayText, isActive && styles.activeText]}>
                                    {item.day}
                                </Body1>
                                <Caption style={[styles.dateText, isActive && styles.activeText]}>
                                    {item.date}
                                </Caption>
                            </TouchableOpacity>
                        );
                    })}
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { padding: 2, paddingTop: 20 },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingVertical: 16,
        // paddingHorizontal: 10,
        elevation: 1,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    monthText: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.PRIMARY,
        paddingHorizontal:20
    },
    daysRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayItem: {
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 20,
        width: 44,
    },
    activeDay: {
        backgroundColor: Colors.PRIMARY,
    },
    dayText: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 2,
    },
    dateText: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    activeText: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
});