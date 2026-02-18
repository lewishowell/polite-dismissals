import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
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

function getRandomMessage(level: PolitenessLevel, category: Category): string {
  const pool = messages[level][category];
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function App() {
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
    setCurrentMessage(getRandomMessage(level, category));
  }, [level, category]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
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
    </SafeAreaView>
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
    padding: 20,
    paddingTop: 48,
    paddingBottom: 40,
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
