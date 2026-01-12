import { StyleSheet, TextInput, View } from 'react-native';
import { SearchIcon } from '../../assets/icons/Icons';

export const SearchBar = ({
    placeholder = "Search Location",
    onChangeText,
    value,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <SearchIcon />

                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                    onChangeText={onChangeText}
                    value={value}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%", 
        marginTop:20       
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3F4F6",
        borderRadius: 8,
        paddingHorizontal: 16,
        height: 48,
        gap: 8,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: "#000",
    },
});
