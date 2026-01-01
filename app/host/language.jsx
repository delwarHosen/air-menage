import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../assets/Colors';
import { Body2 } from '../../components/typo/typography';

export default function Language() {
    const router = useRouter();
    const [selectedLanguage, setSelectedLanguage] = useState("English");

    const languages = ["English", "French"];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ margin: "2.5%" }}>
                {/* Header */}
                <View style={styles.headerRow}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backIcon}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={22}
                            color={Colors.TEXT_COLOR}
                        />
                    </TouchableOpacity>

                    <Body2 style={styles.headerTitle}>Language</Body2>
                </View>

                {/* Language Radio Buttons */}
                <View style={styles.languageContainer}>
                    {languages.map((lang) => (
                        <TouchableOpacity
                            key={lang}
                            style={styles.languageColumn}
                            onPress={() => setSelectedLanguage(lang)}
                        >
                            {/* Top row: circle + short label */}
                            <View style={styles.topRow}>
                                <View style={styles.radioCircle}>
                                    {selectedLanguage === lang && <View style={styles.selectedRb} />}
                                </View>
                                <Text style={styles.topLabel}>{lang}</Text>
                            </View>

                            {/* Bottom label */}
                            <Text style={styles.bottomLabel}>{lang}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR,
        paddingVertical: 7,
        paddingHorizontal:20,
    },

    /* Header */
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },

    backIcon: {
        position: "absolute",
        left: 0,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#EBEBEE",
        justifyContent: "center",
        alignItems: "center",
    },

    headerTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: Colors.SECONDARY,
    },

    /* Language container */
    languageContainer: {
        flexDirection: "column",          
        // justifyContent: "space-around",
        marginTop: 32,
    },

    languageColumn: {
        // alignItems: "center",        
        marginLeft: 20
    },

    topRow: {
        flexDirection: "row",          
        // alignItems: "center",
        // marginBottom: 6,             
    },

    radioCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#4A4F61",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 6,
    },

    selectedRb: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: "#4A4F61",
    },

    topLabel: {
        fontSize: 16,
        color: "#333",
        fontWeight: "500",
        marginLeft: 0
    },

    bottomLabel: {
        fontSize: 12,
        color: "#6E7179",
        fontWeight: "400",
        marginLeft: 30,
        marginBottom: 20
    },
});
