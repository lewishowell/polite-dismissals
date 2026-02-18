import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { useIOSPWA } from "./src/useIOSPWA";
import PolitenessSlider from "./src/components/PolitenessSlider";
import MessageCard from "./src/components/MessageCard";
import CopyButton from "./src/components/CopyButton";
import CategoryPicker from "./src/components/CategoryPicker";
import {
  PolitenessLevel,
  Category,
  messages,
  LEVEL_COLORS,
} from "./src/data/messages";

function getRandomMessage(
  level: PolitenessLevel,
  category: Category,
  exclude?: string
): string {
  const pool = messages[level][category];
  if (pool.length <= 1) return pool[0];
  let pick: string;
  do {
    pick = pool[Math.floor(Math.random() * pool.length)];
  } while (pick === exclude);
  return pick;
}

function AppContent() {
  useIOSPWA();
  const insets = useSafeAreaInsets();
  const [level, setLevel] = useState<PolitenessLevel>(3);
  const [category, setCategory] = useState<Category>("general");
  const [currentMessage, setCurrentMessage] = useState(() =>
    getRandomMessage(3, "general")
  );

  const handleLevelChange = useCallback(
    (newLevel: PolitenessLevel) => {
      setLevel(newLevel);
      setCurrentMessage(getRandomMessage(newLevel, category));
    },
    [category]
  );

  const handleCategoryChange = useCallback(
    (newCategory: Category) => {
      setCategory(newCategory);
      setCurrentMessage(getRandomMessage(level, newCategory));
    },
    [level]
  );

  const handleShuffle = useCallback(() => {
    setCurrentMessage((prev) => getRandomMessage(level, category, prev));
  }, [level, category]);

  return (
    <View style={styles.safe}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top, 20) + 28,
            paddingBottom: Math.max(insets.bottom, 20) + 20,
            paddingLeft: Math.max(insets.left, 20),
            paddingRight: Math.max(insets.right, 20),
          },
        ]}
        style={styles.scroll}
      >
        <View style={styles.header}>
          <Text style={styles.appName}>Dennis's Polite Dismissals</Text>
          <Text style={styles.tagline}>
            Say "go away" with{" "}
            <Text style={{ color: LEVEL_COLORS[level] }}>style</Text>
          </Text>
        </View>

        <PolitenessSlider level={level} onLevelChange={handleLevelChange} />

        <CategoryPicker
          category={category}
          level={level}
          onCategoryChange={handleCategoryChange}
        />

        <MessageCard
          message={currentMessage}
          level={level}
          onShuffle={handleShuffle}
        />

        <CopyButton message={currentMessage} level={level} />
      </ScrollView>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0d0d1a",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    gap: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 8,
  },
  appName: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  tagline: {
    color: "#666",
    fontSize: 14,
    marginTop: 4,
  },
});
