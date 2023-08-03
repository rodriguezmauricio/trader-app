import styled from "styled-components/native";
import { theme } from "../../styles/styles";

export const ButtonBg = styled.TouchableOpacity`
  background-color: ${theme.green};
  justify-content: center;
  align-items: center;
  padding: 25px;
  border-radius: 15px;
  /* margin-bottom: 50px; */
  border-color: ${theme.bgLight};
  border-width: 1px;
`;

export const ButtonText = styled.Text`
  color: ${theme.text};
`;

export const BuyButtonBg = styled.View`
  background-color: ${theme.green};
  height: 40px;
  padding: 0 10px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

export const SellButtonBg = styled.View`
  background-color: ${theme.red};
  height: 40px;
  padding: 0 10px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;
