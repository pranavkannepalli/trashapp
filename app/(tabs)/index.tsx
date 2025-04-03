import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useIdentified } from "../identifiedContext/identifiedContext";
import { Trash, Recycle, Plant } from "phosphor-react-native";
import { GarbageItem } from "./identify";

// Mock Data
const userData = {
    name: "Achintya",
    co2Saved: 56,
    itemsDiverted: 64,
    rank: 23,
    totalMembers: 5300,
    leaderboard: [
        { name: "Sarthak Lodha", weight: 68 },
        { name: "Zara Khan", weight: 61 },
        { name: "Achintya Agrawal", weight: 56 },
        { name: "Ava Patel", weight: 52 },
        { name: "Pranav Takrani", weight: 45 },
    ],
    events: [
        { title: "Beach Clean-up", location: "Owen Beach", date: "1/23", attendees: 34 },
        { title: "Donation Drive", location: "U-District", date: "2/10", attendees: 50 },
    ],
};

export default function Home() {
    const { items } = useIdentified();

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <Text style={styles.welcomeText}>Welcome, <Text style={styles.boldText}>{userData.name}</Text></Text>

            {/* Statistics */}
            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{userData.co2Saved} lbs</Text>
                    <Text style={styles.statLabel}>CO₂ equivalent saved</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{userData.itemsDiverted} items</Text>
                    <Text style={styles.statLabel}>Diverted from landfills</Text>
                </View>
            </View>

            {/* History */}
            <Text style={styles.sectionTitle}>History</Text>
            <View style={styles.leaderboardContainer}>
                <FlatList
                    data={items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <GarbageItem item={item} showCube={false} size="sm" />
                    )}
                />
            </View>

            {/* Leaderboard */}
            <Text style={styles.sectionTitle}>Leaderboard</Text>
            <View style={styles.leaderboardContainer}>
                <Text style={styles.rankText}>Rank #{userData.rank} | Top 1% of {userData.totalMembers} members</Text>
                <FlatList
                    data={userData.leaderboard}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.leaderboardItem}>
                            <Text style={styles.leaderboardName}>{item.name}</Text>
                            <Text style={styles.leaderboardWeight}>{item.weight} lbs</Text>
                        </View>
                    )}
                />
            </View>

            {/* Events Near You */}
            <Text style={styles.sectionTitle}>Events Near You</Text>
            <FlatList
                data={userData.events}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.eventCard}>
                        <View style={styles.eventInfo}>
                            <Text style={styles.eventTitle}>{item.title}</Text>
                            <Text style={styles.eventLocation}>{item.location}</Text>
                            <Text style={styles.eventDetails}>{item.date} • {item.attendees} ppl</Text>
                        </View>
                        <TouchableOpacity style={styles.rsvpButton}>
                            <Text style={styles.rsvpText}>RSVP</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        padding: 20,
    },
    welcomeText: {
        fontSize: 24,
        marginBottom: 10,
        color: "#333",
    },
    boldText: {
        fontWeight: "bold",
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    statCard: {
        backgroundColor: "#DFFFD8",
        padding: 15,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
        alignItems: "center",
    },
    statValue: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    statLabel: {
        fontSize: 12,
        color: "#666",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    leaderboardContainer: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    rankText: {
        fontSize: 14,
        marginBottom: 10,
        fontWeight: "bold",
        color: "#666",
    },
    leaderboardItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
    },
    leaderboardName: {
        fontSize: 16,
        color: "#333",
    },
    leaderboardWeight: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#666",
    },
    eventCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    eventInfo: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    eventLocation: {
        fontSize: 14,
        color: "#666",
    },
    eventDetails: {
        fontSize: 12,
        color: "#999",
    },
    rsvpButton: {
        backgroundColor: "black",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    rsvpText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
    },
    icon: {
        marginLeft: 10,
        marginRight: 5
    }
});
