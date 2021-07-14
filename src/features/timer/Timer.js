import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Vibration,
  Platform,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { CountDown } from '../../components/CountDown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

import { fontSizes, paddingSizes, marginSizes } from '../../uitls/sizes';
import { colors } from '../../uitls/colors';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [minutes, setMinutes] = useState(0.1);
  const [progress, setProgress] = useState(1);

  const vibrate = () => {
    Vibration.cancel();
    if (Platform.OS === 'ios') {
      const interval = setInterval(Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 2000);
    } else {
      Vibration.vibrate(2 * ONE_SECOND_IN_MS);
    }
  };

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const onChangeTime = (time) => {
    setMinutes(time);
    setProgress(1);
    setIsStarted(false);
  };

  useEffect(() => {
    if (progress === 0) {
      setIsStarted(false);
      onTimerEnd()
      vibrate();
    }
  }, [progress]);

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown
          isPaused={!isStarted}
          minutes={minutes}
          onProgress={onProgress}
        />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Focussing on : </Text>
        <Text style={styles.task}>{focusSubject}</Text>
        <ProgressBar
          style={styles.progressBar}
          color={colors.lightBlue}
          progress={progress}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing changeTime={onChangeTime} />
      </View>

      <View style={styles.buttonWrapper}>
        <RoundedButton
          title={progress === 0 ? 'Done' : isStarted ? 'Pause' : 'Start'}
          size={100}
          onPress={() => {if (progress !== 0) setIsStarted(!isStarted)}}
        />
      </View>
      <View style={styles.clearSubject}>
<RoundedButton
          title={'-'}
          size={50}
          onPress={() => {clearSubject()}}
        />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    paddingTop: paddingSizes.xxl,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: paddingSizes.md,
  },
  title: {
    textAlign: 'center',
    color: colors.white,
  },
  task: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 10,
    marginVertical: marginSizes.sm,
  },
  clearSubject: {
    paddingBottom: paddingSizes.lg,
    paddingLeft: paddingSizes.lg,
  }
});
