import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../styles/styles";

interface ICloseButton {
  onPress: () => void;
  type: "dark" | "light";
}

const CloseButton = ({ onPress, type }: ICloseButton) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: type === "dark" ? theme.bgLighter : theme.darkGreen,
        borderRadius: 5,
      }}
    >
      <MaterialCommunityIcons name="close" size={24} color="#fff" style={{ padding: 10 }} />
    </TouchableOpacity>
  );
};

export default CloseButton;

const styles = StyleSheet.create({});
