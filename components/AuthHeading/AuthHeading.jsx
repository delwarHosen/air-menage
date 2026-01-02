import { StyleSheet, View } from 'react-native'
import { Colors } from '../../assets/Colors'
import { Body2, H3 } from '../typo/typography'

export default function AuthHeading({ title, description }) {
    return (
        <View style={styles.header}>
            <H3 style={styles.title}>{title}</H3>
            <Body2 style={{ textAlign: "center",color:Colors.TEXT_COLOR }}>
               {description}
            </Body2>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginBottom: 32,
        marginTop:50
    },
    title: {
        marginBottom: 12,
        fontWeight: "600",
        textAlign: "center",
        color:Colors.AUTH_HED_COLOR,
        // color:"#040404",
    },
})