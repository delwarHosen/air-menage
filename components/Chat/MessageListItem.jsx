// Chat/MessageListItem
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from "../../assets/Colors";
// import { Colors } from '../../assets/Colors';
import { PrimaryTickMarkIcon } from '../../assets/icons/PrimaryTickMarkIcon';
import { Body1, Body2, Caption } from '../typo/typography';


export const MessageListItem = ({ message, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.avatarContainer}>
                {message.avatarImage ? (
                    <Image source={message.avatarImage} style={styles.avatarImage} />
                ) : (
                    <View style={styles.avatar} />
                )}
            </View>
            <View style={styles.content}>
                <Body1 style={styles.name}>{message.name}</Body1>
                <Body2 style={styles.preview}>{message.message}</Body2>
            </View>
            <View style={styles.right}>
                <Caption style={styles.time}>{message.time}</Caption>
                {message.unread > 0 && (
                    <View style={styles.unreadBadge}>
                        <Caption style={styles.unreadText}>{message.unread}</Caption>
                    </View>
                )}
                {message.hasCheck && <PrimaryTickMarkIcon double />}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        marginVertical: 5,
        marginHorizontal: "3%",
        borderBottomColor: Colors.BORDER_COLOR,
        borderRadius: 8,
        backgroundColor: "#FFFFFF"
    },
    avatarContainer: {
        marginRight: 12,
        // marginTop:5
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#A78BFA',
    },
    avatarImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    content: {
        flex: 1,
    },
    name: {
        fontWeight: '600',
        marginBottom: 4,
    },
    preview: {
        color: '#6B7280',
    },
    right: {
        alignItems: 'flex-end',
        gap: 4,
    },
    time: {
        color: '#9CA3AF',
    },
    unreadBadge: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#22D3EE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    unreadText: {
        color: '#FFF',
        fontWeight: '600',
    },
});