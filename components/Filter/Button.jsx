import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../assets/Colors';
import { H6 } from '../typo/typography';


export default function Button({ title, onPress, style }) {
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <H6 style={styles.buttonText}>{title}</H6>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
    },
});