import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, paddingSizes, marginSizes } from '../../uitls/sizes';
import { colors } from '../../uitls/colors';

export function Focus({ addSubject }) {
  const [focusInput, setFocusInput] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={focusInput}
            onChangeText={setFocusInput}
          />
          <RoundedButton
            size={50}
            title="+"
            onPress={() => {addSubject(focusInput)
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 0.5 },
  innerContainer: {
    flex: 1,
    padding: paddingSizes.sm,
    justifyContent: 'center',
  },
  title: { color: colors.white, fontWeight: 'bold', fontSize: fontSizes.lg },
  inputContainer: {
    paddingTop: paddingSizes.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: { flex: 1, marginRight: marginSizes.md },
});
