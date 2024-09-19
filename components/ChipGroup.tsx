import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Chip } from 'react-native-paper';

const ChipGroup = ({ options, selectedOption, setSelectedOption, title }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chipContainer}>
        {options.map(option => (
          <Chip
            key={option}
            selected={selectedOption === option}
            onPress={() => setSelectedOption(option)}
            style={[styles.chip, selectedOption === option && styles.chipSelected]}
            textStyle={styles.chipText}
          >
            {option}
          </Chip>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#ffffff',
    fontSize: 18,
    marginVertical: 8,
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
});

export default ChipGroup;
