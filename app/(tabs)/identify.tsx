import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from "expo-image";
import { useRouter } from 'expo-router';
import { identifyGarbage, type GarbageResponseType, type GarbageIdentification } from "@/services/api";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { CubeFocus, Plant, Trash, Recycle } from "phosphor-react-native";
import { Item, useIdentified } from '../identifiedContext/identifiedContext';
import React from "react";

export const GarbageItem = ({ item, showCube = true, size = "md" }: {
    item: GarbageIdentification;
    showCube?: boolean;
    size?: "sm" | "md"
}) => {
    const [isHovered, setIsHovered] = useState(false);

    let boxColor = "";
    let textColor = "";
    let icon = null;
    switch (item.type) {
        case "Trash":
            boxColor = "#dddddd"
            textColor = "#686868"
            icon = <Trash size={15} color={textColor} style={styles.icon}/>
            break;
        case "Recycle":
            boxColor = "#cef0ff"
            textColor = "#577886"
            icon = <Recycle size={15} color={textColor} style={styles.icon}/>
            break;
        case "Compost":
            boxColor = "#d9f3cf";
            textColor = "#607857";
            icon = <Plant size={15} color={textColor} style={styles.icon}/>
            break
        default:
            console.log("Invalid color entered")
    }

    return (
        <Pressable
            onPressIn={() => setIsHovered(true)}
            onPressOut={() => setIsHovered(false)}
            style={[size == "md" ? styles.itemContainer : styles.itemContainerSmall, isHovered && styles.itemContainerHovered]}
        >
            {showCube && < CubeFocus size={24} />}
            <Text style={size == "md" ? styles.itemText : styles.itemTextSmall}>{item.object}</Text>
            <View style={[{ flex: 1 }]} />
            <View style={[styles.iconContainer, { backgroundColor: boxColor }]}>
                {icon}
                <Text style={[size == "md" ? styles.iconText : styles.iconTextSmall, { color: textColor }]}>{item.type}</Text>
            </View>
        </Pressable>
    );
};


// PictureViewComponent
interface PictureViewComponentProps {
    sheetRef: React.Ref<BottomSheet>;
    garbage: GarbageResponseType;
    base64: string;
    setGarbage: (garbage: GarbageResponseType) => void;
    setBase64: (base64: string | null) => void;
}


const PictureViewComponent = ({ sheetRef, garbage, base64, setGarbage, setBase64 }: PictureViewComponentProps) => {
    const router = useRouter();
    const snapPoints = useMemo(() => ["35%", "50%", "90%"], []);

    const renderItem = ({ item }: { item: GarbageIdentification }) => <GarbageItem item={item} />;

    return (
        <View style={styles.camera}>
            <Image source={{ uri: base64 }} style={styles.image} />
            <View style={{ flex: 1, pointerEvents: "box-none" }}>
                <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => {
                        setGarbage(null);
                        setBase64(null);
                        router.back();
                    }}
                >
                    <Text style={styles.closeBtnText}>X</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Identify</Text>

            </View>
            {!garbage && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            )}
            {garbage && (
                <GestureHandlerRootView style={styles.container}>
                    <BottomSheet
                        ref={sheetRef}
                        snapPoints={snapPoints}
                        enableDynamicSizing={false}
                        animateOnMount={true}
                    >
                        <Text style={styles.sheetHeaderText}>Recognized Items</Text>
                        <BottomSheetFlatList
                            data={garbage.data}
                            keyExtractor={(i) => i.index}
                            renderItem={renderItem}
                            contentContainerStyle={styles.contentContainer}
                        />
                    </BottomSheet>
                </GestureHandlerRootView>
            )}
        </View>
    );
}


interface CameraViewComponentProps {
    cameraViewRef: React.Ref<CameraView>;
    takePicture: () => Promise<void>;
}


const CameraViewComponent = ({ cameraViewRef, takePicture }: CameraViewComponentProps) => {
    const router = useRouter();

    return (
        <CameraView
            style={styles.camera}
            ref={cameraViewRef}
            facing="back"
            autofocus="on"
            flash="auto"
        >
            <View>
                <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => router.back()}
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
}


export default function Identify() {
    const { addItems } = useIdentified();
    const [permission, requestPermission] = useCameraPermissions();
    const [base64, setBase64] = useState<string | null>(null);
    const [garbage, setGarbage] = useState<GarbageResponseType>(null);

    const cameraViewRef = useRef<CameraView>(null);
    const sheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        const fetchGarbageData = async () => {
            if (base64 && !garbage) {
                const response = await identifyGarbage(base64!);
                setGarbage(response);
                if (response) addItems(response.data as Item[]);
            }
        };
        fetchGarbageData();
    }, [base64]);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>We need your permission to show the camera</Text>
                <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                    <Text style={styles.permissionButtonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }


    const takePicture = async () => {
        const picture = await cameraViewRef.current?.takePictureAsync({ base64: true });
        if (picture?.base64) {
            setBase64(`data:image/jpeg;base64,${picture.base64}`);
        }
    }


    return (
        <View style={styles.container}>
            {
                base64 ?
                    <PictureViewComponent sheetRef={sheetRef} garbage={garbage} base64={base64} setGarbage={setGarbage} setBase64={setBase64} /> :
                    <CameraViewComponent cameraViewRef={cameraViewRef} takePicture={takePicture} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#f8f8f8",
    },
    permissionText: {
        fontSize: 17,
        textAlign: 'center',
        marginBottom: 20,
        color: "#333",
        fontFamily: "Raleway_600SemiBold"
    },
    permissionButton: {
        backgroundColor: "black",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    permissionButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
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
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a semi-transparent background
    },
    contentContainer: {
        backgroundColor: "white",
    },
    itemContainer: {
        padding: 7,
        paddingLeft: 15,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    itemContainerSmall: {
        marginBottom: 5,
        padding: 0,
        paddingLeft: 0,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    itemContainerHovered: {
        backgroundColor: "#d3d3d3",
    },
    itemText: {
        marginLeft: 8,
        fontFamily: "Raleway_600SemiBold",
        fontSize: 20,
        marginTop: -4
    },
    itemTextSmall: {
        marginLeft: 0,
        fontFamily: "Raleway_600SemiBold",
        fontSize: 14,
    },
    sheetHeaderText: {
        left: 15,
        fontFamily: "Raleway_800ExtraBold",
        fontSize: 14,
        color: "gray",
        paddingBottom: 5
    },
    iconText: {
        fontFamily: "Raleway_700Bold",
        fontSize: 14,
        paddingRight: 10,
    },
    iconTextSmall: {
        fontFamily: "Raleway_700Bold",
        fontSize: 12,
        paddingRight: 8,
    },
    iconContainer: {
        borderRadius: 15,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 3,
        flexDirection: "row"
    },
    icon: {
        marginLeft: 10,
        marginRight: 5
    }
});