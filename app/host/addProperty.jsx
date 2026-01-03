import { ScrollView } from 'react-native';
import AddCleaningProperty from '../../components/AddCleaningProperty/AddCleaningProperty';

export default function AddProperty() {
    return (
        <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
            <AddCleaningProperty />
        </ScrollView>
    );
}




