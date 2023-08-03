import styled from "styled-components/native";
import { theme } from "../../styles/styles";

export const RoundButtonBg = styled.View`
  background-color: ${theme.text};
  border-color: ${theme.bgLight};
  border-width: 2px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;
