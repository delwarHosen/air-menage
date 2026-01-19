import { useFonts } from 'expo-font';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";

import { Colors } from "../../assets/Colors";

import { FORM_FIELDS } from "../../constants/form";
import { Body2 } from "../typo/typography";
import { FormInput } from "../ui/FormInput";

import WorkTypeList from "./WorkTypeSection";

export default function AddCleaningProperty() {
    const router = useRouter();
    const { t } = useTranslation();

    const [generalWork, setGeneralWork] = useState([]);
    const [bedroomWork, setBedroomWork] = useState([]);
    const [bathroomWork, setBathroomWork] = useState([]);
    const [kitchenWork, setKitchenWork] = useState([]);

    const [fontsLoaded] = useFonts({
        'Syne-Regular': require("../../assets/fonts/Syne-Regular.ttf"),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            [FORM_FIELDS.PROPERTY_TITLE]: "",
            [FORM_FIELDS.PROPERTY_IMAGE]: "",
            [FORM_FIELDS.FLOOR_NUMBER]: "",
            [FORM_FIELDS.APARTMENT_NUMBER]: "",
            [FORM_FIELDS.PROPERTY_SIZE]: "",
            [FORM_FIELDS.LOCATION]: "",
            propertyType: "Apartment",
            hasElevator: "Yes",
            [FORM_FIELDS.KEY_LOCATION]: "",
            [FORM_FIELDS.KEY_PASSWORD]: "",
            bedrooms: 1,
            kitchens: 1,
            bathrooms: 1,
            description: "",
        },
    });


    if (!fontsLoaded) {
        return null;
    }


    const handleAddGeneral = (text) => setGeneralWork([...generalWork, { id: Date.now().toString(), text }]);
    const handleDeleteGeneral = (id) => setGeneralWork(generalWork.filter(item => item.id !== id));

    const handleAddBedRoom = (text) => setBedroomWork([...bedroomWork, { id: Date.now().toString(), text }]);
    const handleDeleteBedRoom = (id) => setBedroomWork(bedroomWork.filter(item => item.id !== id));

    const handleAddBathRoom = (text) => setBathroomWork([...bathroomWork, { id: Date.now().toString(), text }]);
    const handleDeleteBathRoom = (id) => setBathroomWork(bathroomWork.filter(item => item.id !== id));

    const handleAddKitchenRoom = (text) => setKitchenWork([...kitchenWork, { id: Date.now().toString(), text }]);
    const handleDeleteKitchen = (id) => setKitchenWork(kitchenWork.filter(item => item.id !== id));

    const onSubmit = (values) => {
        try {
            const payload = {
                ...values,
                generalWork,
                bedroomWork,
                bathroomWork,
                kitchenWork,
            };
            console.log("Submitted Data:", payload);
        } catch {
            ToastAndroid.show(t("common.error"), ToastAndroid.SHORT);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
              
                behavior={Platform.OS === "ios" ? "padding" : "padding"}
                style={{ flex: 1 }}
                
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 80}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                   

                    <Controller
                        control={control}
                        name={FORM_FIELDS.PROPERTY_TITLE}
                        render={({ field }) => (
                            <FormInput
                                label={t("addProperty.title")}
                                placeholder={t("addProperty.titlePlaceholder")}
                                value={field.value}
                                onChangeText={field.onChange}
                                style={styles.syneInput}
                            />
                        )}
                    />

                   

                    <Body2 style={styles.label}>{t("addProperty.description")}</Body2>
                    <Controller
                        control={control}
                        name="description"
                        render={({ field }) => (
                            <View style={styles.textAreaBox}>
                                <TextInput
                                    style={styles.textArea}
                                    placeholder={t("addProperty.descriptionPlaceholder")}
                                    placeholderTextColor="#949494"
                                    multiline
                                    value={field.value}
                                    onChangeText={field.onChange}
                                />
                            </View>
                        )}
                    />

                   
                    <WorkTypeList title={t("work.general")} workTypes={generalWork} onAdd={handleAddGeneral} onDelete={handleDeleteGeneral} />
                    <WorkTypeList title={t("work.bedroom")} workTypes={bedroomWork} onAdd={handleAddBedRoom} onDelete={handleDeleteBedRoom} />
                    <WorkTypeList title={t("work.bathroom")} workTypes={bathroomWork} onAdd={handleAddBathRoom} onDelete={handleDeleteBathRoom} />
                    <WorkTypeList title={t("work.kitchen")} workTypes={kitchenWork} onAdd={handleAddKitchenRoom} onDelete={handleDeleteKitchen} />

                    {/* সাবমিট বাটন */}
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Body2 style={{ color: "#fff" }}>{t("common.create")}</Body2>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FAFAFA" },
    scrollContainer: {
        paddingHorizontal: "4%",
        paddingTop: 20,
        paddingBottom: 40, 
        flexGrow: 1
    },
    label: { marginVertical: 10 },
    syneInput: { fontFamily: 'Syne-Regular' },
    elevatorContainer: { flexDirection: "row", gap: 10 },
    elevatorButton: {
        flex: 1, height: 48, borderRadius: 8, borderWidth: 1,
        justifyContent: "center", alignItems: "center",
        borderColor: Colors.BORDER_COLOR, backgroundColor: "#FFFFFF"
    },
    active: { borderColor: Colors.PRIMARY, borderWidth: 1 },
    suppliesRow: { flexDirection: "row", gap: 10, marginTop: 20 },
    suppliesCard: {
        flex: 1, borderRadius: 12, borderWidth: 1, padding: 16,
        backgroundColor: "#fff", borderColor: Colors.BORDER_COLOR,
    },
    suppliesText: { marginTop: 40, textAlign: "center" },
    textAreaBox: {
        minHeight: 110, borderWidth: 1, borderRadius: 8,
        paddingHorizontal: 12, paddingVertical: 8,
        borderColor: Colors.BORDER_COLOR, backgroundColor: "#fff",
    },
    textArea: { flex: 1, textAlignVertical: "top", color: "#1A1A1A", fontFamily: 'Syne-Regular' },
    submitButton: {
        marginTop: 40,
        marginBottom: 20, 
        height: 50,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.PRIMARY,
    },
});