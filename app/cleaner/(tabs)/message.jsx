// (tabs)/message.jsx
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IMAGE_COMPONENTS } from '../../../assets/image.index';

import { MessageListItem } from "../../../components/Chat/MessageListItem";
import { SearchBar } from "../../../components/Chat/SearchBar";
import { Body1 } from '../../../components/typo/typography';
// import { MessageListItem } from '../../../components/Chat/MessageListItem';
// import { SearchBar } from '../../../components/Chat/SearchBar';
// import { Body1 } from '../../../components/typo/typography';

export default function MessageScreen() {
    const router = useRouter();

    const messages = [
        {
            id: 1,
            name: 'Geopart Etdsien',
            message: 'Your Order Just Arrived!',
            time: '13.47',
            unread: 0,
            avatarImage: IMAGE_COMPONENTS.profileImage1,
            hasCheck: true
        },
        {
            id: 2,
            name: 'Stevano Clirover',
            message: 'Your Order Just Arrived!',
            time: '11.23',
            unread: 1,
            avatarImage: IMAGE_COMPONENTS.profileImage2
        },
        {
            id: 3,
            name: 'Elisia Justin',
            message: 'Your Order Just Arrived!',
            time: '11.23',
            unread: 0,
            avatarImage: IMAGE_COMPONENTS.profileImage3
        },
        {
            id: 4,
            name: 'Geopart Etdsien',
            message: 'Your Order Just Arrived!',
            time: '13.47',
            unread: 0,
            avatarImage: IMAGE_COMPONENTS.profileImage1,
            hasCheck: true
        },
        {
            id: 5,
            name: 'Stevano Clirover',
            message: 'Your Order Just Arrived!',
            time: '11.23',
            unread: 1,
            avatarImage: IMAGE_COMPONENTS.profileImage4
        },
        {
            id: 6,
            name: 'Elisia Justin',
            message: 'Your Order Just Arrived!',
            time: '11.23',
            unread: 0,
            avatarImage: IMAGE_COMPONENTS.profileImage5
        },
    ];

    const handleSelectChat = (msg) => {
        router.push({
            pathname: '/cleaner/chat',
            params: {
                id: msg.id,
                name: msg.name,
                avatarKey: Object.keys(IMAGE_COMPONENTS).find(
                    key => IMAGE_COMPONENTS[key] === msg.avatarImage
                ),
            },
        });
    };

    return (
        <View style={styles.container}>
            <SearchBar />

            <View style={styles.titleContainer}>
                <Body1 style={styles.title}>All Message</Body1>
            </View>

            <ScrollView style={styles.messageList}>
                {messages.map((msg) => (
                    <MessageListItem
                        key={msg.id}
                        message={msg}
                        onPress={() => handleSelectChat(msg)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    titleContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    title: {
        fontWeight: 'bold',
    },
    messageList: {
        flex: 1,
    },
});