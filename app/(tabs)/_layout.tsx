import { IconSymbol } from '@/components/ui/IconSymbol';
import { Tabs } from 'expo-router';
import React from 'react';
import { MapPin } from 'phosphor-react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{ title: "Home", tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} /> }}
            />
            <Tabs.Screen
                name="identify"
                options={{ title: "Identify", tabBarIcon: ({ color }) => <IconSymbol size={28} name="camera.fill" color={color} /> }}
            />
            <Tabs.Screen
                name="map"
                options={{ title: "Map", tabBarIcon: ({ color }) => <MapPin size={28} color={color} weight="fill" /> }}
            />
        </Tabs>
    )
}