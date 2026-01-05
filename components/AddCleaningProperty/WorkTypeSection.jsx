
import { useState } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from "../../assets/Colors";
import { CheckMarkIcon, DeleteIcon, DownForwardIcon, TikMarkIcon } from "../../assets/icons/Icons";
import { Body2, H5 } from '../typo/typography';

const WorkTypeList = ({ title, workTypes, onAdd, onDelete }) => {
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
                scrollEnabled={false} // ScrollView এর ভেতরে থাকলে এটা false রাখা ভালো
                renderItem={({ item }) => (
                    <View style={styles.listItemContainer}>
                        {/* Left side: Icon and Text group */}
                        <View style={styles.itemLeftGroup}>
                            <CheckMarkIcon />
                            <Body2 style={styles.itemText}>{item.text}</Body2>
                        </View>

                        {/* Right side: Delete button */}
                        <TouchableOpacity onPress={() => onDelete(item.id)}>
                            <DeleteIcon />
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Input Section */}
            <View style={styles.addWorkTypeContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder={`Add new ${title.toLowerCase()}...`}
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

export default WorkTypeList;


const styles = StyleSheet.create({
    // AddWorkType section

    addWorkHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        backgroundColor: "#F4F4F4",
        padding: 15,
        borderRadius: 8
    },

    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
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
    },
    addWorkTypeContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        minHeight: 44,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 4,
        paddingTop: 10,
        paddingRight: 8,
        paddingBottom: 10,
        paddingLeft: 8,

        // Shadow for iOS
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 4,
    },
    textInput: {
        flex: 1,
        height: 50,
        paddingHorizontal: 15,
    },
    addIconButton: {
        padding: 5,
    },

})