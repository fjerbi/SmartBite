import {
  View,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import Markdown from "react-native-markdown-display";
import { useFocusEffect } from "@react-navigation/native";

const MealPlanHistory = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [activeSections, setActiveSections] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchMealPlans = async () => {
        try {
          const storedPlans = await AsyncStorage.getItem("mealPlans");
          const plans = storedPlans ? JSON.parse(storedPlans) : [];
          setMealPlans(plans);
        } catch (error) {
          console.error("Error fetching meal plans", error);
        }
      };

      fetchMealPlans();
    }, [])
  );

  const toggleSection = (index) => {
    setActiveSections((prevSections) =>
      prevSections.includes(index)
        ? prevSections.filter((i) => i !== index)
        : [...prevSections, index]
    );
  };

  const deleteMealPlan = async (index) => {
    Alert.alert(
      "Delete Meal Plan",
      "Are you sure you want to delete this meal plan?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const updatedPlans = mealPlans.filter((_, i) => i !== index);
              await AsyncStorage.setItem(
                "mealPlans",
                JSON.stringify(updatedPlans)
              );
              setMealPlans(updatedPlans);
            } catch (error) {
              console.error("Error deleting meal plan", error);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={{ padding: 15 }} onPress={navigation.goBack}>
        <Ionicons name="arrow-back-circle-outline" color={"white"} size={30} />
      </TouchableOpacity>
      <ScrollView style={{ padding: 20 }}>
        {mealPlans.length === 0 ? (
          <Text style={styles.noPlansText}>No meal Plans available!</Text>
        ) : (
          mealPlans.map((plan, index) => (
            <View key={index} style={styles.planContainer}>
              <View style={styles.planContainer}>
                <View style={styles.planTitleContainer}>
                  <TouchableOpacity
                    onPress={() => toggleSection(index)}
                    style={styles.planTitleTextContainer}
                  >
                    <Text style={styles.planTitle}>
                      {`Morphology:${plan.metabolism}, Height:${plan.height}, Age:${plan.age}, Gender:${plan.gender}`}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteMealPlan(index)}
                    style={styles.deleteButton}
                  >
                    <Ionicons name="trash-bin-outline" size={24} color="red" />
                  </TouchableOpacity>
                </View>
                <Collapsible collapsed={!activeSections.includes(index)}>
                  <Markdown>{plan.text}</Markdown>
                </Collapsible>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  noPlansText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
  planContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
  },
  planTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  planTitleTextContainer: {
    flex: 1,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  deleteButton: {
    marginLeft: 10,
  },
  planText: {
    fontSize: 14,
    marginTop: 10,
  },
});

export default MealPlanHistory;
