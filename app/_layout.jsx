import { StripeProvider } from "@stripe/stripe-react-native";
import { useFonts } from "expo-font";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { I18nextProvider } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import i18n from '../src/i18n';

export default function RootLayout() {
    const [loaded] = useFonts({
        SyneRegular: require("../assets/fonts/Syne-Regular.ttf"),
        SyneMedium: require("../assets/fonts/Syne-Medium.ttf"),
        SyneSemiBold: require("../assets/fonts/Syne-SemiBold.ttf"),
        SyneBold: require("../assets/fonts/Syne-Bold.ttf"),
    });

    if (!loaded) return null;

    console.log("i18n initialized:", i18n.language);

    return (
        <Provider store={store}>
            <StripeProvider
             publishableKey="your-stripe-publishable-key"
             merchantIdentifier="merchant.com.yourapp.name"
             >
                <I18nextProvider i18n={i18n}>
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                        <Stack screenOptions={{ headerShown: false }} />
                        <StatusBar style="auto" />
                    </SafeAreaView>
                </I18nextProvider>
            </StripeProvider>

        </Provider>

    )
}

