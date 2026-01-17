import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FlatList, Platform, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import { CheckMarkIcon } from '../../assets/icons/Icons';
import Heading from "../../components/Heading/Heading";
import { Caption, H5 } from '../../components/typo/typography';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { FORM_FIELDS } from '../../constants/form';

const CHECKLIST_DATA = [
  { id: '1', title: 'General', items: ["Take out the trash", "Air out the accommodation", "Check for odors (fresh accommodation)", "Ensure lights are turned off", "Ensure doors and windows are closed", "Check that nothing has been left behind by travelers"] },
  { id: '2', title: 'Bedroom(s)', items: ["Make the bed with clean linens", "Change the sheets and pillowcases", "Dust furniture and surfaces", "Vacuum / sweep the floor"] },
  { id: '3', title: 'Bathroom / WC', items: ["Clean and disinfect the toilet", "Clean the shower / bathtub", "Clean the sink and faucets", "Wipe the mirrors", "Change towels", "Refill toilet paper", "Sweep the floor (broom + mop)"] },
  { id: '4', title: 'Kitchen / Kitchen Area', items: ["Wash and put away dishes", "Clean the sink and faucets", "Clean the countertop", "Clean the stove", "Wipe the microwave and fridge doors", "Check that the fridge is empty and clean", "Check that the oven is empty and clean", "Check that the microwave is empty and clean", "Sweep the floor"] },
  { id: '5', title: 'Living Room', items: ["Dust furniture and shelves", "Clean the table and surfaces", "Vacuum the sofa and cushions if necessary", "Vacuum / sweep", "Mop the floor"] },
];

export default function CheckList() {
  const { t } = useTranslation();
  const [checkedItems, setCheckedItems] = useState({});

  // react-hook-form initialization
  const { control, handleSubmit } = useForm({
    defaultValues: {
      [FORM_FIELDS.PROPERTY_IMAGE]: null,
    },
  });

  const toggleCheck = (sectionId, itemIndex) => {
    const key = `${sectionId}-${itemIndex}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const onSubmit = (values) => {
    try {
      // Checklist validation: ensures at least something is checked (Optional)
      const selectedCount = Object.values(checkedItems).filter(val => val).length;

      const payload = {
        completedTasks: checkedItems,
        image: values[FORM_FIELDS.PROPERTY_IMAGE],
      };

      console.log("Checklist Submitted:", payload);

      // Navigate to feedback screen
      router.push("/feedback/feedback");
    } catch (err) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(t("common.somethingWrong"), ToastAndroid.SHORT);
      }
    }
  };

  const renderSection = ({ item: section }) => (
    <View style={styles.section}>
      <H5 style={styles.sectionTitle}>
        {t(`checklist.${section.title}`, section.title)}
      </H5>

      {section.items.map((checkText, index) => {
        const isChecked = !!checkedItems[`${section.id}-${index}`];
        return (
          <TouchableOpacity
            key={index}
            style={styles.checkItem}
            onPress={() => toggleCheck(section.id, index)}
            activeOpacity={0.7}
          >
            <View style={[
              styles.checkboxContainer,
              isChecked ? styles.checkboxActive : styles.checkboxInactive
            ]}>
              {isChecked && <CheckMarkIcon size={14} color={Colors.WHITE} />}
            </View>
            <Caption style={styles.itemText}>{checkText}</Caption>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.stickyHeader}>
        <Heading title={t("checklist.checklistTitle", "Checklist")} />
      </View>

      <FlatList
        data={CHECKLIST_DATA}
        renderItem={renderSection}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.footer}>
            <H5 style={styles.uploadLabel}>{t("reportProblem.addPhotos")}</H5>

            <Controller
              control={control}
              name={FORM_FIELDS.PROPERTY_IMAGE}
              render={({ field }) => (
                <ImageUpload
                  label={t("addProperty.image")}
                  image={field.value}
                  onImageSelect={field.onChange}
                  shape="square"
                />
              )}
            />

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={styles.submitBtn}
            >
              <H5 style={{ color: '#FFF' }}>{t("common.submit", "Submit")}</H5>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#FAFAFA" },
  stickyHeader: {
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  flatListContent: { paddingHorizontal: 20, paddingBottom: 40 },
  section: { marginTop: 25 },
  sectionTitle: { marginBottom: 15, color: Colors.SECONDARY },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 10,
  },
  checkboxContainer: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.BORDER_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxInactive: { borderColor: Colors.GRAY },
  checkboxActive: { backgroundColor: Colors.PRIMARY, borderColor: Colors.PRIMARY },
  itemText: { color: Colors.TEXT_COLOR, flex: 1, lineHeight: 20, fontSize: 14 },
  footer: { marginTop: 30 },
  uploadLabel: { marginBottom: 10, marginTop: 10 },
  submitBtn: {
    backgroundColor: Colors.PRIMARY,
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  }
});