import { ScrollView, View } from 'react-native';
import Heading from '../../components/Heading/Heading';

export default function PropertyOverview() {
    return (
        < >
            <ScrollView
                stickyHeaderIndices={[0]}
                contentContainerStyle={{ paddingBottom: 30 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{marginHorizontal:20}}>
                    <Heading title="Properties Overview" />
                </View>
            </ScrollView>
        </>
    );

}