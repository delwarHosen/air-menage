import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    FlatList,
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
import { ImageUpload } from "../../components/ui/ImageUpload";
import { IMAGE_CONSTANTS } from "../../constants/image.index";

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
        if (params && Object.keys(params).length > 0) {
            reset(params);
        }
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
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                    )
                )}
            />

            {/* --- Verification Button specific to SIRET Number --- */}
            {item === "verification_Your_SIRET_Number" && (
                <TouchableOpacity 
                    style={styles.verifyButton}
                    onPress={() => router.push("/identity-verification/identity-verification-banner1")}
                >
                    <ButtonText style={styles.verifyButtonText}>Verify Now</ButtonText>
                </TouchableOpacity>
            )}

            {/* --- Gender Modal --- */}
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
        <View style={styles.mainContainer}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <FlatList
                    data={FIELD_KEYS}
                    keyExtractor={item => item}
                    renderItem={renderItem}
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <View style={styles.headerSection}>
                            <Heading title={t("edit_personal_info.title")} />
                            <View style={styles.imageContainer}>
                                <View style={styles.imageWrapper}>
                                    <Controller
                                        control={control}
                                        name="profileImage"
                                        render={({ field: { onChange, value } }) => (
                                            <ImageUpload
                                                image={value}
                                                onImageSelect={onChange}
                                                shape="circle"
                                                showIcon={false}
                                                centered={true}
                                                defaultImage={IMAGE_CONSTANTS.profile}
                                            />
                                        )}
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
                            activeOpacity={0.8}
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
    mainContainer: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        paddingHorizontal: "5%",
    },
    scrollContainer: {
        paddingBottom: 40,
    },
    headerSection: {
        width: '100%',
        marginTop: 10,
    },
    imageContainer: {
        marginVertical: 25,
        alignItems: 'center',
    },
    imageWrapper: {
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: 'center',
        position: 'relative',
        marginBottom: 20
    },
    cameraBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.PRIMARY,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
        elevation: 3,
        zIndex: 10,
    },
    inputWrapper: {
        width: "100%",
        marginBottom: 16,
    },
    labelOutside: {
        fontSize: 15,
        color: "#0F243E",
        marginBottom: 8,
        fontWeight: '600',
    },
    inputCard: {
        height: 55,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    textInput: {
        fontSize: 14,
        color: "#1F2937",
        fontWeight: "500",
        flex: 1,
    },
    verifyButton: {
        backgroundColor: "#3F3F3F",
        marginTop: 15,
        width:"60%",
        paddingVertical: 12,
        height:50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    verifyButtonText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "600"
    },
    submitButton: {
        width: "100%",
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600"
    },
    /* --- Modal Styles --- */
    centerOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerPopup: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        elevation: 5,
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
    },
    optionText: {
        fontSize: 16,
        color: '#4B5563',
    }
});