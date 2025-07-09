import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, SplashScreen } from "expo-router";
import { AppState } from "react-native";

SplashScreen.preventAutoHideAsync();

interface User {
    id: number;
    username: string;
    xp: number;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: async () => false,
    logout: async () => { },
    isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

const AUTH_API_BASE_URL = 'http://localhost:5000/api/auth';

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadStoredAuth();
    }, []);

    const loadStoredAuth = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('jwt_token');
            const storedUser = await AsyncStorage.getItem('user_data');

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));

                // Verify token is still valid
                // await verifyToken(storedToken);
            }
        } catch (error) {
            console.error('Error loading stored auth:', error);
        } finally {
            setIsLoading(false);
            setTimeout(() => SplashScreen.hideAsync(), 1000);
        }
    };

    const verifyToken = async (token: string) => {
        try {
            const response = await fetch(`${AUTH_API_BASE_URL}/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error('Token invalid');
            }

            const userData = await response.json();
            setUser(userData.user);
        } catch (error) {
            console.error('Token verification failed:', error);
            await logout();
        }
    };

    const login = async (username: string, password: string): Promise<boolean> => {
        try {

            // const response = await fetch(`${AUTH_API_BASE_URL}/login`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ username, password }),
            // });

            // if (!response.ok) {
            //     throw new Error('Login failed');
            // }

            // const data = await response.json();
            // const { token, user } = data;


            const token = 'fake-jwt-token-for-testing';
            const user = {
                id: 1,
                username: username,
                xp: 100,
            };

            // Store auth data
            await AsyncStorage.setItem('jwt_token', token);
            await AsyncStorage.setItem('user_data', JSON.stringify(user));

            setToken(token);
            setUser(user);

            router.replace('/(tabs)');
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('jwt_token');
            await AsyncStorage.removeItem('user_data');

            setToken(null);
            setUser(null);

            router.replace('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const value: AuthContextType = {
        user,
        token,
        login,
        logout,
        isLoading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};