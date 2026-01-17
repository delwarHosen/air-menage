import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Colors } from '../../assets/Colors';
import { DeletePropertyTrashIcon } from '../../assets/icons/Icons';
import Heading from '../../components/Heading/Heading';
import { Caption, H5 } from '../../components/typo/typography';
import { cleaners } from '../../store/Cleaners';

function CleanerItem({ item, onPress, t }) {
    return (
        <View style={styles.CleanerCard}>
            {/* Gradient Border for Profile Image */}
            <LinearGradient
                colors={[
                    '#FAFF0A',
                    '#FEAD4E',
                    '#ED1B1B',
                    '#FB1274',
                    '#A61D5F',
                    '#F109DA'
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBorder}
            >
                <Image
                    source={{ uri: item.profileImg }}
                    style={styles.profileImage}
                />
            </LinearGradient>

            {/* Name and Email Section */}
            <View style={{ flex: 1 }}>
                <H5 numberOfLines={1}>{item.name}</H5>
                <Caption style={{ color: Colors.TEXT_COLOR }} numberOfLines={1}>
                    {item.email}
                </Caption>
            </View>

            {/* View Details Button */}
            <View>
                <TouchableOpacity onPress={onPress} style={styles.viewButton}>
                    <Caption style={{ color: "#fff" }}>
                        {t('favourite_cleaner.button.viewDetails')}
                    </Caption>
                </TouchableOpacity>
            </View>

            {/* Delete Icon with right padding/margin */}
            <TouchableOpacity 
                onPress={() => console.log("Delete item:", item.id)}
                style={styles.deleteButton}
            >
                <DeletePropertyTrashIcon />
            </TouchableOpacity>
        </View>
    );
}

export default function FavouriteCleaner() {
    const router = useRouter();
    const { t } = useTranslation();

    const renderItem = ({ item }) => (
        <CleanerItem
            item={item}
            t={t}
            onPress={() => router.push(`/host/cleaner/${item.id}`)}
        />
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <FlatList
                    data={cleaners}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    ListHeaderComponent={
                        <View style={styles.headerGap}>
                            <Heading title={t('favourite_cleaner.title')} />
                        </View>
                    }
                    renderItem={renderItem}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                />
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 16,
        paddingBottom: 50
    },
    headerGap: {
        marginBottom: 10
    },
    CleanerCard: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 12,
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 0.5,
    },
    gradientBorder: {
        height: 48,
        width: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    profileImage: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: '#fff',
    },
    viewButton: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginRight: 5,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 6,
    },
    deleteButton: {
        padding: 0,
        margin: 3, 
    }
});