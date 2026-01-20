import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import Heading from "../../components/Heading/Heading";
import { Body1, Body2, H3, H5, H6 } from '../../components/typo/typography';

export default function CalenderProperty() {
    const { t } = useTranslation();
    const router = useRouter();
    const params = useLocalSearchParams();


    const year = 2026;
    const month = 0;
    const daysOfWeek = ['SA', 'SU', 'MO', 'TU', 'WE', 'TH', 'FRI'];

    const assignedWorkDate = 11;
    const nextWorkDate = 18;

    const cleanerImage = params.cleanerImage || "https://randomuser.me/api/portraits/women/44.jpg";

    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(year, month));

    // --- calender calculation ---
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


    const handleDayPress = (day) => {
        if (!day) return;

        if (day === assignedWorkDate) {
            router.push({
                // pathname: `/host/peopertyOverview/${params.id || '1'}`,
                pathname: `/host/booking-details`,
                params: { fromAchive: 'true' } 
            });
        }
      
        else if (day === nextWorkDate) {
            alert("Next cleaning schedule: Jan " + day);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={{ marginHorizontal: 20, paddingTop: 10 }}>
                <Heading title={t("properties.title")} />
                <TouchableOpacity onPress={() => router.push("./achive-cleaning")}>
                    <H6 style={styles.archiveText}>{t("cleanings.archived")}</H6>
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
                    {daysArray.map((day, index) => {
                        const isAssigned = day === assignedWorkDate;
                        const isNextDate = day === nextWorkDate;

                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleDayPress(day)}
                                disabled={!day}
                                style={[
                                    styles.dayBox,
                                    !day && styles.emptyBox,
                                    isAssigned && styles.selectedBox,
                                    isNextDate && styles.nextBox
                                ]}
                            >
                                {day && (
                                    <>
                                        <Body1 style={[
                                            styles.dayText,
                                            (isAssigned || isNextDate) && styles.selectedDayText
                                        ]}>
                                            {day < 10 ? `0${day}` : day}
                                        </Body1>

                                       
                                        {isAssigned && (
                                            <View style={styles.cleanerIconWrapper}>
                                                <Image
                                                    source={{ uri: cleanerImage }}
                                                    style={styles.cleanerThumb}
                                                />
                                            </View>
                                        )}

                                       
                                        {isNextDate && (
                                            <View style={styles.nextIndicator}>
                                                <Body1 style={styles.nextText}>NEXT</Body1>
                                            </View>
                                        )}
                                    </>
                                )}
                            </TouchableOpacity>
                        );
                    })}
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
                        <Body2 style={styles.cleaningText}>{"Create a\nCleaning Request"}</Body2>
                    </TouchableOpacity>

                    <View style={styles.guestSection}>
                        <Text style={styles.guestLabel}>GUEST RESERVATION</Text>
                        <View style={styles.guestButtons}>
                            <TouchableOpacity style={styles.guestBtnX}>
                                <H3 style={styles.guestBtnTextX}>X</H3>
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
        backgroundColor: '#FFF'
    },
    archiveText: {
        marginTop: 5,
        paddingBottom: 10,
        textAlign: "center",
        textDecorationLine: 'underline',
        color: Colors.SECONDARY
    },
    weekHeader: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 12,
        marginTop: 20,
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
    },
    dayBox: {
        width: '13%',
        height: 65,
        margin: '0.6%',
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 8,
        justifyContent: 'flex-start',
        position: 'relative'
    },
    emptyBox: {
        borderColor: 'transparent',
    },
    selectedBox: {
        backgroundColor: '#3F3F3F',
        borderColor: '#222222'
    },
    nextBox: {
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
    cleanerIconWrapper: {
        position: 'absolute',
        bottom: 5,
        alignSelf: 'center',
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#fff',
        overflow: 'hidden',
        backgroundColor: '#EEE'
    },
    cleanerThumb: {
        width: '100%',
        height: '100%',
    },
    nextIndicator: {
        position: 'absolute',
        bottom: 5,
        alignSelf: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderRadius: 20,
    },
    nextText: {
        fontSize: 8,
        fontWeight: 'bold',
        borderColor: '#222222'
    },
    footer: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 20,
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
    },
    guestBtnTextCheck: {
        color: '#111827',
        fontSize: 16,
        fontWeight: 'bold'
    }
});