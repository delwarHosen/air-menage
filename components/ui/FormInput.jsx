// import { Image } from "expo-image";
// import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { Colors } from "../../assets/Colors";
// import { CloseEyeIcons, EyeIcons } from "../../assets/icons/eye";
import { CloseEyeIcons, EyeIcons } from "../../assets/icons/Icons";
import { Body1, Caption } from "../typo/typography";
// import { Caption } from "../typo/typography";
// import { Caption } from "../typo/Typography.jsx";
// import { Caption } from "../typo/typography.jsx";


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
}) => {
    const [showPassword, setShowPassword] = useState(false);
    // const [imageUri, setImageUri] = useState(null);

    const getKeyboardType = () => {
        switch (type) {
            case "email": return "email-address";
            case "number": return "numeric";
            default: return "default";
        }
    };

    const getError = () => {
        if (!touched) return error;
        if (required && (!value || !value.toString().trim())) return "This field is required";
        if (type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email address";
        if (type === "password" && value && value.length < 8) return "Password must be at least 8 characters";
        return error;
    };

    // const pickImage = async () => {
    //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     if (status !== "granted") {
    //         alert("Please grant camera roll permissions to upload images");
    //         return;
    //     }

    //     const result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 0.8
    //     });

    //     if (!result.canceled) {
    //         setImageUri(result.assets[0].uri);
    //         onChangeText(result.assets[0].uri);
    //     }
    // };

    // --- Image Input UI ---
    // if (type === "image") {
    //     return (
    //         <View style={styles.container}>
    //             <View style={styles.labelContainer}>
    //                 <Text style={styles.label}>{label}</Text>
    //                 {required && <Text style={styles.required}>*</Text>}
    //             </View>

    //             <TouchableOpacity
    //                 style={[styles.imageButton, getError() && styles.inputError]}
    //                 onPress={pickImage}
    //             >
    //                 <Upload size={20} color="#3872F0" />
    //                 <Text style={styles.imageButtonText}>
    //                     {imageUri ? "Change Image" : "Upload Image"}
    //                 </Text>
    //             </TouchableOpacity>

    //             {imageUri && (
    //                 <Image source={{ uri: imageUri }} style={styles.imagePreview} contentFit="cover" />
    //             )}

    //             {getError() && <Caption color="#EF4444" style={styles.error}>{getError()}</Caption>}
    //         </View>
    //     );
    // }

    // --- Default Input UI (Text, Email, Password, Number) ---
    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                <Body1 weight="regular" color={Colors.LABEL_COLOR}>
                    {label}{required && <Body1 style={{ color: "red" }}></Body1>}
                </Body1>
                {/* {required && (
                    <Body1 weight="regular" style={[styles.required, { color: 'red' }]}>
                        *
                    </Body1>
                )} */}
            </View>

            <View style={[styles.inputContainer, getError() && styles.inputError]}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#3F3F46"
                    secureTextEntry={type === "password" && !showPassword}
                    keyboardType={getKeyboardType()}
                    autoCapitalize={type === "email" ? "none" : "sentences"}
                    autoCorrect={false}
                    maxLength={maxLength}
                />

                {type === "password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconButton}>
                        {showPassword ?
                            // <CloseEyeIcons />
                            <CloseEyeIcons />
                            :
                            <EyeIcons />
                        }
                        :
                    </TouchableOpacity>
                )}
            </View>


            {getError() && <Caption color="#EF4444" style={styles.error}>{getError()}</Caption>}

            {maxLength && value?.length > 0 && (
                <View style={styles.counterContainer}>
                    <Caption color="#94A3B8">{value.length}/{maxLength}</Caption>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container:
        { marginBottom: 20 },
    labelContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8
    },
    label: {
        color: Colors.TEXT_COLOR,
    },
    required: {
        marginLeft: 4
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        paddingHorizontal: 16,
        paddingVertical: 4
    },
    input: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
        color: Colors.TEXT_COLOR,
        fontFamily: "SyneRegular",
        textAlignVertical: 'center',
    }
})