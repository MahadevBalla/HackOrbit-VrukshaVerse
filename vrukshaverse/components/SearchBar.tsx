import React from 'react';
import { View, TextInput } from 'react-native';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    placeholderTextColor?: string;
    style?: any;
}

export default function SearchBar({
    value,
    onChangeText,
    placeholder = 'Search...',
    placeholderTextColor = '#7C8B7C',
    style
}: SearchBarProps) {
    return (
        <View
            style={[
                {
                    backgroundColor: '#F8FBF8',
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor: '#E5F3E5',
                    shadowColor: '#2F855A',
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 3,
                },
                style
            ]}
        >
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                style={{
                    fontSize: 16,
                    color: '#2F855A',
                    paddingVertical: 4,
                    fontWeight: '500',
                }}
                autoCorrect={false}
                autoCapitalize="none"
                clearButtonMode="while-editing"
            />
        </View>
    );
}
