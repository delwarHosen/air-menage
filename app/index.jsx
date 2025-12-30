import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from "../assets/Colors";

export default function Home() {
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
                
                {/* Image Section */}
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Image
                        source={require("../assets/images/banner1.png")}
                        style={{
                            width: '100%',  
                            aspectRatio: 16 / 9,
                        }}
                        resizeMode="contain"
                    />
                </View>

                {/* Content Section */}
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 25, textAlign: "center", fontWeight: '600', marginBottom: 12 }}>
                        Become a Verified Cleaner
                    </Text>

                    <Text style={{ fontSize: 16, color: '#4B5563', lineHeight: 24, textAlign: "center" }}>
                        Get cleaning missions from nearby hosts, choose jobs that fit your schedule.
                    </Text>

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
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700', textAlign: 'center' }}>
                            Get Started
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}