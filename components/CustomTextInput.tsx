import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({ label, value, setValue, placeholder, keyboardType = "default" }) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#999"
        style={styles.input}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
    borderRadius: 8,
  },
});

export default CustomTextInput;
