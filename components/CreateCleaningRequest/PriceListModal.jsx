import { useTranslation } from 'react-i18next';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import { LineHandlinhgIcon, TissuIcon } from '../../assets/icons/Icons';
import { Body1, Body2, H3, H4, H5 } from '../typo/typography';

const PriceListModal = ({ visible, onClose }) => {
    const { t } = useTranslation();

    const priceData = [
        { type: t('price_list.studio'), surface: '0-30m²', price: '20-35€' },
        { type: t('price_list.one_room'), surface: '31-45m²', price: '30-45€' },
        { type: t('price_list.two_rooms'), surface: '45-60m²', price: '40-60€' },
        { type: t('price_list.three_rooms'), surface: '61-80m²', price: '60-80€' },
        { type: t('price_list.four_rooms'), surface: '81-100m²', price: '80-100€' },
        { type: t('price_list.house'), surface: '100m²+', price: '100€ +' },
    ];

    const serviceData = [
        { icon: <LineHandlinhgIcon />, text: t('price_list.change_bed'), price: '0€' },
        { icon: <LineHandlinhgIcon />, text: t('price_list.wash_offsite'), price: '10€' },
        { icon: <LineHandlinhgIcon />, text: t('price_list.collect_wash_deliver'), price: '20€' },
        { icon: <TissuIcon />, text: t('price_list.consumables_refill'), price: '5-10€' },
    ];

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                {/* Backdrop */}
                <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

                {/* Modal */}
                <View style={styles.modalContent}>
                    {/* Header */}
                    <View style={styles.modalHeader}>
                        <H4>{t('price_list.title')}</H4>
                        <Pressable onPress={onClose} hitSlop={20}>
                            <H3 style={styles.closeIcon}>✕</H3>
                        </Pressable>
                    </View>

                    {/* Scroll */}
                    <ScrollView contentContainerStyle={styles.modalScroll} showsVerticalScrollIndicator={false}>
                        {/* Table */}
                        <View style={styles.tableContainer}>
                            <View style={[styles.tableRow, styles.headerBackground]}>
                                <View style={[styles.cell, styles.borderRight, { flex: 1.5 }]}>
                                    <Body1 style={styles.headerText}>{t('price_list.property_type')}</Body1>
                                </View>
                                <View style={[styles.cell, styles.borderRight, { flex: 1 }]}>
                                    <Body1 style={styles.headerText}>{t('price_list.surface')}</Body1>
                                </View>
                                <View style={[styles.cell, { flex: 0.8 }]}>
                                    <Body1 style={styles.headerText}>{t('price_list.price')}</Body1>
                                </View>
                            </View>

                            {priceData.map((item, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.tableRow,
                                        index === priceData.length - 1 && { borderBottomWidth: 0 },
                                    ]}
                                >
                                    <View style={[styles.cell, styles.borderRight, { flex: 1.5 }]}>
                                        <Body2>{item.type}</Body2>
                                    </View>
                                    <View style={[styles.cell, styles.borderRight, { flex: 1 }]}>
                                        <Body2>{item.surface}</Body2>
                                    </View>
                                    <View style={[styles.cell, { flex: 0.8 }]}>
                                        <Body2 style={styles.priceText}>{item.price}</Body2>
                                    </View>
                                </View>
                            ))}
                        </View>

                        {/* Services */}
                        <H5 style={styles.subTitle}>{t('price_list.additional_services')}</H5>
                        <View style={styles.servicesSection}>
                            {serviceData.map((service, index) => (
                                <ServiceRow key={index} icon={service.icon} text={service.text} price={service.price} />
                            ))}
                        </View>

                        <View style={{ height: 24 }} />
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const ServiceRow = ({ icon, text, price }) => (
    <View style={styles.serviceRowWrapper}>
        <View style={styles.serviceBorder}>
            <View style={styles.serviceItem}>
                <View style={styles.serviceIcon}>{icon}</View>
                <Body2 style={styles.serviceText}>{text}</Body2>
            </View>
        </View>
        <View style={styles.priceWrapper}>
            <Body1 style={styles.servicePrice}>{price}</Body1>
        </View>
    </View>
);

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '94%',
        maxHeight: '80%',
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    closeIcon: {
        color: '#999',
    },
    modalScroll: {
        padding: 20,
    },

    /* Table */
    tableContainer: {
        width: '100%',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.BORDER_COLOR,
    },
    headerBackground: {
        backgroundColor: '#F9FAFB',
    },
    cell: {
        paddingVertical: 14,
        paddingHorizontal: 8,
    },
    borderRight: {
        borderRightWidth: 1,
        borderRightColor: '#E5E5E5',
    },
    headerText: {
        fontWeight: '700',
        fontSize: 13,
    },
    priceText: {
        color: Colors.PRIMARY,
        fontWeight: '600',
    },

    /* Services */
    subTitle: {
        marginTop: 30,
        marginBottom: 15,
        fontWeight: '600',
    },
    servicesSection: {
        gap: 12,
    },

    serviceRowWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    serviceBorder: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 5,
    },
    serviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#fff',
    },
    serviceIcon: {
        marginRight: 12,
    },
    serviceText: {
        flex: 1,
    },

    priceWrapper: {
        minWidth: 56,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: '#F1F5F9',
    },
    servicePrice: {
        fontWeight: '700',
        color: Colors.PRIMARY,
    },
});

export default PriceListModal;
