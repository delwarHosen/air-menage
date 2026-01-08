import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import Heading from "../../components/Heading/Heading";
import { Body1, Caption, H5, H6 } from '../../components/typo/typography';

export default function CalenderProperty() {
     const { t } = useTranslation();
    const router = useRouter();
    const year = 2026;
    const month = 0; // January
    const daysOfWeek = ['SA', 'SU', 'MO', 'TU', 'WE', 'TH', 'FRI'];

   
    const [selectedDays, setSelectedDays] = useState([11, 18]);

    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(year, month));

    // --- Calculation Logic ---
    const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
    const getFirstDayIndex = (y, m) => {
        const firstDay = new Date(y, m, 1).getDay();
        return (firstDay + 1) % 7;
    };

    const totalDays = getDaysInMonth(year, month);
    const prefixDays = getFirstDayIndex(year, month);

    const daysArray = [];
    for (let i = 0; i < prefixDays; i++) daysArray.push(null);
    for (let i = 1; i <= totalDays; i++) daysArray.push(i);

    // --- Navigation & Toggle Logic ---
    const handleDayPress = (day) => {
        if (!day) return;

       
        if (selectedDays.includes(day)) {
            router.push({
                pathname: "/host/booking-details",
                params: { date: day, month: monthName, year: year }
            });
        } else {
            
            toggleDay(day);
        }
    };

    const toggleDay = (day) => {
        setSelectedDays(prev =>
            prev.includes(day)
                ? prev.filter(d => d !== day)
                : [...prev, day]
        );
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={{ marginHorizontal: 20, paddingTop: 10 }}>
               <Heading title={t("properties.title")} />
                <TouchableOpacity onPress={() => router.push("./archive-cleaning")}>
                    <H6 style={styles.archiveText}>{t("cleanings.archived")}</H6>;
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                style={{ flex: 1 }}
            >
                {/* Weekday Labels */}
                <View style={styles.weekHeader}>
                    {daysOfWeek.map(day => (
                        <H6 key={day} style={styles.dayLabel}>{day}</H6>
                    ))}
                </View>

                <H5 style={styles.monthHeader}>{monthName} {year}</H5>

                {/* Calendar Grid */}
                <View style={styles.grid}>
                    {daysArray.map((day, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleDayPress(day)}
                            disabled={!day}
                            style={[
                                styles.dayBox,
                                !day && styles.emptyBox,
                                selectedDays.includes(day) && styles.selectedBox
                            ]}
                        >
                            {day && (
                                <>
                                    <Body1 style={[
                                        styles.dayText,
                                        selectedDays.includes(day) && styles.selectedDayText
                                    ]}>
                                        {day < 10 ? `0${day}` : day}
                                    </Body1>

                                    {selectedDays.includes(day) && (
                                        <View style={styles.highlightIcon}>
                                            <Caption style={styles.hText}>H</Caption>
                                        </View>
                                    )}
                                </>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Footer Section */}
            <View style={styles.footer}>
                <View style={styles.topFooter}>
                    <TouchableOpacity style={styles.dateBtn}>
                        <Text style={styles.dateBtnText}>12 FEB</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeBtn}>
                        <Text style={styles.closeBtnText}>✕</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomFooter}>
                    <TouchableOpacity
                        style={styles.cleaningBtn}
                        onPress={() => router.push("/host/create-cleaning-request")}
                    >
                        <Text style={styles.cleaningText}>{"Create a\nCleaning Request"}</Text>
                    </TouchableOpacity>

                    <View style={styles.guestSection}>
                        <Text style={styles.guestLabel}>GUEST RESERVATION</Text>
                        <View style={styles.guestButtons}>
                            <TouchableOpacity style={styles.guestBtnX}>
                                <Text style={styles.guestBtnTextX}>X</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.guestBtnCheck}>
                                <Text style={styles.guestBtnTextCheck}>✓</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    archiveText: {
        marginTop: 5,
        paddingBottom:10,
        textAlign: "center",
        textDecorationLine: 'underline',
        color: Colors.SECONDARY
        // color:Colors.PRIMARY
    },
    weekHeader: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 12,
        marginTop: 20,
        textDecorationLine: 'underline',
    },
    dayLabel: {
        flex: 1,
        textAlign: 'center',
        color: Colors.SECONDARY,
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
    monthHeader: {
        fontSize: 18,
        marginBottom: 16,
        marginLeft: 16,
        marginTop: 12,
        color: Colors.SECONDARY
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
        // marginBottom: 180
    },
    dayBox: {
        width: '13%',
        height: "30%",
        aspectRatio: 0.7,
        margin: '0.6%',
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 8,

        justifyContent: 'flex-start',
    },
    emptyBox: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',

    },
    selectedBox: {
        backgroundColor: '#3F3F3F',
        borderColor: '#222222'
    },
    dayText: {
        fontSize: 14,
        color: Colors.SECONDARY,
        textAlign: "center",
        paddingTop: 6,
        fontWeight: '500'
    },
    selectedDayText: {
        color: '#FFFFFF'
    },
    highlightIcon: {
        position: 'absolute',
        bottom: 8,
        alignSelf: 'center',
        backgroundColor: '#222222',
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    hText: {
        color: '#222222',
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        fontSize: 10,
        fontWeight: 'bold',

        textAlign: 'center',
        lineHeight: 20,
    },

    footer: {
        // backgroundColor: '#F9FAFB',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 20,
        // borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    topFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 12,
        gap: 12
    },
    dateBtn: {
        backgroundColor: '#111827',
        paddingHorizontal: 25,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateBtnText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600'
    },
    closeBtn: {
        backgroundColor: '#111827',
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeBtnText: {
        color: '#FFFFFF',
        fontSize: 20
    },
    bottomFooter: {
        flexDirection: 'row',
        gap: 12,
    },
    cleaningBtn: {
        flex: 1.4,
        backgroundColor: '#111827',
        height: 90,
        borderRadius: 16,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cleaningText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20
    },
    guestSection: {
        flex: 1,
        backgroundColor: '#111827',
        borderRadius: 16,
        padding: 12,
        height: 90,
        justifyContent: 'space-between'
    },
    guestLabel: {
        color: '#9CA3AF',
        fontSize: 9,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        marginBottom: 4
    },
    guestButtons: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 10,
        padding: 4,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    guestBtnX: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    guestBtnTextX: {
        color: '#FFFFFF',
        fontSize: 14,
        opacity: 0.6
    },
    guestBtnCheck: {
        flex: 1.2,
        backgroundColor: '#FFFFFF',
        height: 34,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        elevation: 2
    },
    guestBtnTextCheck: {
        color: '#111827',
        fontSize: 16,
        fontWeight: 'bold'
    }
});


