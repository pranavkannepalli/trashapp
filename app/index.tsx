import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Trash Scanner</Text>
      <Text style={{ marginVertical: 20 }}>Scan trash to earn points!</Text>
      <Button title="Scan Trash" onPress={() => alert('Scanning...')} />
      <Text style={{ marginTop: 20 }}>Points: 0</Text>
    </View>
  );
}
