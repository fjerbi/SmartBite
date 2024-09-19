import React, { useState, useRef } from 'react';
import { View, ScrollView, Text, TextInput, ActivityIndicator, StyleSheet, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native';
import { Chip } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const MealPrep = () => {
  const API_KEY = '';
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const { width: viewportWidth } = Dimensions.get("window");
  const sliderWidth = viewportWidth;
  const itemWidth = sliderWidth * 0.75;
  const navigation = useNavigation();
  const carouselRef = useRef(null);

  const [metabolism, setMetabolism] = useState('');
  const [goal, setGoal] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [language, setLanguage] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const metabolisms = [
    { type: 'Endomorph', image: require('../assets/images/endo.png') },
    { type: 'Mesomorph', image: require('../assets/images/meso.png') },
    { type: 'Ectomorph', image: require('../assets/images/ecto.png') },
  ];

  const fetchGeminiText = async (prompt) => {
    setLoading(true);
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const geminiText = response.text();
      setText(geminiText);
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

  const renderMetabolismItem = ({ item }) => (
    <TouchableOpacity onPress={() => setMetabolism(item.type)}>
      <View style={[styles.carouselItem, metabolism === item.type && styles.carouselItemSelected]}>
        <Image source={item.image} style={styles.carouselImage} />
        <Text style={styles.carouselText}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={{padding: 15}} onPress={navigation.goBack}>
        <Ionicons name='arrow-back-circle-outline' color={"white"} size={30}/>
        </TouchableOpacity>
      <ScrollView style={{ padding: 20 }}>
        <Text style={styles.title}>Metabolism</Text>
        <Carousel
          ref={carouselRef}
          data={metabolisms}
          renderItem={renderMetabolismItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideOpacity={0.7}
          inactiveSlideScale={0.9}
          activeSlideAlignment="center"
          containerCustomStyle={styles.carouselContainer}
        />
        <Text style={styles.title}>Goal</Text>
        <View style={styles.chipContainer}>
          {['Cutting', 'Bulking', 'Maintain weight'].map(type => (
            <Chip
              key={type}
              selected={goal === type}
              onPress={() => setGoal(type)}
              style={[styles.chip, goal === type && styles.chipSelected]}
              textStyle={styles.chipText}
            >
              {type}
            </Chip>
          ))}
        </View>

        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          placeholder="Height (cm)"
          placeholderTextColor="#999"
          style={styles.input}
        />

        <Text style={styles.label}>Age</Text>
        <TextInput
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholder="Age"
          placeholderTextColor="#999"
          style={styles.input}
        />

        <Text style={styles.label}>Current Weight (kg)</Text>
        <TextInput
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholder="Current Weight (kg)"
          placeholderTextColor="#999"
          style={styles.input}
        />

        <Text style={styles.title}>Gender</Text>
        <View style={styles.chipContainer}>
          {['Male', 'Female'].map(type => (
            <Chip
              key={type}
              selected={gender === type}
              onPress={() => setGender(type)}
              style={[styles.chip, gender === type && styles.chipSelected]}
              textStyle={styles.chipText}
            >
              {type}
            </Chip>
          ))}
        </View>

        <Text style={styles.title}>Language</Text>
        <View style={styles.chipContainer}>
          {['English', 'French', 'German'].map(lang => (
            <Chip
              key={lang}
              selected={language === lang}
              onPress={() => setLanguage(lang)}
              style={[styles.chip, language === lang && styles.chipSelected]}
              textStyle={styles.chipText}
            >
              {lang}
            </Chip>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleGenerateMealPlan}>
          <Text style={styles.buttonText}>Generate Meal Plan</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#6200ee" style={styles.loading} />}
        {error && <Text style={styles.error}>{error.message}</Text>}

        {text && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Generated Meal Plan:</Text>
            <Text style={styles.resultText}>{text}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#121212',
    flex: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    marginVertical: 8,
  },
  carouselContainer: {
    marginVertical: 15,
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  chip: {
    margin: 4,
    backgroundColor: '#333',
  },
  chipSelected: {
    backgroundColor: '#4b91e2',
  },
  chipText: {
    color: '#fff',
  },
  button: {
    backgroundColor: "#4b91e2",
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 30,
    alignItems: "center",
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
    borderRadius: 8,
  },
  loading: {
    marginVertical: 16,
  },
  error: {
    color: 'red',
    marginVertical: 16,
  },
  resultContainer: {
    marginTop: 16,
  },
  resultTitle: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  resultText: {
    color: '#ffffff',
  },
  carouselItem: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#333',
    alignItems: 'center',
    padding: 16,
  },
  carouselItemSelected: {
    borderWidth: 2,
    borderColor: '#4b91e2',
  },
  carouselImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  carouselText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 18,
  },
});

export default MealPrep;
