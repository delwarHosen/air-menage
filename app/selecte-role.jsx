import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors } from "../assets/Colors";
import { ButtonText, H1, H5 } from '../components/typo/typography';
import { setRole } from "../redux/roleSlice";

export default function SelectRole() {
    const router = useRouter();
    const { t } = useTranslation();

    const dispatch = useDispatch(); 

    const handleRolePress = (role) => {
        console.log("Dispatching role:", role); 
        dispatch(setRole(role)); 
        router.push("/(auth)/login");
    }


    return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
            <View style={styles.heroImage}>
                <Image
                    source={require("../assets/images/banner2.png")}
                    style={{ width: '100%', aspectRatio: 16 / 9 }}
                    resizeMode="contain"
                />
            </View>

            <H1 style={styles.headerTitle}>
                {t("role_page.title")}
            </H1>

            <H5 style={styles.headerText}>
                {t("role_page.description")}
            </H5>

            {/* Role Buttons */}
            <TouchableOpacity
                onPress={() => handleRolePress('host')}
                activeOpacity={0.7}
                style={styles.buttonComponents}
            >
                <ButtonText style={styles.btnText}>
                    {t("role_page.button1")}
                </ButtonText>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => handleRolePress('cleaner')}
                activeOpacity={0.7}
                style={styles.buttonComponents}
            >
                <ButtonText style={styles.btnText}>
                    {t("role_page.button2")}
                </ButtonText>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    heroImage: {
        alignItems: 'center',
        marginBottom: 30
    },
    headerTitle: {
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 8
    },
    headerText: {
        color: Colors.TEXT_COLOR,
        textAlign: 'center',
        marginBottom: 23
    },
    buttonComponents: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 18,
        borderRadius: 8,
        marginBottom: 15
    },
    btnText: {
        color: "#fff",
        fontWeight: '500',
        textAlign: 'center'
    }
});
