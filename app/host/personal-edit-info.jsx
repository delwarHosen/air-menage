import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from "../../assets/Colors";
import Heading from "../../components/Heading/Heading";
import { Body2, ButtonText } from "../../components/typo/typography";

export default function PersonalEditInfo() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { t } = useTranslation();

    const FIELD_KEYS = ["fullName", "email", "phone", "address", "city", "country"];

   
    const { setValue, watch, handleSubmit, reset, formState: { isSubmitting } } = useForm({
        defaultValues: FIELD_KEYS.reduce((acc, key) => {
            acc[key] = params[key] || "";
            return acc;
        }, {})
    });

    
    const values = watch();

   
    const handleChange = (name, text) => {
        setValue(name, text);
    };

   useEffect(() => {
    if (params) {
        
        const initialData = FIELD_KEYS.reduce((acc, key) => {
            acc[key] = params[key] || "";
            return acc;
        }, {});
        
        reset(initialData);
    }
}, []); 

  
    const onFormSubmit = (data) => {
        console.log("Form Data:", data);
    };

    const renderItem = ({ item }) => (
        <View style={styles.inputWrapper}>
            <Body2 style={styles.labelOutside}>{t(`edit_personal_info.fields.${item}`)}</Body2>
            <View style={styles.inputCard}>
                <TextInput
                    style={styles.textInput}
                    value={values[item] || ""}
                    onChangeText={(text) => handleChange(item, text)}
                    placeholder={t(`edit_personal_info.placeholders.${item}`)}
                    placeholderTextColor="#7E8792"
                />
            </View>
        </View>
    );

    return (
        <>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
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
                        // onPress={handleSubmit(onFormSubmit)}  
                        onPress={()=>router.push("/host/menu")}
                        style={styles.submitButton}>
                            <ButtonText style={styles.buttonText}>
                                {isSubmitting ? t("edit_personal_info.actions.saving") : t("edit_personal_info.actions.saveChanges")}
                            </ButtonText>
                        </TouchableOpacity>
                    )}
                />
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 40,
        paddingHorizontal: '2.5%',
        width: '100%',
    },
    headerContainer: { width: '100%', alignItems: 'center' },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: 50,
        marginTop: 10,
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
    titleWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#0F243E",
        textAlign: 'center',
    },
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
        marginBottom: 15
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
    buttonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});