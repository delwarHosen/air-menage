import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react'; // useState যুক্ত করা হয়েছে
import { useTranslation } from 'react-i18next';
import { FlatList, KeyboardAvoidingView, Modal, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Colors } from '../../assets/Colors';
import { DeletePropertyTrashIcon } from '../../assets/icons/Icons';
import Heading from '../../components/Heading/Heading';
import { Body2, Caption, H5, H6 } from '../../components/typo/typography';
import { cleaners as initialCleaners } from '../../store/Cleaners';

function CleanerItem({ item, onPress, onDeletePress, t }) {
    return (
        <View style={styles.CleanerCard}>
            <LinearGradient
                colors={['#FAFF0A', '#FEAD4E', '#ED1B1B', '#FB1274', '#A61D5F', '#F109DA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBorder}
            >
                <Image source={{ uri: item.profileImg }} style={styles.profileImage} />
            </LinearGradient>

            <View style={{ flex: 1 }}>
                <H5 numberOfLines={1}>{item.name}</H5>
                <Caption style={{ color: Colors.TEXT_COLOR }} numberOfLines={1}>
                    {item.email}
                </Caption>
            </View>

            <TouchableOpacity onPress={onPress} style={styles.viewButton}>
                <Caption style={{ color: "#fff" }}>
                    {t('favourite_cleaner.button.viewDetails')}
                </Caption>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onDeletePress(item)} style={styles.deleteButton}>
                <DeletePropertyTrashIcon />
            </TouchableOpacity>
        </View>
    );
}

export default function FavouriteCleaner() {
    const router = useRouter();
    const { t } = useTranslation();

    // Modal State
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCleaner, setSelectedCleaner] = useState(null);
    const [cleanerList, setCleanerList] = useState(initialCleaners);

    const openDeleteModal = (cleaner) => {
        setSelectedCleaner(cleaner);
        setModalVisible(true);
    };

    const confirmDelete = () => {
        // ডিলিট লজিক (এখানে ফিল্টার করে রিমুভ করা হচ্ছে)
        const updatedList = cleanerList.filter(c => c.id !== selectedCleaner.id);
        setCleanerList(updatedList);
        setModalVisible(false);
    };

    const renderItem = ({ item }) => (
        <CleanerItem
            item={item}
            t={t}
            onPress={() => router.push(`/host/cleaner/${item.id}`)}
            onDeletePress={openDeleteModal}
        />
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <FlatList
                    data={cleanerList}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    ListHeaderComponent={
                        <View style={styles.headerGap}>
                            <Heading title={t('favourite_cleaner.title')} />
                        </View>
                    }
                    renderItem={renderItem}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                />
            </KeyboardAvoidingView>

            {/* --- Delete Confirmation Modal --- */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <H6 style={{ textAlign: 'center' }}>Are you sure?</H6>
                        <Body2 style={styles.modalSubText}>
                            Do you really want to delete <Body2 style={{ fontWeight: 'bold' }}>{selectedCleaner?.name}</Body2>? This action cannot be undone.
                        </Body2>

                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Body2>{t('delete_modal.cancel') || 'Cancel'}</Body2>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={confirmDelete}
                            >
                                <Body2 style={{ color: '#fff' }}>{t('delete_modal.confirm') || 'Delete'}</Body2>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: { padding: 16, paddingBottom: 50 },
    headerGap: { marginBottom: 10 },
    CleanerCard: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    gradientBorder: {
        height: 48, width: 48, borderRadius: 24,
        justifyContent: 'center', alignItems: 'center', marginRight: 12,
    },
    profileImage: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#fff' },
    viewButton: {
        paddingVertical: 6, paddingHorizontal: 10,
        marginRight: 5, backgroundColor: Colors.PRIMARY, borderRadius: 6,
    },
    deleteButton: { padding: 5 },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        height:"25%",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalSubText: {
        textAlign: 'center',
        color: Colors.TEXT_COLOR,
        marginTop: 20,
        // marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        gap: 15,
    },
    modalButton: {
        flex: 1,
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20
    },
    cancelButton: {
        backgroundColor: '#F0F0F0',
    },
    confirmButton: {
        backgroundColor: '#FF4D4D',
    }
});