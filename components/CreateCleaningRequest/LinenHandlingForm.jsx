import { useFonts } from 'expo-font';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Animated, { FadeInDown, FadeOut, LinearTransition } from 'react-native-reanimated';
import { Colors } from '../../assets/Colors';
import { LineHandlinhgIcon, TissuIcon } from '../../assets/icons/Icons';
import { Body2, H5, H6 } from '../typo/typography';

export default function LinenHandlingForm({ control, selectedOption, setSelectedOption }) {
    const { t } = useTranslation();


    const [fontsLoaded] = useFonts({
        'Syne-Regular': require("../../assets/fonts/Syne-Regular.ttf"),
    });


    const AddressInput = ({ fieldName }) => (
        <Animated.View
            entering={FadeInDown.duration(300)}
            exiting={FadeOut.duration(200)}
            style={{ marginTop: 5, marginBottom: 15 }}
        >
            <H6 style={{ marginBottom: 10 }}>{t('linen.dropoff_address')}</H6>
            <Controller
                control={control}
                name={fieldName}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder={t('linen.placeholder_address')}
                        placeholderTextColor="#999"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value || ""}
                    />
                )}
            />
        </Animated.View>
    );

    return (
        <Animated.View layout={LinearTransition.springify()}>
            <H5 style={styles.sectionTitle}>{t('linen.section_title')}</H5>

            {/* Option 1: Change */}
            <Pressable
                style={[styles.optionCard, selectedOption === 'change' && styles.optionCardSelected]}
                onPress={() => setSelectedOption('change')}
            >
                <View style={styles.optionIcon}><LineHandlinhgIcon /></View>
                <Body2 style={styles.optionTitle}>{t('linen.change')}</Body2>
            </Pressable>
            {selectedOption === 'change' && <AddressInput fieldName="address_change" />}

            {/* Option 2: Collect */}
            <Pressable
                style={[styles.optionCard, selectedOption === 'collect' && styles.optionCardSelected]}
                onPress={() => setSelectedOption('collect')}
            >
                <View style={styles.optionIcon}><LineHandlinhgIcon /></View>
                <Body2 style={styles.optionTitle}>{t('linen.collect')}</Body2>
            </Pressable>
            {selectedOption === 'collect' && <AddressInput fieldName="address_collect" />}

            {/* Option 3: Wash */}
            <Pressable
                style={[styles.optionCard, selectedOption === 'wash' && styles.optionCardSelected]}
                onPress={() => setSelectedOption('wash')}
            >
                <View style={styles.optionIcon}><LineHandlinhgIcon /></View>
                <Body2 style={styles.optionTitle}>{t('linen.wash')}</Body2>
            </Pressable>
            {selectedOption === 'wash' && <AddressInput fieldName="address_wash" />}

            {/* Option 4: Consumables Refill */}
            <Pressable
                style={[styles.optionCard, selectedOption === 'washs' && styles.optionCardSelected]}
                onPress={() => setSelectedOption('washs')}
            >
                <View style={styles.optionIcon}><TissuIcon /></View>
                <Body2 style={styles.optionTitle}>{t('linen.consumables_refill')}</Body2>
            </Pressable>
            {selectedOption === 'washs' && <AddressInput fieldName="address_refill" />}

        </Animated.View>
    );
}


const styles = StyleSheet.create({
    sectionTitle: {
        marginBottom: 16,
        marginTop: 30,
    },
    optionCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionCardSelected: {
        borderColor: Colors.PRIMARY,
        borderWidth: 2,
    },
    optionIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        // backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    optionTitle: {
        flex: 1,
        lineHeight: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 12,
        marginTop: 8,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: '#E5E5E5',
        padding: 16,
        fontSize: 16,
        color: '#7c7c7c',
        marginBottom: 12,
        fontFamily: 'Syne-Regular'
    },
});
