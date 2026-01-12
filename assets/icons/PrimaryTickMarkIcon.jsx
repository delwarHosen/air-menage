// icons/PrimaryTickMark/icon
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

export const PrimaryTickMarkIcon = ({ double = false }) => (
    <View style={{ flexDirection: 'row' }}>
        {double ? (
            <>
                <Ionicons name="checkmark" size={12} color="#22D3EE" style={{ marginRight: -6 }} />
                <Ionicons name="checkmark" size={12} color="#22D3EE" />
            </>
        ) : (
            <Ionicons name="checkmark" size={14} color="#22D3EE" />
        )}
    </View>
);