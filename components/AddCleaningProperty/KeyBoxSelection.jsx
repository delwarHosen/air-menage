import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../../assets/Colors";
import { KeyIcon, LockForPropertyIcon } from "../../assets/icons/Icons";
import { FORM_FIELDS } from "../../constants/form";
import { Body2, Caption } from "../typo/typography";
import { FormInput } from "../ui/FormInput";

export const KeyBoxSelection = ({ control, errors }) => {
    const { t } = useTranslation();

    return (
        <View style={styles.keyBoxContainer}>
            <Controller
                control={control}
                name="keyHandover"
                render={({ field: { onChange, value } }) => (
                    <>
                        <TouchableOpacity
                            onPress={() => onChange("handover")}
                            style={[styles.keyOption, value === "handover" && styles.activeBorder]}
                        >
                            <KeyIcon />
                            <View style={styles.textContainer}>
                                <Body2>{t("keybox.in_person")}</Body2>
                                <Caption>{t("keybox.in_person_caption")}</Caption>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => onChange("lockbox")}
                            style={[styles.keyOption, value === "lockbox" && styles.activeBorder]}
                        >
                            <LockForPropertyIcon />
                            <View style={styles.textContainer}>
                                <Body2>{t("keybox.lockbox")}</Body2>
                                <Caption>{t("keybox.lockbox_caption")}</Caption>
                            </View>
                        </TouchableOpacity>
                    </>
                )}
            />

            <Controller
                control={control}
                name={FORM_FIELDS.KEY_LOCATION}
                render={({ field: { onChange, value } }) => (
                    <View>
                        <Body2 style={styles.inputLabel}>{t("keybox.location")}</Body2>
                        <FormInput
                            value={value}
                            onChangeText={onChange}
                            placeholder={t("keybox.placeholders.location")}
                            error={errors[FORM_FIELDS.KEY_LOCATION]?.message}
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
                        <Body2 style={styles.inputLabel}>{t("keybox.code")}</Body2>
                        <FormInput
                            value={value}
                            onChangeText={onChange}
                            placeholder={t("keybox.placeholders.code")}
                            error={errors[FORM_FIELDS.KEY_PASSWORD]?.message}
                            required
                        />
                    </View>
                )}
            />
        </View>
    );
};



const styles = StyleSheet.create({
    keyBoxContainer: {
        marginTop: 30,
        backgroundColor: "#FFFFFF",
        paddingVertical: 18,
        paddingHorizontal: 15,
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
        marginBottom: 20,
    },
    activeBorder: {
        borderColor: Colors.PRIMARY,
    },
    inputLabel:{
        marginBottom:-20,
        marginTop:10
    }
})