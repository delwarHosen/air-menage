import { Image } from 'expo-image';
import { useRef, useState } from 'react';
import {
    Animated,
    Easing,
    FlatList,
    Modal,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { Colors } from '../../assets/Colors';
import {
    BedIcon,
    CreatePropertyIcon,
    DownForwardIcon,
    RatingYelloBagdeStar
} from '../../assets/icons/Icons';
import { Caption, H6 } from '../typo/typography';

export default function PropertySelector({ properties, selectedProperty, onSelect }) {
    const [modalVisible, setModalVisible] = useState(false);

    // 👇 animation value
    const slideAnim = useRef(new Animated.Value(300)).current;

    const openModal = () => {
        setModalVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 350,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
    };

    const closeModal = () => {
        Animated.timing(slideAnim, {
            toValue: 300,
            duration: 250,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
        }).start(() => setModalVisible(false));
    };

    const handleSelect = (property) => {
        onSelect(property);
        closeModal();
    };

    return (
        <>
            {/* Selected Property Card */}
            <TouchableOpacity style={styles.propertyCard} onPress={openModal}>
                <View style={styles.propertyImage}>
                    <Image
                        source={selectedProperty.img}
                        style={{ width: 52, height: 52 }}
                        contentFit="cover"
                    />
                </View>

                <View style={styles.propertyInfo}>
                    <View style={styles.propertyNameRow}>
                        <H6 style={{ marginRight: 4 }}>{selectedProperty.name}</H6>
                        {selectedProperty.featured && <RatingYelloBagdeStar />}
                    </View>

                    <View style={styles.propertyDetails}>
                        <View style={styles.propertyContent}>
                            <CreatePropertyIcon />
                            <Caption>{selectedProperty.area}</Caption>
                        </View>
                        <View style={styles.propertyContent}>
                            <BedIcon />
                            <Caption>{selectedProperty.beds}</Caption>
                        </View>
                    </View>
                </View>

                <DownForwardIcon />
            </TouchableOpacity>

            {/* Modal */}
            <Modal transparent visible={modalVisible}>
                <View style={styles.modalOverlay}>
                    {/* Backdrop click */}
                    <TouchableOpacity
                        style={StyleSheet.absoluteFill}
                        activeOpacity={1}
                        onPress={closeModal}
                    />

                    <Animated.View
                        style={[
                            styles.modalContent,
                            { transform: [{ translateY: slideAnim }] }
                        ]}
                    >

                        {/* Property List */}
                        <FlatList
                            data={properties}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={[styles.modalPropertyCard, styles.modalPropertyCardSelected]} onPress={openModal}>
                                    <View style={styles.propertyImage}>
                                        <Image
                                            source={item.img}
                                            style={{ width: 52, height: 52 }}
                                            contentFit="cover"
                                        />
                                    </View>

                                    <View style={styles.propertyInfo}>
                                        <View style={styles.propertyNameRow}>
                                            <H6 style={{ marginRight: 4 }}>{item.name}</H6>
                                            {item.featured && <RatingYelloBagdeStar />}
                                        </View>

                                        <View style={styles.propertyDetails}>
                                            <View style={styles.propertyContent}>
                                                <CreatePropertyIcon />
                                                <Caption>{item.area}</Caption>
                                            </View>
                                            <View style={styles.propertyContent}>
                                                <BedIcon />
                                                <Caption>{item.beds}</Caption>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </Animated.View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    propertyCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
    },

    propertyImage: {
        width: 52,
        height: 52,
        borderRadius: 12,
        overflow: 'hidden',
        marginRight: 15,
    },

    propertyInfo: {
        flex: 1,
    },

    propertyNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },

    propertyDetails: {
        flexDirection: 'row',
        gap: 15,
    },

    propertyContent: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },

    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '70%',
        paddingBottom: 20,
    },

    modalPropertyCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginHorizontal: 20,
        marginTop: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: '#FFFFFF',
    },

    modalPropertyCardSelected: {
        borderColor: Colors.BORDER_COLOR,
    },
});

