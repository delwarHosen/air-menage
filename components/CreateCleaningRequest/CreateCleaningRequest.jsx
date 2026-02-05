import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Colors } from '../../assets/Colors';
import { FORM_FIELDS } from '../../constants/form';
import { useCreateCleaningRequestMutation, useGetPropertiesQuery } from '../../redux/services/propertyApi';
import { Body1, Body2, ButtonText, H2, H3, H5 } from '../typo/typography';
import DatePicker from './DatePicker';
import LinenHandlingForm from './LinenHandlingForm';
import PriceListModal from './PriceListModal';
import PropertySelector from './PropertySelector';
import TimePicker from './TimePicker';


export default function CreateCleaningRequest() {
  const { data: properties, isLoading, isError, error } = useGetPropertiesQuery();
  const [createCleaningRequest, { isLoading: isBooking }] = useCreateCleaningRequestMutation();


  const { t } = useTranslation();
  const router = useRouter();
  const [selectedProperty, setSelectedProperty] = useState(properties[0]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('10:30');
  const [endTime, setEndTime] = useState('12:00');
  const [cleaningTime, setCleaningTime] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [dropOffAddress, setDropOffAddress] = useState('');
  const [rate, setRate] = useState(50);
  const [sendToFavorites, setSendToFavorites] = useState(false);
  const [priceListVisible, setPriceListVisible] = useState(false);



  // console.log("from rtk query:", properties);
  // console.log("Kitchen Work:", properties[0].kitchenWork);


  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      [FORM_FIELDS.ADDRESS_BOX]: "",
      selectedOption: null,
      sendToFavorites: false,
      rate: 50
    }
  });

  useEffect(() => {
    if (startTime && endTime) {
      const [sh, sm] = startTime.split(':').map(Number);
      const [eh, em] = endTime.split(':').map(Number);

      let startMinutes = sh * 60 + sm;
      let endMinutes = eh * 60 + em;

      if (endMinutes <= startMinutes) endMinutes += 24 * 60;

      const diff = endMinutes - startMinutes;
      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;

      let displayTime = "";
      if (hours > 0) displayTime += `${hours} ${hours > 1 ? 'Hours' : 'Hour'}`;
      if (minutes > 0) displayTime += ` ${minutes} min`;

      setCleaningTime(displayTime.trim());
    }
  }, [startTime, endTime]);



  const handleCreateCleaningRequest = async (formData) => {
    try {
      const statuses = ["Pending", "Validate"];

      const randomStatus = statuses[Math.floor(Math.random * statuses.length)];

      const createNewCleaningRequest = {
        propertyId: selectedProperty?.id,
        date: selectedDate.toISOString(),
        startTime,
        endTime,
        cleaningTime,
        rate,
        isFavorite: sendToFavorites,
        linenOption: selectedOption,
        status: randomStatus,
        ...formData

      };

      await createCleaningRequest(createNewCleaningRequest).unwrap();
      Alert.alert("Booking Saved to Local DB!");
      router.back();

    } catch (error) {
      console.error("fail to create cleaning request..");
      Alert.alert("Something want wrong", error.message);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        bounces={true}
        overScrollMode="auto"
      >
        <View style={styles.content}>

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
            control={control}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />

          <View style={styles.bottomSection}>
            <H5 style={styles.sectionTitle}>{t('booking.select_rate')}</H5>

            <View style={styles.rateSelector}>
              <Pressable style={styles.rateButton} onPress={() => setRate(prev => Math.max(0, prev - 5))}>
                <H3>-</H3>
              </Pressable>
              <H2>{rate}€</H2>
              <Pressable style={styles.rateButton} onPress={() => setRate(prev => prev + 5)}>
                <H3>+</H3>
              </Pressable>
            </View>

            <Pressable
              style={styles.priceListButton}
              onPress={() => setPriceListVisible(true)}
            >
              <Body1 style={styles.priceListText}>
                {t('booking.price_list')}
              </Body1>
            </Pressable>

            <Pressable
              style={styles.favoriteSection}
              onPress={() => setSendToFavorites(prev => !prev)}
            >
              <View style={styles.favoriteTextContainer}>
                <H5 style={styles.favoriteTitle}>
                  {t('booking.send_to_favorites')}
                </H5>
                <Body2 style={styles.favoriteSubtitle} numberOfLines={2}>
                  {t('booking.favorite_cleaners')}
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

            <Pressable
              // onPress={handleSubmit((data) => {
              //   console.log("Final Data:", data);
              //   router.push("./properties");
              // })}
              onPress={handleSubmit(handleCreateCleaningRequest)}
              disabled={isBooking}
              style={styles.createButton}>
              <ButtonText style={styles.createButtonText}>
                {t('booking.create_now')}
              </ButtonText>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <PriceListModal visible={priceListVisible} onClose={() => setPriceListVisible(false)} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40
  },
  content: {
    padding: '5%',
    paddingTop: 22
  },
  bottomSection: { marginTop: 20 },
  sectionTitle: { marginBottom: 16 },
  rateSelector: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    marginBottom: 16
  },
  rateButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5'
  },
  priceListButton: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 30
  },
  priceListText: { textDecorationLine: 'underline', color: Colors.PRIMARY || '#000' },

  favoriteSection: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  favoriteTextContainer: {
    flex: 1,
    marginRight: 10,
  },

  favoriteTitle: {
    marginBottom: 4,
  },

  favoriteSubtitle: {
    color: '#999'
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
    backgroundColor: '#1A1A1A'
  },

  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF',
  },

  toggleThumbActive: {
    alignSelf: 'flex-end'
  },

  createButton: {
    backgroundColor: Colors.PRIMARY || '#1A1A1A',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 32
  },
  createButtonText: { color: '#FFF' },
});