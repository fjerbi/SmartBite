import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Reprehenderit duis aute ullamco voluptate in. Irure aute labore qui
        laboris nulla ad proident exercitation ea tempor cupidatat adipisicing
        deserunt esse. Est veniam velit quis dolor proident id ex quis ullamco.
        Sit aliquip cupidatat adipisicing Lorem consectetur consectetur qui
        eiusmod sunt exercitation aliquip nulla.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("mealPrep")}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>Let's Go! </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  smallLogo: {
    width: 24,
    height: 24,
  },
  description: {
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "transparent",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    borderColor: "#4b91e2",
    borderWidth: 1,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
