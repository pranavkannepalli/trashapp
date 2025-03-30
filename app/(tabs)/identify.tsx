import { useState, useRef } from 'react';
import {Button, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Image } from "expo-image";
import { useRouter } from 'expo-router';

export default function Identify() {
    const [permission, requestPermission] = useCameraPermissions();
    const ref = useRef<CameraView>(null);
    const [uri, setUri] = useState<string | null>(null);
    const router = useRouter();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const takePicture = async () => {
        const picture = await ref.current?.takePictureAsync();
        // @ts-ignore
        setUri(picture?.uri);
    }

    const pictureView = () => {
        return (
            <View>
                <Image
                    source={{ uri }}
                    contentFit="contain"
                    style={{ width: 300, aspectRatio: 1 }}
                />
                <Button onPress={() => setUri(null)} title="Take another picture" />
            </View>
        );
    };

    const cameraView = () => {
        return (
            <CameraView
                style={styles.camera}
                ref={ref}
                facing="back"
            >
                <View>
                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={() => router.replace("/")}
                    >
                        <Text style={styles.closeBtnText}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Identify</Text>
                </View>
                <View style={styles.shutterContainer}>
                    <Pressable onPress={takePicture}>
                        {({ pressed }) => (
                            <View
                                style={[
                                    styles.shutterBtn,
                                    {
                                        opacity: pressed ? 0.5 : 1,
                                    },
                                ]}
                            >
                            </View>
                        )}
                    </Pressable>
                </View>
            </CameraView>
        );
    };

    return (
        <View style={styles.container}>
            {uri ? pictureView() : cameraView()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
    },
    header: {
        fontFamily: "Outfit_700Bold",
        fontSize: 35,
        color: "white"
    },
    camera: {
        flex: 1,
        width: "100%",
    },
    shutterContainer: {
        position: "absolute",
        bottom: 50,
        left: 0,
        right: 0,
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 30,
    },
    shutterBtn: {
        backgroundColor: "transparent",
        borderWidth: 6,
        borderColor: "white",
        width: 80,
        height: 80,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    closeBtn: {
        position: "absolute",
        top: 55,
        left: 30,
        width: 40,
        height: 40,
        borderRadius: "50%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        alignItems: "center",
        justifyContent: "center",
    },
    closeBtnText: {
        color: "white",
        fontFamily: "Raleway_400Regular",
        fontSize: 25,
        top: -2
    }
});