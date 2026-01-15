import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import { CameraIcon, FlashIcon, WhiteBackwardIcon } from "../../assets/icons/Icons";
import { Body1, H5, H6 } from "../../components/typo/typography";

export default function ScanNidFront() {
    const { t } = useTranslation();
    const [permission, requestPermission] = useCameraPermissions();
    const [flashEnabled, setFlashEnabled] = useState(false);
    const cameraRef = useRef(null);
    const router = useRouter();

    const handleCapture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                router.push({
                    pathname: './confirm-nid-front',
                    params: { photoUri: photo.uri }
                });
            } catch (error) {
                console.log("Capture Error:", error);
            }
        }
    };

    const toggleFlash = () => {
        setFlashEnabled(!flashEnabled);
    };

    if (!permission) {
        return (
            <View style={styles.container}>
                <Body1 style={styles.loadingText}>
                    {t("scanNid.loading")}
                </Body1>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <H5 style={styles.permissionText}>
                    {t("scanNid.permissionTitle")}
                </H5>
                <TouchableOpacity
                    style={styles.permissionButton}
                    onPress={requestPermission}
                >
                    <H6 style={styles.permissionButtonText}>
                        {t("scanNid.permissionButton")}
                    </H6>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={StyleSheet.absoluteFillObject}
                facing="back"
                enableTorch={flashEnabled}
            />

            <View style={styles.overlay}>
                {/* Top Nav */}
                <View style={styles.topNavigationRow}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.navIconBtn}>
                        <WhiteBackwardIcon />
                    </TouchableOpacity>

                    <View style={styles.progressWrapper}>
                        <View style={[styles.progressBar, styles.progressBarActive]} />
                        <View style={styles.progressBar} />
                        <View style={styles.progressBar} />
                    </View>

                    <View style={styles.headerRightGroup}>
                        <TouchableOpacity onPress={toggleFlash}>
                            <Text style={styles.headerIconText}>
                                {flashEnabled ? '💡' : <FlashIcon />}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <CameraIcon />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Instruction */}
                <View style={styles.instructions}>
                    <H5 style={styles.title}>
                        {t("scanNid.instruction.before")}
                        <H5 style={styles.highlight}>
                            {t("scanNid.instruction.highlight")}
                        </H5>
                        {t("scanNid.instruction.after")}
                    </H5>
                </View>

                {/* Camera Frame */}
                <View style={styles.cameraContainer}>
                    <View style={styles.cameraFrame}>
                        <View style={styles.frameBorder}>
                            <View style={[styles.corner, styles.cornerTopLeft]} />
                            <View style={[styles.corner, styles.cornerTopRight]} />
                            <View style={[styles.corner, styles.cornerBottomLeft]} />
                            <View style={[styles.corner, styles.cornerBottomRight]} />
                        </View>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.problemButton}>
                        <Text style={{ color: '#fff' }}>❓</Text>
                        <Body1 style={styles.problemText}>
                            {t("scanNid.problem")}
                        </Body1>
                    </TouchableOpacity>

                    <View style={styles.captureContainer}>
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={handleCapture}
                        >
                            <View style={styles.captureButtonInner} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'ios' ? 50 : 30,
        backgroundColor: 'transparent',
    },
    topNavigationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    navIconBtn: {
        width: 32,
    },
    progressWrapper: {
        flex: 1,
        flexDirection: 'row',
        gap: 6,
        justifyContent: "center",
        marginHorizontal: 10,
    },
    progressBar: {
        flex: 1,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 2,
    },
    progressBarActive: {
        backgroundColor: '#fff',
    },
    headerRightGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    instructions: {
        paddingHorizontal: 30,
        marginTop: 20,
    },
    title: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 22,
    },
    highlight: {
        color: Colors.PRIMARY,
        fontWeight: 'bold',
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraFrame: {
        width: '90%',
        aspectRatio: 1.58,
    },
    frameBorder: {
        flex: 1,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
        borderStyle: 'dashed',
    },
    corner: {
        position: 'absolute',
        width: 35,
        height: 35,
        borderColor: Colors.PRIMARY,
        borderWidth: 4,
    },
    cornerTopLeft: { top: -2, left: -2, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 16 },
    cornerTopRight: { top: -2, right: -2, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 16 },
    cornerBottomLeft: { bottom: -2, left: -2, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 16 },
    cornerBottomRight: { bottom: -2, right: -2, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 16 },

    footer: {
        paddingBottom: 40,
    },
    problemButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginBottom: 20,
    },
    problemText: { color: '#fff', fontSize: 14 },
    captureContainer: { alignItems: 'center' },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#fff',
    },
    captureButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    permissionContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
    permissionText: { color: '#fff', marginBottom: 20 },
    permissionButton: { backgroundColor: Colors.PRIMARY, padding: 15, borderRadius: 10 },
});