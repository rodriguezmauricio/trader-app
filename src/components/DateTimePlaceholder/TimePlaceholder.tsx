import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Paragraph, theme } from "../../styles/styles";

interface iTimePlaceholder {
  time: { hours: number; minutes: number };
  timePicker: () => void;
}

const TimePlaceholder = ({ time, timePicker }: iTimePlaceholder) => {
  const { hours, minutes } = time;

  const hoursStyle = hours < 10 ? "0" + hours : hours;
  const minutesStyle = minutes < 10 ? "0" + minutes : minutes;

  const normalizedTime = `${hours !== -1 ? hoursStyle : "hh"}:${
    minutes !== -1 ? minutesStyle : "mm"
  }`;

  return (
    <TouchableOpacity style={styles.input} onPress={timePicker}>
      {time.hours !== -1 ? (
        <Paragraph>{normalizedTime}</Paragraph>
      ) : (
        <Paragraph style={styles.opacity}>hh:mm</Paragraph>
      )}
    </TouchableOpacity>
  );
};

export default TimePlaceholder;

const styles = StyleSheet.create({
  input: {
    borderBottomColor: theme.text,
    borderBottomWidth: 1,
    color: theme.text,
    fontSize: 18,
    paddingVertical: 5,
  },
  opacity: {
    opacity: 0.5,
  },
});
