import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../../assets/Colors";
import { IMAGE_COMPONENTS } from "../../assets/image.index";
import { Body1, Body2, Caption, H5 } from "../typo/typography";

export default function CleanerRequestCard({ propertyData, location, onAccept, onDelete }) {
    const { t } = useTranslation();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => setIsModalVisible(!isModalVisible);

    const confirmDelete = () => {
        onDelete(propertyData);
        toggleModal();
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FAFF0A', '#FEAD4E', '#ED1B1B', '#FB1274', '#A61D5F', '#F109DA']}
                style={styles.gradientBorder}
            >
                <Image
                    source={{ uri: propertyData.profile_img }} style={styles.image} />
            </LinearGradient>


            <View style={styles.content}>
                <H5 style={styles.name}>{propertyData.name}</H5>
                <Caption style={styles.location}>{propertyData?.location}</Caption>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.acceptBtn} onPress={() => onAccept(propertyData)}>
                        <Body2 style={styles.acceptText}>{t("cleaner_requests.accept")}</Body2>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.deleteBtn} onPress={toggleModal}>
                        <Body2 style={styles.deleteText}>{t("cleaner_requests.delete")}</Body2>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Confirmation Modal */}
            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="fade"
                onRequestClose={toggleModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Image
                            source={IMAGE_COMPONENTS.warniongImage}
                            style={{ height: 97, width: 97 }}
                        />
                        <H5 style={{ marginBottom: 10 }}>{t("cleaner_requests.confirmTitle")}</H5>
                        <Body1 style={{ textAlign: 'center', marginBottom: 20 }}>
                            {t("cleaner_requests.confirmText", { name: propertyData.name })}
                        </Body1>

                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity style={styles.cancelBtn} onPress={toggleModal}>
                                <Body2>{t("cleaner_requests.cancel")}</Body2>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.confirmDeleteBtn} onPress={confirmDelete}>
                                <Body2 style={{ color: '#fff' }}>{t("cleaner_requests.confirmDelete")}</Body2>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 12,
        alignItems: "center",
        gap: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
    },
    gradientBorder: {
        height: 68,
        width: 68,
        borderRadius: 39,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: { width: 64, height: 64, borderRadius: 32 },
    content: { flex: 1 },
    name: { fontSize: 16, fontWeight: "600" },
    location: { fontSize: 13, color: 'gray', marginBottom: 8 },
    buttonRow: { flexDirection: "row", gap: 10 },
    acceptBtn: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 8
    },
    acceptText: { color: "#fff", fontSize: 13, fontWeight: "500" },
    deleteBtn: {
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 8
    },
    deleteText: { color: Colors.SECONDARY },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
        elevation: 5
    },
    modalButtonRow: {
        flexDirection: 'row',
        gap: 12,
        width: '100%'
    },
    cancelBtn: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR
    },
    confirmDeleteBtn: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#EF4444'
    }
});
