import React from "react";
import {
    Camera,
    DefaultLight,
    FilamentScene,
    FilamentView,
    Model,
    useCameraManipulator,
} from "react-native-filament";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Dimensions, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useSharedValue } from "react-native-worklets-core";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";

function getModelAssetPath(fileName: string): string {
    const modelMap: Record<string, number> = {
        "neem_plant.glb": require("../../assets/models/neem_plant.glb"),
        "aloe_vera_plant.glb": require("../../assets/models/aloe_vera_plant.glb"),
        // Add more model names here
    };

    const requiredModule = modelMap[fileName];
    if (!requiredModule) {
        console.warn(`Model "${fileName}" not found in modelMap`);
        return "";
    }

    console.log(Asset.fromModule(require("@/assets/models/neem_plant.glb")).uri);

    return Asset.fromModule(requiredModule).uri;
}

function Scene({ modelUrl }: { modelUrl: string }) {
    const cameraManipulator = useCameraManipulator({
        orbitHomePosition: [0, 0, 8],
        targetPosition: [0, 0, 0],
        orbitSpeed: [0.003, 0.003],
    });

    const viewHeight = Dimensions.get("window").height;

    // Pan gesture
    const panGesture = Gesture.Pan()
        .onBegin((event) => {
            const yCorrected = viewHeight - event.translationY;
            cameraManipulator?.grabBegin(event.translationX, yCorrected, false);
        })
        .onUpdate((event) => {
            const yCorrected = viewHeight - event.translationY;
            cameraManipulator?.grabUpdate(event.translationX, yCorrected);
        })
        .maxPointers(1)
        .onEnd(() => {
            cameraManipulator?.grabEnd();
        });

    // Pinch gesture
    const previousScale = useSharedValue(1);
    const scaleMultiplier = 100;
    const pinchGesture = Gesture.Pinch()
        .onBegin(({ scale }) => {
            previousScale.value = scale;
        })
        .onUpdate(({ scale, focalX, focalY }) => {
            const delta = scale - previousScale.value;
            cameraManipulator?.scroll(focalX, focalY, -delta * scaleMultiplier);
            previousScale.value = scale;
        });

    const combinedGesture = Gesture.Race(pinchGesture, panGesture);

    return (
        <GestureDetector gesture={combinedGesture}>
            <FilamentView>
                <Camera cameraManipulator={cameraManipulator} />
                <DefaultLight />
                <Model source={{ uri: modelUrl }} transformToUnitCube />
            </FilamentView>
        </GestureDetector>
    );
}

export default function Plant3DScreen() {
    const { modelUrl } = useLocalSearchParams<{ modelUrl: string }>();

    const resolvedUri = modelUrl ? getModelAssetPath(modelUrl) : "";

    return (
        <FilamentScene>
            {/* Custom Floating Back Button */}
            <TouchableOpacity
                onPress={router.back}
                style={styles.backButton}
                activeOpacity={0.7}
            >
                <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>

            {/* 3D Model Scene */}
            {resolvedUri ? (
                <Scene modelUrl={resolvedUri} />
            ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>Model not found</Text>
                </View>
            )}
        </FilamentScene>
    );
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 30,
        padding: 8,
    },
});
