import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import { Body2 } from '../typo/typography'; // আপনার পাথ অনুযায়ী দিন

const CounterPropertySpecification = ({ label, value, onIncrement, onDecrement }) => {
    return (
        <View style={styles.specItem}>
            <Body2 style={styles.specLabel}>{label}</Body2>
            <View style={styles.counterContainer}>

                <TouchableOpacity
                    onPress={onDecrement}
                    style={styles.counterButton}
                >
                    <Body2 style={styles.buttonText}>-</Body2>
                </TouchableOpacity>


                <Body2 style={styles.counterValue}>{value}</Body2>


                <TouchableOpacity
                    onPress={onIncrement}
                    style={styles.counterButton}
                >
                    <Body2 style={styles.buttonText}>+</Body2>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CounterPropertySpecification;

const styles = StyleSheet.create({
    specItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.BORDER_COLOR,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    counterButton: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
    },
    counterValue: {
        marginHorizontal: 12,
    },
    buttonText: {
        fontSize: 18,
        lineHeight: 18,
    },
});
