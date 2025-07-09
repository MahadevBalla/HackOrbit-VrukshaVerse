import React from 'react';
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { plants } from '@/data';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function PlantDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const plant = plants.find((p) => p.id === Number(id));

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

            <Image
                source={plant.image}
                resizeMode="cover"
                style={{
                    width: width - 32,
                    height: 250,
                    borderRadius: 16,
                    marginBottom: 20,
                }}
            />

            <Text className="text-2xl font-bold text-green-800">{plant.name}</Text>
            <Text className="text-md italic text-green-600 mb-2">
                {plant.scientificName}
            </Text>

            <Text className="text-sm text-gray-500 mb-1">Region: {plant.region}</Text>

            <Text className="mt-4 text-base text-gray-700 leading-6">
                {plant.description}
            </Text>

            {/* <View className="mt-6 space-y-2">
                <Text className="text-sm text-gray-500">Audio: {plant.audioUrl}</Text>
                <Text className="text-sm text-gray-500">
                    3D Model: {plant.model_3d_url}
                </Text>
            </View> */}
        </ScrollView>
    );
}
