import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

interface XPModalProps {
    visible: boolean;
    xpGained: number;
    onClose: () => void;
}

export default function XPModal({ visible, xpGained, onClose }: XPModalProps) {
    return (
        <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50 px-6">
                <View className="bg-white rounded-lg p-6 w-full max-w-md items-center">
                    <Text className="text-2xl font-bold text-green-700 mb-4">🎉 XP Gained!</Text>
                    <Text className="text-lg mb-6">{`You earned +${xpGained} XP.`}</Text>
                    <TouchableOpacity
                        onPress={onClose}
                        className="bg-green-700 rounded-lg px-6 py-3 w-full"
                    >
                        <Text className="text-white text-center font-semibold">Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
