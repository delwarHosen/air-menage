import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Heading from '../../components/Heading/Heading';
import { Caption, H5 } from '../../components/typo/typography';

export default function ReportProblemScreen() {
    const [problemType, setProblemType] = useState('Damaged item');
    const [reason, setReason] = useState('');
    const [image, setImage] = useState(null);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Heading title="Report a problem"/>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Type of problem */}
                <H5 style={styles.label}>Type of problem</H5>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={problemType}
                        onChangeText={setProblemType}
                        placeholder="Enter problem type"
                        placeholderTextColor="#A0AEC0"
                    />
                </View>

                {/* Reason */}
                <H5 style={styles.label}>Reason</H5>
                <View style={[styles.inputContainer, styles.textareaContainer]}>
                    <TextInput
                        style={[styles.input, styles.textarea]}
                        value={reason}
                        onChangeText={setReason}
                        placeholder="Describe the reason..."
                        placeholderTextColor="#A0AEC0"
                        multiline
                        textAlignVertical="top"
                    />
                </View>

                {/* Add Photos */}
                <H5 style={styles.label}>Add Photos</H5>
                <TouchableOpacity style={styles.imageUpload}>
                    <Caption style={styles.imageText}>Image +</Caption>
                </TouchableOpacity>
            </ScrollView>

            {/* Send Request Button */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.sendBtn}>
                    <Caption style={styles.sendBtnText}>Send Request</Caption>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 15,
       
    },
    backBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backIcon: {
        fontSize: 24,
        color: '#2D3748'
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3748'
    },
    placeholder: {
        width: 40
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2D3748',
        marginBottom: 10,
        marginTop: 15
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        backgroundColor: '#FFF'
    },
    input: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        fontSize: 14,
        color: '#2D3748'
    },
    textareaContainer: {
        height: 120
    },
    textarea: {
        height: 120,
        textAlignVertical: 'top'
    },
    imageUpload: {
        width: 150,
        height: 100,
        borderWidth: 2,
        borderColor: '#E2E8F0',
        borderStyle: 'dashed',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        marginTop: 5
    },
    imageText: {
        fontSize: 14,
        color: '#A0AEC0'
    },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#F7FAFC'
    },
    sendBtn: {
        backgroundColor: '#33C1FF',
        height: 54,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendBtnText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF'
    }
});