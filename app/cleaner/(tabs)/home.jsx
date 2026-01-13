import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FilterIcon } from '../../../assets/icons/Icons';
import Calendar from '../../../components/CleanerDetails/Calender';
import { SearchBar } from '../../../components/CleanerDetails/SearchBar';
import CleaningTask from '../../../components/CleaningTask/CleaningTask';

export default function Home() {
  const router = useRouter()
 

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
        <CleaningTask HeaderContent={<Calendar />} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA"
  },
  SearchOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: "#FAFAFA",
    zIndex: 10,
  },
  searchWrapper: {
    flex: 0.9,
  },
  filterWrapper: {
    flex: 0.1,
    alignItems: "flex-end",
    marginTop: 20,
    padding: 5,
  },
})
