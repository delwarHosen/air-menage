import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackArrowIcon, HoldPhoneIcon, MitchMatchIcon, WellItIcon } from "../../assets/icons/Icons";
import { IMAGE_COMPONENTS } from "../../assets/image.index";
import { Body1, Body2, H3 } from "../../components/typo/typography";

export default function FacialRecognition() {
  const { t } = useTranslation();
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef(null);

  const handleContinue = () => {
    if (!permission?.granted) {
      requestPermission();
    } else {
      setShowCamera(true);
    }
  };

  const handleCaptureFace = async () => {
    if (cameraRef.current) {
      try {
        await cameraRef.current.takePictureAsync();
        router.push('./verification-success');
      } catch (error) {
        console.log("Capture Error:", error);
      }
    }
  };

  useEffect(() => {
    if (showCamera && permission?.granted) {
      const timer = setTimeout(handleCaptureFace, 3000);
      return () => clearTimeout(timer);
    }
  }, [showCamera]);

  if (showCamera && permission?.granted) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView ref={cameraRef} style={styles.camera} facing="front">
          <View style={styles.cameraOverlayHeader}>
            <TouchableOpacity onPress={() => setShowCamera(false)} style={styles.backBtn}>
              <BackArrowIcon />
            </TouchableOpacity>

            <View style={styles.progressContainerAbsolute}>
              <View style={[styles.progressBar, styles.progressBarActive]} />
              <View style={[styles.progressBar, styles.progressBarActive]} />
              <View style={[styles.progressBar, styles.progressBarActive]} />
            </View>
          </View>

          <View style={styles.faceOverlay}>
            <View style={styles.faceCircleOuter}>
              <View style={styles.faceCircleInner} />
            </View>
            <Body1 style={styles.instructionText}>
              {t("facialRecognition.keepFace")}
            </Body1>
          </View>

          <View style={styles.captureContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={handleCaptureFace}>
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <BackArrowIcon />
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, styles.progressBarActive]} />
          <View style={[styles.progressBar, styles.progressBarActive]} />
          <View style={[styles.progressBar, styles.progressBarActive]} />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.faceContainer}>
          <Image source={IMAGE_COMPONENTS.faceImage} style={{ height: 164, width: 164 }} />
        </View>

        <H3 style={styles.title}>
          {t("facialRecognition.title")}
        </H3>

        <Body2 style={styles.description}>
          {t("facialRecognition.description")}
        </Body2>

        <View style={styles.requirementsList}>
          <View style={styles.requirementItem}>
            <View style={styles.iconContainer}>
              <HoldPhoneIcon />
            </View>
            <Body2 style={styles.requirementText}>
              {t("facialRecognition.requirements.upright")}
            </Body2>
          </View>

          <View style={styles.requirementItem}>
            <View style={styles.iconContainer}>
              <WellItIcon />
            </View>
            <Body2 style={styles.requirementText}>
              {t("facialRecognition.requirements.wellLit")}
            </Body2>
          </View>

          <View style={styles.requirementItem}>
            <View style={styles.iconContainer}>
              <MitchMatchIcon />
            </View>
            <Body2 style={styles.requirementText}>
              {t("facialRecognition.requirements.noOcclusion")}
            </Body2>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>
            {t("facialRecognition.continue")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000'
  },
  camera: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 35,
    marginBottom: 35,
    position: "relative",
  },
  cameraOverlayHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 50,
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
  progressContainerAbsolute: {
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
  progressBarActive: {
    backgroundColor: "#1D1D1D"
  },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 20 },
  faceContainer: { marginBottom: 30, marginTop: 20 },

  faceEmoji: { fontSize: 60 },
  title: { fontSize: 24, fontWeight: '700', color: '#000', marginBottom: 12 },
  description: {
    fontSize: 14,
    color: '#A1A1AA',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
  },
  requirementsList: { width: '100%', gap: 20 },
  requirementItem: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { fontSize: 24 },
  requirementText: { fontSize: 16, color: '#333', fontWeight: '500' },
  buttonContainer: { paddingHorizontal: 20, paddingBottom: 30 },
  continueButton: {
    backgroundColor: '#00A7E1',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  continueButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  faceOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  faceCircleOuter: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 5,
    borderColor: '#00A7E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  faceCircleInner: {
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
  },
  instructionText: { color: '#fff', fontSize: 16, fontWeight: '500' },
  captureContainer: { alignItems: 'center', paddingBottom: 40 },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#fff',
  },
});