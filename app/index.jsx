import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image, TouchableOpacity, View } from 'react-native';
import { Colors } from "../assets/Colors";
import { Body1, ButtonText, H3 } from '../components/typo/typography';

export default function Home() {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <>
            <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>

                {/* Image Section */}
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Image
                        source={require("../assets/images/banner1.png")}
                        style={{ width: '100%', aspectRatio: 16 / 9 }}
                        resizeMode="contain"
                    />
                </View>

                {/* Content Section */}
                <View style={{ marginTop: 20 }}>
                    <H3 style={{ textAlign: "center", fontWeight: "500", marginBottom: 6 }}>
                        {t("home.title")}  
                    </H3>

                    <Body1 style={{ color: Colors.TEXT_COLOR, lineHeight: 24, textAlign: "center" }}>
                        {t("home.description")}  
                    </Body1>

                    <TouchableOpacity
                        onPress={() => router.push("/selecte-role")}
                        activeOpacity={0.8}
                        style={{
                            backgroundColor: Colors.PRIMARY,
                            paddingVertical: 16,
                            borderRadius: 12,
                            marginTop: 50,
                            width: '100%'
                        }}>
                        <ButtonText style={{ color: '#fff', fontWeight: '500', textAlign: 'center' }}>
                            {t("home.button")} 
                        </ButtonText>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}
