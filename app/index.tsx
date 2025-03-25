import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white"
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <View>
          <Text style={{ fontSize: 16 }} >Welcome,</Text>
          <Text style={{ fontSize: 32, fontWeight: "bold" }} >Achintya</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 10, paddingTop: 20}}>
        <View style={{
          padding: 15,
          flex: 1,
          borderRadius: 10,
          backgroundColor: "#E6FCDF"
        }}>
          <View style={{ flexDirection: "row", alignItems: "baseline"}}>
            <Text style={{ 
              fontSize: 24,
              fontWeight: "bold"
            }}>56</Text>
            <Text style={{ fontSize: 16, fontWeight: "bold"}}> lbs</Text>
          </View>
          <Text style={{ fontSize: 12 }}>Of CO2 equivalent saved</Text>
        </View>
        <View style={{
          padding: 15,
          borderRadius: 10,
          flex: 1,
          backgroundColor: "#E6FCDF"
        }}>
          <View style={{ flexDirection: "row", alignItems: "baseline"}}>
            <Text style={{ 
              fontSize: 24,
              fontWeight: "bold"
            }}>56</Text>
            <Text style={{ fontSize: 16, fontWeight: "bold"}}> lbs</Text>
          </View>
          <Text style={{ fontSize: 12 }}>Of CO2 equivalent saved</Text>
        </View>
      </View>
      <Text style={{ paddingTop: 10, fontSize: 20, fontWeight: "medium"}}>Leaderboard</Text>
      
    </View>
  );
}
