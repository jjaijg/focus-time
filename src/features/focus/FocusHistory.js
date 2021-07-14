import React, { useState } from 'react';
import { Text, View, FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, paddingSizes, marginSizes } from '../../uitls/sizes';
import { colors } from '../../uitls/colors';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.historyItem(item?.status)}>{item?.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {!!focusHistory?.length && (
        <>
      <Text style={styles.title}>We have focussed on:</Text>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={focusHistory}
          renderItem={HistoryItem}
        />
        <View style={styles.clearContainer}>
        <RoundedButton size={75} title='clear' onPress={clearHistory} />
        </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    alignItems: "center"
  },
  list: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
  },
  historyItem: (status) => ({
    color: status < 1 ? colors.red : colors.green,
    fontSize: fontSizes.lg
  }),
  title: {
    color: colors.white,
    fontSize: fontSizes.lg
  },
  clearContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: paddingSizes.md
  }
});
