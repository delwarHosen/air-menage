import { FontAwesome, FontAwesome6, Fontisto, Foundation, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Body1, Body2 } from '../../../components/typo/typography';
import { IMAGE_CONSTANTS } from '../../../constants/image.index';
import { Colors } from "./../../../assets/Colors.js";

export default function Menu() {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                {/* 2. Wrap content in ScrollView */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}
                >
                    {/* Header/Profile Section */}
                    <View style={styles.profileSection}>
                        <Image
                            source={IMAGE_CONSTANTS.profile}
                            style={styles.profileImage}
                        />
                        <Body1 style={styles.hostContent}>Host Name</Body1>
                        <View style={styles.statsContainer}>
                            <View style={styles.row}>
                                <MaterialIcons name="verified" size={22} color="#868686" />
                                <Body2 style={styles.statText}>472</Body2>
                            </View>
                            <Body2 style={styles.hostContent}>Commentairs</Body2>
                        </View>
                    </View>

                    {/* Account Settings section */}
                    <View style={styles.settingContent}>
                        <Body2 style={styles.settingTitle}>Account settings</Body2>

                        <TouchableOpacity
                            onPress={() => router.push("/host/personal-info")}
                            style={styles.buttonContainer} activeOpacity={0.7}>
                            <Ionicons name="person-circle-outline" size={24} color="#323135" />
                            <Body1 style={styles.textStyle}>Personal Information</Body1>
                            <Ionicons name="chevron-forward" size={20} color="gray" />
                        </TouchableOpacity>

                        <TouchableOpacity
                         onPress={() => router.push("/host/payment")}
                        style={styles.buttonContainer} activeOpacity={0.7}>
                            <MaterialIcons name="payment" size={20} color="#323135" />
                            <Body1 style={styles.textStyle}>Payment, and Translation.</Body1>
                            <Ionicons name="chevron-forward" size={20} color="gray" />
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={()=>router.push("/host/password-security")}
                        style={styles.buttonContainer} activeOpacity={0.7}>
                            <SimpleLineIcons name="lock" size={24} color="#323135" />
                            <Body1 style={styles.textStyle}>Password & security</Body1>
                            <Ionicons name="chevron-forward" size={20} color="gray" />
                        </TouchableOpacity>

                        <TouchableOpacity  
                        onPress={()=>router.push("/host/contact")}
                        style={styles.buttonContainer} activeOpacity={0.7}>
                            <FontAwesome6 name="headset" size={24} color="#323135" />
                            <Body1 style={styles.textStyle}>Get help</Body1>
                            <Ionicons name="chevron-forward" size={20} color="gray" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.7}>
                            <Foundation name="book-bookmark" size={24} color="#323135" />
                            <Body1 style={styles.textStyle}>Identity Verification</Body1>
                            <Ionicons name="chevron-forward" size={20} color="gray" />
                        </TouchableOpacity>
                    </View>

                    {/* My Preference section */}
                    <View style={styles.settingContent}>
                        <Body2 style={styles.settingTitle}>My Preferences</Body2>
                        <TouchableOpacity 
                        onPress={()=>router.push("/host/language")}
                        style={styles.buttonContainer} activeOpacity={0.7}>
                            <FontAwesome name="language" size={24} color="#323135" />
                            <Body1 style={styles.textStyle}>Language </Body1>
                            <Ionicons name="chevron-forward" size={20} color="gray" />
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={()=>router.push("/host/favourite-cleaner")}
                        style={styles.buttonContainer} activeOpacity={0.7}>
                            <Ionicons name="heart-outline" size={20} color="#323135" />
                            <Body1 style={styles.textStyle}>Favorite cleaner</Body1>
                            <Ionicons name="chevron-forward" size={20} color="gray" />
                        </TouchableOpacity>
                    </View>

                    {/* Legal section */}
                    <View style={styles.settingContent}>
                        <Body2 style={styles.settingTitle}>LEGAL</Body2>
                        <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.7}>
                            <Ionicons name="information-circle-outline" size={24} color="#323135" />
                            <Body1 style={styles.textStyle}>About us </Body1>
                            <Ionicons name="chevron-forward" size={20} color="gray" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.7}>
                            <Ionicons name="document-text-outline" size={24} color="#323135" />
                            <Body1 style={styles.textStyle}>Terms of use </Body1>
                            <Ionicons name="chevron-forward" size={20} color="gray" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.7}>
                            <MaterialIcons name="privacy-tip" size={24} color="#323135" />
                            <Body1 style={styles.textStyle}>Privacy policy</Body1>
                            <Ionicons name="chevron-forward" size={20} color="gray" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.7}>
                            <Fontisto name="world-o" size={24} color="#323135" />
                            <Body1 style={styles.textStyle}> legal notices</Body1>
                            <Ionicons name="chevron-forward" size={20} color="gray" />
                        </TouchableOpacity>
                    </View>


                    {/* Logout Button */}
                    <TouchableOpacity
                        onPress={() => router.push("/host/home")}
                        style={styles.submitButton}
                    >
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>

                    {/* Extra padding at the bottom for better scroll feel */}
                    <View style={{ height: 20 }} />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    scrollContainer: {
        paddingHorizontal: "5%",
        paddingBottom: 20, // Ensures content doesn't touch the very bottom
    },
    // ... your existing styles remain the same
    profileSection: {
        alignItems: 'center',
        marginTop: 20,
    },
    profileImage: {
        height: 120,
        width: 120,
        borderRadius: 60,
        borderWidth: 1, // Fixed "border" to "borderWidth"
        borderColor: Colors.PRIMARY,
        backgroundColor: '#E1E1E1',
        marginBottom: 10,
    },
    hostContent: {
        marginBottom: 5,
        color: Colors.SECONDARY,
        fontSize: 16,
        fontWeight: "500"
    },
    statsContainer: {
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    statText: {
        marginLeft: 4,
        color: Colors.SECONDARY,
        fontSize: 16,
        fontWeight: "500"
    },
    settingContent: {
        marginTop: "4%",
    },
    settingTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: Colors.TEXT_COLOR,
        marginBottom: 8
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '100%',
        height: 48,
        borderRadius: 12,
        backgroundColor: Colors.BACKGROUND_COLOR,
        paddingHorizontal: '3.5%',
        // Optional: add a slight shadow for depth
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    textStyle: {
        flex: 1,
        textAlign: 'left',
        marginLeft: "3%",
        fontSize: 14,
        color: Colors.TEXT_COLOR
    },
     submitButton: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 30,
        marginBottom: 5,
    },
    buttonText: {
        color: "#FFF", fontSize: 16,
        fontWeight: "600"
    },
})