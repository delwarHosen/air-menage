import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Colors } from '../../assets/Colors';
import { DeleteIcon } from '../../assets/icons/Icons';
import Heading from '../../components/Heading/Heading';
import { Caption, H5 } from '../../components/typo/typography';
import { cleaners } from '../../store/Cleaners';

function CleanerItem({ item, onPress, t }) {
    return (
        <View style={styles.CleanerCard}>
            <Image
                source={{ uri: item.profileImg }}
                style={styles.profileImage}
            />
            <View style={{ flex: 1 }}>
                <H5>{item.name}</H5>
                <Caption style={{ color: Colors.TEXT_COLOR }}>{item.email}</Caption>
            </View>
            <View>
                <TouchableOpacity onPress={onPress} style={styles.viewButton}>
                    <Caption style={{ color: "#fff" }}>{t('favourite_cleaner.button.viewDetails')}</Caption>
                </TouchableOpacity>
            </View>
            <DeleteIcon/>
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
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <FlatList
                    data={cleaners}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ padding: 16, paddingBottom: 50 }}
                    ListHeaderComponent={<Heading title={t('favourite_cleaner.title')} />}
                    renderItem={renderItem}
                    keyboardShouldPersistTaps="handled"
                />
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
   
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
