import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import { Body1, H4 } from '../../components/typo/typography';

export default function PropertySetup() {
    const {t} = useTranslation();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <H4 style={styles.title}>{t("redirect.strat_heading")}</H4>
                <Body1 style={styles.subtitle}>
                    {t("redirect.skip_content")}
                </Body1>

                {/* Add Property Button */}
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => router.push("/host/addProperty")}
                >
                    <Body1 style={{ color: '#fff', fontWeight: 'bold' }}>{t("properties.add_properties")}</Body1>
                </TouchableOpacity>

                {/* Skip Button */}
                <TouchableOpacity 
                    style={styles.skipButton}
                    onPress={() => router.replace("/host/(tabs)/home")}
                >
                    <Body1 style={{ color: Colors.SECONDARY }}>{t("redirect.skip")}</Body1>
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