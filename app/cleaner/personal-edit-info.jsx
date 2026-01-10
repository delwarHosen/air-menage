import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Colors } from "../../assets/Colors";
import Heading from "../../components/Heading/Heading";
import { Body2, ButtonText } from "../../components/typo/typography";

export default function PersonalEditInfo() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { t } = useTranslation();

    // Gender selection modal state
    const [isGenderModalVisible, setGenderModalVisible] = useState(false);

    const FIELD_KEYS = [
        "fullName", "age", "email", "verification_Your_SIRET_Number",
        "gender", "phone", "address", "city", "country"
    ];

    const { control, handleSubmit, reset, setValue, watch, formState: { isSubmitting } } = useForm({
        defaultValues: params
    });

    useEffect(() => {
        reset(params);
    }, []);

    const onFormSubmit = (data) => {
        console.log("Updated Form Data:", data);
        router.push("/cleaner/menu");
    };

    const renderItem = ({ item }) => (
        <View style={styles.inputWrapper}>
            <Body2 style={styles.labelOutside}>{t(`edit_personal_info.fields.${item}`)}</Body2>
            
            <Controller
                control={control}
                name={item}
                render={({ field: { onChange, value } }) => (
                    item === "gender" ? (
                        <TouchableOpacity 
                            style={styles.inputCard} 
                            onPress={() => setGenderModalVisible(true)}
                            activeOpacity={0.7}
                        >
                            <Body2 style={[styles.textInput, { color: value ? "#0F243E" : "#6b7480" }]}>
                                {value ? value : t(`edit_personal_info.placeholders.gender`)}
                            </Body2>
                            <Ionicons name="chevron-down" size={20} color="#6b7480" />
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.inputCard}>
                            <TextInput
                                style={styles.textInput}
                                value={String(value || "")}
                                onChangeText={onChange}
                                placeholder={t(`edit_personal_info.placeholders.${item}`)}
                                keyboardType={item === "age" || item === "phone" ? "numeric" : "default"}
                            />
                        </View>
                    )
                )}
            />

            {/* --- Centered Gender Selection Modal --- */}
            {item === "gender" && (
                <Modal
                    visible={isGenderModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setGenderModalVisible(false)}
                >
                    <Pressable style={styles.centerOverlay} onPress={() => setGenderModalVisible(false)}>
                        <View style={styles.centerPopup}>
                            <Body2 style={styles.modalTitleCenter}>Select Gender</Body2>
                            
                            {["Male", "Female", "Other"].map((option) => (
                                <TouchableOpacity 
                                    key={option}
                                    style={styles.optionItem}
                                    onPress={() => {
                                        setValue("gender", option);
                                        setGenderModalVisible(false);
                                    }}
                                >
                                    <Body2 style={[
                                        styles.optionText, 
                                        watch("gender") === option && { color: Colors.PRIMARY, fontWeight: '700' }
                                    ]}>
                                        {option}
                                    </Body2>
                                    {watch("gender") === option && (
                                        <Ionicons name="checkmark-circle" size={20} color={Colors.PRIMARY} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Pressable>
                </Modal>
            )}
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={{ marginHorizontal: 20 }}>
                    <Heading title={t("edit_personal_info.title")} />
                </View>

                <FlatList
                    data={FIELD_KEYS}
                    keyExtractor={item => item}
                    style={{ width: '100%' }}
                    renderItem={renderItem}
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <View style={styles.headerContainer}>
                            <View style={styles.imageContainer}>
                                <View style={styles.imageWrapper}>
                                    <Image
                                        source={{ uri: 'https://avatar.iran.liara.run/public/30' }}
                                        style={styles.profileImage}
                                        resizeMode="cover"
                                    />
                                    <TouchableOpacity style={styles.cameraBadge}>
                                        <Ionicons name="camera" size={16} color="#FFF" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                    ListFooterComponent={() => (
                        <TouchableOpacity
                            onPress={handleSubmit(onFormSubmit)}
                            style={styles.submitButton}
                        >
                            <ButtonText style={styles.buttonText}>
                                {isSubmitting ? t("edit_personal_info.actions.saving") : t("edit_personal_info.actions.saveChanges")}
                            </ButtonText>
                        </TouchableOpacity>
                    )}
                />
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 40,
        width: '100%',
        backgroundColor: "#FAFAFA"
    },
    headerContainer: { width: '100%', alignItems: 'center' },
    imageContainer: {
        marginVertical: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageWrapper: {
        position: 'relative',
        width: 100,
        height: 100,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E1E1E1'
    },
    cameraBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.PRIMARY,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
        elevation: 3,
    },
    inputWrapper: {
        width: "100%",
        marginBottom: 15,
        paddingHorizontal: 10
    },
    labelOutside: {
        fontSize: 16,
        color: "#0F243E",
        marginBottom: 6,
        fontWeight: '600'
    },
    inputCard: {
        height: 55,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#CACACB",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    textInput: {
        fontSize: 14,
        color: "#6b7480",
        fontWeight: "500",
        flex: 1
    },
    submitButton: {
        width: "95%",
        alignSelf: 'center',
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },

    /* --- Centered Popup Styles --- */
    centerOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerPopup: {
        width: '75%',
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalTitleCenter: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F243E',
        textAlign: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        paddingBottom: 10,
    },
    optionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 5,
    },
    optionText: {
        fontSize: 16,
        color: '#4B5563',
    }
});