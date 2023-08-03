import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { RoundButtonBg } from "./roundButtonStyle";
interface IRoundButton {
  type: "change" | "close" | "edit";
}

const RoundButton = ({ type }: IRoundButton) => {
  const renderButton =
    type === "change" ? (
      <RoundButtonBg>
        <FontAwesome5 name="exchange-alt" size={11} color="#111" />
      </RoundButtonBg>
    ) : (
      <RoundButtonBg>
        <FontAwesome5 name="times" size={11} color="#111" />
      </RoundButtonBg>
    );

  return renderButton;
};

export default RoundButton;
