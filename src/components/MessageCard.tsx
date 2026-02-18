import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LEVEL_COLORS, PolitenessLevel } from "../data/messages";

interface Props {
  message: string;
  level: PolitenessLevel;
  onShuffle: () => void;
}

export default function MessageCard({ message, level, onShuffle }: Props) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.spring(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [message]);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          borderColor: LEVEL_COLORS[level] + "40",
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity
        style={[styles.shuffleButton, { backgroundColor: LEVEL_COLORS[level] + "20" }]}
        onPress={onShuffle}
        activeOpacity={0.7}
      >
        <Text style={[styles.shuffleText, { color: LEVEL_COLORS[level] }]}>
          🔀 Another one
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    minHeight: 180,
    justifyContent: "space-between",
  },
  message: {
    color: "#e0e0e0",
    fontSize: 18,
    lineHeight: 28,
    flex: 1,
    marginBottom: 16,
  },
  shuffleButton: {
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  shuffleText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
