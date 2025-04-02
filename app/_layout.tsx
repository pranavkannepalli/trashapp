import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as RalewayFonts from "@expo-google-fonts/raleway";
import * as OutfitFonts from "@expo-google-fonts/outfit";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ralewayLoaded, ralewayError] = RalewayFonts.useFonts(RalewayFonts);
  const [outfitLoaded, outfitError] = OutfitFonts.useFonts(OutfitFonts);

  const loaded = ralewayLoaded || outfitLoaded;
  const error = ralewayError || outfitError;

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  </Stack>;
}
