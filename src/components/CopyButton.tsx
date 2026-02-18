import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { copyToClipboard, shareMessage } from "../utils/share";
import { LEVEL_COLORS, PolitenessLevel } from "../data/messages";

interface Props {
  message: string;
  level: PolitenessLevel;
}

export default function CopyButton({ message, level }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(message);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    await shareMessage(message);
  };

  const color = LEVEL_COLORS[level];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: color }]}
        onPress={handleCopy}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {copied ? "✓ Copied!" : "📋 Copy"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.shareButton, { borderColor: color }]}
        onPress={handleShare}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, { color }]}>📤 Share</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    paddingVertical: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  shareButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
