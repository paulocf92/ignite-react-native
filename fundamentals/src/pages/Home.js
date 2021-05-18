import React, { useState } from 'react';
import { 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TextInput, 
  Platform,
} from 'react-native';

import Button from '../components/Button';
import SkillCard from '../components/SkillCard';

export default function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState([]);

  function handleAddNewSkill() {
    setMySkills(oldState => [...oldState, newSkill]);
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome, Paulo Filho</Text>
        <TextInput
          style={styles.input}
          placeholder="New skill"
          placeholderTextColor="#999"
          onChangeText={setNewSkill}
        />

        <Button />

        <Text style={[styles.title, { marginVertical: 50 }]}>
          My Skills
        </Text>

        {mySkills.map(skill => (
          <SkillCard key={skill} />
        ))}

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 20,
    paddingVertical: 70,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1f1325',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  
})