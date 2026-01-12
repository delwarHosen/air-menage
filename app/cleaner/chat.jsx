// host/chat.jsx
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IMAGE_COMPONENTS } from '../../assets/image.index';
import { ChatHeader } from '../../components/Chat/ChatHeader';
import { ChatInput } from '../../components/Chat/ChatInput';
import { ChatMessage } from "../../components/Chat/ChatMessage";
import { ContextMenu } from "../../components/Chat/ContextMenu";
import { UploadModal } from "../../components/Chat/UploadModa";

export default function ChatScreen() {
    const params = useLocalSearchParams();
    const [showMenu, setShowMenu] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);

    // Get avatar image from the key passed via params
    const avatarImage = params.avatarKey ? IMAGE_COMPONENTS[params.avatarKey] : null;

    const selectedChat = {
        id: params.id,
        name: params.name,
        avatarImage: avatarImage,
    };

    const chatMessages = [
        { id: 1, sender: 'Stevano Clirover', text: 'Just to order', time: '09.00', isOwn: false },
        { id: 2, sender: 'You', text: 'Okay, for what level of spiciness?', time: '09.15', isOwn: true, delivered: true },
        { id: 3, sender: 'Stevano Clirover', text: 'Okay, Wait a minute', time: '09.00', isOwn: false },
        { id: 4, sender: 'You', text: "Okay, I'm waiting", time: '09.15', isOwn: true, delivered: true },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <ChatHeader
                chat={selectedChat}
                onMorePress={() => setShowMenu(!showMenu)}
            />

            <ContextMenu
                visible={showMenu}
                onDelete={() => setShowMenu(false)}
                onReport={() => setShowMenu(false)}
            />

            <ScrollView style={styles.chatMessages}>
                {chatMessages.map((msg) => (
                    <ChatMessage
                        key={msg.id}
                        message={msg}
                        senderAvatar={avatarImage}
                    />
                ))}
            </ScrollView>

            <ChatInput onAttachment={() => setShowUploadModal(true)} />

            <UploadModal
                visible={showUploadModal}
                onClose={() => setShowUploadModal(false)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    chatMessages: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
});