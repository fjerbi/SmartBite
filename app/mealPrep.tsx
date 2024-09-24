import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import Markdown from "react-native-markdown-display";
import MetabolismCarousel from "@/components/MetabolismCarousel";
import ChipGroup from "@/components/ChipGroup";
import CustomTextInput from "@/components/CustomTextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MealPrep = () => {
  const API_KEY = "";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const { width: viewportWidth } = Dimensions.get("window");
  const sliderWidth = viewportWidth;
  const itemWidth = sliderWidth * 0.75;
  const navigation = useNavigation();
  const carouselRef = useRef(null);

  const [metabolism, setMetabolism] = useState("");
  const [goal, setGoal] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const metabolisms = [
    { type: "Endomorph", image: require("../assets/images/endo.png") },
    { type: "Mesomorph", image: require("../assets/images/meso.png") },
    { type: "Ectomorph", image: require("../assets/images/ecto.png") },
  ];

  const saveMealPlan = async (mealPlan) => {
    try {
      const storedPlans = await AsyncStorage.getItem("mealPlans");
      const mealPlans = storedPlans ? JSON.parse(storedPlans) : [];
      mealPlans.push(mealPlan);
      await AsyncStorage.setItem("mealPlans", JSON.stringify(mealPlans));
    } catch (error) {
      console.error("Error saving meal Plan", error);
    }
  };

  const fetchGeminiText = async (prompt) => {
    setLoading(true);
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const geminiText = response.text();
      setText(geminiText);
      await saveMealPlan({
        metabolism,
        goal,
        height,
        age,
        weight,
        gender,
        language,
        text: geminiText,
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMealPlan = () => {
    const prompt = `Generate a meal plan for a ${gender} with the following details:
    Metabolism: ${metabolism}
    Goal: ${goal}
    Height: ${height}
    Age: ${age}
    Current Weight: ${weight}
    Provide meal preparation instructions with total and per meal calorie count in ${language}.`;

    fetchGeminiText(prompt);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={{ padding: 15 }} onPress={navigation.goBack}>
        <Ionicons name="arrow-back-circle-outline" color={"white"} size={30} />
      </TouchableOpacity>
      <ScrollView style={{ padding: 20 }}>
        <MetabolismCarousel
          metabolisms={metabolisms}
          metabolism={metabolism}
          setMetabolism={setMetabolism}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
        />
        <ChipGroup
          title="Goal"
          options={["Cutting", "Bulking", "Maintain weight"]}
          selectedOption={goal}
          setSelectedOption={setGoal}
        />
        <CustomTextInput
          label="Height (cm)"
          value={height}
          setValue={setHeight}
          placeholder="Height (cm)"
          keyboardType="numeric"
        />
        <CustomTextInput
          label="Age"
          value={age}
          setValue={setAge}
          placeholder="Age"
          keyboardType="numeric"
        />
        <CustomTextInput
          label="Current Weight (kg)"
          value={weight}
          setValue={setWeight}
          placeholder="Current Weight (kg)"
          keyboardType="numeric"
        />
        <ChipGroup
          title="Gender"
          options={["Male", "Female"]}
          selectedOption={gender}
          setSelectedOption={setGender}
        />
        <ChipGroup
          title="Language"
          options={["English", "French", "German"]}
          selectedOption={language}
          setSelectedOption={setLanguage}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleGenerateMealPlan}
        >
          <Text style={styles.buttonText}>Generate Meal Plan</Text>
        </TouchableOpacity>
        {loading && (
          <ActivityIndicator
            size="large"
            color="#6200ee"
            style={styles.loading}
          />
        )}
        {error && <Text style={styles.error}>{error.message}</Text>}
        {text && (
          <View style={styles.markdownContainer}>
            <Markdown>{text}</Markdown>
          </View>
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
  button: {
    backgroundColor: "#4b91e2",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  loading: {
    marginVertical: 20,
  },
  error: {
    color: "red",
    marginVertical: 20,
  },
  markdownContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginVertical: 20,
  },
});

export default MealPrep;
