import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import { LineHandlinhgIcon, TissuIcon } from '../../assets/icons/Icons';
import { Body2, H5, H6 } from '../typo/typography';

export default function LinenHandlingForm({ selectedOption, setSelectedOption, dropOffAddress, setDropOffAddress }) {
    const { t } = useTranslation();

    const LinenOption = ({ id, icon, title, selected, onPress }) => (
        <Pressable
            style={[styles.optionCard, selected && styles.optionCardSelected]}
            onPress={onPress}
        >
            <View style={styles.optionIcon}>{icon}</View>
            <Body2 style={styles.optionTitle}>{title}</Body2>
        </Pressable>
    );

    return (
        <View>
            <H5 style={styles.sectionTitle}>{t('linen.section_title')}</H5>

            <LinenOption
                id="change"
                icon={<LineHandlinhgIcon />}
                title={t('linen.change')}
                selected={selectedOption === 'change'}
                onPress={() => setSelectedOption('change')}
            />

            <LinenOption
                id="collect"
                icon={<LineHandlinhgIcon />}
                title={t('linen.collect')}
                selected={selectedOption === 'collect'}
                onPress={() => setSelectedOption('collect')}
            />

            <LinenOption
                id="wash"
                icon={<LineHandlinhgIcon />}
                title={t('linen.wash')}
                selected={selectedOption === 'wash'}
                onPress={() => setSelectedOption('wash')}
            />

            <H6 style={{ marginTop: 30, marginBottom: 10 }}>{t('linen.dropoff_address')}</H6>
            <TextInput
                style={styles.input}
                placeholder={t('linen.placeholder_address')}
                placeholderTextColor="#999"
                value={dropOffAddress}
                onChangeText={setDropOffAddress}
            />

            <LinenOption
                id="washs"
                icon={<TissuIcon />}
                title={t('linen.consumables_refill')}
                selected={selectedOption === 'washs'}
                onPress={() => setSelectedOption('washs')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        marginBottom: 16,
        marginTop: 30,
    },
    optionCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1.5,
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
        color: '#1A1A1A',
        marginBottom: 12,
    },
});
