import { useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import SearchBar from '@/components/SearchBar';
import { plants } from '@/data';
import { useRouter } from 'expo-router';

export default function ExploreScreen() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const filtered = plants.filter((plant) =>
    plant.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#FAFAF6', paddingHorizontal: 16, paddingTop: 24 }}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search medicinal plants..."
        style={{
          marginTop: 15,
        }}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/plant/${item.id}`)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 16,
              marginBottom: 16,
              padding: 16,
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 3,
            }}
          >
            <Image
              source={item.image}
              style={{ width: 64, height: 64, borderRadius: 12, marginRight: 16 }}
              resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#2F855A' }}>{item.name}</Text>
              <Text style={{ fontSize: 14, color: '#4A5568', marginTop: 4, fontStyle: 'italic' }}>
                {item.scientificName}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
