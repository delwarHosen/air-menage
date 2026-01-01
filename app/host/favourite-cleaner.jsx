import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../assets/Colors';
import Heading from '../../components/Heading/Heading';
import { Body2 } from '../../components/typo/typography';
import { cleaners } from '../../store/Cleaners';


function CleanerItem({ item, onPress }) {

    return (
        <View
            style={styles.CleanerCard}
        >
            <Image
                source={{ uri: item.profileImg }}
                style={styles.profileImage}
            />
            <View style={{ flex: 1 }}>
                <Body2 style={{ fontWeight: "bold", fontSize: 16, color: Colors.SECONDARY }}>{item.name}</Body2>
                <Body2 style={{ fontSize: 12, color: Colors.TEXT_COLOR }}>{item.email}</Body2>
            </View>
            <View>
                <TouchableOpacity
                    onPress={onPress}
                    style={styles.viewButton}
                >
                    <Body2 style={{ color: "#fff", fontSize: 12, }}>View Details</Body2>
                </TouchableOpacity>

            </View>
            <Ionicons name='trash-outline' size={24} color={"#C72D65"} />
        </View>
    );
}

export default function FavouriteCleaner() {
    const router = useRouter();

    const renderItem = ({ item }) => (
        <CleanerItem
            item={item}
            onPress={() => router.push(`/host/cleaner/${item.id}`)}
        />
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
              {/* Heading */}
                <Heading title={"Favorite cleaner"}/>

                {/* data fatching */}
                <FlatList
                    data={cleaners}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ padding: 16 }}
                    renderItem={renderItem}
                />

                {/* </ScrollView> */}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR,
        paddingVertical: 7,
        // paddingHorizontal: 20,
    },

    /* Header */
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginHorizontal: 20,
        marginVertical: 7
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
    // cleaner card
    CleanerCard: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        padding: 5,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    profileImage: {
        width: 40, height: 40, borderRadius: 20, marginRight: 12
    },
    viewButton: {
        marginTop: 4,
        padding: 6,
        marginRight: 25,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 6,
        alignSelf: "flex-start",
    }
});
