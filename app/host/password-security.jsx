import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import { DeleteIcon, ForwarAngleIcon, PasswrodIcon } from '../../assets/icons/Icons';
import Heading from '../../components/Heading/Heading';
import { Body2 } from '../../components/typo/typography';

export default function PasswordSecurity() {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <>
            <View style={{ marginHorizontal: 20 }}>
                <Heading title={t('password_security.title')} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {/* Change Password */}
                <TouchableOpacity
                    onPress={() => router.push("/host/change-password")}
                    style={styles.buttonContainer}
                    activeOpacity={0.7}
                >
                    <View style={styles.leftContent}>
                        <PasswrodIcon />
                        <Body2 style={styles.textStyle}>{t('password_security.actions.changePassword')}</Body2>
                    </View>
                    <ForwarAngleIcon />
                </TouchableOpacity>

                {/* Delete Account */}
                <TouchableOpacity
                    onPress={() => router.push("/host/password-security")}
                    style={styles.buttonContainer}
                    activeOpacity={0.7}
                >
                    <View style={styles.leftContent}>
                        <DeleteIcon />
                        <Body2 style={{ color: "#D4461A" }}>{t('password_security.actions.deleteAccount')}</Body2>
                    </View>
                    <ForwarAngleIcon />
                </TouchableOpacity>
            </ScrollView>
        </>
    );
}


const styles = StyleSheet.create({
    

    scrollContainer: {
        paddingHorizontal: "3%",
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
        marginVertical: 10,
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
        color: Colors.TEXT_COLOR,
    }
})