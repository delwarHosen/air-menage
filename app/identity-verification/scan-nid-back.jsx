import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import { CameraIcon, FlashIcon, WhiteBackwardIcon } from '../../assets/icons/Icons';
import { Body1, H4, H5 } from '../../components/typo/typography';

export default function ScanNidBack() {
  const { t } = useTranslation();
  const [permission, requestPermission] = useCameraPermissions();
  const [flashEnabled, setFlashEnabled] = useState(false);
  const cameraRef = useRef(null);

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        router.push({
          pathname: './confirm-nid-back',
          params: { photoUri: photo.uri }
        });
      } catch (error) {
        console.error("Capture Error:", error);
      }
    }
  };

  const toggleFlash = () => {
    setFlashEnabled(!flashEnabled);
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>{t("scanNidBack.loading")}</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <H4 style={styles.permissionText}>{t("scanNidBack.permissionTitle")}</H4>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Body1 style={styles.permissionButtonText}>{t("scanNidBack.permissionButton")}</Body1>
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

        {/* Header */}
        <View style={styles.topNavigationRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.navIconBtn}>
            <WhiteBackwardIcon />
          </TouchableOpacity>

          <View style={styles.progressWrapper}>
            <View style={[styles.progressBar, styles.progressBarActive]} />
            <View style={[styles.progressBar, styles.progressBarActive]} />
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

        {/* Instructions */}
        <View style={styles.instructions}>
          <H5 style={styles.title}>
            {t("scanNidBack.instruction.before")}
            <H5 style={styles.highlight}>
              {" "}{t("scanNidBack.instruction.highlight")}{" "}
            </H5>
            {t("scanNidBack.instruction.after")}
          </H5>
        </View>

        {/* Camera Frame (Center Area) */}
        <View style={styles.cameraFrameContainer}>
          <View style={styles.cameraFrame}>
            <View style={styles.frameBorder}>
              <View style={[styles.corner, styles.cornerTopLeft]} />
              <View style={[styles.corner, styles.cornerTopRight]} />
              <View style={[styles.corner, styles.cornerBottomLeft]} />
              <View style={[styles.corner, styles.cornerBottomRight]} />
            </View>
          </View>
        </View>

        {/* Bottom Section: Problem Link & Capture Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.problemButton}>
            <Text style={styles.problemIcon}>❓</Text>
            <Body1 style={styles.problemText}>
              {t("scanNidBack.problem")}
            </Body1>
          </TouchableOpacity>

          <View style={styles.captureContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
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
    paddingHorizontal:"5%"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
  },
  topNavigationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  navIconBtn: {
    width: 32,
  },
  progressWrapper: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    justifyContent: "center",
    marginHorizontal: 15,
  },
  progressBar: {
    flex: 1,
    height: 3,
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
  headerIconText: {
    fontSize: 18,
  },
  instructions: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
  highlight: {
    color: Colors.PRIMARY,
    fontWeight: '700',
  },
  cameraFrameContainer: {
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
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: Colors.PRIMARY,
    borderWidth: 4,
  },
  cornerTopLeft: { top: -2, left: -2, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 12 },
  cornerTopRight: { top: -2, right: -2, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 12 },
  cornerBottomLeft: { bottom: -2, left: -2, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 12 },
  cornerBottomRight: { bottom: -2, right: -2, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 12 },

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
  problemText: {
    color: '#fff',
    fontSize: 14,
  },
  captureContainer: {
    alignItems: 'center',
  },
  captureButton: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  captureButtonInner: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 100,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  permissionButtonText: {
    color: '#fff',
    fontWeight: '600',
  }
});