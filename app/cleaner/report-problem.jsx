import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import Heading from '../../components/Heading/Heading';
import { Caption, H5 } from '../../components/typo/typography';
import { FormInput } from '../../components/ui/FormInput';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { FORM_FIELDS } from '../../constants/form';

export default function ReportProblemScreen() {
    const { t } = useTranslation();
    const [problemType, setProblemType] = useState('Damaged item');
    const [image, setImage] = useState(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            [FORM_FIELDS.REPORT_TITLE]: "",
            [FORM_FIELDS.REPORT_REASON]: "",
        },
    });

    const onSubmit = (values) => {
        try {
            const payload = {
                report: values[FORM_FIELDS.REPORT_TITLE],
                report_des: values[FORM_FIELDS.REPORT_REASON],
            };

            console.log("Submitted Data:", payload);

            router.push("/cleaner/home")

        } catch (err) {
            if (Platform.OS === 'android') {
                ToastAndroid.show(t("common.somethingWrong"), ToastAndroid.SHORT);
            } else {
                console.log("Error logic here");
            }
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={styles.header}>
                    <Heading title={t("reportProblem.title")} />
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Type of problem */}
                    <View style={styles.inputContainer}>

                        <Controller
                            control={control}
                            name={FORM_FIELDS.REPORT_TITLE}
                            render={({ field }) => (
                                <FormInput
                                    label={t("reportProblem.reportTitleLabel")}
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    placeholder={t("reportProblem.reportTitlePlaceholder")}
                                    required

                                />
                            )}
                        />
                    </View>

                    {/* Reason */}
                    <View >
                        <Controller
                            control={control}

                            name={FORM_FIELDS.REPORT_REASON}
                            render={({ field }) => (
                                <FormInput
                                    label={t("reportProblem.reportReasonLabel")}
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    placeholder={t("reportProblem.reportReasonPlaceholder")}
                                    required
                                    multiline
                                    style={{ height: 96 }}
                                />
                            )}
                        />
                    </View>

                    {/* Add Photos */}
                    <H5 style={styles.label}>{t("reportProblem.addPhotos")}</H5>

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
                </ScrollView>

                {/* Send Request Button */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.sendBtn} onPress={handleSubmit(onSubmit)}>
                        <Caption style={styles.sendBtnText}>{t("reportProblem.sendRequest")}</Caption>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            {/* Header */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 0,
        // paddingBottom: 15
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2D3748',
        marginBottom: 10,
        marginTop: 15
    },
    imageUpload: {
        width: 150,
        height: 100,
        borderWidth: 2,
        borderColor: '#E2E8F0',
        borderStyle: 'dashed',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    imageText: {
        fontSize: 14,
        color: '#A0AEC0'
    },
    footer: { paddingHorizontal: 20, paddingVertical: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#F7FAFC' },
    sendBtn: { backgroundColor: '#33C1FF', height: 54, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    sendBtnText: { fontSize: 16, fontWeight: '600', color: '#FFF' }
});
