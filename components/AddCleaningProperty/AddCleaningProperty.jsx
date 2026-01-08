import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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

import { FORM_FIELDS, FORM_LABELS, FORM_PLACEHOLDERS } from "../../constants/form";
import { Body2, H6 } from "../typo/typography";
import { FormInput } from "../ui/FormInput";

import CounterPropertySpecification from "./CounterPropertySpecification";
import { KeyBoxSelection } from "./KeyBoxSelection";
import PropertyTypePicker from "./PropertyTypePicker";
import WorkTypeList from "./WorkTypeSection";

export default function AddCleaningProperty() {
    const router = useRouter();

    const [generalWork, setGeneralWork] = useState([]);
    const [bedroomWork, setBedroomWork] = useState([]);
    const [bathroomWork, setBathroomWork] = useState([]);
    const [kitchenWork, setKitchenWork] = useState([]);


    const handleAddGeneral = (text) => {
        const newItem = {
            id: Date.now().toString(),
            text: text
        };
        setGeneralWork([...generalWork, newItem]);
    };

    const handleDeleteGeneral = (id) => {
        setGeneralWork(generalWork.filter(item => item.id !== id));
    };




    //bedRoom
    const handleAddBedRoom = (text) => {
        const newItem = {
            id: Date.now().toString(),
            text: text
        };
        setBedroomWork([...bedroomWork, newItem]);
    };

    const handleDeleteBedRoom = (id) => {
        setBedroomWork(bedroomWork.filter(item => item.id !== id));
    };

    //bathroom 
    const handleAddBathRoom = (text) => {
        const newItem = {
            id: Date.now().toString(),
            text: text
        };
        setBathroomWork([...bathroomWork, newItem]);
    };

    const handleDeleteBathRoom = (id) => {
        setBathroomWork(bathroomWork.filter(item => item.id !== id));
    };
    //bathroom 
    const handleAddKitchenRoom = (text) => {
        const newItem = {
            id: Date.now().toString(),
            text: text
        };
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

                // Counter values
                bedrooms: values.bedrooms,
                kitchens: values.kitchens,
                bathrooms: values.bathrooms,

                // Work types
                generalWork: generalWork,
                bedroomWork: bedroomWork,
                bathroomWork: bathroomWork,
                kitchenWork: kitchenWork,

            };

            console.log("Submitted Data:", payload);
        } catch (err) {
            ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            >
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 80 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Property Title */}
                    <Controller
                        control={control}
                        name={FORM_FIELDS.PROPERTY_TITLE}
                        render={({ field }) => (
                            <FormInput
                                label={FORM_LABELS[FORM_FIELDS.PROPERTY_TITLE]}
                                value={field.value}
                                onChangeText={field.onChange}
                                placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.PROPERTY_TITLE]}
                                placeholderTextColor="#3F3F4680"
                                required
                            />
                        )}
                    />

                    {/* Property Image */}
                    <Controller
                        control={control}
                        name={FORM_FIELDS.PROPERTY_IMAGE}
                        render={({ field }) => (
                            <FormInput
                                label={FORM_LABELS[FORM_FIELDS.PROPERTY_IMAGE]}
                                value={field.value}
                                onChangeText={field.onChange}
                                placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.PROPERTY_IMAGE]}
                                required
                            />
                        )}
                    />

                    {/* Property Type */}
                    <Body2 style={styles.label}>Property Type</Body2>
                    <Controller
                        control={control}
                        name="propertyType"
                        render={({ field: { value, onChange } }) => (
                            <PropertyTypePicker
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />

                    {/* Floor & Apartment */}
                    <Controller
                        control={control}
                        name={FORM_FIELDS.FLOOR_NUMBER}
                        render={({ field }) => (
                            <FormInput
                                label={FORM_LABELS[FORM_FIELDS.FLOOR_NUMBER]}
                                value={field.value}
                                onChangeText={field.onChange}
                                placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.FLOOR_NUMBER]}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name={FORM_FIELDS.APARTMENT_NUMBER}
                        render={({ field }) => (
                            <FormInput
                                label={FORM_LABELS[FORM_FIELDS.APARTMENT_NUMBER]}
                                value={field.value}
                                onChangeText={field.onChange}
                                placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.APARTMENT_NUMBER]}
                            />
                        )}
                    />

                    {/* Elevator */}
                    <Body2 style={styles.label}>Elevator</Body2>
                    <Controller
                        control={control}
                        name="hasElevator"
                        render={({ field }) => (
                            <View style={styles.elevatorContainer}>
                                {["Yes", "No"].map((item) => (
                                    <TouchableOpacity
                                        key={item}
                                        style={[
                                            styles.elevatorButton,
                                            field.value === item && styles.active,
                                        ]}
                                        onPress={() => field.onChange(item)}
                                    >
                                        <Body2>{item}</Body2>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    />

                    {/* Counters */}
                    <Body2 style={styles.label}>Property Specifications</Body2>
                    <Controller
                        control={control}
                        name="bedrooms"
                        render={({ field }) => (
                            <CounterPropertySpecification
                                label="Bedroom"
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
                                label="Kitchen"
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
                                label="Bathroom"
                                value={field.value}
                                onIncrement={() => field.onChange(field.value + 1)}
                                onDecrement={() =>
                                    field.value > 0 && field.onChange(field.value - 1)
                                }
                            />
                        )}
                    />

                    {/* Key Box */}
                    <KeyBoxSelection control={control} errors={errors} />

                    {/* Supplies */}
                    <View style={styles.suppliesRow}>
                        <View style={styles.suppliesCard}>
                            <VacumeProvidedIcon />
                            <H6 style={styles.suppliesText}>Vacuum Provided</H6>
                        </View>
                        <View style={styles.suppliesCard}>
                            <SupliesProvidedIcon />
                            <H6 style={styles.suppliesText}>Supplies Provided</H6>
                        </View>
                    </View>

                    {/* Description */}
                    <Body2 style={styles.label}>Description</Body2>
                    <Controller
                        control={control}
                        name="description"
                        render={({ field }) => (
                            <View style={styles.textAreaBox}>
                                <TextInput
                                    multiline
                                    placeholder="Type your description here..."
                                    style={styles.textArea}
                                    value={field.value}
                                    onChangeText={field.onChange}
                                />
                            </View>
                        )}
                    />

                    {/* Work Types */}

                    <WorkTypeList
                        title="General"
                        workTypes={generalWork}
                        onAdd={handleAddGeneral}
                        onDelete={handleDeleteGeneral}
                    />
                    <WorkTypeList
                        title="Bedroom"
                        workTypes={bedroomWork}
                        onAdd={handleAddBedRoom}
                        onDelete={handleDeleteBedRoom}
                    />
                    <WorkTypeList
                        title="Bathroom"
                        workTypes={bathroomWork}
                        onAdd={handleAddBathRoom}
                        onDelete={handleDeleteBathRoom}
                    />
                    <WorkTypeList
                        title="Kitchen Room"
                        workTypes={kitchenWork}
                        onAdd={handleAddKitchenRoom}
                        onDelete={handleDeleteKitchen}
                    />




                    {/* Submit */}
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
                        <Body2 style={{ color: "#fff" }}>Create Now</Body2>
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
        paddingHorizontal:"3%",
        paddingTop:20
    },
    scrollContainer: {
        padding: 16,
        paddingBottom: 80
    },
    label: { marginVertical: 10 },


    elevatorContainer: { flexDirection: "row", gap: 10 },
    elevatorButton: {
        flex: 1,
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderColor: Colors.BORDER_COLOR,
    },

    suppliesRow: { flexDirection: "row", gap: 10, marginTop: 20 },
    suppliesCard: {
        flex: 1,
        height: 130,
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
        padding: 12,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: "#fff",
    },
    textArea: { flex: 1, textAlignVertical: "top" },

    submitButton: {
        marginTop: 30,
        height: 50,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.PRIMARY,
    },
});
