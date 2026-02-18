import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Category, CATEGORY_LABELS, LEVEL_COLORS, PolitenessLevel } from "../data/messages";

interface Props {
  category: Category;
  level: PolitenessLevel;
  onCategoryChange: (category: Category) => void;
}

const CATEGORIES: Category[] = ["general", "work", "text", "email", "social"];

const CATEGORY_ICONS: Record<Category, string> = {
  general: "💬",
  work: "💼",
  text: "📱",
  email: "📧",
  social: "📢",
};

export default function CategoryPicker({ category, level, onCategoryChange }: Props) {
  const color = LEVEL_COLORS[level];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIES.map((cat) => {
          const isActive = cat === category;
          return (
            <TouchableOpacity
              key={cat}
              style={[
                styles.chip,
                isActive && { backgroundColor: color + "30", borderColor: color },
              ]}
              onPress={() => onCategoryChange(cat)}
              activeOpacity={0.7}
            >
              <Text style={styles.chipIcon}>{CATEGORY_ICONS[cat]}</Text>
              <Text
                style={[
                  styles.chipLabel,
                  isActive && { color },
                ]}
              >
                {CATEGORY_LABELS[cat]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  scrollContent: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 4,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: "#1a1a2e",
    borderWidth: 1,
    borderColor: "#2a2a3e",
    gap: 6,
  },
  chipIcon: {
    fontSize: 14,
  },
  chipLabel: {
    color: "#888",
    fontSize: 13,
    fontWeight: "600",
  },
});
