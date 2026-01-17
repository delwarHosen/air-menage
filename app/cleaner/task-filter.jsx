import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Button from '../../components/Filter/Button';
import CheckBox from '../../components/Filter/CheckBox';
import Counter from '../../components/Filter/Counter';
import CustomSlider from '../../components/Filter/CustomSlider';
import { Body2, H4, H5 } from '../../components/typo/typography';


export default function TaskFilter() {
    const router = useRouter();

    const [equipmentProvided, setEquipmentProvided] = useState({
        vacuumCleaner: false,
        cleaningProducts: false
    });

    const [workRadius, setWorkRadius] = useState(15);

    const [linenServices, setLinenServices] = useState({
        bedLinen: false,
        towel: false,
        laundry: false
    });

    const [propertyDetails, setPropertyDetails] = useState({
        bedrooms: 1,
        beds: 1,
        bathroom: 1
    });

    const [priceRange, setPriceRange] = useState([0, 200]);

    const handlePropertyChange = (field, value) => {
        setPropertyDetails(prev => ({
            ...prev,
            [field]: Math.max(0, Math.min(10, value))
        }));
    };

    const handleApplyFilters = () => {
        const filters = {
            equipmentProvided,
            workRadius,
            linenServices,
            propertyDetails,
            priceRange
        };
        console.log('Applied Filters:', filters);
        router.back();
    };

    const handleReset = () => {
        setEquipmentProvided({ vacuumCleaner: false, cleaningProducts: false });
        setWorkRadius(15);
        setLinenServices({ bedLinen: false, towel: false, laundry: false });
        setPropertyDetails({ bedrooms: 1, beds: 1, bathroom: 1 });
        setPriceRange([0, 200]);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <H4 style={styles.headerTitle}>Filters</H4>

                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
            </View>


            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {/* Equipment Provided Section */}
                <View style={styles.section}>
                    <H5 style={styles.sectionTitle}>Equipment Provided</H5>
                    <CheckBox
                        label="Vacuum Cleaner Provide"
                        checked={equipmentProvided.vacuumCleaner}
                        onPress={() => setEquipmentProvided(prev => ({
                            ...prev,
                            vacuumCleaner: !prev.vacuumCleaner
                        }))}
                    />
                    <CheckBox
                        label="Cleaning Products Provided"
                        checked={equipmentProvided.cleaningProducts}
                        onPress={() => setEquipmentProvided(prev => ({
                            ...prev,
                            cleaningProducts: !prev.cleaningProducts
                        }))}
                    />
                </View>

                {/* Work Radius Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="location-outline" size={20} color="#000" />
                        <H5 style={styles.sectionTitleWithIcon}>Work Radius</H5>
                    </View>
                    <CustomSlider
                        value={workRadius}
                        onValueChange={setWorkRadius}
                        minimumValue={1}
                        maximumValue={30}
                        step={1}
                        unit="km"
                    />
                </View>

                {/* Linen Services Section */}
                <View style={styles.section}>
                    <H5 style={styles.sectionTitle}>Linen Services</H5>
                    <CheckBox
                        label="Bed Linen Change"
                        checked={linenServices.bedLinen}
                        onPress={() => setLinenServices(prev => ({
                            ...prev,
                            bedLinen: !prev.bedLinen
                        }))}
                    />
                    <CheckBox
                        label="Towel Change"
                        checked={linenServices.towel}
                        onPress={() => setLinenServices(prev => ({
                            ...prev,
                            towel: !prev.towel
                        }))}
                    />
                    <CheckBox
                        label="Laundry Service"
                        checked={linenServices.laundry}
                        onPress={() => setLinenServices(prev => ({
                            ...prev,
                            laundry: !prev.laundry
                        }))}
                    />
                </View>

                {/* Property Details Section */}
                <View style={styles.section}>
                    <H5 style={styles.sectionTitle}>Property Details</H5>

                    <Counter
                        label="Bedrooms"
                        value={propertyDetails.bedrooms}
                        onIncrement={() => handlePropertyChange('bedrooms', propertyDetails.bedrooms + 1)}
                        onDecrement={() => handlePropertyChange('bedrooms', propertyDetails.bedrooms - 1)}
                        showBorder
                    />

                    <Counter
                        label="Beds"
                        value={propertyDetails.beds}
                        onIncrement={() => handlePropertyChange('beds', propertyDetails.beds + 1)}
                        onDecrement={() => handlePropertyChange('beds', propertyDetails.beds - 1)}
                        showBorder
                    />

                    <Counter
                        label="Bathroom"
                        value={propertyDetails.bathroom}
                        onIncrement={() => handlePropertyChange('bathroom', propertyDetails.bathroom + 1)}
                        onDecrement={() => handlePropertyChange('bathroom', propertyDetails.bathroom - 1)}
                    />
                </View>

                {/* Price Range Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="pricetag-outline" size={20} color="#000" />
                        <H5 style={styles.sectionTitleWithIcon}>Price Range</H5>
                    </View>
                    <CustomSlider
                        value={priceRange[1]}
                        onValueChange={(val) => setPriceRange([priceRange[0], val])}
                        minimumValue={0}
                        maximumValue={200}
                        step={5}
                        unit="€"
                        showRange
                        rangeStart={priceRange[0]}
                        rangeEnd={priceRange[1]}
                    />
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Apply Filters"
                        onPress={handleApplyFilters}
                    />
                    <TouchableOpacity
                        style={styles.resetButton}
                        onPress={handleReset}
                    >
                        <Body2 style={styles.resetButtonText}>Reset All</Body2>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingHorizontal:"2%"
    },
    header: {
        position: "relative",
        paddingTop: 60,
        paddingBottom: 20,
        alignItems: "center",   
    },

    headerTitle: {
        textAlign: "center",
    },

    closeButton: {
        position: "absolute", 
        top: 15,
        right: 15,
        padding: 8,
    },

    placeholder: {
        width: 40,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        marginBottom: 16,
        color:"#323135"
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitleWithIcon: {
        marginLeft: 8,
    },
    buttonContainer: {
        marginBottom: 40,
    },
    resetButton: {
        marginTop: 12,
        paddingVertical: 12,
        alignItems: 'center',
    },
    resetButtonText: {
        color: '#6B7280',
    },
});
