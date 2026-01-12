// Chat/UploadModal
import { Ionicons } from '@expo/vector-icons';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Body1, Body2 } from '../typo/typography';


export const UploadModal = ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="chevron-back" size={24} color="#000" />
                        </TouchableOpacity>
                        <Body1 style={styles.title}>Upload Option</Body1>
                        <View style={{ width: 24 }} />
                    </View>

                    <View style={styles.options}>
                        <TouchableOpacity style={styles.option}>
                            <View style={styles.icon}>
                                <Ionicons name="folder-outline" size={32} color="#22D3EE" />
                            </View>
                            <Body2 style={styles.label}>Upload{'\n'}folder</Body2>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.option}>
                            <View style={styles.icon}>
                                <Ionicons name="logo-google" size={32} color="#4285F4" />
                            </View>
                            <Body2 style={styles.label}>Google{'\n'}Drive</Body2>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.option}>
                            <View style={styles.icon}>
                                <Ionicons name="image-outline" size={32} color="#EA4335" />
                            </View>
                            <Body2 style={styles.label}>Google{'\n'}Photo</Body2>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modal: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    title: {
        fontWeight: '600',
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 32,
        paddingVertical: 32,
    },
    option: {
        alignItems: 'center',
        gap: 12,
    },
    icon: {
        width: 64,
        height: 64,
        borderRadius: 16,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        textAlign: 'center',
    },
});