import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { plants } from "../../../data";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function PlantDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const plant = plants.find((p) => p.id === Number(id));

  const onViewType = (viewType: "3D" | "AR") => {
    // Try different routing approaches based on your file structure
    try {
      if (viewType === "3D") {
        // Option 1: If 3D.tsx is in the same directory
        router.push({
          pathname: "/plant/3D",
          params: { modelUrl: plant?.model3dUrl || "" },
        });
      } else {
        // Option 1: If AR.tsx is in the same directory
        router.push({
          pathname: "/plant/AR",
          params: { modelUrl: plant?.model3dUrl || "" },
        });
      }
    } catch (error) {
      // Fallback: Try with product prefix
      router.push({
        pathname: `/product/${viewType}`,
        params: { modelUrl: plant?.model3dUrl || "" },
      });
    }
  };

  if (!plant) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500 text-lg">Plant not found</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text className="text-blue-500">Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-10">
      {/* Header back button */}
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <Ionicons name="arrow-back" size={24} color="green" />
      </TouchableOpacity>

      {/* Image section - keeping your logic intact */}
      <Image
        source={
          typeof plant.image === "number" ? plant.image : { uri: plant.image }
        }
        resizeMode="cover"
        style={{
          width: width - 32,
          height: 250,
          borderRadius: 16,
          marginBottom: 20,
        }}
      />

      {/* Enhanced 3D/AR buttons section */}
      {plant.model3dUrl && (
        <View className="mb-6">
          <Text className="text-lg font-semibold text-green-800 mb-3">
            Interactive Views
          </Text>
          <View className="space-y-3">
            {["3D", "AR"].map((viewType) => (
              <TouchableOpacity
                key={viewType}
                onPress={() => onViewType(viewType as "3D" | "AR")}
                className="bg-green-100 border border-green-500 px-5 py-3 rounded-full flex-row items-center justify-center shadow-sm"
                activeOpacity={0.8}
              >
                <Ionicons
                  name={viewType === "3D" ? "cube-outline" : "camera-outline"}
                  size={20}
                  color="green"
                />
                <Text className="text-green-800 font-semibold ml-2">
                  {viewType === "3D" ? "View in 3D" : "View in AR"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Plant information section */}
      <View className="mb-6">
        <Text className="text-2xl font-bold text-green-800 mb-2">
          {plant.name}
        </Text>
        <Text className="text-md italic text-green-600 mb-3">
          {plant.scientificName}
        </Text>

        {/* Enhanced info cards */}
        <View className="bg-green-50 rounded-lg p-4 mb-4">
          <View className="flex-row items-center mb-2">
            <Ionicons name="location-outline" size={16} color="green" />
            <Text className="text-sm font-medium text-green-800 ml-2">
              Region
            </Text>
          </View>
          <Text className="text-sm text-gray-700 ml-6">{plant.region}</Text>
        </View>
      </View>

      {/* Description section */}
      <View className="mb-6">
        <Text className="text-lg font-semibold text-green-800 mb-3">About</Text>
        <Text className="text-base text-gray-700 leading-6 bg-gray-50 p-4 rounded-lg">
          {plant.description}
        </Text>
      </View>

      {/* Additional info section (if you want to add more features) */}
      {(plant.audioUrl || plant.model3dUrl) && (
        <View className="mb-6 bg-blue-50 rounded-lg p-4">
          <Text className="text-lg font-semibold text-blue-800 mb-3">
            Media Resources
          </Text>
          {plant.audioUrl && (
            <View className="flex-row items-center mb-2">
              <Ionicons name="volume-medium-outline" size={16} color="blue" />
              <Text className="text-sm text-blue-700 ml-2">
                Audio guide available
              </Text>
            </View>
          )}
          {plant.model3dUrl && (
            <View className="flex-row items-center">
              <Ionicons name="cube-outline" size={16} color="blue" />
              <Text className="text-sm text-blue-700 ml-2">
                3D model available
              </Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
