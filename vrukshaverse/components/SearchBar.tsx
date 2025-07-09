import React from 'react';
import { View, TextInput } from 'react-native';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

export default function SearchBar({ value, onChangeText, placeholder = 'Search...' }: SearchBarProps) {
    return (
        <View
            style={{
                backgroundColor: '#F0FDF4',
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 10,
                marginBottom: 12,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 3 },
                elevation: 4,
            }}
        >
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={{
                    fontSize: 16,
                    color: '#256D16',
                    paddingVertical: 4,
                }}
                autoCorrect={false}
                autoCapitalize="none"
                clearButtonMode="while-editing"
            />
        </View>
    );
}
