// Chat/ChatMessage
import { Image, StyleSheet, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import { PrimaryTickMarkIcon } from "../../assets/icons/PrimaryTickMarkIcon";
import { Body2, Caption } from '../typo/typography';

export const ChatMessage = ({ message, senderAvatar }) => {
    return (
        <View style={message.isOwn ? styles.ownContainer : styles.otherContainer}>
            {!message.isOwn && (
                <View style={styles.smallAvatarContainer}>
                    {senderAvatar ? (
                        <Image source={senderAvatar} style={styles.smallAvatarImage} />
                    ) : (
                        <View style={styles.smallAvatar} />
                    )}
                </View>
            )}
            <View style={styles.wrapper}>
                {!message.isOwn && <Body2 style={styles.senderName}>{message.sender}</Body2>}
                <View style={message.isOwn ? styles.ownBubble : styles.otherBubble}>
                    <Body2 style={message.isOwn ? styles.ownText : styles.otherText}>
                        {message.text}
                    </Body2>
                </View>
                <View style={styles.timeContainer}>
                    <Caption style={styles.time}>{message.time}</Caption>
                    {message.isOwn && message.delivered && <PrimaryTickMarkIcon double />}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ownContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 16,
    },
    otherContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    smallAvatarContainer: {
        marginRight: 8,
        alignSelf: 'flex-start',
    },
    smallAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#A78BFA',
    },
    smallAvatarImage: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    wrapper: {
        maxWidth: '75%',
    },
    senderName: {
        fontWeight: '600',
        marginBottom: 4,
    },
    ownBubble: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 16,
        borderTopRightRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 4,
    },
    otherBubble: {
        backgroundColor: '#F3F4F6',
        borderRadius: 16,
        borderTopLeftRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 4,
    },
    ownText: {
        color: '#FFF',
    },
    otherText: {
        color: '#000',
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        alignSelf: 'flex-end',
    },
    time: {
        color: '#9CA3AF',
    },
});