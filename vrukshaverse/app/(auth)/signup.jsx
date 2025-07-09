import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();

    const handleSignup = async () => {
        if (!username || !email || !password || !confirm) {
            Alert.alert('Validation Error', 'Please fill all fields');
            return;
        }

        if (password !== confirm) {
            Alert.alert('Password Mismatch', 'Passwords do not match');
            return;
        }

        setLoading(true);
        const success = await signup({ username, email, password });
        setLoading(false);

        if (success) {
            router.replace('/(tabs)');
        } else {
            Alert.alert('Signup Failed', 'Something went wrong. Please try again.');
        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-white px-4">
            <View className="w-full max-w-md bg-gray-100 rounded-2xl p-6 shadow-md">
                <View className="items-center mb-4">
                    <Text className="text-2xl font-bold text-green-700">🌱 VrukshaVerse</Text>
                    <Text className="text-gray-600">Create an account to begin your journey</Text>
                </View>

                <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 mb-3 bg-white"
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />

                <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 mb-3 bg-white"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 mb-3 bg-white"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 mb-4 bg-white"
                    placeholder="Confirm Password"
                    value={confirm}
                    onChangeText={setConfirm}
                    secureTextEntry
                />

                <TouchableOpacity
                    onPress={handleSignup}
                    className={`rounded-lg px-4 py-3 ${loading ? 'bg-green-400' : 'bg-green-600'}`}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white text-center font-semibold">Sign Up</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.replace('/(auth)/login')} className="mt-4">
                    <Text className="text-center text-green-700 underline">Already have an account? Log in</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
