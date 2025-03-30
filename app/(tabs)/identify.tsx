import { useState, useRef } from 'react';
import {Button, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Image } from "expo-image";

export default function Identify() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const ref = useRef<CameraView>(null);
    const [uri, setUri] = useState<string | null>(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const takePicture = async () => {
        const picture = await ref.current?.takePictureAsync();
        // @ts-ignore
        setUri(picture?.uri);
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
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
                ref={ref}
                facing={facing}
                mode="picture"
            >
                <View>
                    <Pressable onPress={takePicture}>

                    </Pressable>
                </View>
            </CameraView>
        );
    };

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
