import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

const slides = [
    {
        key: '1',
        title: 'Welcome to VrukshaVerse',
        description: 'Explore the world of medicinal plants and their healing powers.',
        image: require('@/assets/images/tulsi.jpg'),
    },
    {
        key: '2',
        title: 'Learn & Discover',
        description: 'Access detailed knowledge about herbs, uses, and cultivation.',
        image: require('@/assets/images/neem.jpg'),
    },
    {
        key: '3',
        title: 'Grow with Nature',
        description: 'Build your virtual herbal garden and deepen your connection with nature.',
        image: require('@/assets/images/aloe-vera.jpg'),
    },
];

export default function Onboarding() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    const router = useRouter();

    const handleNext = () => {
        if (currentIndex === slides.length - 1) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.replace('/(auth)/login');
        } else {
            Haptics.selectionAsync();
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
        }
    };

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    return (
        <LinearGradient
            colors={['#DEF8E4', '#B3E59F']}
            style={{ flex: 1, paddingTop: 40 }}
        >
            <StatusBar barStyle="dark-content" />

            <FlatList
                ref={flatListRef}
                data={slides}
                keyExtractor={(item) => item.key}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                renderItem={({ item }) => (
                    <View
                        style={{
                            width,
                            height,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 24,
                        }}
                    >
                        <Image
                            source={item.image}
                            style={{ width: width * 0.8, height: height * 0.4 }}
                            resizeMode="contain"
                        />
                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: '700',
                                color: '#2F855A',
                                textAlign: 'center',
                                marginTop: 24,
                            }}
                        >
                            {item.title}
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                color: '#276749',
                                textAlign: 'center',
                                marginTop: 8,
                                lineHeight: 22,
                            }}
                        >
                            {item.description}
                        </Text>
                    </View>
                )}
            />

            <View
                style={{
                    position: 'absolute',
                    bottom: 40,
                    width: '100%',
                    alignItems: 'center',
                    paddingHorizontal: 24,
                }}
            >
                {/* Dots */}
                <View style={{ flexDirection: 'row', marginBottom: 24 }}>
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={{
                                height: 8,
                                marginHorizontal: 6,
                                borderRadius: 4,
                                width: currentIndex === index ? 20 : 8,
                                backgroundColor: currentIndex === index ? '#2F855A' : '#68D391',
                            }}
                        />
                    ))}
                </View>

                {/* Button */}
                <TouchableOpacity
                    onPress={handleNext}
                    style={{
                        backgroundColor: '#276749',
                        paddingVertical: 14,
                        paddingHorizontal: 40,
                        borderRadius: 30,
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: '600',
                            fontSize: 18,
                            textAlign: 'center',
                        }}
                    >
                        {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}
