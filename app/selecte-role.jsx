import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors } from "../assets/Colors";
import { ButtonText, H1, H5 } from '../components/typo/typography';
import { setRole } from "../redux/roleSlice";


const { height } = Dimensions.get('window');

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
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: '#fff' }}
        >
            <View style={styles.mainContainer}>

                {/* Hero Image Section */}
                <View style={styles.heroImage}>
                    <Image
                        source={require("../assets/images/banner2.png")}
                        style={{
                            width: '100%',
                            aspectRatio: 16 / 15,
                            maxHeight: height * 0.35 
                        }}
                        contentFit="contain"
                    />
                </View>

                {/* Text Content */}
                <View style={styles.textSection}>
                    <H1 style={styles.headerTitle}>
                        {t("role_page.title")}
                    </H1>

                    <H5 style={styles.headerText}>
                        {t("role_page.description")}
                    </H5>
                </View>

                {/* Role Buttons */}
                <View style={styles.buttonSection}>
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

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: "5%",
        justifyContent: 'center',
        paddingVertical: height < 700 ? 30 : 50, 
    },
    heroImage: {
        alignItems: 'center',
        marginBottom: height < 700 ? 20 : 30,
    },
    textSection: {
        marginBottom: height < 700 ? 15 : 25,
    },
    headerTitle: {
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 8,
        fontSize: height < 700 ? 24 : 32, 
    },
    headerText: {
        color: Colors.TEXT_COLOR,
        textAlign: 'center',
    },
    buttonSection: {
        width: '100%',
    },
    buttonComponents: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: height < 700 ? 14 : 18, 
        borderRadius: 8,
        marginBottom: 15
    },
    btnText: {
        color: "#fff",
        fontWeight: '500',
        textAlign: 'center'
    }
});