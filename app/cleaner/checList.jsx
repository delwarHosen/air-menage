import { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
// import { Colors } from '../../assets/Colors';
import { router } from 'expo-router';
import { Colors } from '../../assets/Colors';
import { CheckMarkIcon } from '../../assets/icons/Icons';
import Heading from "../../components/Heading/Heading";
import { Caption, H5 } from '../../components/typo/typography';
// import { Caption, H5 } from '../typo/typography';

const CHECKLIST_DATA = [
  { id: '1', title: 'General', items: ["Take out the trash", "Air out the accommodation", "Check for odors (fresh accommodation)", "Ensure lights are turned off", "Ensure doors and windows are closed", "Check that nothing has been left behind by travelers"] },
  { id: '2', title: 'Bedroom(s)', items: ["Make the bed with clean linens", "Change the sheets and pillowcases", "Dust furniture and surfaces", "Vacuum / sweep the floor"] },
  { id: '3', title: 'Bathroom / WC', items: ["Clean and disinfect the toilet", "Clean the shower / bathtub", "Clean the sink and faucets", "Wipe the mirrors", "Change towels", "Refill toilet paper", "Sweep the floor (broom + mop)"] },
  { id: '4', title: 'Kitchen / Kitchen Area', items: ["Wash and put away dishes", "Clean the sink and faucets", "Clean the countertop", "Clean the stove", "Wipe the microwave and fridge doors", "Check that the fridge is empty and clean", "Check that the oven is empty and clean", "Check that the microwave is empty and clean", "Sweep the floor"] },
  { id: '5', title: 'Living Room', items: ["Dust furniture and shelves", "Clean the table and surfaces", "Vacuum the sofa and cushions if necessary", "Vacuum / sweep", "Mop the floor"] },
];

export default function CheckList() {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (sectionId, itemIndex) => {
    const key = `${sectionId}-${itemIndex}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key] 
    }));
  };

  const renderSection = ({ item: section }) => (
    <View style={styles.section}>
      <H5 style={styles.sectionTitle}>{section.title}</H5>
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

            <Caption style={styles.itemText}>
              {checkText}
            </Caption>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={CHECKLIST_DATA}
        renderItem={renderSection}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Heading title="Checklist" />}
        ListFooterComponent={
          <View style={styles.footer}>
            <TouchableOpacity style={styles.uploadBox}>
              <Caption style={{ color: Colors.GRAY }}>Image Upload +</Caption>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>router.push("/cleaner/feedback")}
            style={styles.submitBtn}>
              <H5 style={{ color: '#FFF' }}>Submit</H5>
            </TouchableOpacity>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#FAFAFA" },
  flatListContent: { paddingHorizontal: 20, paddingBottom: 40 },
  section: { marginTop: 25 },
  sectionTitle: { marginBottom: 15, color: Colors.SECONDARY },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  checkboxContainer: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor:Colors.BORDER_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxInactive: {
    borderColor: Colors.GRAY, 
    // backgroundColor: 'transparent',
  },
  checkboxActive: {
  
  },
  itemText: {
    color: Colors.TEXT_COLOR,
    flex: 1,
    lineHeight: 18,
  },
  footer: { marginTop: 30 },
  uploadBox: {
    width: '100%',
    height: 120,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  submitBtn: {
    backgroundColor: Colors.PRIMARY,
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  }
});