import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import {
    CalenderIcon,
    CalenderIconForPayment,
    HomeForInvoiceIcon,
    LocationIcon
} from '../../assets/icons/Icons';
import { Body2, H6 } from '../typo/typography';

export default function InvoiceCard({ data }) {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            {/* Home Section */}
            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
                <View style={styles.homeSection}>
                    <HomeForInvoiceIcon />
                    <Body2 style={styles.homeText}>{t('invoice.home')}</Body2>
                </View>
            </View>

            <View style={styles.section}>
                <Body2 style={styles.label}>{t('invoice.cleaningId')}</Body2>
                <H6 style={styles.value}>{data.id}</H6>
            </View>

            <View style={styles.section}>
                <Body2 style={styles.label}>{t('invoice.propertyName')}</Body2>
                <H6 style={styles.value}>{data.propertyName}</H6>
            </View>

            <View style={styles.section}>
                <View style={styles.iconLabel}>
                    <LocationIcon />
                    <Body2 style={styles.label}>{t('invoice.propertyAddress')}</Body2>
                </View>
                <H6 style={styles.value}>{data.address}</H6>
            </View>

            <View style={styles.section}>
                <View style={styles.iconLabel}>
                    <CalenderIcon />
                    <Body2 style={styles.label}>{t('invoice.cleaningDate')}</Body2>
                </View>
                <H6 style={styles.value}>{data.date}</H6>
            </View>

            <View style={styles.section}>
                <View style={styles.iconLabel}>
                    <CalenderIconForPayment />
                    <Body2 style={styles.label}>{t('invoice.timeSlot')}</Body2>
                </View>
                <H6 style={styles.value}>{data.timeSlot}</H6>
            </View>

            <View style={styles.section}>
                <Body2 style={styles.label}>{t('invoice.estimateDuration')}</Body2>
                <H6 style={styles.value}>{data.duration}</H6>
            </View>

            <View style={styles.section}>
                <Body2 style={styles.label}>{t('invoice.cleaner')}</Body2>
                <H6 style={styles.value}>{data.cleaner}</H6>
            </View>

            <View style={styles.section}>
                <H6 style={styles.priceTitle}>{t('invoice.priceList')}</H6>
            </View>

            <View style={styles.section}>
                <Body2 style={styles.label}>{t('invoice.propertyType')}</Body2>
                <H6 style={styles.value}>{data.propertyType}</H6>
            </View>

            <View style={styles.section}>
                <Body2 style={styles.label}>{t('invoice.surface')}</Body2>
                <H6 style={styles.value}>{data.surface}</H6>
            </View>

            <View style={styles.section}>
                <Body2 style={styles.label}>{t('invoice.price')}</Body2>
                <H6 style={styles.value}>{data.price}</H6>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
    },
    homeSection: {
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#F5F5F5',
        paddingVertical: 18,
        borderRadius: 8,
        marginBottom: 20,
        marginTop: 10,
        width: "30%"
    },
    homeText: {
        color: '#7C7C7C',
        fontSize: 12,
        marginTop: 6
    },
    section: {
        marginBottom: 18
    },
    iconLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4
    },
    label: {
        color: '#7C7C7C',
        fontSize: 13
    },
    value: {
        color: '#1A3352',
        fontSize: 15,
        fontWeight: '400',
        marginTop: 2
    },
    priceTitle: {
        fontSize: 16,
        color: '#1A3352',
        fontWeight: '500'
    }
});