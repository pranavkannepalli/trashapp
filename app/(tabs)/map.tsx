import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, FlatList, ScrollView } from 'react-native';
import { GarbageLocation } from '../../types/GarbageLocation';

interface Props {
    location: GarbageLocation;
}

export const garbageLocations: GarbageLocation[] = [
    {
        id: 'waste-management-spokane',
        name: 'Waste Management - Spokane',
        address: '2902 S Geiger Blvd, Spokane, WA 99224',
        coordinates: {
            lat: 47.6229,
            lng: -117.4937
        },
        hours: 'Mon-Fri: 7:30AM-5:00PM',
        acceptedItems: ['Household Waste', 'Recycling', 'Yard Waste', 'Electronics'],
        phone: '(509) 482-7565',
        website: 'https://www.wm.com',
        description: 'Full-service waste management facility handling residential and commercial waste.'
    },
    {
        id: 'north-county-transfer-station',
        name: 'North County Transfer Station',
        address: 'N 22123 Elk-Chattaroy Rd, Colbert, WA 99005',
        coordinates: {
            lat: 47.8384,
            lng: -117.4041
        },
        hours: 'Daily: 8:30AM-4:00PM',
        acceptedItems: ['Household Waste', 'Recycling', 'Yard Waste', 'Construction Debris'],
        phone: '(509) 477-6800',
        description: 'County transfer station serving the northern Spokane area.'
    },
    {
        id: 'valley-recycling-center',
        name: 'Valley Recycling Center',
        address: '11925 E Mansfield Ave, Spokane Valley, WA 99206',
        coordinates: {
            lat: 47.6573,
            lng: -117.2544
        },
        hours: 'Mon-Sat: 8:00AM-4:30PM',
        acceptedItems: ['Recycling', 'Scrap Metal', 'Electronics', 'Batteries'],
        phone: '(509) 924-5678',
        website: 'https://valleyrecycling.com',
        description: 'Specialized recycling facility focusing on electronics and metal recycling.'
    },
    {
        id: 'sunshine-disposal',
        name: 'Sunshine Disposal & Recycling',
        address: '2405 N University Rd, Spokane Valley, WA 99206',
        coordinates: {
            lat: 47.7012,
            lng: -117.2828
        },
        hours: 'Mon-Fri: 7:00AM-5:00PM, Sat: 8:00AM-4:00PM',
        acceptedItems: ['Household Waste', 'Recycling', 'Yard Waste', 'Hazardous Waste'],
        phone: '(509) 924-5678',
        website: 'https://sunshinedisposal.com',
        description: 'Full-service disposal facility offering comprehensive waste management solutions.'
    },
    {
        id: 'south-transfer-station',
        name: 'South Transfer Station',
        address: '3941 S Geiger Blvd, Spokane, WA 99224',
        coordinates: {
            lat: 47.6198,
            lng: -117.5123
        },
        hours: 'Daily: 7:00AM-5:00PM',
        acceptedItems: ['Household Waste', 'Recycling', 'Yard Waste', 'Construction Debris'],
        phone: '(509) 477-6800',
        description: 'County transfer station serving the southern Spokane area.'
    },
    {
        id: 'spokane-valley-transfer',
        name: 'Spokane Valley Transfer Station',
        address: '3941 N Sullivan Rd, Spokane Valley, WA 99216',
        coordinates: {
            lat: 47.6891,
            lng: -117.1957
        },
        hours: 'Mon-Sat: 7:30AM-4:00PM',
        acceptedItems: ['Household Waste', 'Recycling', 'Yard Waste', 'Appliances'],
        phone: '(509) 477-6800',
        description: 'Modern transfer station serving the Spokane Valley area.'
    },
    {
        id: 'green-solutions',
        name: 'Green Solutions Environmental',
        address: '18125 E Euclid Ave, Spokane Valley, WA 99216',
        coordinates: {
            lat: 47.7156,
            lng: -117.1672
        },
        hours: 'Mon-Fri: 8:00AM-4:30PM',
        acceptedItems: ['Yard Waste', 'Composting', 'Clean Wood', 'Food Waste'],
        phone: '(509) 534-1638',
        website: 'https://greensolutionsspokane.com',
        description: 'Specialized facility focusing on organic waste processing and composting.'
    }
];

export const GarbageLocationCard: React.FC<Props> = ({ location }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{location.name}</Text>
            <Text style={styles.address}>{location.address}</Text>
            <Text style={styles.hours}>{location.hours}</Text>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Accepted Items:</Text>
                <View style={styles.list}>
                    {location.acceptedItems.map((item) => (
                        <Text key={item} style={styles.listItem}>• {item}</Text>
                    ))}
                </View>
            </View>

            <Text style={styles.description}>{location.description}</Text>
        </View>
    );
};

const MapPage: React.FC = () => {
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

    const renderLocation = ({ item }: { item: GarbageLocation }) => (
        <GarbageLocationCard location={item} />
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>
                Spokane Garbage Collection Locations
            </Text>

            <Pressable
                style={styles.accordion}
                onPress={() => setIsHistoryExpanded(!isHistoryExpanded)}
            >
                <Text style={styles.accordionTitle}>Recently Viewed Locations</Text>
                <Text style={styles.expandIcon}>{isHistoryExpanded ? '▼' : '▶'}</Text>
            </Pressable>

            {isHistoryExpanded && selectedLocation && (
                <View style={styles.accordionContent}>
                    <GarbageLocationCard
                        location={garbageLocations.find(loc => loc.id === selectedLocation)!}
                    />
                </View>
            )}

            <FlatList
                data={garbageLocations}
                renderItem={renderLocation}
                keyExtractor={(item) => item.id}
                style={styles.cardList}
                scrollEnabled={false}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    address: {
        fontSize: 16,
        marginBottom: 4,
    },
    hours: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 12,
    },
    section: {
        marginVertical: 8,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    list: {
        marginLeft: 8,
    },
    listItem: {
        fontSize: 14,
        marginBottom: 2,
        color: '#333333',
    },
    link: {
        fontSize: 14,
        color: '#0066cc',
        marginVertical: 4,
    },
    description: {
        fontSize: 14,
        color: '#444444',
        marginTop: 8,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    mapContainer: {
        height: 400,
        backgroundColor: '#e0e0e0', // Placeholder color
        marginBottom: 16,
        borderRadius: 8,
    },
    accordion: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    accordionTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    expandIcon: {
        fontSize: 12,
    },
    accordionContent: {
        marginBottom: 16,
    },
    cardList: {
        marginTop: 16,
    },
});

export default MapPage;