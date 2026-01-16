// Chat header Chat/ChatHeader
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Body1, Caption } from '../typo/typography';
// import { Body1, Caption } from '../typo/typography';

export const ChatHeader = ({ chat, onMorePress }) => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
            <View style={styles.avatarContainer}>
                {chat.avatarImage ? (
                    <Image source={chat.avatarImage} style={styles.avatarImage} />
                ) : (
                    <View style={styles.avatar} />
                )}
            </View>
            <View style={styles.info}>
                <Body1 style={styles.name}>{chat.name}</Body1>
                <Caption style={styles.status}>Online</Caption>
            </View>
            <TouchableOpacity onPress={onMorePress} style={styles.moreButton}>
                <Ionicons name="ellipsis-horizontal" size={24} color="#00AFF5" />
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
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        backgroundColor: '#FFF',
    },
    backButton: {
        marginRight: 12,
    },
    avatarContainer: {
        marginRight: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#A78BFA',
    },
    avatarImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    info: {
        flex: 1,
    },
    name: {
        fontWeight: '600',
    },
    status: {
        color: '#6B7280',
    },
    moreButton: {
        padding: 4,
    },
});