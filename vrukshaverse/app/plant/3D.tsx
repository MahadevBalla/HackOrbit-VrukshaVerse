import React, { useCallback, useEffect, useState } from "react";
import {
  Camera,
  DefaultLight,
  FilamentScene,
  FilamentView,
  Model,
  useCameraManipulator,
} from "react-native-filament";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSharedValue } from "react-native-worklets-core";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Asset } from "expo-asset";
import { runOnJS } from "react-native-reanimated";

import neemPlantModel from "../../assets/models/neem_plant.glb";
import aloeVeraPlantModel from "../../assets/models/aloe_vera_plant.glb";
import amlaModel from "../../assets/models/amla.glb";
import brahmiModel from "../../assets/models/brahmi.glb";
import ashwagandhaModel from "../../assets/models/ashwagandha.glb";

function getFileName(path: string) {
  if (!path) return "";
  const parts = path.split("/");
  return parts[parts.length - 1];
}

async function getModelUri(modelModule: any): Promise<string> {
  try {
    const asset = Asset.fromModule(modelModule);
    if (!asset.localUri) {
      await asset.downloadAsync();
    }
    return asset.localUri || asset.uri;
  } catch (e) {
    console.error("Error loading model asset:", e);
    return "";
  }
}

function Scene({ modelUrl }: { modelUrl: string }) {
  const cameraManipulator = useCameraManipulator({
    orbitHomePosition: [0, 0, 8], // Camera location
    targetPosition: [0, 0, 0], // Looking at
    orbitSpeed: [0.003, 0.003],
  });

  const grabBegin = useCallback((x: number, y: number) => {
    cameraManipulator?.grabBegin(x, y, false);
  }, [cameraManipulator]);

  const grabUpdate = useCallback((x: number, y: number) => {
    cameraManipulator?.grabUpdate(x, y);
  }, [cameraManipulator]);

  const grabEnd = useCallback(() => {
    cameraManipulator?.grabEnd();
  }, [cameraManipulator]);

  const scroll = useCallback((x: number, y: number, delta: number) => {
    cameraManipulator?.scroll(x, y, delta);
  }, [cameraManipulator]);


  // Pan gesture
  const viewHeight = Dimensions.get("window").height;
  const panGesture = Gesture.Pan()
    .onBegin((event) => {
      'worklet';
      const yCorrected = viewHeight - event.translationY;
      runOnJS(grabBegin)(event.translationX, yCorrected);
    })
    .onUpdate((event) => {
      'worklet';
      const yCorrected = viewHeight - event.translationY;
      runOnJS(grabUpdate)(event.translationX, yCorrected);
    })
    .maxPointers(1)
    .onEnd(() => {
      'worklet';
      runOnJS(grabEnd)();
    });

  // Scale gesture
  const previousScale = useSharedValue(1);
  const scaleMultiplier = 100;
  const pinchGesture = Gesture.Pinch()
    .onBegin(({ scale }) => {
      'worklet';
      previousScale.value = scale;
    })
    .onUpdate(({ scale, focalX, focalY }) => {
      'worklet';
      const delta = scale - previousScale.value;
      runOnJS(scroll)(focalX, focalY, -delta * scaleMultiplier);
      previousScale.value = scale;
    });
  const combinedGesture = Gesture.Race(pinchGesture, panGesture);

  return (
    <GestureDetector gesture={combinedGesture}>
      <FilamentView style={{ flex: 1 }}>
        <Camera cameraManipulator={cameraManipulator} />
        <DefaultLight />
        <Model source={{ uri: modelUrl }} transformToUnitCube />
      </FilamentView>
    </GestureDetector>
  );
}

export default function Plant3DScreen() {
  const { modelUrl } = useLocalSearchParams<{ modelUrl: string }>();
  const [resolvedModelUri, setResolvedModelUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Map filenames to static imports
  const modelMap: Record<string, any> = {
    "neem_plant.glb": neemPlantModel,
    "aloe_vera_plant.glb": aloeVeraPlantModel,
    "brahmi.glb": brahmiModel,
    "amla.glb": amlaModel,
    "ashwagandha.glb": ashwagandhaModel
  };

  useEffect(() => {
    async function resolveUri() {
      if (!modelUrl) {
        setResolvedModelUri(null);
        setLoading(false);
        return;
      }
      const filename = getFileName(modelUrl);
      if (!filename || !modelMap[filename]) {
        setResolvedModelUri(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      const uri = await getModelUri(modelMap[filename]);
      setResolvedModelUri(uri);
      setLoading(false);
    }
    resolveUri();
  }, [modelUrl]);

  if (!modelUrl) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No model specified</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 16 }}>Loading model...</Text>
      </View>
    );
  }

  if (!resolvedModelUri) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          Model &quot;{getFileName(modelUrl)}&quot; not found
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      <FilamentScene style={{ flex: 1 }}>
        <Scene modelUrl={resolvedModelUri} />
      </FilamentScene>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 30,
    padding: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
});
