import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../assets/Colors'
import { H5 } from '../typo/typography'

export default function Heading({ title }) {
    return (
        <View style={styles.headerRow}>
            <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backIconContainer}
            >
                <Ionicons
                    name="arrow-back"
                    size={22}
                    color={Colors.TEXT_COLOR}
                />
            </TouchableOpacity>
            <H5 style={styles.headerTitle}>{title}</H5>
        </View>
    )
}

const styles = StyleSheet.create({

    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20,
        width: '100%',
        height: 43,
    },
    backIconContainer: {
        position: 'absolute',
        left: 0,
        width: 43,
        height: 43,
        borderRadius: 23,
        backgroundColor: "#EBEBEE",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#CACACB",
        zIndex: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: "#0F243E",
        textAlign: "center",
    },
})