import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Animated,
    Easing,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { Colors } from '../../assets/Colors';
import { DeleteIcon, ForwarAngleIcon, PasswrodIcon } from '../../assets/icons/Icons';
import Heading from '../../components/Heading/Heading';
import { Body2 } from '../../components/typo/typography';

export default function PasswordSecurity() {
    const router = useRouter();
    const { t } = useTranslation();
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

    // Slow animation er jonno value
    const slideAnim = useRef(new Animated.Value(300)).current;

    const openModal = () => {
        setDeleteModalVisible(true);
        // Niche theke upore uthbe (0 position e)
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500, // Ekhane duration bariye slow kora hoyeche
            easing: Easing.out(Easing.poly(4)),
            useNativeDriver: true,
        }).start();
    };

    const closeModal = () => {
        Animated.timing(slideAnim, {
            toValue: 300,
            duration: 400,
            useNativeDriver: true,
        }).start(() => setDeleteModalVisible(false));
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ marginHorizontal: 20 }}>
                <Heading title={t('password_security.title')} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity
                    onPress={() => router.push("/cleaner/change-password")}
                    style={styles.buttonContainer}
                >
                    <View style={styles.leftContent}>
                        <PasswrodIcon />
                        <Body2 style={styles.textStyle}>{t('password_security.actions.changePassword')}</Body2>
                    </View>
                    <ForwarAngleIcon />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={openModal} // Custom open function
                    style={styles.buttonContainer}
                >
                    <View style={styles.leftContent}>
                        <DeleteIcon />
                        <Body2 style={{ color: "#D4461A" }}>{t('password_security.actions.deleteAccount')}</Body2>
                    </View>
                    <ForwarAngleIcon />
                </TouchableOpacity>
            </ScrollView>

            <Modal
                transparent={true}
                visible={isDeleteModalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <Pressable style={styles.dismissArea} onPress={closeModal} />

                    <Animated.View
                        style={[
                            styles.bottomSheet,
                            { transform: [{ translateY: slideAnim }] } // Animation applied here
                        ]}
                    >
                        <View style={styles.dragIndicator} />

                        <Body2 style={styles.modalTitle}>Delete Account</Body2>
                        <Body2 style={styles.modalDescription}>
                            Are you sure you want to delete your account? This action cannot be undone.
                        </Body2>

                        {/* Buttons in a Row */}
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={closeModal}
                            >
                                <Body2 style={{ color: '#0F243E', fontWeight: '500' }}>Cancel</Body2>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmDeleteButton]}
                                onPress={() => {
                                    console.log("Deleted");
                                    closeModal();
                                }}
                            >
                                <Body2 style={{ color: '#FFF', fontWeight: '600' }}>Delete</Body2>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: { paddingHorizontal: "5%", paddingTop: 10 },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        borderRadius: 15,
        backgroundColor: '#F9FAFB',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    leftContent: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    textStyle: { color: Colors.TEXT_COLOR },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    dismissArea: {
        flex: 1,
    },
    bottomSheet: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 50,
        alignItems: 'center',
        width: '100%',
    },
    dragIndicator: {
        width: 40,
        height: 4,
        backgroundColor: '#E5E7EB',
        borderRadius: 10,
        marginBottom: 20,
    },
    modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
    modalDescription: { textAlign: 'center', color: '#6B7280', marginBottom: 25 },

    // Row Buttons logic
    buttonRow: {
        flexDirection: 'row', 
        gap: 12,
        width: '100%',
    },
    modalButton: {
        flex: 1, 
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmDeleteButton: { backgroundColor: '#D4461A' },
    cancelButton: { backgroundColor: '#F3F4F6' },
});