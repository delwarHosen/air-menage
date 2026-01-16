import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackArrowIcon, PrimaryTickMarkIcon } from '../../assets/icons/Icons';
import { Body2, H6 } from '../../components/typo/typography';

export default function ConfirmNidFront() {
    const { photoUri } = useLocalSearchParams();
    const { t } = useTranslation();

    const handleConfirm = () => {
        router.push('./scan-nid-back');
    };

    const handleRetake = () => {
        router.back();
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <BackArrowIcon />
                </TouchableOpacity>

                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, styles.progressBarActive]} />
                    <View style={styles.progressBar} />
                    <View style={styles.progressBar} />
                </View>
            </View>

            {/* Preview */}
            <View style={styles.previewContainer}>
                <View style={styles.idCard}>
                    {photoUri ? (
                        <Image
                            source={{ uri: photoUri }}
                            style={styles.capturedImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.idCardPlaceholder}>
                            <Text style={styles.placeholderIcon}>🪪</Text>
                            <Text style={styles.placeholderText}>
                                {t("confirmNidFront.placeholder")}
                            </Text>
                        </View>
                    )}
                </View>
            </View>

            {/* Checklist */}
            <View style={styles.checklistSection}>
                <H6 style={styles.checklistTitle}>
                    {t("confirmNidFront.detectedTitle")}
                </H6>

                <View style={styles.checklistItem}>
                    <PrimaryTickMarkIcon />
                    <Body2 style={styles.checkText}>
                        {t("confirmNidFront.checks.readable")}
                    </Body2>
                </View>

                <View style={styles.checklistItem}>
                    <PrimaryTickMarkIcon />
                    <Body2 style={styles.checkText}>
                        {t("confirmNidFront.checks.light")}
                    </Body2>
                </View>

                <View style={styles.checklistItem}>
                    <PrimaryTickMarkIcon />
                    <Body2 style={styles.checkText}>
                        {t("confirmNidFront.checks.occupies")}
                    </Body2>
                </View>

                <H6 style={styles.confirmTitle}>
                    {t("confirmNidFront.confirmTitle")}
                </H6>

                <View style={styles.checklistItem}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Body2 style={styles.checkText}>
                        {t("confirmNidFront.checks.notExpired")}
                    </Body2>
                </View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleConfirm}
                >
                    <H6 style={styles.confirmButtonText}>
                        {t("confirmNidFront.confirm")}
                    </H6>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.retakeButton}
                    onPress={handleRetake}
                >
                    <Body2 style={styles.retakeButtonText}>
                        {t("confirmNidFront.retake")}
                    </Body2>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff',paddingHorizontal:"1.2%" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 35, // Safe area alignment
        marginBottom: 35,
        position: "relative",
    },
    backBtn: { zIndex: 1 },
    progressContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        justifyContent: "center",
        flexDirection: "row",
        paddingHorizontal: "30%",
        gap: 8,
    },
    progressBar: {
        flex: 1,
        height: 3,
        backgroundColor: '#E5E5E5',
        borderRadius: 3,
    },
    progressBarActive: { backgroundColor: "#1D1D1D" },
    previewContainer: { paddingHorizontal: 20, marginBottom: 20 },
    idCard: {
        width: '100%',
        aspectRatio: 1.6,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    capturedImage: { width: '100%', height: '100%' },
    idCardPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    placeholderIcon: { fontSize: 60, marginBottom: 10 },
    placeholderText: { fontSize: 14, color: '#999' },
    checklistSection: { paddingHorizontal: 20, flex: 1 },
    checklistTitle: { fontSize: 16, fontWeight: '700', marginBottom: 16 },
    checklistItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
    bulletPoint: { fontSize: 18, color: '#000', marginLeft: 4 },
    checkText: { flex: 1, color: '#666' },
    confirmTitle: { fontSize: 16, fontWeight: '700', marginTop: 20, marginBottom: 16 },
    buttonContainer: { paddingHorizontal: 20, paddingBottom: 30, gap: 10 },
    confirmButton: { backgroundColor: '#00A7E1', paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
    confirmButtonText: { color: '#fff' },
    retakeButton: { paddingVertical: 16, alignItems: 'center' },
    retakeButtonText: { color: '#666' },
});