import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, KeyboardAvoidingView, Modal, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../../assets/Colors';
import { StarIcon, StarOutlineIcon } from '../../assets/icons/Icons';
import { IMAGE_COMPONENTS } from '../../assets/image.index';
import Heading from '../../components/Heading/Heading';
import { Body1, Body2, H3 } from '../../components/typo/typography';

export default function FeedbackScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const selectedRole = useSelector((state) => state.role.selectedRole);


    const handleDone = () => {
        setIsSuccessModalVisible(false);
        // Reset form
        setRating(0);
        setText('');

        if (selectedRole === "host") {
            router.replace("/host/(tabs)/home");
        } else {
            router.replace("/cleaner/(tabs)/home");
        }
    };


    const handleSubmit = () => {
        if (rating === 0) {
            alert(t("feedback.ratingRequired", "Please provide a rating"));
            return;
        }

        console.log("Feedback Submitted:", { rating, text });
        setIsSuccessModalVisible(true);
    };


    const handleSkip = () => {
        router.back();
    };


    // font use 
    const [fontsLoaded] = useFonts({
        'Syne-Regular': require("../../assets/fonts/Syne-Regular.ttf"),
    });

    if (!fontsLoaded) return null;


    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Heading title={t("feedback.title", "Your Feedback")} />
                </View>

                {/* Main Content */}
                <View style={styles.innerContent}>
                    {/* Star Rating */}
                    <View style={styles.starContainer}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity
                                key={star}
                                onPress={() => setRating(star)}
                                activeOpacity={0.6}
                                style={styles.starButton}
                            >
                                {star <= rating ? (
                                    <StarIcon size={44} color="#FFB800" />
                                ) : (
                                    <StarOutlineIcon size={44} color="#B9B9B9" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Label */}
                    <Body1 style={styles.label}>
                        {t("feedback.label", "How Do You Feel About This Service?")}
                    </Body1>

                    {/* Feedback TextInput */}
                    <TextInput
                        style={styles.input}
                        placeholder={t("feedback.placeholder", "Type your feedback here...")}
                        placeholderTextColor="#A0AEC0"
                        multiline
                        value={text}
                        onChangeText={setText}
                        textAlignVertical="top"
                        maxLength={500}
                    />

                    {/* Character Count */}
                    <Body2 style={styles.charCount}>
                        {text.length}/500
                    </Body2>

                    {/* Action Buttons */}
                    <View style={styles.btnRow}>
                        <TouchableOpacity
                            style={styles.skipBtn}
                            onPress={handleSkip}
                            activeOpacity={0.7}
                        >
                            <Body1 style={styles.skipBtnText}>
                                {t("feedback.skip", "Skip")}
                            </Body1>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.submitBtn, rating === 0 && styles.submitBtnDisabled]}
                            onPress={handleSubmit}
                            activeOpacity={0.7}
                            disabled={rating === 0}
                        >
                            <Body1 style={styles.submitBtnText}>
                                {t("feedback.submit", "Submit")}
                            </Body1>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>


            {/* Success Modal */}
            <Modal
                transparent={true}
                visible={isSuccessModalVisible}
                animationType="fade"
                onRequestClose={() => setIsSuccessModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {/* Success Image */}
                        {IMAGE_COMPONENTS.warniongImage ? (
                            <Image
                                source={IMAGE_COMPONENTS.warniongImage}
                                style={styles.successImage}
                                resizeMode="contain"
                            />
                        ) : (
                            <View style={styles.successIconPlaceholder}>
                                <Body1 style={styles.successEmoji}>✓</Body1>
                            </View>
                        )}

                        {/* Success Title */}
                        <H3 style={styles.modalTitle}>
                            {t("feedback.thankYou", "Thank You!")}
                        </H3>

                        {/* Success Message */}
                        <Body1 style={styles.modalText}>
                            {t("feedback.successMessage", "Your feedback has been sent successfully. It helps us improve service quality.")}
                        </Body1>

                        {/* Close Button */}
                        <TouchableOpacity
                            style={styles.closeBtn}
                            onPress={handleDone}
                            activeOpacity={0.8}
                        >
                            <Body2 style={styles.closeBtnText}>
                                {t("feedback.goHome", "Go to Home")}
                            </Body2>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA"
    },
    headerContainer: {
        marginHorizontal: 20,
        marginTop: 10
    },
    innerContent: {
        padding: 20,
        alignItems: 'center',
        flex: 1
    },
    starContainer: {
        flexDirection: 'row',
        gap: 12,
        marginVertical: 40,
        alignItems: 'center'
    },
    starButton: {
        padding: 4
    },
    label: {
        marginBottom: 20,
        color: '#4A5568',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500'
    },
    input: {
        width: '100%',
        height: 160,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        padding: 15,
        backgroundColor: '#FFF',
        fontSize: 14,
        color: '#2D3748',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
         fontFamily: 'Syne-Regular',
    },
    charCount: {
        alignSelf: 'flex-end',
        marginTop: 8,
        color: '#A0AEC0',
        fontSize: 12
    },
    btnRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 30,
        gap: 15
    },
    skipBtn: {
        flex: 1,
        height: 52,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    skipBtnText: {
        color: '#4A5568',
        fontWeight: '600'
    },
    submitBtn: {
        flex: 1,
        height: 52,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.PRIMARY,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3
    },
    submitBtnDisabled: {
        backgroundColor: '#80d7ff',
        shadowOpacity: 0
    },
    submitBtnText: {
        color: '#FFF',
        fontWeight: '600'
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    modalContent: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10
    },
    successImage: {
        width: 100,
        height: 100,
        marginBottom: 20
    },
    successIconPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#10B981',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    successEmoji: {
        fontSize: 50,
        color: '#FFF',
        fontWeight: 'bold'
    },
    modalTitle: {
        marginBottom: 10,
        textAlign: 'center',
        color: '#2D3748',
        fontSize: 24,
        fontWeight: 'bold'
    },
    modalText: {
        textAlign: 'center',
        marginBottom: 25,
        color: '#4A5568',
        paddingHorizontal: 10,
        lineHeight: 22
    },
    closeBtn: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        shadowColor: Colors.PRIMARY,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3
    },
    closeBtnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16
    }
});