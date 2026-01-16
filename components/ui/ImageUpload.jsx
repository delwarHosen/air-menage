import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import { Body2 } from '../typo/typography';

export const ImageUpload = ({
    image,
    onImageSelect,
    style,
    shape = 'circle',
    label,
    showIcon = true,
    centered = false,
    defaultImage = null  
}) => {

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Camera roll permissions are required!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [1.8, 1.9],
            quality: 1,
        });

        if (!result.canceled) {
            onImageSelect(result.assets[0].uri);
        }
    };

    const borderRadius = shape === 'circle' ? 75 : 8;

    return (
        <View style={[
            styles.container, 
            centered && styles.centeredContainer,
            style
        ]}>
            {label && <Body2 style={styles.label}>{label}</Body2>}

            <TouchableOpacity
                onPress={pickImage}
                activeOpacity={0.8}
                style={[
                    styles.picker,
                    shape === 'circle' ? styles.circle : styles.square,
                    { borderRadius: borderRadius, backgroundColor: "#FFFFFF" }
                ]}
            >
                {image || defaultImage ? (  
                    <Image
                        source={image ? { uri: image } : defaultImage}  
                        style={[styles.image, { borderRadius: borderRadius }]}
                    />
                ) : (
                    <View style={[styles.placeholder, shape === 'circle' && { flexDirection: 'column' }]}>
                        {showIcon && <Ionicons name="camera-outline" size={24} color="#3F3F4680" />}
                        <Body2 style={{ color: "#3F3F4680", textAlign: 'center' }}>Add Photo</Body2>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        marginVertical: 8,
        width: '100%',
    },
    centeredContainer: {
        alignItems: 'center',
    },
    label: { marginBottom: 8, color: '#3F3F46' },
    picker: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        position: 'relative',
        padding: 2,
        overflow: 'hidden'
    },
    placeholder: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        gap: 5,
        width: '100%',
    },
    circle: {
        width: 150,
        height: 150,
    },
    square: {
        width: '100%',
        height: 180,
    },
    image: {
        width: '100%',
        height: '100%',
    }
});