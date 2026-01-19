import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import { Body1, H4 } from '../../components/typo/typography'; // আপনার টাইপোগ্রাফি পাথ অনুযায়ী

export default function PropertySetup() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <H4 style={styles.title}>Welcome! Let's get started</H4>
                <Body1 style={styles.subtitle}>
                    You can add your first property now or skip to explore the dashboard.
                </Body1>

                {/* Add Property Button */}
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => router.push("/host/addProperty")}
                >
                    <Body1 style={{ color: '#fff', fontWeight: 'bold' }}>Add Property</Body1>
                </TouchableOpacity>

                {/* Skip Button */}
                <TouchableOpacity 
                    style={styles.skipButton}
                    onPress={() => router.replace("/host/(tabs)/home")}
                >
                    <Body1 style={{ color: Colors.SECONDARY }}>Skip for now</Body1>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    content: {
        alignItems: 'center',
        textAlign: 'center'
    },
    title: {
        marginBottom: 10,
        textAlign: 'center'
    },
    subtitle: {
        textAlign: 'center',
        color: '#666',
        marginBottom: 40
    },
    addButton: {
        backgroundColor: Colors.PRIMARY || '#000',
        width: '100%',
        height: 55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    skipButton: {
        width: '100%',
        height: 55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR
    }
});