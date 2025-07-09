import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { plants } from '../../data/index';

export default function ProfileScreen() {
    const { user, logout } = useAuth();

    const captured = [1, 3, 5];

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: async () => {
                    await logout();
                },
            },
        ]);
    };

    return (
        <View className="flex-1 bg-white px-6 pt-12">
            {/* User Info */}
            <View className="items-center mb-8">
                <View className="bg-green-200 rounded-full w-24 h-24 justify-center items-center mb-4 shadow-md">
                    <Text className="text-4xl font-bold text-green-800">
                        {user?.username.charAt(0).toUpperCase() || '?'}
                    </Text>
                </View>
                <Text className="text-3xl font-extrabold text-green-900">{user?.username}</Text>
                <Text className="text-md text-gray-600 mt-1">XP: {user?.xp ?? 0}</Text>
            </View>

            {/* Logout Button */}
            <TouchableOpacity
                onPress={handleLogout}
                className="bg-red-500 rounded-lg py-3 mb-6 shadow-md"
                activeOpacity={0.7}
            >
                <Text className="text-white text-center font-semibold text-lg">Logout</Text>
            </TouchableOpacity>

            {/* Captured Plants List */}
            <Text className="text-xl font-semibold text-green-700 mb-4">Captured Plants</Text>

            {captured.length === 0 ? (
                <Text className="text-gray-500 italic">No plants captured yet.</Text>
            ) : (
                <FlatList
                    data={plants.filter((p) => captured.includes(p.id))}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <View className="flex-row items-center mb-4 bg-green-50 rounded-xl p-3 shadow-sm">
                            <Image
                                source={item.image}
                                style={{ width: 56, height: 56, borderRadius: 12, marginRight: 16 }}
                                resizeMode="cover"
                            />
                            <View>
                                <Text className="text-lg font-semibold text-green-900">{item.name}</Text>
                                <Text className="text-sm text-green-700">{item.scientificName ?? ''}</Text>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
}
