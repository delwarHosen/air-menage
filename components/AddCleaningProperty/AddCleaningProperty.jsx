import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View } from "react-native";
import Heading from "../Heading/Heading";

export default function AddCleaningProperty() {
    return (
        <View style={styles.container}>
            {/* Heading পুরো উপরে, top: 0 */}
            <View style={styles.headerContainer}>
                <Heading title="Add Properties" />
            </View>

            {/* Scrollable content নিচে */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <TextInput
                            placeholder="Enter text"
                            style={styles.inputField}
                        />
                    </View>
                    <View style={styles.contentBox}>
                        {/* Another example */}
                    </View>
                    <View style={styles.contentBox}>
                        {/* More content */}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    headerContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        paddingHorizontal: "4%",

    },
    scrollContainer: {
        paddingTop: 72,
        paddingHorizontal: 16,
    },
    inputField: {
        width:"100%",           
        height: 48,            
        borderRadius: 8,       
        borderWidth: 1,       
        borderColor: "#EBEBEE", 
        backgroundColor: "#fffff", 
             
    },
    contentBox: {
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
});
