import { useRouter } from 'expo-router';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Colors } from '../../assets/Colors';
import { ArrowLeftIcon, LocationIcon } from '../../assets/icons/Icons';
import { H5 } from '../../components/typo/typography';

export default function CleanerMap() {
    const router = useRouter();

    const initialRegion = {
        latitude: 25.2048,
        longitude: 55.2708,
        latitudeDelta: 0.05, 
        longitudeDelta: 0.05,
    };

    return (
        <View style={styles.container}>
         
            <MapView
                
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
                style={styles.map}
                initialRegion={initialRegion}
            >
                <Marker
                    coordinate={{ latitude: 25.2048, longitude: 55.2708 }}
                    title={"Property Location"}
                    description={"Dubai, UAE"}
                >
                    <View style={styles.customMarker}>
                        <LocationIcon color="white" />
                    </View>
                </Marker>
            </MapView>

            
            <View style={styles.headerOverlay}>
                <TouchableOpacity 
                    onPress={() => router.back()} 
                    style={styles.backButton}
                    activeOpacity={0.8}
                >
                   
                    <ArrowLeftIcon color="#000" size={24} />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <H5 weight="bold" color="#000">Map Overview</H5>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject, 
    },
    customMarker: {
        backgroundColor: Colors.SECONDARY || Colors.PRIMARY,
        padding: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    headerOverlay: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: '#FFFFFF',
        width: 45,
        height: 45,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    titleContainer: {
        marginLeft: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    }
});