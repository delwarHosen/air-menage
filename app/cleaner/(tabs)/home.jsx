import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FilterIcon } from '../../../assets/icons/Icons';
import Calendar from '../../../components/CleanerDetails/Calender';
import { SearchBar } from '../../../components/CleanerDetails/SearchBar';
import CleaningTask from '../../../components/CleaningTask/CleaningTask';
import { Body1 } from '../../../components/typo/typography';
import { cleanerDetailsData } from "../../../store/CleanerRequestData";

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();
  const pendingItems = cleanerDetailsData.filter(item => item.laundryIncluded === true);
  const pendingCount = pendingItems.length;

  // const { data: allTasks, isLoading } = useGetTasksQuery();
  // const filters = useSelector((state) => state.filters);

  // // RTK Query from filter data
  // const filteredData = allTasks?.filter((item) => {
  //   const matchesEquipment = !filters.equipmentProvided.vacuumCleaner || item.equipmentProvided;
  //   const matchesRadius = item.workRadius <= filters.workRadius;
  //   const matchesPrice = item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1];
  //   const matchesProperty =
  //     item.bedrooms >= filters.propertyDetails.bedrooms &&
  //     item.beds >= filters.propertyDetails.beds &&
  //     item.bathrooms >= filters.propertyDetails.bathroom;

  //   return matchesEquipment && matchesRadius && matchesPrice && matchesProperty;
  // });

  // if (isLoading) return <Text>Loading...</Text>;



  return (
    <View style={styles.container}>
      <View style={styles.SearchOption}>
        <View style={styles.searchWrapper}>
          <SearchBar />
        </View>

        <TouchableOpacity
          style={styles.filterWrapper}
          onPress={() => router.push("/cleaner/task-filter")}
        >
          <FilterIcon />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <CleaningTask
          HeaderContent={
            <View>
              <Calendar />
              <TouchableOpacity
                onPress={() => router.push("/cleaner/pending-households")}
                style={styles.pendingContainer}
              >
                <Body1 style={{ textDecorationLine: "underline" }}>
                  {t("cleaner.pendingApplications")}
                </Body1>

                <Body1 style={styles.pendingCount}>
                  {pendingCount}
                </Body1>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  SearchOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 2,
    gap: 10
  },
  searchWrapper: { flex: 1 },
  filterWrapper: {
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 6
  },
  pendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: "center",
    gap: 10,
    marginVertical: 15
  },
  pendingCount: {
    backgroundColor: '#C72D65',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 2,
    height: 24,
    width: 24,
    borderRadius: 12,
    fontWeight: 'bold',
    textAlign: "center",
    lineHeight: 24
  }
});