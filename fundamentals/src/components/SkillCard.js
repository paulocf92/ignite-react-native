import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function SkillCard({ skill }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>{skill}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f1e25',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
