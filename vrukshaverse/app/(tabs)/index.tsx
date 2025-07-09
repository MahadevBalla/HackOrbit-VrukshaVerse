import { View, Text } from 'react-native';

export default function TabsHome() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-green-700 mb-2">Welcome to 🌱 VrukshaVerse</Text>
      <Text className="text-gray-600 text-center px-6">
        Navigate using the tabs below to explore, capture, and track your plant journey!
      </Text>
    </View>
  );
}
