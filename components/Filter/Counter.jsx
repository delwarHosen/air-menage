import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Body1, H6 } from '../typo/typography';


export default function Counter({
    label,
    value,
    onIncrement,
    onDecrement,
    showBorder = false
}) {
    return (
        <View style={[styles.container, showBorder && styles.containerBorder]}>
            <Body1 style={styles.label}>{label}</Body1>
            <View style={styles.controls}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onDecrement}
                    activeOpacity={0.7}
                >
                    <Body1 style={styles.buttonText}>−</Body1>
                </TouchableOpacity>
                <H6 style={styles.value}>{value}</H6>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onIncrement}
                    activeOpacity={0.7}
                >
                    <Body1 style={styles.buttonText}>+</Body1>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    containerBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    label: {
        color: '#374151',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    button: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#374151',
    },
    value: {
        minWidth: 32,
        textAlign: 'center',
    },
});
