import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!username.trim() || !password) {
            Alert.alert('Validation Error', 'Please enter username and password');
            return;
        }

        setLoading(true);
        const success = await login(username.trim(), password);
        setLoading(false);

        if (success) {
            router.replace('/(tabs)');
        } else {
            Alert.alert('Login failed', 'Please check your credentials.');
        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-white px-4">
            <View className="w-full max-w-md bg-gray-100 rounded-2xl p-6 shadow-md">
                <View className="items-center mb-4">
                    <Text className="text-2xl font-bold text-green-700">🌱 VrukshaVerse</Text>
                    <Text className="text-gray-600">Login to explore plants</Text>
                </View>

                <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 mb-4 bg-white"
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />

                <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 mb-4 bg-white"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    onPress={handleLogin}
                    className={`rounded-lg px-4 py-3 ${loading ? 'bg-green-400' : 'bg-green-600'}`}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white text-center font-semibold">Login</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}
