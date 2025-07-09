import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    StatusBar,
    Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/context/AuthContext';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!username || !password) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            Alert.alert('Validation Error', 'Please fill all fields');
            return;
        }

        setLoading(true);
        const success = await login(username, password);
        setLoading(false);

        if (!success) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            Alert.use('Login Failed', 'Invalid credentials. Please try again.');
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
    };

    return (
        <LinearGradient
            colors={['#F0FDF4', '#DCFCE7', '#BBF7D0']}
            style={{ flex: 1, paddingTop: StatusBar.currentHeight || 40 }}
        >
            <StatusBar barStyle="dark-content" />

            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 24
            }}>
                <View style={{
                    width: width * 0.9,
                    maxWidth: 400,
                    backgroundColor: 'white',
                    borderRadius: 24,
                    padding: 32,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.1,
                    shadowRadius: 24,
                    elevation: 8,
                }}>
                    <View style={{ alignItems: 'center', marginBottom: 32 }}>
                        <Text style={{
                            fontSize: 32,
                            fontWeight: '800',
                            color: '#1F2937',
                            marginBottom: 8,
                        }}>
                            Welcome Back
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            color: '#6B7280',
                            textAlign: 'center',
                            lineHeight: 24,
                        }}>
                            Log In to continue your journey with VrukshaVerse
                        </Text>
                    </View>

                    <View style={{ marginBottom: 24 }}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: 8,
                        }}>
                            Username
                        </Text>
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: '#D1D5DB',
                                borderRadius: 12,
                                paddingHorizontal: 16,
                                paddingVertical: 14,
                                backgroundColor: '#F9FAFB',
                                fontSize: 16,
                                color: '#1F2937',
                            }}
                            placeholder="Enter your username"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>

                    <View style={{ marginBottom: 24 }}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: 8,
                        }}>
                            Password
                        </Text>
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: '#D1D5DB',
                                borderRadius: 12,
                                paddingHorizontal: 16,
                                paddingVertical: 14,
                                backgroundColor: '#F9FAFB',
                                fontSize: 16,
                                color: '#1F2937',
                            }}
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>

                    <TouchableOpacity
                        onPress={handleLogin}
                        disabled={loading}
                        style={{
                            backgroundColor: loading ? '#9CA3AF' : '#16A34A',
                            paddingVertical: 16,
                            borderRadius: 12,
                            marginBottom: 24,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" size="small" />
                        ) : (
                            <Text style={{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: 16,
                                fontWeight: '600',
                            }}>
                                Log In
                            </Text>
                        )}
                    </TouchableOpacity>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontSize: 14,
                            color: '#6B7280',
                        }}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                Haptics.selectionAsync();
                                router.replace('/(auth)/signup');
                            }}
                            style={{ marginLeft: 4 }}
                        >
                            <Text style={{
                                color: '#16A34A',
                                fontSize: 14,
                                fontWeight: '600',
                            }}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}