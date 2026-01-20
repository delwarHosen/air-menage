import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { Colors } from "../assets/Colors";
import { Body1, ButtonText, H3 } from '../components/typo/typography';

const { height } = Dimensions.get('window');

export default function Home() {
    const router = useRouter();
    const { t } = useTranslation();

    return (
       
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: "5%" }}
            showsVerticalScrollIndicator={false}
        >
            <View style={{ flex: 1, justifyContent: 'center' }}>

                
                <View style={{ alignItems: 'center', marginBottom: height < 700 ? 10 : 20 }}>
                    <Image
                        source={require("../assets/images/banner1.png")}
                        style={{ 
                            width: '100%', 
                            aspectRatio: 16 / 15,
                            maxHeight: height * 0.4 
                        }}
                        contentFit="contain"
                    />
                </View>

                {/* Content Section */}
                <View style={{ marginTop: height < 700 ? "5%" : "10%" }}>
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
                            paddingVertical: "4%",
                            borderRadius: 12,
                            marginTop: height < 700 ? "8%" : "13%", 
                            width: '100%'
                        }}>
                        <ButtonText style={{ color: '#fff', fontWeight: '500', textAlign: 'center' }}>
                            {t("home.button")}
                        </ButtonText>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}