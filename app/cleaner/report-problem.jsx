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
    const [image, setImage] = useState(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            [FORM_FIELDS.REPORT_TITLE]: "",
            [FORM_FIELDS.REPORT_REASON]: "",
            [FORM_FIELDS.PROPERTY_IMAGE]: null,
        },
    });

    const onSubmit = (values) => {
        try {
            const payload = {
                report: values[FORM_FIELDS.REPORT_TITLE],
                report_des: values[FORM_FIELDS.REPORT_REASON],
                image: values[FORM_FIELDS.PROPERTY_IMAGE],
            };
            console.log("Submitted Data:", payload);
            router.push("/cleaner/home");
        } catch (err) {
            if (Platform.OS === 'android') {
                ToastAndroid.show(t("common.somethingWrong"), ToastAndroid.SHORT);
            }
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                // কিবোর্ড ওপেন হলে অতিরিক্ত অফসেট যোগ করা (iOS এর জন্য ভালো কাজ করে)
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <View style={styles.header}>
                    <Heading title={t("reportProblem.title")} />
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    // এই লাইনটি নিচ থেকে জায়গা নিতে সাহায্য করবে
                    contentContainerStyle={styles.scrollContentContainer}
                    keyboardShouldPersistTaps="handled"
                >
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
                    <View>
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
                                    style={{ height: 120 }} // ছোট ফোনে টাইপ করতে সুবিধা হবে
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
                    {/* Send Request Button */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.sendBtn}
                            onPress={handleSubmit(onSubmit)}
                            activeOpacity={0.8}
                        >
                            <Caption style={styles.sendBtnText}>{t("reportProblem.sendRequest")}</Caption>
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
        backgroundColor: '#FAFAFA',
    },
    header: {
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
    },
    scrollContentContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2D3748',
        marginBottom: 10,
        marginTop: 15
    },
    footer: {
        marginTop:20
        // paddingHorizontal: 20,
        // paddingVertical: 15,
        // backgroundColor: '#FFF',
        // borderTopWidth: 1,
        // borderTopColor: '#F7FAFC'
    },
    sendBtn: {
        backgroundColor: '#33C1FF',
        height: 54,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendBtnText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF'
    }
});