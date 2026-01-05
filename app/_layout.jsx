import { useFonts } from "expo-font";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";
import i18n from '../src/i18n';

export default function RootLayout() {
    const [loaded] = useFonts({
        SyneRegular: require("../assets/fonts/Syne-Regular.ttf"),
        SyneMedium: require("../assets/fonts/Syne-Medium.ttf"),
        SyneSemiBold: require("../assets/fonts/Syne-SemiBold.ttf"),
        SyneBold: require("../assets/fonts/Syne-Bold.ttf"),
    });

    if (!loaded) return null;

    console.log("i18n initialized:", i18n.language); // prevent auto-remove

    return (
        <SafeAreaView style={{ flex: 1,backgroundColor: '#FAFAFA'}}>
            <Stack screenOptions={{ headerShown: false }} />
            <StatusBar style='auto' />
        </SafeAreaView>
    )
}
