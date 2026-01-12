import { useRouter } from 'expo-router';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Colors } from '../../assets/Colors';
import { LocationIcon } from '../../assets/icons/Icons';
import { Body1 } from '../../components/typo/typography';
// import { Colors } from '../../../assets/Colors';
// import { LocationIcon } from '../../../assets/icons/Icons';
// import { Body1 } from '../../../components/typo/typography';

export default function CleanerMap() {
    const router = useRouter();

    // In a real app, you would pass these via searchParams or context
    const initialRegion = {
        latitude: 25.2048, // Dubai for example, or get from props
        longitude: 55.2708,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
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

            {/* Back Button */}
            <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
            >
                <Body1 style={{ color: 'white' }}>Back</Body1>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: Colors.PRIMARY,
        padding: 10,
        borderRadius: 8,
        elevation: 5,
    },
    customMarker: {
        backgroundColor: Colors.SECONDARY,
        padding: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white'
    }
});