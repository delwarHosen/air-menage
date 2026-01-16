import { useState } from "react";
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { Colors } from "../../assets/Colors";
import { CloseEyeIcons, EyeIcons } from "../../assets/icons/Icons";
import { Body1, Caption, H6 } from "../typo/typography";

export const FormInput = ({
    label,
    value = "",
    onChangeText,
    placeholder,
    type = "text",
    error,
    touched = false,
    required = false,
    maxLength,
    multiline = false,
    style,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const getKeyboardType = () => {
        switch (type) {
            case "email": return "email-address";
            case "number": return "numeric";
            default: return "default";
        }
    };

    const getError = () => {
        if (error) return error;
        // Basic validation logic
        if (required && (!value || !value.toString().trim())) return null;
        return null;
    };

    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                <H6 color={Colors.TEXT_COLOR}>
                    {label}{required && <Body1 style={{ color: "#949494" }}> *</Body1>}
                </H6>
            </View>

            <View style={[styles.inputContainer, error && styles.inputError]}>
                <TextInput
                    style={[
                        styles.input,
                        multiline && { height: 96, textAlignVertical: 'top' },
                        style,
                    ]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#949494"
                    secureTextEntry={type === "password" && !showPassword}
                    keyboardType={getKeyboardType()}
                    autoCapitalize={type === "email" ? "none" : "sentences"}
                    autoCorrect={false}
                    maxLength={maxLength}
                    multiline={multiline}
                />

                {type === "password" && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.iconButton}
                    >
                        {showPassword ? <CloseEyeIcons /> : <EyeIcons />}
                    </TouchableOpacity>
                )}
            </View>

            {error && <Caption color="#EF4444" style={styles.error}>{error}</Caption>}

            {maxLength && value?.length > 0 && (
                <View style={styles.counterContainer}>
                    <Caption color="#94A3B8">{value.length}/{maxLength}</Caption>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: 20 },
    labelContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8
    },
    inputContainer: {
        flexDirection: "row",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR || '#ccc',
        paddingHorizontal: 16,
        backgroundColor: "#FFFFFF",
        alignItems: 'center', 
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.TEXT_COLOR,
        paddingTop: 12,
        paddingBottom: 12,
    },
    inputError: {
        borderColor: "#EF4444",
    },
    iconButton: {
        padding: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    error: {
        marginTop: 4,
    }
});