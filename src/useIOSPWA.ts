import { useEffect } from "react";
import { Platform } from "react-native";

/**
 * Injects iOS PWA meta tags and CSS into the document head on web.
 * No-op on native platforms.
 */
export function useIOSPWA() {
  useEffect(() => {
    if (Platform.OS !== "web") return;

    const head = document.head;

    // iOS PWA meta tags
    const metas: Record<string, string> = {
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "apple-mobile-web-app-title": "Polite Dismissals",
    };

    for (const [name, content] of Object.entries(metas)) {
      if (!head.querySelector(`meta[name="${name}"]`)) {
        const meta = document.createElement("meta");
        meta.name = name;
        meta.content = content;
        head.appendChild(meta);
      }
    }

    // Fix viewport to include viewport-fit=cover
    const viewport = head.querySelector('meta[name="viewport"]');
    if (viewport) {
      const current = viewport.getAttribute("content") || "";
      if (!current.includes("viewport-fit=cover")) {
        viewport.setAttribute("content", current + ", viewport-fit=cover");
      }
    }

    // Apple touch icon
    if (!head.querySelector('link[rel="apple-touch-icon"]')) {
      const link = document.createElement("link");
      link.rel = "apple-touch-icon";
      link.href = "/assets/icon.png";
      head.appendChild(link);
    }

    // iOS PWA CSS
    const styleId = "ios-pwa-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        #root {
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
          padding-left: env(safe-area-inset-left);
          padding-right: env(safe-area-inset-right);
        }
        body {
          -webkit-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: transparent;
          overscroll-behavior: none;
        }
      `;
      head.appendChild(style);
    }
  }, []);
}
