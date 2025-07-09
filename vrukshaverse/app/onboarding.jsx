import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    key: "1",
    title: "Welcome to VrukshaVerse",
    description:
      "Explore the world of medicinal plants and their healing powers with our comprehensive herbal guide. " +
      "Begin your journey into the vibrant ecosystem of nature’s pharmacy, right from your device. ",
    image: require("@/assets/images/tulsi.jpg"),
  },
  {
    key: "2",
    title: "Learn & Discover",
    description:
      "Access detailed knowledge about herbs, their uses, benefits, and cultivation methods from experts." +
      "Dive into plant profiles, seasonal tips, and cultivation guides tailored for home and garden. " +
      "Every tap brings you closer to mastering the power of nature’s remedies.",
    image: require("@/assets/images/neem.jpg"),
  },
  {
    key: "3",
    title: "Grow with Nature",
    description:
      "Build your virtual herbal garden and deepen your connection with nature through interactive experiences.",
    image: require("@/assets/images/aloe-vera.jpg"),
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex === slides.length - 1) {
      return; // Stay on the last slide to show auth options
    } else {
      Haptics.selectionAsync();
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const handleAuth = (type) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (type === 'login') {
      router.replace("/(auth)/login");
    } else {
      router.replace("/(auth)/signup");
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderAuthButtons = () => (
    <View style={{ width: '100%', paddingHorizontal: 24 }}>
      <TouchableOpacity
        onPress={() => handleAuth('signup')}
        style={{
          backgroundColor: "#2F855A",
          paddingVertical: 16,
          paddingHorizontal: 40,
          borderRadius: 30,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 5,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleAuth('login')}
        style={{
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: "#2F855A",
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: 30,
        }}
      >
        <Text
          style={{
            color: "#2F855A",
            fontWeight: "600",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={["#F0FDF4", "#DCFCE7", "#BBF7D0"]}
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
              alignItems: "center",
              marginTop: 26,
              paddingHorizontal: 24,
            }}
          >
            <View
              style={{
                width: width * 0.85,
                height: height * 0.4,
                borderRadius: 20,
                overflow: 'hidden',
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 8,
                backgroundColor: 'white',
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 20,
                }}
                resizeMode="cover"
              />
            </View>

            <Text
              style={{
                fontSize: 28,
                fontWeight: "800",
                color: "#1F2937",
                textAlign: "center",
                marginTop: 32,
                lineHeight: 34,
              }}
            >
              {item.title}
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: "#4B5563",
                textAlign: "center",
                marginTop: 16,
                lineHeight: 24,
                maxWidth: width * 0.85,
                letterSpacing: 0.5,
              }}
            >
              {item.description}
            </Text>
          </View>
        )}
      />

      <View
        style={{
          position: "absolute",
          bottom: 40,
          width: "100%",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
      >
        {/* Dots */}
        <View style={{ flexDirection: "row", marginBottom: 32 }}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={{
                height: 8,
                marginHorizontal: 6,
                borderRadius: 4,
                width: currentIndex === index ? 32 : 8,
                backgroundColor: currentIndex === index ? "#16A34A" : "#86EFAC",
                opacity: currentIndex === index ? 1 : 0.5,
              }}
            />
          ))}
        </View>

        {/* Auth Buttons or Next Button */}
        {currentIndex === slides.length - 1 ? (
          renderAuthButtons()
        ) : (
          <TouchableOpacity
            onPress={handleNext}
            style={{
              backgroundColor: "#16A34A",
              paddingVertical: 16,
              paddingHorizontal: 50,
              borderRadius: 30,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}