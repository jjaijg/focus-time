import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from '../uitls/colors';
import { fontSizes, paddingSizes } from '../uitls/sizes';

const minutesToMilliSecond = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const CountDown = ({ minutes = 20, isPaused = true, onProgress }) => {
  const interval = useRef(null);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        if (interval.current) clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  const [millis, setMillis] = useState(null);

  useEffect(() => {
      onProgress(millis / minutesToMilliSecond(minutes));
  }, [millis])

  useEffect(() => {
    setMillis(minutesToMilliSecond(minutes))
    onProgress(1);
  }, [minutes])

  useEffect(() => {
    if (isPaused) return;

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    // <TouchableOpacity>
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    padding: paddingSizes.lg,
    color: colors.white,
    backgroundColor: colors.timerColor,
  },
});
