// Chat/SearchBar
import { StyleSheet, TextInput, View } from 'react-native';
import { SearchIcon } from '../../assets/icons/Icons';

export const SearchBar = ({ placeholder = "Search...", onChangeText, value }) => (
    <View style={styles.container}>
        <View style={styles.searchBar}>
            <SearchIcon/>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
            />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 24,
        paddingHorizontal: 16,
        height: 48,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#000',
    },
});