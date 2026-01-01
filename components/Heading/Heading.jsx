import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../assets/Colors'
import { Body2 } from '../typo/typography'

export default function Heading({title}) {
    return (
        <View style={styles.headerRow}>
            <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backIcon}
            >
                <Ionicons
                    name="arrow-back"
                    size={22}
                    color={Colors.TEXT_COLOR}
                />
            </TouchableOpacity>
            <Body2 style={styles.headerTitle}>{title}</Body2>
        </View>
    )
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginHorizontal: 20,
        marginVertical: 10,
    },

    backIcon: {
        position: "absolute",
        left: 0,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#EBEBEE",
        justifyContent: "center",
        alignItems: "center",
    },

    headerTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: Colors.SECONDARY,
    },
})