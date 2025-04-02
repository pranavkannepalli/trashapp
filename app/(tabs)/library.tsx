import {StyleSheet, Text, View} from "react-native";
import data from "@/assets/data.json";
import GarbageIcon from "@/components/ui/GarbageIcon";
import {Leaf, Recycle} from "phosphor-react-native";
import {useState} from "react";

interface GarbageItemInstructions {
    title: string;
    description: string;
}

interface GarbageItemProps {
    name: string;
    instructions: GarbageItemInstructions[];
    weight: string;
    type: "Trash" | "Recycle" | "Compost";
    co2_savings: string,
    setCurrentItem: (item: string | null) => void;
}


const GarbageItem = (
    { name, instructions, weight, type, co2_savings, setCurrentItem }: GarbageItemProps
) => {
    return (
        <View style={[{ flexDirection: "column" }]}>
                <View style={styles.headerContainer}>
                    <Text
                        style={styles.backButton}
                        onPress={() => setCurrentItem(null)}
                    >{"<"}</Text>
                    <Text style={styles.header}>{name}</Text>
                    <View style={[{ width: "34%" }]}/>
                    <GarbageIcon type={type}/>
                </View>
                <View style={[{ flexDirection: "row" }]}>
                    <View style={styles.greenBg}>
                        <View style={styles.innerGreenBg}>
                                <Leaf style={[{ marginRight: 10 }]} weight="duotone" duotoneColor="green"/>
                                <Text
                                    style={[styles.headerText, { fontSize: 25 }]}
                                >{co2_savings}</Text>
                            <Text
                                style={[styles.headerText, { fontSize: 18, paddingVertical: 5, paddingLeft: 5 }]}
                            >grams</Text>

                        </View>
                        <Text style={styles.descriptionText}>
                            CO2 equivalent saved
                        </Text>
                    </View>
                    <View style={styles.greenBg}>
                        <View style={styles.innerGreenBg}>
                            <Recycle style={[{ marginRight: 10 }]} weight="duotone" duotoneColor="green"/>
                            <Text
                                style={[styles.headerText, { fontSize: 25 }]}
                            >{weight}</Text>
                            <Text
                                style={[styles.headerText, { fontSize: 18, paddingVertical: 5, paddingLeft: 5 }]}
                            >grams</Text>

                        </View>
                        <Text style={styles.descriptionText}>
                            Weight
                        </Text>
                    </View>
                </View>
                <View style={styles.instructionsContainer}>
                    <Text style={styles.instructionsText}>Instructions:</Text>
                    <View>
                        {instructions.map((instruction, index) => (
                            <View style={styles.instructionContainer} key={index}>
                                <Text style={styles.titleText}>{instruction.title}</Text>
                                <Text style={styles.instructionDescriptionText}>{instruction.description}</Text>
                            </View>
                        ))}
                    </View>
                </View>
        </View>
    );
};


export default function Library() {
    const [item, setItem] = useState<string | null>(null);

    if (item) {
        const itemData = data[item];
        return (
            <View style={styles.mainContainer}>
                <View>
                    <GarbageItem name={itemData.name} instructions={instructions} weight="5" type="Trash" co2_savings="0" setCurrentItem={setItem}/>
                </View>
            </View>
        )
    }
    return (
        <View></View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        paddingLeft: 24,
        paddingRight: 24
    },
    headerContainer: {
        flexDirection: "row",
        width: "70%",
        paddingVertical: 15
    },
    header: {
        fontFamily: "Outfit_700Bold",
        fontSize: 30,
        color: "black",
    },
    greenBg: {
        marginTop: 2,
        width: "47%",
        borderRadius: 10,
        paddingVertical: 25,
        paddingLeft: 15,
        backgroundColor: "#d9f3cf",
        marginRight: 22
    },
    innerGreenBg: {
        flexDirection: "row",
    },
    innerinnerGreenBg: {
        alignItems: "center"
    },
    headerText: {
        fontFamily: "Outfit_700Bold",
    },
    descriptionText: {
        fontFamily: "Raleway_500Medium",
        fontSize: 13
    },
    instructionsText: {
        color: "#5c5c5c",
        fontFamily: "Outfit_700Bold"
    },
    instructionsContainer: {
        paddingTop: 16
    },
    instructionContainer: {
        borderRadius: 10,
        borderColor: "#a39f9f",
        borderWidth: 1,
        backgroundColor: "#e4e1e1",
        marginTop: 10,
        paddingLeft: 10,
        paddingVertical: 5
    },
    titleText: {
        fontFamily: "Raleway_700Bold",
        fontSize: 17
    },
    instructionDescriptionText: {
        fontFamily: "Raleway_500Medium",
        fontSize: 14
    },
    backButton: {
        fontFamily: "Outfit_500Medium",
        fontSize: 30,
        paddingRight: 10
    }
});
