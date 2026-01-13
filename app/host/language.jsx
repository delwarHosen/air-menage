import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Heading from '../../components/Heading/Heading';
import { Body1, H5 } from '../../components/typo/typography';

import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../src/i18n';

export default function Language() {
    const router = useRouter();
    const { t, i18n } = useTranslation();

  
    const [selectedLanguage, setSelectedLanguage] = useState(
        i18n.language.startsWith("fr") ? "French" : "English"
    );

    const languages = ["English", "French"];

    const onSelectLanguage = (lang) => {
        setSelectedLanguage(lang);

        
        if (lang === "English") {
            changeLanguage("en");
        } else if (lang === "French") {
            changeLanguage("fr");
        }
    };

    return (
        <>
            <View style={{ margin: "2.5%" }}>
               
                <Heading title={t("Language", "Language")} />

                {/* Language Radio Buttons */}
                <View style={styles.languageContainer}>
                    {languages.map((lang) => (
                        <TouchableOpacity
                            key={lang}
                            style={styles.languageColumn}
                            onPress={() => onSelectLanguage(lang)}
                        >
                            {/* Top row: circle + short label */}
                            <View style={styles.topRow}>
                                <View style={styles.radioCircle}>
                                    {selectedLanguage === lang && <View style={styles.selectedRb} />}
                                </View>
                                <H5 style={styles.topLabel}>{lang}</H5>
                            </View>

                          
                            <Body1 style={styles.bottomLabel}>
                                {lang === "French" ? "Français" : "English"}
                            </Body1>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    languageContainer: {
        flexDirection: "column",
        marginTop: 32,
    },
    languageColumn: {
        marginLeft: 20
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center", 
    },
    radioCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#4A4F61",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10, 
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
    },
    bottomLabel: {
        fontSize: 12,
        color: "#6E7179",
        fontWeight: "400",
        marginLeft: 34, 
        marginBottom: 20
    },
});