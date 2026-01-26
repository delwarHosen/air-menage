import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp, FadeOutUp, LinearTransition } from 'react-native-reanimated';
import { Colors } from "../../assets/Colors";
import { CheckMarkIcon, DeletePropertyTrashIcon, DownForwardIcon, TikMarkIcon } from "../../assets/icons/Icons";
import { Body2, H5 } from '../typo/typography';

export const WorkTypeSection = ({ title, workTypes, onAdd, onDelete }) => {
    const { t } = useTranslation();
    const [text, setText] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleAdd = () => {
        if (text.trim()) {
            onAdd(text);
            setText('');
        }
    };

    return (
       
        <Animated.View layout={LinearTransition} style={{ marginTop: 15 }}>
            <TouchableOpacity 
                activeOpacity={0.7} 
                onPress={() => setIsOpen(!isOpen)} 
                style={styles.addWorkHeader}
            >
                <H5>{title}</H5>
                <View style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}>
                    <DownForwardIcon />
                </View>
            </TouchableOpacity>

            {isOpen && (
               
                <Animated.View 
                    entering={FadeInUp.duration(300)} 
                    exiting={FadeOutUp.duration(200)}
                    style={styles.dropdownContent}
                >
                    <FlatList
                        data={workTypes}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <View style={styles.listItemContainer}>
                                <View style={styles.itemLeftGroup}>
                                    <CheckMarkIcon />
                                    <Body2 style={styles.itemText}>{item.text}</Body2>
                                </View>
                                <TouchableOpacity onPress={() => onDelete(item.id)}>
                                    <DeletePropertyTrashIcon />
                                </TouchableOpacity>
                            </View>
                        )}
                    />

                    <View style={[styles.addWorkTypeContainer, { marginTop: 10 }]}>
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
                </Animated.View>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    addWorkHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F4F4F4",
        padding: 15,
        borderRadius: 8,
    },
    dropdownContent: {
        paddingHorizontal: 5,
        paddingBottom: 10,
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
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: "#FFFFFF"
    },
    textInput: {
        flex: 1,
        height: 48,
        fontSize: 14,
        color: '#1A1A1A',
        fontFamily: 'Syne-Regular'
    },
    addIconButton: {
        padding: 5,
    },
});