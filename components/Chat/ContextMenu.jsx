// Chat/ContextMenu
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Body2 } from '../typo/typography';
// import { Body2 } from '../typo/typography';
// import { Body2 } from '../../typo/typography';

export const ContextMenu = ({ visible, onDelete, onReport }) => {
    if (!visible) return null;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.item} onPress={onDelete}>
                <Ionicons name="trash-outline" size={18} color="#000" />
                <Body2 style={styles.text}>Delete</Body2>
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={onReport}>
                <Ionicons name="alert-circle-outline" size={18} color="#000" />
                <Body2 style={styles.text}>report</Body2>
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 80,
        right: 16,
        backgroundColor: '#FFF',
        borderRadius: 8,
        // shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        zIndex: 1000,
        paddingVertical: 8,
        minWidth: 150,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },
    text: {
        flex: 1,
    },
});