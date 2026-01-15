import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from "../../../assets/Colors";
import { ClockIcon, LocationIcon, RefreshIcon } from '../../../assets/icons/Icons';
import { Body1, Body2, Caption, H6 } from "../../../components/typo/typography";


export default function CleaningCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 3, 2));
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(3);
  const [dropdownHeight] = useState(new Animated.Value(0));
  const currentYear = 2025;
  const { t } = useTranslation();

  const cleaningRequests = {
    '2025-04-01': 3,
    '2025-04-02': 5,
    '2025-04-03': 2,
    '2025-04-04': 1,
    '2025-04-05': 4,
    '2025-04-06': 1,
    '2025-04-07': 2,
    '2025-05-15': 3,
    '2025-06-17': 2,
    '2025-06-18': 1,
    '2025-06-19': 3,
    '2025-06-20': 2,
    '2025-06-21': 4,
    '2025-06-22': 1,
    '2025-06-23': 2,
    '2025-06-24': 3,
    '2025-06-25': 1,
    '2025-06-26': 2,
    '2025-06-27': 1,
    '2025-06-28': 3,
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July'];

  const getDateKey = (month, day) => {
    return `${currentYear}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const formatDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const upcomingDates = [];
  for (let i = 17; i <= 28; i++) {
    upcomingDates.push(new Date(2026, 5, i));
  }

  const toggleDropdown = () => {
    const toValue = showDropdown ? 0 : 1;
    setShowDropdown(!showDropdown);

    Animated.timing(dropdownHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const dropdownAnimatedHeight = dropdownHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 256],
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <H6>  {t("tabs.calender")}</H6>
        {/* <H6>Calendar</H6> */}
        <TouchableOpacity style={styles.headerRight}>
          <RefreshIcon />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          {months.map((month, idx) => {
            const requestCount = cleaningRequests[getDateKey(idx, idx + 1)] || 0;
            return (
              <TouchableOpacity
                key={month}
                style={styles.monthItem}
                onPress={() => setCurrentMonth(idx)}
              >
                <Body1 style={styles.monthLabel}>{month}</Body1>
                <View style={[
                  styles.dateCircle,
                  idx === currentMonth && styles.dateCircleActive
                ]}>
                  <Body1 style={[
                    styles.dateText,
                    idx === currentMonth && styles.dateTextActive
                  ]}>
                    {String(idx + 1).padStart(2, '0')}
                  </Body1>
                </View>
                <View style={styles.dotsContainer}>
                  {requestCount > 0 && Array.from({ length: Math.min(requestCount, 5) }).map((_, i) => (
                    <View key={i} style={styles.dot} />
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Dropdown Toggle */}
        <TouchableOpacity
          style={styles.dropdownToggle}
          onPress={toggleDropdown}
        >
          {showDropdown ? <Ionicons name='chevron-up' size={24} color="#000" /> : <Ionicons name='chevron-down' size={24} color="#000" />}
        </TouchableOpacity>

        {/* Selected Date */}
        <Body1 style={styles.selectedDate}>
          {formatDate(selectedDate)}
        </Body1>

        {/* Cleaning Request Card */}
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=200&h=200&fit=crop' }}
              style={styles.cardImage}
            />
            <View style={styles.cardDetails}>
              <View style={styles.cardRow}>
                <LocationIcon />
                <Body2 style={styles.cardText}>e.g. B. Berlin or "Peak Fit...</Body2>
              </View>
              <View style={styles.cardRow}>
                <ClockIcon />
                <Body2 style={styles.cardText}>10:00-16:00</Body2>
              </View>
              <View style={styles.cardRow}>
                <ClockIcon />
                <Body2 style={styles.cardText}>1h30</Body2>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.submitButton}>
            <Caption style={styles.submitButtonText}>Submit</Caption>
          </TouchableOpacity>
        </View>

        {/* Dropdown Modal */}
        <Animated.View style={[styles.dropdown, { maxHeight: dropdownAnimatedHeight, overflow: 'hidden' }]}>
          {upcomingDates.map((date, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.dropdownItem}
              onPress={() => {
                setSelectedDate(date);
                toggleDropdown();
              }}
            >
              <Body1 style={styles.dropdownText}>{formatDate(date)}</Body1>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerLeft: {
    width: 24,
  },
  headerRight: {
    width: 24,
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  calendarGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  monthItem: {
    alignItems: 'center',
  },
  monthLabel: {
    color: '#64748B',
    marginBottom: 8,
  },
  dateCircle: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateCircleActive: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 16,
  },
  dateText: {
    fontSize: 14,
  },
  dateTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 2,
    height: 8,
    minHeight: 8,
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: '#000',
    borderRadius: 3,
  },
  dropdownToggle: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  icon: {
    fontSize: 20,
  },
  selectedDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: "#B2B2B2",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    position: 'relative',
  },
  cardContent: {
    flexDirection: 'row',
    gap: 10,
    // marginBottom: 40,
  },
  cardImage: {
    width: 95,
    height: 110,
    borderRadius: 8,
  },
  cardDetails: {
    flex: 1,
    gap: 8,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardText: {
    color: '#6b7280',
  },
  submitButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  dropdown: {
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  dropdownText: {
    color: '#6B7280',
  },

});