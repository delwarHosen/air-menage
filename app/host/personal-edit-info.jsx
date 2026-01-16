import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from "../../assets/Colors";
import Heading from "../../components/Heading/Heading";
import { Body2, ButtonText } from "../../components/typo/typography";
import { ImageUpload } from "../../components/ui/ImageUpload";

import { IMAGE_CONSTANTS } from "../../constants/image.index";


export default function PersonalEditInfo() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { t } = useTranslation();

    const FIELD_KEYS = ["fullName", "email", "phone", "address", "city", "country"];

    const { setValue, watch, control, handleSubmit, reset, formState: { isSubmitting } } = useForm({
        defaultValues: {
            ...FIELD_KEYS.reduce((acc, key) => {
                acc[key] = params[key] || "";
                return acc;
            }, {}),
            profileImage: params.profileImage || null
        }
    });

    const values = watch();

    useEffect(() => {
        if (params) {
            const initialData = FIELD_KEYS.reduce((acc, key) => {
                acc[key] = params[key] || "";
                return acc;
            }, {});
            reset({ ...initialData, profileImage: params.profileImage || null });
        }
    }, []);

    const onFormSubmit = (data) => {
        console.log("Form Data Submitted:", data);
        router.push("./menu")
    };

    const renderItem = ({ item }) => (
        <View style={styles.inputWrapper}>
            <Body2 style={styles.labelOutside}>{t(`edit_personal_info.fields.${item}`)}</Body2>
            <View style={styles.inputCard}>
                <TextInput
                    style={styles.textInput}
                    value={values[item] || ""}
                    onChangeText={(text) => setValue(item, text)}
                    placeholder={t(`edit_personal_info.placeholders.${item}`)}
                    placeholderTextColor="#7E8792"
                />
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                style={{ flex: 1 }}
            >
                <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                    <Heading title={t("edit_personal_info.title")} />
                </View>

                <FlatList
                    data={FIELD_KEYS}
                    keyExtractor={item => item}
                    renderItem={renderItem}
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    style={{ width: '100%' }}
                    
                    ListHeaderComponent={() => (
                        <View style={styles.imageHeaderContainer}>
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
                                <View style={styles.cameraBadge}>
                                    <Ionicons name="camera" size={16} color="#FFF" />
                                </View>
                            </View>
                        </View>
                    )}

                    ListFooterComponent={() => (
                        <View style={{ paddingHorizontal: 20 }}>
                            <TouchableOpacity
                                onPress={handleSubmit(onFormSubmit)}
                                style={styles.submitButton}>
                                <ButtonText style={styles.buttonText}>
                                    {isSubmitting ? t("edit_personal_info.actions.saving") : t("edit_personal_info.actions.saveChanges")}
                                </ButtonText>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 40,
    },
    imageHeaderContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
    },
    imageWrapper: {
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: 'center',
        position: 'relative',
    },
    cameraBadge: {
        position: 'absolute',
        bottom: -15,
        right: -15,
        backgroundColor: Colors.PRIMARY,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
        elevation: 3,
        zIndex: 1,
    },
    inputWrapper: {
        width: "100%",
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    labelOutside: {
        fontSize: 16,
        color: "#0F243E",
        marginBottom: 6,
        fontWeight: '600'
    },
    inputCard: {
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#CACACB",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 12,
        justifyContent: "center",
    },
    textInput: {
        fontSize: 14,
        color: "#0F243E",
        fontWeight: "500"
    },
    submitButton: {
        width: "100%",
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: { 
        color: "#FFF", 
        fontSize: 16, 
        fontWeight: "600" 
    },
});