import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../assets/Colors';
import Heading from '../../components/Heading/Heading';
import { Caption, H5 } from '../../components/typo/typography';
import { cleaners } from '../../store/Cleaners';

function CleanerItem({ item, onPress }) {
    return (
        <View style={styles.CleanerCard}>
            <Image
                source={{ uri: item.profileImg }}
                style={styles.profileImage}
            />
            <View style={{ flex: 1 }}>
                <H5>
                    {item.name}
                </H5>
                <Caption style={{ color: Colors.TEXT_COLOR }}>
                    {item.email}
                </Caption>
            </View>
            <View>
                <TouchableOpacity onPress={onPress} style={styles.viewButton}>
                    <Caption style={{ color: "#fff", }}>View Details</Caption>
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
                {/* FlatList handles scrolling; Heading is the ListHeader */}
                <FlatList
                    data={cleaners}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ padding: 16, paddingBottom: 50 }}
                    ListHeaderComponent={<Heading title="Favorite cleaner" />}
                    renderItem={renderItem}
                    keyboardShouldPersistTaps="handled"
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR,
        paddingVertical: 7,
    },
    CleanerCard: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        padding: 5,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12
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
