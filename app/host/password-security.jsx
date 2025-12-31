import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../assets/Colors';
import { Body1, Body2 } from '../../components/typo/typography';

export default function PasswordSecurity() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Section with more vertical padding */}
            <View style={styles.headerRow}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backIconContainer}
                >
                    <Ionicons name='arrow-back' size={24} color={Colors.TEXT_COLOR} />
                </TouchableOpacity>
                <Body2 style={styles.headerTitle}>Password & Security</Body2>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                <TouchableOpacity
                    onPress={() => router.push("/host/change-password")}
                    style={styles.buttonContainer}
                    activeOpacity={0.7}
                >
                    <View style={styles.leftContent}>
                        <SimpleLineIcons name="lock" size={24} color={Colors.TEXT_COLOR} />
                        <Body1 style={styles.textStyle}>Change Password</Body1>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color={Colors.TEXT_COLOR} />
                </TouchableOpacity>
                {/* Delete accounr */}
                <TouchableOpacity
                    onPress={() => router.push("/host/password-security")}
                    style={styles.buttonContainer}
                    activeOpacity={0.7}
                >
                    <View style={styles.leftContent}>
                        <Ionicons name="trash-outline" size={24} color="#D4461A" />
                        <Body1 style={{color:"#D4461A",fontSize:14}}>Delete Account</Body1>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={Colors.TEXT_COLOR} />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Colors.BACKGROUND_COLOR,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: "5%", 
        paddingVertical: 15,     
        marginTop: 5,
        width: '100%',
        position: 'relative',    
    },
    backIconContainer: {
        position: 'absolute',
        left: "5%",             
        width: 45,
        height: 45,
        borderRadius: 23,
        backgroundColor: "#EBEBEE",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#CACACB",
        zIndex: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.TEXT_COLOR,
        textAlign: "center",
        lineHeight: 45,        
    },
    scrollContainer: {
        paddingHorizontal: "4%", 
        paddingTop: 10,
        paddingBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',           
        height: 60,              
        borderRadius: 15,        
        backgroundColor: '#F9FAFB',
        paddingHorizontal: 20,   
        marginVertical:10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    textStyle: {
        fontSize: 14,
        color: Colors.TEXT_COLOR,
    }
})