import { BuyButtonBg, SellButtonBg } from "./style";
import { Paragraph } from "../../styles/styles";

interface ITradingButton {
  isBuy: boolean;
}

const TradingButton = ({ isBuy }: ITradingButton) => {
  const renderButton =
    isBuy === true ? (
      <BuyButtonBg>
        <Paragraph>Long</Paragraph>
      </BuyButtonBg>
    ) : (
      <SellButtonBg>
        <Paragraph>Short</Paragraph>
      </SellButtonBg>
    );

  return renderButton;
};

export default TradingButton;
