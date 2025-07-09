import { View, Text, Image, FlatList } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { plants } from '@/data';

export default function ProfileScreen() {
    const { user } = useAuth();

    const captured = [1, 3, 5];

    return (
        <View className="flex-1 bg-white px-4 pt-10">
            <Text className="text-2xl font-bold text-green-800 mb-2">{user?.username}</Text>
            <Text className="text-md text-gray-600 mb-6">XP: {user?.xp ?? 0}</Text>

            <Text className="text-lg font-semibold text-green-700 mb-3">Captured Plants:</Text>

            <FlatList
                data={plants.filter(p => captured.includes(p.id))}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View className="flex-row items-center mb-3">
                        <Image source={item.image} className="w-12 h-12 rounded-lg mr-3" />
                        <Text className="text-base text-gray-800">{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
}
