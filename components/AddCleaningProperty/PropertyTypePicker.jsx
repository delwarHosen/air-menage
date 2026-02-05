import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../../assets/Colors";
import { ApartmantHomeIcon, ApartmentIcon } from "../../assets/icons/Icons";
import { Body2 } from "../typo/typography";

export default function PropertyTypePicker({ value, onChange, isReadOnly = false }) {
    const { t } = useTranslation();

    const selectedType = typeof value === 'object' ? value?.propertyType : value;

    return (
        <View style={[styles.propertyContainer, isReadOnly && { justifyContent: 'center' }]}>

            {(!isReadOnly || selectedType === "Apartment") && (
                <TouchableOpacity
                    disabled={isReadOnly}
                    style={[
                        styles.propertyCard,
                   
                        !isReadOnly && selectedType === "Apartment" && styles.active,
                        
                        isReadOnly && { width: '35%', flex: 0, marginVertical: 10, height: 100 }
                    ]}
                    onPress={() => onChange?.("Apartment")}
                >
                    <ApartmentIcon />
                    <Body2 style={styles.title}>{t("propertyType.apartment")}</Body2>
                </TouchableOpacity>
            )}

            {(!isReadOnly || selectedType === "Home") && (
                <TouchableOpacity
                    disabled={isReadOnly}
                    style={[
                        styles.propertyCard,
                        
                        !isReadOnly && selectedType === "Home" && styles.active,
                     
                        isReadOnly && { width: '35%', flex: 0, marginVertical: 10, height: 100 }
                    ]}
                    onPress={() => onChange?.("Home")}
                >
                    <ApartmantHomeIcon />
                    <Body2 style={styles.title}>{t("propertyType.home")}</Body2>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    propertyContainer: {
        flexDirection: "row", 
        gap: 10,
        alignItems: "center"
    },
    propertyCard: {
        flex: 1, 
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
    active: {
        borderColor: Colors.PRIMARY,
    },
})