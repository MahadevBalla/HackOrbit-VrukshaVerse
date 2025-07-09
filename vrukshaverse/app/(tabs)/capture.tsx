import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { plants } from '../../data/index';

export default function CaptureScreen() {
    const [captured, setCaptured] = useState<number[]>([]);

    const handleCapture = (id: number) => {
        if (captured.includes(id)) return;
        setCaptured([...captured, id]);
        Alert.alert('Captured!', 'You earned 50 XP 🌿');
    };

    return (
        <View className="flex-1 bg-white px-4 pt-10">
            <Text className="text-xl font-bold text-green-800 mb-4">Capture Plants</Text>
            <FlatList
                data={plants}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View className="flex-row items-center mb-4 bg-gray-100 rounded-xl p-3">
                        <Image source={item.image} className="w-16 h-16 rounded-lg mr-4" />
                        <View className="flex-1">
                            <Text className="text-lg font-semibold text-green-800">{item.name}</Text>
                            <Text className="text-sm text-gray-600">{item.region}</Text>
                        </View>
                        <TouchableOpacity
                            className={`px-4 py-2 rounded-lg ${captured.includes(item.id) ? 'bg-gray-400' : 'bg-green-600'}`}
                            disabled={captured.includes(item.id)}
                            onPress={() => handleCapture(item.id)}
                        >
                            <Text className="text-white">{captured.includes(item.id) ? 'Captured' : 'Capture'}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}
