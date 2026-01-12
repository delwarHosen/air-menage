// Chat/ChatInput
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export const ChatInput = ({ onSend, onAttachment, value, onChangeText }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="happy-outline" size={24} color="#9CA3AF" />
            </TouchableOpacity>
            <TextInput
                placeholder="Type something..."
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
            />
            <TouchableOpacity style={styles.iconButton} onPress={onAttachment}>
                <Ionicons name="attach-outline" size={24} color="#9CA3AF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton} onPress={onSend}>
                <Ionicons name="send" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        gap: 8,
        backgroundColor: '#FFF',
    },
    iconButton: {
        padding: 8,
    },
    input: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 14,
        color: '#000',
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#22D3EE',
        justifyContent: 'center',
        alignItems: 'center',
    },
});