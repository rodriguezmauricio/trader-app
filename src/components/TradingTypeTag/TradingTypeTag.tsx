import { View } from "react-native";
import React from "react";
import { Paragraph } from "../../styles/styles";
import { TradingTypeLongTag, TradingTypeShortTag } from "./tradingTypeTagStyle";
import RoundButton from "../RoundButton/RoundButton";

interface ITradingTypeTagProps {
  isLong: boolean;
  // changeIsLong: () => void;
}

const TradingTypeTag = ({ isLong }: ITradingTypeTagProps) => {
  const renderTag = isLong ? (
    <TradingTypeLongTag>
      <View style={{ position: "absolute", top: -10, right: -10 }}>
        <RoundButton type="change" />
      </View>
      <Paragraph>Long</Paragraph>
    </TradingTypeLongTag>
  ) : (
    <TradingTypeShortTag>
      <View style={{ position: "absolute", top: -10, right: -10 }}>
        <RoundButton type="change" />
      </View>
      <Paragraph>Short</Paragraph>
    </TradingTypeShortTag>
  );

  return renderTag;
};

export default TradingTypeTag;
