import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import {
  PolitenessLevel,
  LEVEL_LABELS,
  LEVEL_COLORS,
} from "../data/messages";

interface Props {
  level: PolitenessLevel;
  onLevelChange: (level: PolitenessLevel) => void;
}

const LEVELS: PolitenessLevel[] = [1, 2, 3, 4, 5];

export default function PolitenessSlider({ level, onLevelChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How polite?</Text>
      <View style={styles.track}>
        <View
          style={[
            styles.trackFill,
            {
              width: `${((level - 1) / 4) * 100}%`,
              backgroundColor: LEVEL_COLORS[level],
            },
          ]}
        />
        <View style={styles.buttonsRow}>
          {LEVELS.map((l) => {
            const isActive = l === level;
            return (
              <TouchableOpacity
                key={l}
                style={[
                  styles.levelButton,
                  isActive && {
                    backgroundColor: LEVEL_COLORS[l],
                    transform: [{ scale: 1.15 }],
                  },
                ]}
                onPress={() => onLevelChange(l)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.levelNumber,
                    isActive && styles.levelNumberActive,
                  ]}
                >
                  {l}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <Text style={[styles.label, { color: LEVEL_COLORS[level] }]}>
        {LEVEL_LABELS[level]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 16,
  },
  title: {
    color: "#999",
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 20,
  },
  track: {
    width: "100%",
    height: 56,
    backgroundColor: "#1a1a2e",
    borderRadius: 28,
    position: "relative",
    overflow: "hidden",
  },
  trackFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 28,
    opacity: 0.2,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    height: "100%",
  },
  levelButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#2a2a3e",
    justifyContent: "center",
    alignItems: "center",
  },
  levelNumber: {
    color: "#666",
    fontSize: 16,
    fontWeight: "700",
  },
  levelNumberActive: {
    color: "#fff",
  },
  label: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
    letterSpacing: 1,
  },
});
