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
    View
} from "react-native";
import { Colors } from "../../assets/Colors";
import { ApartmantHomeIcon, ApartmentIcon, KeyIcon, LockForPropertyIcon, SupliesProvidedIcon, VacumeProvidedIcon } from "../../assets/icons/Icons";
import { FORM_FIELDS, FORM_LABELS, FORM_PLACEHOLDERS } from "../../constants/form";
import WorkTypeSection from "../AddCleaningProperty/WorkTypeSection";
import Heading from "../Heading/Heading";
import { Body2, Caption, H6 } from "../typo/typography";
import { FormInput } from "../ui/FormInput";


export default function AddCleaningProperty() {
    const router = useRouter();
    const { t } = useTranslation();
    
    const [generalWork, setGeneralWork] = useState([]);
    const [bedroomWork, setBedroomWork] = useState([]);
    const [bathroomWork, setBathRoomWork] = useState([]);
    const [kitchenWork, setKitchenWork] = useState([]);

    // General handlar
    const addGeneral = (text) => {
        setGeneralWork([...generalWork, { id: Date.now().toString(), text }]);
    };
    const deleteGeneral = (id) => {
        setGeneralWork(generalWork.filter(item => item.id !== id));
    };

    // Bedroom handlar
    const addBedroom = (text) => {
        setBedroomWork([...bedroomWork, { id: Date.now().toString(), text }]);
    };
    const deleteBedroom = (id) => {
        setBedroomWork(bedroomWork.filter(item => item.id !== id));
    };

    // Bathroom handlar
    const addBathroom = (text) => {
        setBathRoomWork([...bathroomWork, { id: Date.now().toString(), text }]);
    };
    const deleteBathroom = (id) => {
        setBathRoomWork(bathroomWork.filter(item => item.id !== id));
    };

    // ktchen room handler
    const addKitchenroom = (text) => {
        setKitchenWork([...kitchenWork, { id: Date.now().toString(), text }]);
    };
    const deleteKitchenroom = (id) => {
        setKitchenWork(kitchenWork.filter(item => item.id !== id));
    };

    // React Hook Form setup
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
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
            [FORM_FIELDS.KEY_PASSWORD]: ""
        },
    });

    const onSubmit = async (formvalue) => {
        try {
            const data = {
                title: formvalue[FORM_FIELDS.PROPERTY_TITLE],
                image: formvalue[FORM_FIELDS.PROPERTY_IMAGE],
                property: formvalue[FORM_FIELDS.FLOOR_NUMBER],
                apartmentNo: formvalue[FORM_FIELDS.APARTMENT_NUMBER],
                propertySize: formvalue[FORM_FIELDS.PROPERTY_SIZE],
                location: formvalue[FORM_FIELDS.LOCATION],
                type: formvalue.propertyType,
                elevator: formvalue.hasElevator,
                keyLocation: formvalue[FORM_FIELDS.KEY_LOCATION],
                keyPassword: formvalue[FORM_FIELDS.KEY_PASSWORD]
            };
            console.log("Form submitted:", data);
            // router.push("/next-screen");
        } catch (error) {
            const message = error?.message || "Something went wrong!";
            if (Platform.OS === 'android') {
                ToastAndroid.show(message, ToastAndroid.SHORT);
            }
            console.log(message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Heading title="Add Properties" />
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.formContainer}>

                        {/* Property Title */}
                        <Controller
                            control={control}
                            name={FORM_FIELDS.PROPERTY_TITLE}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <FormInput
                                    style={styles.formElement}
                                    label={FORM_LABELS[FORM_FIELDS.PROPERTY_TITLE]}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.PROPERTY_TITLE]}
                                    error={errors[FORM_FIELDS.PROPERTY_TITLE]?.message}
                                    required
                                />
                            )}
                        />

                        {/* Property Image */}
                        <Controller
                            control={control}
                            name={FORM_FIELDS.PROPERTY_IMAGE}
                            render={({ field: { onChange, value } }) => (
                                <FormInput
                                    style={styles.formElement}
                                    label={FORM_LABELS[FORM_FIELDS.PROPERTY_IMAGE]}
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.PROPERTY_IMAGE]}
                                    required
                                />
                            )}
                        />

                        {/* Property Type Selection */}
                        <View style={styles.formElement}>
                            <Body2 style={styles.label}>Property Type</Body2>
                            <Controller
                                control={control}
                                name="propertyType"
                                render={({ field: { onChange, value } }) => (
                                    <View style={styles.propertyContainer}>
                                        <TouchableOpacity
                                            style={[styles.propertyCard, value === "Apartment" && styles.active]}
                                            onPress={() => onChange("Apartment")}
                                        >
                                            <ApartmentIcon />
                                            <Body2 style={styles.title}>Apartment</Body2>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.propertyCard, value === "Home" && styles.active]}
                                            onPress={() => onChange("Home")}
                                        >
                                            <ApartmantHomeIcon />
                                            <Body2 style={styles.title}>Home</Body2>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </View>

                        {/* Floor Number */}
                        <Controller
                            control={control}
                            name={FORM_FIELDS.FLOOR_NUMBER}
                            render={({ field: { onChange, value } }) => (
                                <FormInput
                                    style={styles.formElement}
                                    label={FORM_LABELS[FORM_FIELDS.FLOOR_NUMBER]}
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.FLOOR_NUMBER]}
                                    required
                                />
                            )}
                        />

                        {/* Apartment Number */}
                        <Controller
                            control={control}
                            name={FORM_FIELDS.APARTMENT_NUMBER}
                            render={({ field: { onChange, value } }) => (
                                <FormInput
                                    style={styles.formElement}
                                    label={FORM_LABELS[FORM_FIELDS.APARTMENT_NUMBER]}
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.APARTMENT_NUMBER]}
                                    required
                                />
                            )}
                        />

                        {/* Elevator Selection */}
                        <View style={styles.formElement}>
                            <Body2 style={styles.label}>Elevator</Body2>
                            <Controller
                                control={control}
                                name="hasElevator"
                                render={({ field: { onChange, value } }) => (
                                    <View style={styles.elevatorContainer}>
                                        <TouchableOpacity
                                            style={[styles.elevatorButton, value === "Yes" && styles.active]}
                                            onPress={() => onChange("Yes")}
                                        >
                                            <Body2 style={styles.title}>Yes</Body2>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.elevatorButton, value === "No" && styles.active]}
                                            onPress={() => onChange("No")}
                                        >
                                            <Body2 style={styles.title}>No</Body2>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </View>

                        {/* Property Size */}
                        <Controller
                            control={control}
                            name={FORM_FIELDS.PROPERTY_SIZE}
                            render={({ field: { onChange, value } }) => (
                                <FormInput
                                    style={styles.formElement}
                                    label={FORM_LABELS[FORM_FIELDS.PROPERTY_SIZE]}
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.PROPERTY_SIZE]}
                                    required
                                />
                            )}
                        />

                        {/* Location */}
                        <Controller
                            control={control}
                            name={FORM_FIELDS.LOCATION}
                            render={({ field: { onChange, value } }) => (
                                <FormInput
                                    style={styles.formElement}
                                    label={FORM_LABELS[FORM_FIELDS.LOCATION]}
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.LOCATION]}
                                    required
                                />
                            )}
                        />


                        {/* Property Specifications Selection */}
                        <View style={styles.formElement}>
                            <Body2 style={styles.label}>Property Specifications</Body2>
                            <View style={styles.specificationsWrapper}>
                                {/* Bedroom Item */}
                                <View style={styles.specItem}>
                                    <Body2 style={styles.specLabel}>Bedroom</Body2>
                                    <View style={styles.counterContainer}>
                                        <TouchableOpacity style={styles.counterButton}>
                                            <Body2 style={styles.buttonText}>-</Body2>
                                        </TouchableOpacity>
                                        <Body2 style={styles.counterValue}>1</Body2>
                                        <TouchableOpacity style={styles.counterButton}>
                                            <Body2 style={styles.buttonText}>+</Body2>
                                        </TouchableOpacity>
                                    </View>
                                </View>


                                <View style={styles.specItem}>
                                    <Body2 style={styles.specLabel}>kitchen</Body2>
                                    <View style={styles.counterContainer}>
                                        <TouchableOpacity style={styles.counterButton}>
                                            <Body2 style={styles.buttonText}>-</Body2>
                                        </TouchableOpacity>
                                        <Body2 style={styles.counterValue}>1</Body2>
                                        <TouchableOpacity style={styles.counterButton}>
                                            <Body2 style={styles.buttonText}>+</Body2>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.specItem}>
                                    <Body2 style={styles.specLabel}>Bathroom</Body2>
                                    <View style={styles.counterContainer}>
                                        <TouchableOpacity style={styles.counterButton}>
                                            <Body2 style={styles.buttonText}>-</Body2>
                                        </TouchableOpacity>
                                        <Body2 style={styles.counterValue}>1</Body2>
                                        <TouchableOpacity style={styles.counterButton}>
                                            <Body2 style={styles.buttonText}>+</Body2>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* Gentag for Kitchen og Bathroom... */}
                            </View>
                        </View>


                        {/* Key Box Selection */}

                        <View style={styles.keyBoxContainer}>
                            {/* key type */}
                            <Controller
                                control={control}
                                name="keyHandover"
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <TouchableOpacity
                                            onPress={() => onChange("handover")}
                                            style={[
                                                styles.keyOption,
                                                value === "handover" && styles.activeBorder
                                            ]}
                                        >
                                            <View>
                                                <KeyIcon />
                                            </View>
                                            <View>
                                                <Body2>
                                                    In-person key handover
                                                </Body2>
                                                <Caption>
                                                    Meet the cleaner to give keys
                                                </Caption>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => onChange("lockbox")}
                                            style={[
                                                styles.keyOption,
                                                value === "lockbox" && styles.activeBorder
                                            ]}
                                        >
                                            <View>
                                                <LockForPropertyIcon />
                                            </View>
                                            <View>
                                                <Body2 >
                                                    Lockbox
                                                </Body2>
                                                <Caption>
                                                    Lockbox Code Released 24 Hours Before Mission
                                                </Caption>
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                )}
                            />

                            {/* KeyBox location */}
                            <Controller
                                control={control}
                                name={FORM_FIELDS.KEY_LOCATION}
                                render={({ field: { onChange, value } }) => (
                                    <View>
                                        <Body2 style={{ marginBottom: -15, marginTop: 24 }}>
                                            Keybox Location
                                        </Body2>

                                        <FormInput
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.KEY_LOCATION]}
                                            required
                                        />
                                    </View>
                                )}
                            />


                            <Controller
                                control={control}
                                name={FORM_FIELDS.KEY_PASSWORD}
                                render={({ field: { onChange, value } }) => (
                                    <View>
                                        <Body2 style={{ marginBottom: -15 }}>
                                            Lockbox Code
                                        </Body2>

                                        <FormInput
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.KEY_PASSWORD]}
                                            required
                                        />
                                    </View>
                                )}
                            />

                        </View>


                        {/* Provided Supplies */}
                        <View style={styles.providerSupliesHorizental}>
                            <View style={styles.providerSupliesCard}>
                                <VacumeProvidedIcon />
                                <H6 style={{ textAlign: "center", marginTop: 40 }}>Vacuum Provided</H6>
                            </View>
                            <View style={styles.providerSupliesCard}>
                                <SupliesProvidedIcon />
                                <H6 style={{ textAlign: "center", marginTop: 40 }}>Supplies Provided</H6>
                            </View>
                        </View>


                        {/* Description */}
                        <View style={{ marginTop: 30 }}>
                            <Body2 style={{ marginBottom: 10 }}>
                                Description
                            </Body2>
                            <View style={styles.textAreaContainer}>
                                <TextInput
                                    style={styles.textArea}
                                    multiline={true}
                                    placeholder="Type your description here..."
                                    placeholderTextColor="#3F3F46"
                                />
                            </View>
                        </View>


                        {/* add work type container */}
                        <WorkTypeSection
                            title="General"
                            workTypes={generalWork}
                            onAdd={addGeneral}
                            onDelete={deleteGeneral}
                        />

                        <WorkTypeSection
                            title="Bedroom"
                            workTypes={bedroomWork}
                            onAdd={addBedroom}
                            onDelete={deleteBedroom}
                        />

                        <WorkTypeSection
                            title="Bathroom / WC"
                            workTypes={bathroomWork}
                            onAdd={addBathroom}
                            onDelete={deleteBathroom}
                        />

                        <WorkTypeSection
                            title="Kitchen / Kitchen Area"
                            workTypes={kitchenWork}
                            onAdd={addKitchenroom}
                            onDelete={deleteKitchenroom}
                        />



                        {/* Submit Knap (Eksempel) */}
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Body2 style={{ color: '#fff' }}>Create Now </Body2>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
    },
    headerContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        marginBottom: 16,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32,
    },
    formContainer: {
        flex: 1,
    },
    label: {
        marginBottom: 8,
        marginTop: 10,
    },
    formElement: {
        marginBottom: 16,
    },
    propertyContainer: {
        flexDirection: "row",
        // justifyContent: "space-between",
        justifyContent: "center",
        gap: 10,
    },
    propertyCard: {
        // flex: 1,
        width: "30%",
        height: 99,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: "#FFFFFF",
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    active: {
        borderColor: Colors.PRIMARY,
        elevation: 4,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    title: {
        marginTop: 8,
    },
    elevatorContainer: {
        flexDirection: "row",
        gap: 10,
    },
    elevatorButton: {
        flex: 1,
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
    },


    specificationsWrapper: {
        marginTop: 10,
    },
    specItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.BORDER_COLOR,
    },

    counterContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    counterButton: {
        width: 30,
        height: 30,
        borderRadius: 21,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        justifyContent: "center",
        alignItems: "center",

    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
        lineHeight: 20,
    },
    counterValue: {
        fontSize: 16,
        fontWeight: "600",
        minWidth: 20,
        textAlign: "center",
    },

    // KeyBox part
    keyBoxContainer: {
        marginTop: 30,
        backgroundColor: "#FFFFFF",
        paddingVertical: 18,
        paddingHorizontal: 15

    },

    keyOption: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 70,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: "#FFFFFF",
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
        gap: 16,
        marginBottom: 20
    },

    activeBorder: {
        borderColor: Colors.PRIMARY,
    },

    // Provider supplies card
    providerSupliesHorizental: {
        flexDirection: "row",
        gap: 10,
        marginTop: 30
    },

    providerSupliesCard: {
        width: "48%",
        height: 131,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 12,
        padding: 16,
        alignSelf: "flex-start"
    },

    // descriptionSection
    textAreaContainer: {
        width: "100%",
        height: 108,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 8,
        padding: 12,
        backgroundColor: "#FFFFFF",
    },
    textArea: {
        flex: 1,
        textAlignVertical: "top",
        fontSize: 16,
        color: "#000000",
    },


    // Submit buttom
    submitButton: {
        backgroundColor: Colors.PRIMARY,
        height: 50,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
});