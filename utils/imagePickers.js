import * as ImagePicker from "expo-image-picker";
import { Platform, ToastAndroid } from "react-native";

const requestPermission = async () => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    const msg = "Permission Required. You need to allow access to your photos";
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.LONG);
    } else {
      alert(msg);
    }
    return false;
  }
  return true;
};

export const pickProfileImage = async (setProfileImage) => {
  const hasPermission = await requestPermission();
  if (!hasPermission) return;

  const result = await ImagePicker.launchImageLibraryAsync({
 
    mediaTypes: ImagePicker.MediaType.Images, 
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (!result.canceled) {
    setProfileImage(result.assets[0].uri);
  }
};

export const pickDocumentImage = async (setDocumentImage) => {
  const hasPermission = await requestPermission();
  if (!hasPermission) return;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaType.Images, 
    allowsEditing: false,
    quality: 0.8,
  });

  if (!result.canceled) {
    setDocumentImage(result.assets[0].uri);
  }
};