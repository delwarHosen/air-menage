import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import { ApartmantHomeIcon, ApartmentIcon } from '../../assets/icons/Icons';
import { Body2 } from '../typo/typography';

// Apnar project-er proyojoniyo components o icons ekhane import korun
const PropertyTypePicker = ({ value, onChange }) => {
    return (
        <View style={styles.propertyContainer}>
            {/* Apartment Option */}
            <TouchableOpacity
                style={[
                    styles.propertyCard,
                    value === "Apartment" && styles.active,
                ]}
                onPress={() => onChange("Apartment")}
            >
                <ApartmentIcon />
                <Body2>Apartment</Body2>
            </TouchableOpacity>

            {/* Home Option */}
            <TouchableOpacity
                style={[
                    styles.propertyCard,
                    value === "Home" && styles.active,
                ]}
                onPress={() => onChange("Home")}
            >
                <ApartmantHomeIcon />
                <Body2>Home</Body2>
            </TouchableOpacity>
        </View>
    );
};

export default PropertyTypePicker;

const styles = StyleSheet.create({
    propertyContainer: { flexDirection: "row", gap: 10 },
    propertyCard: {
        flex: 1,
        height: 100,
        borderWidth: 1,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderColor: Colors.BORDER_COLOR,
    },
    active: { borderColor: Colors.PRIMARY },
})