import * as Clipboard from "expo-clipboard";
import { Platform } from "react-native";

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (Platform.OS === "web" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      await Clipboard.setStringAsync(text);
    }
    return true;
  } catch {
    return false;
  }
}

export async function shareMessage(text: string): Promise<boolean> {
  if (
    Platform.OS === "web" &&
    typeof navigator !== "undefined" &&
    navigator.share
  ) {
    try {
      await navigator.share({ text });
      return true;
    } catch {
      return copyToClipboard(text);
    }
  }
  return copyToClipboard(text);
}
