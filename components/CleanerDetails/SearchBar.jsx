import { StyleSheet, TextInput, View } from 'react-native';
import { SearchIcon } from '../../assets/icons/Icons';

import { useTranslation } from "react-i18next";

export const SearchBar = ({
    placeholderKey = "common.searchLocation",
    onChangeText,
    value,
}) => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <SearchIcon />

                <TextInput
                    style={styles.input}
                    placeholder={t(placeholderKey)}
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
