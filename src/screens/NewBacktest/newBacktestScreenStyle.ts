import styled from "styled-components/native";
import { theme } from "../../styles/styles";

export const NbtTextInput = styled.TextInput`
  border-bottom-color: ${theme.text};
  border-bottom-width: 1px;
  color: ${theme.text};
  font-size: 18px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  gap: 10px;
`;
