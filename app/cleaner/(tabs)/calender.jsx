import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from "../../../assets/Colors";
import { ClockIcon, LocationIcon, RefreshIcon } from '../../../assets/icons/Icons';
import { Body1, Body2, H6 } from "../../../components/typo/typography";

export default function CleaningCalendar() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownHeight] = useState(new Animated.Value(0));
  const [refreshKey, setRefreshKey] = useState(0);
  const currentYear = 2025;
  const { t } = useTranslation();


  const cleaningData = {
    0: [ // January
      { date: '2025-01-05', location: 'e.g. B. Berlin or "Peak Fit...', time: '10:00-16:00', duration: '1h30', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=200&h=200&fit=crop' },
      { date: '2025-01-20', location: 'City Center Apartment', time: '09:00-12:00', duration: '1h30', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=200&fit=crop' },
    ],
    1: [ // February
      { date: '2025-02-05', location: 'Business Plaza', time: '11:00-15:00', duration: '2h30', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=200&fit=crop' },
      { date: '2025-02-12', location: 'Residential Complex', time: '08:00-11:00', duration: '1h45', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=200&fit=crop' },
      { date: '2025-02-18', location: 'Office Building', time: '13:00-17:00', duration: '3h', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&h=200&fit=crop' },
      { date: '2025-02-25', location: 'Shopping Mall', time: '10:00-13:00', duration: '2h', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=200&h=200&fit=crop' },
    ],
    2: [ // March
      { date: '2025-03-08', location: 'Luxury Villa', time: '09:00-15:00', duration: '4h', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=200&h=200&fit=crop' },
      { date: '2025-03-15', location: 'Penthouse Suite', time: '10:00-14:00', duration: '3h', image: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=200&h=200&fit=crop' },
      { date: '2025-03-22', location: 'Studio Loft', time: '11:00-13:00', duration: '1h30', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=200&h=200&fit=crop' },
    ],
    3: [ // April
      { date: '2025-04-02', location: 'e.g. B. Berlin or "Peak Fit...', time: '10:00-16:00', duration: '1h30', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=200&h=200&fit=crop' },
      { date: '2025-04-15', location: 'Mountain Lodge', time: '10:00-14:00', duration: '3h', image: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=200&h=200&fit=crop' },
      { date: '2025-04-22', location: 'City Loft', time: '11:00-15:00', duration: '2h', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=200&h=200&fit=crop' },
    ],
    4: [ // May
      { date: '2025-05-08', location: 'Garden House', time: '09:00-13:00', duration: '2h45', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=200&h=200&fit=crop' },
      { date: '2025-05-20', location: 'Penthouse Suite', time: '14:00-18:00', duration: '3h30', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=200&h=200&fit=crop' },
      { date: '2025-05-25', location: 'Downtown Condo', time: '10:00-12:00', duration: '1h30', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&h=200&fit=crop' },
    ],
    5: [ // June
      { date: '2025-06-17', location: 'Beachfront Villa', time: '08:00-12:00', duration: '3h', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&h=200&fit=crop' },
      { date: '2025-06-18', location: 'Corporate Office', time: '10:00-14:00', duration: '2h30', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=200&h=200&fit=crop' },
      { date: '2025-06-19', location: 'Studio Apartment', time: '15:00-17:00', duration: '1h30', image: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=200&h=200&fit=crop' },
      { date: '2025-06-20', location: 'Modern Loft', time: '09:00-13:00', duration: '2h', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=200&h=200&fit=crop' },
      { date: '2025-06-21', location: 'Luxury Suite', time: '11:00-15:00', duration: '3h', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=200&fit=crop' },
      { date: '2025-06-22', location: 'City Apartment', time: '08:00-11:00', duration: '2h', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&h=200&fit=crop' },
      { date: '2025-06-23', location: 'Beach House', time: '10:00-14:00', duration: '3h30', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=200&h=200&fit=crop' },
      { date: '2025-06-24', location: 'Downtown Villa', time: '12:00-16:00', duration: '2h30', image: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=200&h=200&fit=crop' },
      { date: '2025-06-25', location: 'Urban Condo', time: '09:00-12:00', duration: '2h', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=200&h=200&fit=crop' },
      { date: '2025-06-26', location: 'Lake House', time: '10:00-13:00', duration: '2h15', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=200&h=200&fit=crop' },
      { date: '2025-06-27', location: 'Penthouse', time: '14:00-18:00', duration: '3h', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=200&h=200&fit=crop' },
      { date: '2025-06-28', location: 'Riverside Villa', time: '08:00-12:00', duration: '3h30', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&h=200&fit=crop' },
    ],
    6: [ // July
      { date: '2025-07-10', location: 'Holiday Resort', time: '09:00-15:00', duration: '4h', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=200&h=200&fit=crop' },
      { date: '2025-07-18', location: 'Modern Condo', time: '11:00-14:00', duration: '2h', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=200&fit=crop' },
      { date: '2025-07-25', location: 'Country House', time: '08:00-13:00', duration: '3h30', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&h=200&fit=crop' },
    ],
    7: [ // August
      { date: '2025-08-03', location: 'Downtown Apartment', time: '09:00-12:00', duration: '2h', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=200&h=200&fit=crop' },
      { date: '2025-08-14', location: 'Riverside Villa', time: '10:00-15:00', duration: '3h30', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=200&fit=crop' },
    ],
    8: [ // September
      { date: '2025-09-05', location: 'Skyline Tower', time: '11:00-16:00', duration: '4h', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&h=200&fit=crop' },
    ],
    9: [ // October
      { date: '2025-10-10', location: 'Heritage Building', time: '10:00-14:00', duration: '3h', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=200&h=200&fit=crop' },
    ],
    10: [ // November (empty)
      { date: '2025-11-10', location: 'Heritage Building', time: '10:00-14:00', duration: '3h', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=200&h=200&fit=crop' },
    ],
    11: [ // December (empty)
      { date: '2025-12-10', location: 'Heritage Building', time: '10:00-14:00', duration: '3h', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=200&h=200&fit=crop' },
    ],
  };

  const months = ['Ja', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', "Aug", "Sep", "Oct", "Nob", "Dec"];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[date.getDay()]} ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Refresh button handler
  const handleRefresh = () => {
    setSelectedMonth(null);
    setSelectedDate(null);
    setShowDropdown(false);
    setRefreshKey(prev => prev + 1);
    dropdownHeight.setValue(0);
  };


  const handleMonthClick = (monthIndex) => {
    const hasWork = cleaningData[monthIndex] && cleaningData[monthIndex].length > 0;

    if (hasWork) {
      if (selectedMonth === monthIndex && showDropdown) {
        toggleDropdown();
        // setSelectedDate(null);
      } else {
        setSelectedMonth(monthIndex);
        // setSelectedDate(null);

        if (!showDropdown) {
          toggleDropdown();
        }
      }
    }
  };

  // Dropdown toggle
  const toggleDropdown = () => {
    const toValue = showDropdown ? 0 : 1;
    setShowDropdown(!showDropdown);

    Animated.timing(dropdownHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const dropdownAnimatedHeight = useMemo(() => {
    dropdownHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 400],
    })
  }, [dropdownHeight])

 
  const selectedMonthDates = useMemo(() => {
    if (selectedMonth === null) return []
    return cleaningData[selectedMonth] || []
  }, [selectedMonth, cleaningData])


  const selectedCardData = useMemo(() => {
    if (!selectedDate || selectedMonth === null) return null;
    return cleaningData[selectedMonth]?.find(
      item => item.date === selectedDate
    )
  }, [selectedDate, selectedMonth, cleaningData])



  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <H6 style={styles.headerTitle}>Calendar</H6>
        <TouchableOpacity
          style={styles.headerRight}
          onPress={handleRefresh}
          activeOpacity={0.6}
        >
          <RefreshIcon color={Colors.PRIMARY} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Calendar Grid - Horizontal ScrollView */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.calendarScrollView}
          contentContainerStyle={styles.calendarScrollContent}
          scrollEnabled={true}
          bounces={true}
        >
          {months.map((month, idx) => {
            const workCount = cleaningData[idx]?.length || 0;
            const isActive = idx === selectedMonth && showDropdown;

            return (
              <TouchableOpacity
                key={`${month}-${refreshKey}`}
                style={styles.monthItem}
                onPress={() => handleMonthClick(idx)}
                disabled={workCount === 0}
                activeOpacity={0.7}
              >
                <Body2 style={[styles.monthLabel, workCount === 0 && styles.monthLabelDisabled]}>
                  {month}
                </Body2>
                <View style={[
                  styles.dateCircle,
                  isActive && styles.dateCircleActive
                ]}>
                  <Text style={[
                    styles.dateText,
                    isActive && styles.dateTextActive
                  ]}>
                    {String(idx + 1).padStart(2, '0')}
                  </Text>
                </View>
                <View style={styles.dotsContainer}>
                  {workCount > 0 && Array.from({ length: Math.min(workCount, 3) }).map((_, i) => (
                    <View key={i} style={styles.dot} />
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Dropdown Toggle Icon */}
        {selectedMonthDates.length > 0 && (
          <TouchableOpacity
            style={styles.dropdownToggle}
            onPress={toggleDropdown}
            activeOpacity={0.6}
          >
            <Ionicons
              name={showDropdown ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#6B7280"
            />
          </TouchableOpacity>
        )}

        {/* Selected Date Display - Card এর আগে */}
        {selectedCardData && (
          <Body1 style={styles.selectedDate}>
            {formatDate(selectedDate)}
          </Body1>
        )}

        {/* Cleaning Request Card */}
        {selectedCardData && (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Image
                source={{ uri: selectedCardData.image }}
                style={styles.cardImage}
              />
              <View style={styles.cardDetails}>
                <View style={styles.cardRow}>
                  <LocationIcon size={16} color="#6B7280" />
                  <Body2 style={styles.cardText} numberOfLines={1}>
                    {selectedCardData.location}
                  </Body2>
                </View>
                <View style={styles.cardRow}>
                  <ClockIcon size={16} color="#6B7280" />
                  <Body2 style={styles.cardText}>{selectedCardData.time}</Body2>
                </View>
                <View style={styles.cardRow}>
                  <ClockIcon size={16} color="#6B7280" />
                  <Body2 style={styles.cardText}>{selectedCardData.duration}</Body2>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
              <Body2 style={styles.submitButtonText}>Submit</Body2>
            </TouchableOpacity>
          </View>
        )}

        {/* Dropdown - Available Dates */}
        <Animated.View style={[styles.dropdown, { maxHeight: dropdownAnimatedHeight }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectedMonthDates.map((item, idx) => (
              <TouchableOpacity
                key={`${item.date}-${idx}`}
                style={[
                  styles.dropdownItem,
                  selectedDate === item.date && styles.dropdownItemActive
                ]}
                onPress={() => setSelectedDate(item.date)}
                activeOpacity={0.7}
              >
                <Body2 style={[
                  styles.dropdownText,
                  selectedDate === item.date && styles.dropdownTextActive
                ]}>
                  {formatDate(item.date)}
                </Body2>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFF',
  },
  headerLeft: {
    width: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  headerRight: {
    width: 24,
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  calendarScrollView: {
    marginBottom: 8,
  },
  calendarScrollContent: {
    paddingHorizontal: 20,
    paddingRight: 40,
  },
  monthItem: {
    alignItems: 'center',
    marginRight: 28,
  },
  monthLabel: {
    color: '#6B7280',
    fontSize: 13,
    marginBottom: 10,
  },
  monthLabelDisabled: {
    color: '#D1D5DB',
  },
  dateCircle: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,

  },
  dateCircleActive: {
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PRIMARY
  },
  dateText: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
  },
  dateTextActive: {
    color: '#FFF',
    fontWeight: '600',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 3,
    height: 8,
    minHeight: 8,
    justifyContent: 'center',
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: '#1F2937',
    borderRadius: 2.5,
  },
  dropdownToggle: {
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 4,
  },
  selectedDate: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 12,
    paddingHorizontal: 20,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  cardImage: {
    width: 90,
    height: 110,
    borderRadius: 8,
  },
  cardDetails: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardText: {
    color: '#6B7280',
    fontSize: 13,
    flex: 1,
  },
  submitButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  dropdown: {
    overflow: 'hidden',
    paddingHorizontal: 20,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  dropdownItemActive: {
    backgroundColor: 'transparent',
  },
  dropdownText: {
    color: '#6B7280',
    fontSize: 14,
  },
  dropdownTextActive: {
    color: '#1F2937',
    fontWeight: '500',
  },
});