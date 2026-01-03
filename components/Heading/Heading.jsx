import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BackArrowIcon } from '../../assets/icons/Icons';
import { H6 } from '../typo/typography';

export default function Heading({ title }) {
    const router = useRouter();

    return (
        <View style={styles.headerRow}>
            {/* Back button */}
            <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backIconContainer}
            >
                <BackArrowIcon />
            </TouchableOpacity>

            {/* Title */}
            <H6 style={styles.headerTitle}>{title}</H6>
        </View>
    );
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20, 
        width: '100%', 
        position: 'relative', 
    },
    backIconContainer: {
        position: 'absolute',
        left: 0,
        width: 43,
        height: 43,
        borderRadius: 22, 
        backgroundColor: '#EBEBEE',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CACACB',
        zIndex: 1,
    },
    headerTitle: {
        fontWeight: '600',
        color: '#0F243E',
        textAlign: 'center',
    },
});
