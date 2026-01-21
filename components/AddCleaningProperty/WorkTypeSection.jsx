import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from "../../assets/Colors";
import { CheckMarkIcon, DeletePropertyTrashIcon, DownForwardIcon, TikMarkIcon } from "../../assets/icons/Icons";
import { Body2, H5 } from '../typo/typography';

export const WorkTypeSection = ({ title, workTypes, onAdd, onDelete }) => {
    const { t } = useTranslation();
    const [text, setText] = useState('');

    const handleAdd = () => {
        if (text.trim()) {
            onAdd(text);
            setText('');
        }
    };

    return (
        <View style={{ marginTop: 30 }}>
            {/* Header */}
            <View style={styles.addWorkHeader}>
                <H5>{title}</H5>
                <DownForwardIcon />
            </View>

            {/* FlatList for added items */}
            <FlatList
                data={workTypes}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <View style={styles.listItemContainer}>
                        {/* Left side: Icon and Text group */}
                        <View style={styles.itemLeftGroup}>
                            <CheckMarkIcon />
                            <Body2 style={styles.itemText}>{item.text}</Body2>
                        </View>

                        {/* Right side: Delete button */}
                        <TouchableOpacity onPress={() => onDelete(item.id)}>
                            <DeletePropertyTrashIcon />
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Input Section */}
            <View style={styles.addWorkTypeContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder={t('work_type.add_placeholder', { title: title.toLowerCase() })}
                    placeholderTextColor="#999"
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={handleAdd}
                />
                <TouchableOpacity onPress={handleAdd} style={styles.addIconButton}>
                    <TikMarkIcon />
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    addWorkHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        backgroundColor: "#F4F4F4",
        padding: 15,
        borderRadius: 8,
    },

    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingRight: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemLeftGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    itemText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
        fontFamily: 'Syne-Regular', 
    },
    addWorkTypeContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        minHeight: 44,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 8,
        paddingTop: 5,
        paddingRight: 8,
        paddingBottom: 5,
        paddingLeft: 8,
        backgroundColor: "#FFFFFF"
    },

    textInput: {
        flex: 1,
        height: 48,
        paddingHorizontal: 15,
        fontFamily: 'Syne-Regular', 
        fontSize: 14,
        color: '#1A1A1A',
    },
    addIconButton: {
        padding: 5,
    },
});