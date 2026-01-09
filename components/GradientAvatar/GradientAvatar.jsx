import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import { BlueVerifyIcon } from "../../assets/icons/Icons";

export default function VerifiedGradientAvatar({
  image,
  size = 70,
  showVerify = true,
}) {
  const borderSize = size + 6;

  return (
    <LinearGradient
      colors={['#FAFF0A', '#FEAD4E', '#ED1B1B', '#FB1274', '#A61D5F', '#F109DA']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.gradientBorder,
        {
          width: borderSize,
          height: borderSize,
          borderRadius: borderSize / 2,
        },
      ]}
    >
      <View
        style={[
          styles.whiteInnerCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
        <Image
          source={{ uri: image }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
        />
      </View>

      {showVerify && (
        <View style={styles.verifyBadge}>
          <BlueVerifyIcon />
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBorder: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  whiteInnerCircle: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  verifyBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
