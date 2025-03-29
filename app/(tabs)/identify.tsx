import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Camera, CameraType, useCameraPermissions } from "expo-camera";

export default function Identify() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}