import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from "../../assets/Colors";
import Heading from "../../components/Heading/Heading";
import { Body2, ButtonText } from "../../components/typo/typography";
import { FORM_FIELDS, FORM_LABELS, FORM_PLACEHOLDERS } from "../../constants/form";

export default function PersonalEditInfo() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const { values = {}, isSubmitting, handleChange, handleSubmit, setValues } = useForm({
        initialValues: {
            [FORM_FIELDS.FULL_NAME]: params.fullName || "",
            [FORM_FIELDS.EMAIL]: params.email || "",
            [FORM_FIELDS.PHONE]: params.phone || "",
            [FORM_FIELDS.ADDRESS]: params.address || "",
            [FORM_FIELDS.CITY]: params.city || "",
            [FORM_FIELDS.COUNTRY]: params.country || "",
        }
    });

    useEffect(() => {
        if (params && setValues) {
            setValues({
                [FORM_FIELDS.FULL_NAME]: params.fullName || "",
                [FORM_FIELDS.EMAIL]: params.email || "",
                [FORM_FIELDS.PHONE]: params.phone || "",
                [FORM_FIELDS.ADDRESS]: params.address || "",
                [FORM_FIELDS.CITY]: params.city || "",
                [FORM_FIELDS.COUNTRY]: params.country || "",
            });
        }
    }, [params]);

    const editFields = [
        { id: '1', key: FORM_FIELDS.FULL_NAME },
        { id: '2', key: FORM_FIELDS.EMAIL },
        { id: '3', key: FORM_FIELDS.PHONE },
        { id: '4', key: FORM_FIELDS.ADDRESS },
        { id: '5', key: FORM_FIELDS.CITY },
        { id: '6', key: FORM_FIELDS.COUNTRY },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.inputWrapper}>
            <Body2 style={styles.labelOutside}>{FORM_LABELS[item.key]}</Body2>
            <View style={styles.inputCard}>
                <TextInput
                    style={styles.textInput}
                    value={values[item.key] || ""}
                    onChangeText={(text) => handleChange(item.key, text)}
                    placeholder={FORM_PLACEHOLDERS[item.key]}
                    placeholderTextColor="#7E8792"
                />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <View style={{ marginHorizontal: 20 }}> 
                    <Heading title={"Edit Information"} />
                </View>
                <FlatList
                    data={editFields}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <View>

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
                        </View>

                    )}
                    ListFooterComponent={() => (
                        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                            <ButtonText style={styles.buttonText}>{isSubmitting ? "Saving..." : "Save Changes"}</ButtonText>
                        </TouchableOpacity>
                    )}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#FAFAFA" },
    scrollContainer: { alignItems: "center", paddingBottom: 40 },
    headerContainer: { width: '100%', alignItems: 'center' },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: 50,
        marginTop: 10,
        paddingHorizontal: 20,
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
        width: 336,
        marginBottom: 15
    },
    labelOutside: {
        fontSize: 16,
        color: "#7E8792",
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
        width: 336,
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});