// import { useLocalSearchParams } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Heading from '../../components/Heading/Heading';
// import { cleanerDetailsData } from '../../../store/CleanerRequestData';
import { router, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../assets/Colors';
import { ForwarAngleIcon } from '../../assets/icons/Icons';
import { Body1, Body2, H5 } from '../../components/typo/typography';

export default function BookingDetails() {
    const { t } = useTranslation();
    const route = useRouter();
    const policies = [
        { id: "1", title: "Date", value: "Tomorrow" },
        { id: "2", title: "Heures", value: "tue,dec15,2025" },
        { id: "3", title: "Location", value: "France" },
        { id: "4", title: "Confimation Code", value: "HMDHDFGHFU" },
        { id: "5", title: "Cancellation Policy", value: "Flexible" },
    ];

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.mainContainer}
        >
            <ScrollView
                stickyHeaderIndices={[0]}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section */}
                <View style={styles.headerWrapper}>
                    <Heading title={t("properties.overview")} />
                </View>

                {/* Content Wrapper */}
                <View style={styles.contentWrapper}>


                    {policies.map((item) => (
                        <View key={item.id} style={styles.section}>
                            <Body1 style={{ color: Colors.SECONDARY }}>{item.title}</Body1>
                            <Body2 style={{ color: "#A7A5AF", marginTop: 4 }}>
                                {item.value}
                            </Body2>
                        </View>
                    ))}

                    {/* View Calendar Link */}
                    <View>

                        <TouchableOpacity style={{ marginVertical: 34 }}>
                            <Body1 style={{ color: Colors.TEXT_COLOR, textDecorationLine: "underline", fontWeight: "600" }}>
                                View Calender
                            </Body1>
                        </TouchableOpacity>

                        {/* Fees Section */}
                        <View style={styles.feeRow}>
                            <Body1 style={{ color: Colors.TEXT_COLOR }}>Short Stay Cleaning Fee</Body1>
                            <Body1 style={{ color: Colors.TEXT_COLOR }}>10€</Body1>
                        </View>
                        <View style={styles.feeRow}>
                            <Body1 style={{ color: Colors.TEXT_COLOR }}>Guest Service Fee</Body1>
                            <Body1 style={{ color: Colors.TEXT_COLOR }}>10€</Body1>
                        </View>
                        <View style={styles.feeRow}>
                            <Body1 style={{ color: Colors.TEXT_COLOR }}>Tax</Body1>
                            <Body1 style={{ color: Colors.TEXT_COLOR }}>4.70€</Body1>
                        </View>
                        <View style={[styles.feeRow, { marginTop: 10 }]}>
                            <Body1 style={{ color: Colors.TEXT_COLOR, }}>Total (EUR)</Body1>
                            <Body1 style={{ color: Colors.TEXT_COLOR, }}>24.70€</Body1>
                        </View>
                    </View>

                    {/* <View style={styles.divider} /> */}

                    {/* Support Section */}
                    <View>
                        <H5 style={{ color: Colors.TEXT_COLOR, marginTop: 40 }}>Support</H5>

                        {/* Support Row example based on your style */}
                        <TouchableOpacity style={styles.supportRow}>
                            <Body2 style={{ color: Colors.TEXT_COLOR }}>Security Support</Body2>
                            <ForwarAngleIcon />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.supportRow}>
                            <Body2 style={{ color: Colors.TEXT_COLOR }}>Security Support</Body2>
                            <ForwarAngleIcon />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.supportRow}>
                            <Body2 style={{ color: Colors.TEXT_COLOR }}>Security Support</Body2>
                            <ForwarAngleIcon />
                        </TouchableOpacity>
                    </View>

                    {/* <View style={styles.divider} /> */}

                    {/* Owner Details Section */}
                    <View style={styles.ownerSection}>

                        <View style={{ gap: 2 }}>
                            <View style={styles.avatarCircle}>
                                <Body1 style={{ color: "#fff" }}>B</Body1>
                            </View>
                            <Body1 style={styles.owenerDetails}>Owan Details</Body1>
                            <Body2 style={styles.owenerDetails}>Appartment Fleur De Lys</Body2>
                            <Body2 style={styles.owenerDetails}>28-30 Dec.2025</Body2>
                        </View>
                    </View>

                    <View style={[styles.ownerSection, { marginTop: 15 }]}>
                        <View style={{ gap: 2 }}>
                            <H5 style={styles.owenerDetails}>Owan Details</H5>
                            <Body2 style={styles.owenerDetails}>Identiity Verified</Body2>
                            <Body2 style={styles.owenerDetails}>No Trips Yet</Body2>
                            <TouchableOpacity style={{ marginTop: 5 }}>
                                <Body2 style={{ color: Colors.TEXT_COLOR, textDecorationLine: "underline", fontWeight: "600" }}>
                                    View Profile
                                </Body2>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.footerContainer}>
                        <TouchableOpacity
                            onPress={() => router.push("/host/(tabs)/message")}
                            style={styles.messageBtn}>
                            <Body1 style={styles.btnText}>Send a Message</Body1>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: "2.5%",
        // backgroundColor: '#fff', 
    },
    headerWrapper: {
        backgroundColor: '#fff',
        paddingHorizontal: "2.5%",
        paddingTop: Platform.OS === 'ios' ? 50 : 10,
    },
    scrollContent: {
        paddingBottom: 30,
    },
    contentWrapper: {
        marginHorizontal: "2.5%",
        // marginVertical: 15,
    },
    section: {
        marginTop: 35,
        borderBottomWidth: 1,
        borderBottomColor: "#A7A5AF",
        paddingBottom: 12
    },
    feeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.BORDER_COLOR,
        marginVertical: 20,
    },
    supportRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 30,
        borderBottomWidth: 1,
        paddingBottom: 12,
        borderBottomColor: Colors.BORDER_COLOR,
    },
    ownerSection: {
        flexDirection: "row",
        gap: 15,
        alignItems: "flex-start",
        marginTop: 40
    },
    avatarCircle: {

        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#222",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10
    },
    owenerDetails: {
        color: Colors.SECONDARY, marginBottom: 8
    },
    footerContainer: {
        marginTop: 80,
        paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    },
    messageBtn: {

        height: 56,
        borderRadius: 12,
        width: '100%',
        borderWidth: 2,
        borderColor: "#636363",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        fontWeight: '600',
        color: Colors.SECONDARY
    },
});