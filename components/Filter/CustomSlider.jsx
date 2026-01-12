
import Slider from '@react-native-community/slider';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import { Body1, Body2 } from '../typo/typography';


export default function CustomSlider({
    value,
    onValueChange,
    minimumValue = 0,
    maximumValue = 100,
    step = 1,
    unit = '',
    showRange = false,
    rangeStart = 0,
    rangeEnd = 100
}) {
    return (
        <View style={styles.container}>
            <Slider
                style={styles.slider}
                value={value}
                onValueChange={onValueChange}
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                step={step}
                minimumTrackTintColor={Colors.PRIMARY}
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor={Colors.PRIMARY}
            />
            <View style={styles.labels}>
                <Body2 style={styles.labelText}>{minimumValue}{unit}</Body2>
                <Body1 style={styles.valueText}>{value}{unit}</Body1>
                <Body2 style={styles.labelText}>{maximumValue}{unit}</Body2>
            </View>
            {showRange && (
                <View style={styles.rangeLabels}>
                    <Body1 style={styles.rangeValue}>{rangeStart} {unit}</Body1>
                    <Body2 style={styles.rangeInfo}>
                        {minimumValue} {unit} - {maximumValue} {unit}
                    </Body2>
                    <Body1 style={styles.rangeValue}>{rangeEnd} {unit}</Body1>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    slider: {
        width: '100%',
        height: 40,
    },
    labels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    labelText: {
        color: '#6B7280',
    },
    valueText: {
        color: '#374151',
        fontWeight: '500',
    },
    rangeLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    rangeValue: {
        color: '#374151',
        fontWeight: '500',
    },
    rangeInfo: {
        color: '#6B7280',
    },
});

