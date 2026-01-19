import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Animated,
    Dimensions,
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

const { height } = Dimensions.get('window');

export default function PasswordSecurity() {
    const router = useRouter();
    const { t } = useTranslation();
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

    const slideAnim = useRef(new Animated.Value(height)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const openModal = () => {
        setDeleteModalVisible(true);

        // একই সাথে স্লাইড এবং অপাসিটি এনিমেশন
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                easing: Easing.out(Easing.poly(4)),
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();
    };

    const closeModal = () => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: height,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            })
        ]).start(() => setDeleteModalVisible(false));
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ marginHorizontal: 20 }}>
                <Heading title={t('password_security.title')} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity
                    onPress={() => router.push("/host/change-password")}
                    style={styles.buttonContainer}
                >
                    <View style={styles.leftContent}>
                        <PasswrodIcon />
                        <Body2 style={styles.textStyle}>{t('password_security.actions.changePassword')}</Body2>
                    </View>
                    <ForwarAngleIcon />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={openModal}
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

                    <Pressable style={StyleSheet.absoluteFill} onPress={closeModal} />

                    <Animated.View
                        style={[
                            styles.centeredView,
                            {
                                opacity: opacityAnim,
                                transform: [{ translateY: slideAnim }]
                            }
                        ]}
                    >

                        <View style={styles.iconContainer}>
                            <DeleteIcon size={32} />
                        </View>


                        <Body2 style={styles.modalTitle}>
                            {t('delete_modal.title')}
                        </Body2>
                        <Body2 style={styles.modalDescription}>
                            {t('delete_modal.description')}
                        </Body2>

                        {/* বাটন রো */}
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={closeModal}
                            >
                                <Body2 style={{ color: '#0F243E', fontWeight: '500' }}>
                                    {t('delete_modal.cancel')}
                                </Body2>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmDeleteButton]}
                                onPress={() => {
                                    console.log("Deleted");
                                    closeModal();
                                }}
                            >
                                <Body2 style={{ color: '#FFF', fontWeight: '600' }}>
                                    {t('delete_modal.confirm')}
                                </Body2>
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

    // --- Center Modal Styles ---
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        paddingHorizontal: 24,
        paddingTop: 30,
        paddingBottom: 24,
        alignItems: 'center',
        width: '90%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FEE2E2',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
        color: '#0F243E'
    },
    modalDescription: {
        textAlign: 'center',
        color: '#6B7280',
        marginBottom: 24,
        lineHeight: 20
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    modalButton: {
        flex: 1,
        height: 52,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmDeleteButton: {
        backgroundColor: '#D4461A'
    },
    cancelButton: {
        backgroundColor: '#F3F4F6'
    },
});