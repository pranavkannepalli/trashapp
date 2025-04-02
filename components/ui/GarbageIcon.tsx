import { StyleSheet, Text, View } from "react-native";
import { Plant, Recycle, Trash } from "phosphor-react-native";


export default function GarbageIcon( { type }: { type: string } ) {
    let boxColor = "";
    let textColor = "";
    let icon = null;
    switch (type) {
        case "Trash":
            boxColor = "#dddddd"
            textColor = "#686868"
            icon = <Trash size={15} color={textColor} style={styles.icon} />
            break;
        case "Recycle":
            boxColor = "#cef0ff"
            textColor = "#577886"
            icon = <Recycle size={15} color={textColor} style={styles.icon} />
            break;
        case "Compost":
            boxColor = "#d9f3cf";
            textColor = "#607857";
            icon = <Plant size={15} color={textColor} style={styles.icon} />
            break
        default:
            console.log("Invalid color entered")
    }

    return <View style={[styles.iconContainer, { backgroundColor: boxColor }]}>
        {icon}
        <Text style={[styles.iconText, { color: textColor }]}>{type}</Text>
    </View>
}


const styles = StyleSheet.create({
    iconText: {
        fontFamily: "Raleway_700Bold",
        fontSize: 14,
        paddingRight: 10,
    },
    iconContainer: {
        borderRadius: 15,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 3,
        flexDirection: "row"
    },
    icon: {
        marginLeft: 10,
        marginRight: 5
    }
});
