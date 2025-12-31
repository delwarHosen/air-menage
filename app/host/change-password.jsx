import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Dimensions,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from "../../assets/Colors";
import { Body2 } from "../../components/typo/typography";
import { FORM_FIELDS, FORM_LABELS, FORM_PLACEHOLDERS } from "../../constants/form";

const { width } = Dimensions.get('window'); 

export default function ChangePassword() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const { values = {}, isSubmitting, handleChange, handleSubmit } = useForm({
        initialValues: {
            [FORM_FIELDS.CURRENT_PASSWORD]: "",
            [FORM_FIELDS.PASSWORD]: "",
            [FORM_FIELDS.CONFIRM_PASSWORD]: "",
        }
    });

    const passwordFields = [
        { id: '1', key: FORM_FIELDS.CURRENT_PASSWORD, stateKey: 'current' },
        { id: '2', key: FORM_FIELDS.PASSWORD, stateKey: 'new' },
        { id: '3', key: FORM_FIELDS.CONFIRM_PASSWORD, stateKey: 'confirm' },
    ];

    const toggleVisibility = (key) => {
        setShowPassword(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const renderItem = ({ item }) => (
        <View style={styles.inputWrapper}>
            <Body2 style={styles.labelOutside}>{FORM_LABELS[item.key]}</Body2>
            <View style={styles.inputCard}>
                <TextInput
                    style={styles.textInput}
                    // value={values[item.key] || ""}
                    // onChangeText={(text) => handleChange(item.key, text)}
                    placeholder={FORM_PLACEHOLDERS[item.key]}
                    placeholderTextColor="#7E8792"
                    secureTextEntry={!showPassword[item.stateKey]}
                />
                <TouchableOpacity onPress={() => toggleVisibility(item.stateKey)}>
                    <Ionicons
                        name={showPassword[item.stateKey] ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color="#7E8792"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <FlatList
                    data={passwordFields}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <View style={styles.headerContainer}>
                            <View style={styles.headerRow}>
                                <TouchableOpacity onPress={() => router.back()} style={styles.backIconContainer}>
                                    <Ionicons name='arrow-back' size={24} color={"#7E8792"} />
                                </TouchableOpacity>

                                <View style={styles.titleWrapper}>
                                    <Body2 style={styles.headerTitle}>Change Password</Body2>
                                </View>
                                <View style={{ width: 40 }} />
                            </View>

                            <View style={styles.iconSection}>
                                <View style={styles.lockCircle}>
                                    <Ionicons name="lock-closed" size={40} color={Colors.PRIMARY} />
                                </View>
                            </View>
                        </View>
                    )}
                    ListFooterComponent={() => (
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                                <Body2 style={styles.buttonText}>{isSubmitting ? "Updating..." : "Save the Changes"}</Body2>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    scrollContainer: {
        paddingBottom: 40,
        width: width, 
        alignItems: 'center',
    },
    headerContainer: {
        width: '100%',
        alignItems: 'center',
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: '100%',
        height: 50,
        marginTop: 10,
        paddingHorizontal: 16,
    },
    backIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#EBEBEE",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#CACACB",
    },
    titleWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: "600", color: Colors.TEXT_COLOR },

    iconSection: { marginVertical: 30 },
    lockCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#F0F7FF",
        justifyContent: 'center',
        alignItems: 'center'
    },

    inputWrapper: { 
        width: width * 0.92, 
        marginBottom: 20,
    },
    labelOutside: { fontSize: 14, color: "#0F243E", marginBottom: 8, fontWeight: '500' },
    inputCard: {
        flexDirection: 'row',
        height: 52,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#CACACB",
        backgroundColor: Colors.BACKGROUND_COLOR,
        paddingHorizontal: 15,
        alignItems: "center",
        width: '100%', 
    },
    textInput: { flex: 1,
         fontSize: 14, 
         color: Colors.TEXT_COLOR 
        },

    submitButton: {
        width: width * 0.92,
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});