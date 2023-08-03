import styled from "styled-components/native";
import { theme } from "../../styles/styles";

export const HeaderDiv = styled.View`
  background-color: #fff;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 10px;
`;

export const XView = styled.View`
  flex-direction: row;
  gap: 10px;
  margin-bottom: 10px;
`;

export const HeaderBlocks = styled.View`
  background-color: ${theme.bgLight};
  flex: 1;
  align-items: center;
  padding: 15px;
  border-radius: 15px;
`;

export const AddNovoButton = styled.TouchableOpacity`
  background-color: ${theme.green};
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-radius: 15px;
`;
