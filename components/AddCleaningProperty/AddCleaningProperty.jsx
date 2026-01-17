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
import {
    SupliesProvidedIcon,
    VacumeProvidedIcon
} from "../../assets/icons/Icons";
import { ImageUpload } from "../ui/ImageUpload";

import { FORM_FIELDS } from "../../constants/form";
import { Body2, H6 } from "../typo/typography";
import { FormInput } from "../ui/FormInput";

import CounterPropertySpecification from "./CounterPropertySpecification";
import { KeyBoxSelection } from "./KeyBoxSelection";
import PropertyTypePicker from "./PropertyTypePicker";
import WorkTypeList from "./WorkTypeSection";

export default function AddCleaningProperty() {
    const router = useRouter();
    const { t } = useTranslation();

    const [generalWork, setGeneralWork] = useState([]);
    const [bedroomWork, setBedroomWork] = useState([]);
    const [bathroomWork, setBathroomWork] = useState([]);
    const [kitchenWork, setKitchenWork] = useState([]);

    const handleAddGeneral = (text) => {
        const newItem = { id: Date.now().toString(), text };
        setGeneralWork([...generalWork, newItem]);
    };

    const handleDeleteGeneral = (id) => {
        setGeneralWork(generalWork.filter(item => item.id !== id));
    };

    const handleAddBedRoom = (text) => {
        const newItem = { id: Date.now().toString(), text };
        setBedroomWork([...bedroomWork, newItem]);
    };

    const handleDeleteBedRoom = (id) => {
        setBedroomWork(bedroomWork.filter(item => item.id !== id));
    };

    const handleAddBathRoom = (text) => {
        const newItem = { id: Date.now().toString(), text };
        setBathroomWork([...bathroomWork, newItem]);
    };

    const handleDeleteBathRoom = (id) => {
        setBathroomWork(bathroomWork.filter(item => item.id !== id));
    };

    const handleAddKitchenRoom = (text) => {
        const newItem = { id: Date.now().toString(), text };
        setKitchenWork([...kitchenWork, newItem]);
    };

    const handleDeleteKitchen = (id) => {
        setKitchenWork(kitchenWork.filter(item => item.id !== id));
    };

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
        },
    });

    const onSubmit = (values) => {
        try {
            const payload = {
                title: values[FORM_FIELDS.PROPERTY_TITLE],
                image: values[FORM_FIELDS.PROPERTY_IMAGE],
                floor: values[FORM_FIELDS.FLOOR_NUMBER],
                apartmentNo: values[FORM_FIELDS.APARTMENT_NUMBER],
                size: values[FORM_FIELDS.PROPERTY_SIZE],
                location: values[FORM_FIELDS.LOCATION],
                type: values.propertyType,
                elevator: values.hasElevator,
                keyLocation: values[FORM_FIELDS.KEY_LOCATION],
                keyPassword: values[FORM_FIELDS.KEY_PASSWORD],
                bedrooms: values.bedrooms,
                kitchens: values.kitchens,
                bathrooms: values.bathrooms,
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
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>

                    <Controller
                        control={control}
                        name={FORM_FIELDS.PROPERTY_TITLE}
                        render={({ field }) => (
                            <FormInput
                                label={t("addProperty.title")}
                                placeholder={t("addProperty.titlePlaceholder")}
                                value={field.value}
                                onChangeText={field.onChange}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name={FORM_FIELDS.PROPERTY_IMAGE}
                        render={({ field }) => (
                            <ImageUpload
                                label={t("addProperty.image")}
                                image={field.value}
                                onImageSelect={field.onChange}
                                shape="square"
                            />
                        )}
                    />

                    <Body2 style={styles.label}>
                        {t("addProperty.propertyType")}
                    </Body2>

                    <Controller
                        control={control}
                        name="propertyType"
                        defaultValue="Apartment"   
                        render={({ field: { value, onChange } }) => (
                            <PropertyTypePicker
                                value={value}
                                onChange={(val) => onChange(val)} 
                            />
                        )}
                    />
                    {/* evaluator */}
                    <Body2 style={styles.label}>
                        {t("addProperty.elevator")}
                    </Body2>

                    <Controller
                        control={control}
                        name="hasElevator"
                        render={({ field }) => (
                            <View style={styles.elevatorContainer}>
                                {["Yes", "No"].map(item => {
                                    const isActive = field.value === item;
                                    return (
                                        <TouchableOpacity
                                            key={item}
                                            style={[
                                                styles.elevatorButton,
                                                isActive && styles.active,
                                            ]}
                                            onPress={() => field.onChange(item)}
                                        >
                                            <Body2>
                                                {item === "Yes"
                                                    ? t("common.yes")
                                                    : t("common.no")}
                                            </Body2>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        )}
                    />

                    <H6 style={{ marginTop: 30 }}>
                        {t("addProperty.specifications")}
                    </H6>

                    <Controller
                        control={control}
                        name="bedrooms"
                        render={({ field }) => (
                            <CounterPropertySpecification
                                labelKey={t("addProperty.bedroom")}
                                value={field.value}
                                onIncrement={() => field.onChange(field.value + 1)}
                                onDecrement={() =>
                                    field.value > 0 && field.onChange(field.value - 1)
                                }
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="kitchens"
                        render={({ field }) => (
                            <CounterPropertySpecification
                                labelKey={t("addProperty.kitchen")}
                                value={field.value}
                                onIncrement={() => field.onChange(field.value + 1)}
                                onDecrement={() =>
                                    field.value > 0 && field.onChange(field.value - 1)
                                }
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="bathrooms"
                        render={({ field }) => (
                            <CounterPropertySpecification
                                labelKey={t("addProperty.bathroom")}
                                value={field.value}
                                onIncrement={() => field.onChange(field.value + 1)}
                                onDecrement={() =>
                                    field.value > 0 && field.onChange(field.value - 1)
                                }
                            />
                        )}
                    />

                    <KeyBoxSelection control={control} errors={errors} />

                    <View style={styles.suppliesRow}>
                        <View style={styles.suppliesCard}>
                            <VacumeProvidedIcon />
                            <H6 style={styles.suppliesText}>
                                {t("addProperty.vacuum")}
                            </H6>
                        </View>
                        <View style={styles.suppliesCard}>
                            <SupliesProvidedIcon />
                            <H6 style={styles.suppliesText}>
                                {t("addProperty.supplies")}
                            </H6>
                        </View>
                    </View>

                    <Body2 style={styles.label}>
                        {t("addProperty.description")}
                    </Body2>

                    <Controller
                        control={control}
                        name="description"
                        render={({ field }) => (
                            <TextInput
                                style={styles.textArea}
                                placeholder={t("addProperty.descriptionPlaceholder")}
                                multiline
                                value={field.value}
                                onChangeText={field.onChange}
                            />
                        )}
                    />

                    <WorkTypeList
                        title={t("work.general")}
                        workTypes={generalWork}
                        onAdd={handleAddGeneral}
                        onDelete={handleDeleteGeneral}
                    />

                    <WorkTypeList
                        title={t("work.bedroom")}
                        workTypes={bedroomWork}
                        onAdd={handleAddBedRoom}
                        onDelete={handleDeleteBedRoom}
                    />

                    <WorkTypeList
                        title={t("work.bathroom")}
                        workTypes={bathroomWork}
                        onAdd={handleAddBathRoom}
                        onDelete={handleDeleteBathRoom}
                    />

                    <WorkTypeList
                        title={t("work.kitchen")}
                        workTypes={kitchenWork}
                        onAdd={handleAddKitchenRoom}
                        onDelete={handleDeleteKitchen}
                    />

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Body2 style={{ color: "#fff" }}>
                            {t("common.create")}
                        </Body2>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        paddingHorizontal: "5%",
        paddingTop: 20
    },
    scrollContainer: {
        padding: 16,
        paddingBottom: 80
    },
    label: { marginVertical: 10 },


    elevatorContainer: {
        flexDirection: "row",
        gap: 10
    },
    elevatorButton: {
        flex: 1,
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: "#FFFFFF"
    },
    active: {
        borderColor: Colors.PRIMARY,
        borderWidth: 1,
    },
    suppliesRow: {
        flexDirection: "row",
        gap: 10,
        marginTop: 20
    },
    suppliesCard: {
        flex: 1,
        height: "100%",
        borderRadius: 12,
        borderWidth: 1,
        padding: 16,
        backgroundColor: "#fff",
        borderColor: Colors.BORDER_COLOR,
    },
    suppliesText: { marginTop: 40, textAlign: "center" },

    textAreaBox: {
        height: 110,
        borderWidth: 1,
        borderRadius: 8,
        // padding: 12,
        paddingLeft: 5,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: "#fff",
    },
    textArea: { flex: 1, textAlignVertical: "top", color: "#949494" },

    submitButton: {
        marginTop: 30,
        height: 50,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.PRIMARY,
    },
});
