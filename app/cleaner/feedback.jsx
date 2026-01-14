import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../assets/Colors';
import { StarIcon, StarOutlineIcon } from '../../assets/icons/Icons';
import Heading from '../../components/Heading/Heading';
import { Body1 } from '../../components/typo/typography';

export default function FeedbackScreen() {
    const { t } = useTranslation();

    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');

    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: 20 }}>
                <Heading title={t("feedback.title", "Your Feedback")} />
            </View>

            <View style={styles.innerContent}>
                {/* Star Rating Row */}
                <View style={styles.starContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <TouchableOpacity
                            key={star}
                            onPress={() => setRating(star)}
                            activeOpacity={0.6}
                        >
                            {star <= rating ? (
                                <StarIcon size={44} color="#4A5568" />
                            ) : (
                                <StarOutlineIcon size={44} color="#B9B9B9" />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                <Body1 style={styles.label}>
                    {t("feedback.label", "How Do You Feel About This Service?")}
                </Body1>

                {/* Input Field */}
                <TextInput
                    style={styles.input}
                    placeholder={t("feedback.placeholder", "Type....")}
                    placeholderTextColor="#A0AEC0"
                    multiline
                    value={text}
                    onChangeText={setText}
                    textAlignVertical="top"
                />

                {/* Action Buttons */}
                <View style={styles.btnRow}>
                    <TouchableOpacity style={styles.skipBtn}>
                        <Body1 style={{ color: '#4A5568' }}>{t("feedback.skip", "Skip")}</Body1>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.submitBtn}>
                        <Body1 style={{ color: '#FFF' }}>{t("feedback.submit", "Submit")}</Body1>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA"
    },
    innerContent: {
        padding: 20,
        alignItems: 'center'
    },
    starContainer: {
        flexDirection: 'row',
        gap: 12,
        marginVertical: 40
    },
    label: {
        marginBottom: 20,
        color: '#4A5568',
        textAlign: 'center'
    },
    input: {
        width: '100%',
        height: 160,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        padding: 15,
        backgroundColor: '#FFF',
        fontSize: 14,
        color: '#2D3748'
    },
    btnRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 40,
        gap: 15
    },
    skipBtn: {
        flex: 1,
        height: 52,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtn: {
        flex: 1,
        height: 52,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
