import styled from "styled-components/native";
import { theme } from "../../styles/styles";

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export const BalanceLarge = styled.Text`
  color: ${theme.text};
  justify-content: center;
  align-items: center;
  font-size: 35px;
  letter-spacing: -2px;
`;

export const Tag = styled.View`
  background-color: ${theme.bg};
  padding: 5px 10px;
  border-radius: 5px;
`;

export const SubTagWrapper = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const SubTag = styled.View`
  background-color: ${theme.bgLight};
  padding: 5px 10px;
  border-radius: 5px;
`;

export const STextInput = styled.TextInput`
  font-size: 16px;
  color: ${theme.text};
  padding: 5px;
  flex: 1;
  margin: 0 5px;
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.5);
`;
