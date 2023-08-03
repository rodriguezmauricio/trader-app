import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Paragraph, theme } from "../../styles/styles";

interface iDatePlaceholder {
  date: undefined | Date;
  datePicker: () => void;
}

const DatePlaceholder = ({ date, datePicker }: iDatePlaceholder) => {
  const day = String(date?.getDate());
  const month = String(date?.getMonth() + 1);
  const year = String(date?.getFullYear());

  const normalizedDate = `${day.length === 1 ? "0" + day : day}/${
    month.length === 1 ? "0" + month : month
  }/${year}`;
  return (
    <TouchableOpacity style={styles.input} onPress={datePicker}>
      {date ? (
        <Paragraph>{normalizedDate}</Paragraph>
      ) : (
        <Paragraph style={styles.opacity}>dd/mm/aaaa</Paragraph>
      )}
    </TouchableOpacity>
  );
};

export default DatePlaceholder;

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
