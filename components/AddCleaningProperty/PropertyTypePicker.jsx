import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../../assets/Colors";
import { ApartmantHomeIcon, ApartmentIcon } from "../../assets/icons/Icons";
import { Body2 } from "../typo/typography";

const PropertyTypePicker = ({ value, onChange }) => {
    const { t } = useTranslation();

    return (
        <View style={styles.propertyContainer}>
            <TouchableOpacity
                style={[styles.propertyCard, value === "Apartment" && styles.active]}
                onPress={() => onChange?.("Apartment")}  
            >
                <ApartmentIcon />
                <Body2 style={styles.title}>{t("propertyType.apartment")}</Body2>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.propertyCard, value === "Home" && styles.active]}
                onPress={() => onChange?.("Home")}  
            >
                <ApartmantHomeIcon />
                <Body2 style={styles.title}>{t("propertyType.home")}</Body2>
            </TouchableOpacity>
        </View>
    );
};

export default PropertyTypePicker;


const styles = StyleSheet.create({
    propertyContainer: {
        flexDirection: "row", gap: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    propertyCard: {
        width: "30%",
        height: 100,
        borderWidth: 1,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderColor: Colors.BORDER_COLOR,
        marginVertical: 20
    },
    title: {
        marginTop: 15
    },
    active: { borderColor: Colors.PRIMARY, },
})