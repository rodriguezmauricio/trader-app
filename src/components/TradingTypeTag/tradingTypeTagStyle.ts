import styled from "styled-components/native";
import { theme } from "../../styles/styles";

export const TradingTypeLongTag = styled.View`
  background-color: ${theme.green};
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 35px;
  padding: 5px 10px;
  border-radius: 50px;
  position: relative;
`;

export const TradingTypeShortTag = styled.View`
  background-color: ${theme.red};
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 35px;
  padding: 5px 10px;
  border-radius: 50px;
`;
