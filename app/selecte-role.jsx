import { useRouter } from 'expo-router';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from "../assets/Colors";

export default function SelectRole() {
    const router = useRouter();

    const handleRolePress = (role) => {
        router.push({
            pathname: "/(auth)/login",
            params: { selectedRole: role }
        });

        // router.push(`/(auth)/login?selectedRole=${role}`);
    };

    return (
        <SafeAreaView style={styles.safeAreaContent}>
            <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>

                <View style={styles.heroImage}>
                    <Image
                        source={require("../assets/images/banner2.png")}
                        style={{ width: '100%', aspectRatio: 16 / 9 }}
                        resizeMode="contain"
                    />
                </View>

                <Text style={styles.headerTitle}>
                    How do you want to join?
                </Text>
                <Text style={styles.headerText}>
                    Select your role to provide the best experience.
                </Text>

                {/* Role Buttons */}
                <TouchableOpacity
                    onPress={() => handleRolePress('host')}
                    activeOpacity={0.7}
                    style={styles.buttonComponents}>
                    <Text style={styles.btnText}>
                        Continue as Host
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handleRolePress('cleaner')}
                    activeOpacity={0.7}
                    style={styles.buttonComponents}>
                    <Text style={styles.btnText}>
                        Continue as Cleaner
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContent: {
        flex: 1, backgroundColor: 'white'
    },
    heroImage: {
        alignItems: 'center',
        marginBottom: 30
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    headerText:
    {
        fontSize: 15,
        color: 'gray',
        textAlign: 'center',
        marginBottom: 30
    },
    buttonComponents: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 18,
        borderRadius: 8,
        marginBottom: 15

    }, btnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center'

    }

})