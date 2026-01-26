import { Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeOut, LinearTransition } from 'react-native-reanimated';
import { Colors } from "../../assets/Colors";
import { KeyIcon, LockForPropertyIcon } from "../../assets/icons/Icons";
import { FORM_FIELDS } from "../../constants/form";
import { Body2, Caption } from "../typo/typography";
import { FormInput } from "../ui/FormInput";

export const KeyBoxSelection = ({ control, errors }) => {
    const { t } = useTranslation();

    const keyHandoverValue = useWatch({
        control,
        name: "keyHandover",
        defaultValue: "handover" 
    });

    return (
        <Animated.View 
            layout={LinearTransition.springify()} 
            style={styles.keyBoxContainer}
        >
            <Controller
                control={control}
                name="keyHandover"
                render={({ field: { onChange, value } }) => (
                    <View>
                        {/* In Person Option */}
                        <TouchableOpacity
                            onPress={() => onChange("handover")}
                            activeOpacity={0.7}
                            style={[styles.keyOption, value === "handover" && styles.activeBorder]}
                        >
                            <KeyIcon color={value === "handover" ? Colors.PRIMARY : "#000"} />
                            <View style={styles.textContainer}>
                                <Body2>
                                    {t("keybox.in_person")}
                                </Body2>
                                <Caption>{t("keybox.in_person_caption")}</Caption>
                            </View>
                        </TouchableOpacity>

                        {/* Lockbox Option */}
                        <TouchableOpacity
                            onPress={() => onChange("lockbox")}
                            activeOpacity={0.7}
                            style={[styles.keyOption, value === "lockbox" && styles.activeBorder]}
                        >
                            <LockForPropertyIcon color={value === "lockbox" ? Colors.PRIMARY : "#000"} />
                            <View style={styles.textContainer}>
                                <Body2 >
                                    {t("keybox.lockbox")}
                                </Body2>
                                <Caption>{t("keybox.lockbox_caption")}</Caption>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />

            
            {keyHandoverValue === "lockbox" && (
                <Animated.View 
                    entering={FadeInDown.duration(400)} 
                    exiting={FadeOut.duration(300)}
                >
                    <Controller
                        control={control}
                        name={FORM_FIELDS.KEY_LOCATION}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.inputGap}>
                                <Body2 style={styles.inputLabel}>{t("keybox.location")}</Body2>
                                <FormInput
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder={t("keybox.placeholders.location")}
                                    error={errors[FORM_FIELDS.KEY_LOCATION]?.message}
                                />
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name={FORM_FIELDS.KEY_PASSWORD}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.inputGap}>
                                <Body2 style={styles.inputLabel}>{t("keybox.code")}</Body2>
                                <FormInput
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder={t("keybox.placeholders.code")}
                                    error={errors[FORM_FIELDS.KEY_PASSWORD]?.message}
                                    type="password" 
                                />
                            </View>
                        )}
                    />
                </Animated.View>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    keyBoxContainer: {
        marginVertical: 30,
        backgroundColor: "#FFFFFF",
        padding: 10,
    },
    keyOption: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        minHeight: 70,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 15,
        gap: 16,
        marginBottom: 15,
    },
    activeBorder: {
        borderColor: Colors.PRIMARY,
        // backgroundColor: "#F9F9F9", 
    },
    textContainer: {
        flex: 1,
    },
    inputLabel: {
        marginBottom: -20,
        marginTop: 10,
    },
    inputGap: {
        // marginBottom: 15
    }
});