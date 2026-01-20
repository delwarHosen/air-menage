import { Controller } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import { SupliesProvidedIcon, VacumeProvidedIcon } from '../../assets/icons/Icons';
import { Body2 } from '../typo/typography';

export default function VacuumeProvided({ control }) {
    return (
        <Controller
            control={control}
            name="providedService"
            render={({ field: { onChange, value } }) => (
                <View style={styles.suppliesRow}>
                    
                    {/* Vacuum Card */}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[
                            styles.suppliesCard, 
                            value === "vacuum" && styles.activeCard
                        ]}
                        onPress={() => onChange(value === "vacuum" ? "" : "vacuum")}
                    >
                        <VacumeProvidedIcon 
                            color={value === "vacuum" ? Colors.PRIMARY : "#000"} 
                        />
                        <Body2 style={[
                            styles.suppliesText,
                            value === "vacuum" && { color: Colors.PRIMARY }
                        ]}>
                            Vacuum Provided
                        </Body2>
                    </TouchableOpacity>

                    {/* Supplies Card */}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[
                            styles.suppliesCard, 
                            value === "supplies" && styles.activeCard
                        ]}
                        onPress={() => onChange(value === "supplies" ? "" : "supplies")}
                    >
                        <SupliesProvidedIcon 
                            color={value === "supplies" ? Colors.PRIMARY : "#000"}
                        />
                        <Body2 style={[
                            styles.suppliesText,
                            value === "supplies" && { color: Colors.PRIMARY }
                        ]}>
                            Supplies Provided
                        </Body2>
                    </TouchableOpacity>

                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    suppliesRow: {
        flexDirection: "row",
        gap: 15,
        marginTop: 20,
        marginBottom: 20
    },
    suppliesCard: {
        flex: 1, 
        borderRadius: 12, 
        borderWidth: 1, 
        padding: 20,
        backgroundColor: "#fff", 
        borderColor: Colors.BORDER_COLOR,
        alignItems: 'center', 
        minHeight: 140, 
        justifyContent: 'center'
    },
    activeCard: { 
        borderColor: Colors.PRIMARY, 
        borderWidth: 2 
    },
    suppliesText: { 
        marginTop: 15, 
        textAlign: "center", 
        fontSize: 14,
        fontWeight: '500'
    },
});