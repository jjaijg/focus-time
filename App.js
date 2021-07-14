import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';

import { colors } from './src/uitls/colors';
import { paddingSizes } from './src/uitls/sizes';

const STATUS = {
  COMLPLETE: 1,
  CANCELLED: 0,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState('');
  const [focusHistory, setFocusHistory] = useState([]);

  const clearSubject = () => {
    setFocusHistory((prevHistory) => [
      ...prevHistory,
      { 
        key: String(focusHistory.length + 1),
        subject: focusSubject, status: STATUS.CANCELLED },
    ]);
    setFocusSubject(null);
  };

  const onTimerEnd = () => {
    setFocusHistory((prevHistory) => [
      ...prevHistory,
      { subject: focusSubject, status: STATUS.COMLPLETE },
    ]);
    setFocusSubject(null);
  };

  const onClear = () => {
    setFocusHistory([])
  }

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory))
    } catch (e) {
      console.log(e)
    }
  }

  const loadFocusHistory = async () => {
    try {
      const data = await AsyncStorage.getItem('focusHistory');
      if (data) setFocusHistory(JSON.parse(data))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    loadFocusHistory()
  }, [])

  useEffect(() => {
    saveFocusHistory()
  }, [focusHistory])

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={onTimerEnd}
          clearSubject={clearSubject}
        />
      ) : (
        <View style={styles.focusContainer}>
        <Focus addSubject={setFocusSubject} />
        <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: paddingSizes.sm,
    paddingTop: Platform.OS === 'ios' ? paddingSizes.md : paddingSizes.xxl,
    backgroundColor: colors.darkBlue,
  },
  focusContainer: {
    flex: 1
  }
});
