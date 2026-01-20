import { Controller } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../assets/Colors'; // Path thik kore niben
import { Body2 } from '../typo/typography';

export default function Elevator({ control, label }) {
    return (
        <View style={styles.mainContainer}>
            {/* Jodi label proyojon hoy */}
            {label && <Body2 style={styles.label}>{label}</Body2>}

            <Controller
                control={control}
                name="hasElevator"
                render={({ field: { onChange, value } }) => (
                    <View style={styles.elevatorContainer}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={[
                                styles.elevatorButton,
                                value === "Yes" && styles.activeElevator
                            ]}
                            onPress={() => onChange("Yes")}
                        >
                            <Body2 style={{
                                color: value === "Yes" ? Colors.PRIMARY : "#949494",
                                fontWeight: value === "Yes" ? "600" : "400"
                            }}>
                                Yes
                            </Body2>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={[
                                styles.elevatorButton,
                                value === "No" && styles.activeElevator
                            ]}
                            onPress={() => onChange("No")}
                        >
                            <Body2 style={{
                                color: value === "No" ? Colors.PRIMARY : "#949494",
                                fontWeight: value === "No" ? "600" : "400"
                            }}>
                                No
                            </Body2>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 10,
        color: '#1A1A1A',
    },
    elevatorContainer: {
        flexDirection: "row",
        gap: 12,
    },
    elevatorButton: {
        flex: 1,
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#E5E5E5",
        backgroundColor: "#FFFFFF",
    },
    activeElevator: {
        borderColor: Colors.PRIMARY,
        backgroundColor: "#FFFFFF", 
        borderWidth: 1.5,
    },
});