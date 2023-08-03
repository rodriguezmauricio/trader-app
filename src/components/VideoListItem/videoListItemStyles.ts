import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { theme } from "../../styles/styles";

export const VIDEO_HEIGHT = 220;
export const VIDEO_WIDTH = Dimensions.get("window").width;

export const VideoView = styled.View`
  background-color: #000;
  align-items: center;
  justify-content: center;
  height: 210px;
`;

export const InfosView = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background-color: ${theme.green};
  margin-bottom: 20px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;
