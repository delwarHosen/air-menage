import { Controller } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../../assets/Colors";
import { KeyIcon, LockForPropertyIcon } from "../../assets/icons/Icons";
import { FORM_FIELDS, FORM_PLACEHOLDERS } from "../../constants/form";
import { Body2, Caption } from "../typo/typography";
import { FormInput } from "../ui/FormInput";

const KeyBoxSelection = ({ control, errors }) => {
    return (
        <View style={styles.keyBoxContainer}>
            {/* Key Handover Type Selection */}
            <Controller
                control={control}
                name="keyHandover"
                render={({ field: { onChange, value } }) => (
                    <>
                        <TouchableOpacity
                            onPress={() => onChange("handover")}
                            style={[
                                styles.keyOption,
                                value === "handover" && styles.activeBorder
                            ]}
                        >
                            <KeyIcon />
                            <View style={styles.textContainer}>
                                <Body2>In-person key handover</Body2>
                                <Caption>Meet the cleaner to give keys</Caption>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => onChange("lockbox")}
                            style={[
                                styles.keyOption,
                                value === "lockbox" && styles.activeBorder
                            ]}
                        >
                            <LockForPropertyIcon />
                            <View style={styles.textContainer}>
                                <Body2>Lockbox</Body2>
                                <Caption>Lockbox Code Released 24 Hours Before Mission</Caption>
                            </View>
                        </TouchableOpacity>
                    </>
                )}
            />

            {/* KeyBox Location Input */}
            <Controller
                control={control}
                name={FORM_FIELDS.KEY_LOCATION}
                render={({ field: { onChange, value } }) => (
                    <View>
                        <Body2 style={styles.inputLabel}>Keybox Location</Body2>
                        <FormInput
                            value={value}
                            onChangeText={onChange}
                            placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.KEY_LOCATION]}
                            error={errors[FORM_FIELDS.KEY_LOCATION]?.message}
                            required
                        />
                    </View>
                )}
            />

            {/* Lockbox Code Input */}
            <Controller
                control={control}
                name={FORM_FIELDS.KEY_PASSWORD}
                render={({ field: { onChange, value } }) => (
                    <View>
                        <Body2 style={styles.inputLabel}>Lockbox Code</Body2>
                        <FormInput
                            value={value}
                            onChangeText={onChange}
                            placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.KEY_PASSWORD]}
                            error={errors[FORM_FIELDS.KEY_PASSWORD]?.message}
                            required
                        />
                    </View>
                )}
            />
        </View>
    );
};

export default KeyBoxSelection;


const styles = StyleSheet.create({
    keyBoxContainer: {
        marginTop: 30,
        backgroundColor: "#FFFFFF",
        paddingVertical: 18,
        paddingHorizontal: 15,
    },
    keyOption: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 70,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: "#FFFFFF",
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
        gap: 16,
        marginBottom: 20,
    },
    activeBorder: {
        borderColor: Colors.PRIMARY,
    },
    inputLabel:{
        marginBottom:-20,
        marginTop:10
    }
})