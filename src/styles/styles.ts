import { Dimensions } from "react-native";
import styled from "styled-components/native";

// export interface ITheme {
//   theme: {
//     bg: string;
//     bgLight: string;
//     green: string;
//     red: string;
//     text: string;
//     textDark: string;
//   };
// }

export const theme = {
  bg: "#0E1422",
  bgLight: "#181E2F",
  bgLighter: "#1D2638",
  green: "#29D4AB",
  greenOpacity: "rgba(42,212,171, 0.2)",
  darkGreen: "#17B58F",
  red: "#F83C52",
  warn: "#F4D35E",
  text: "#fff",
  textGray: "#717D94",
  textDark: "#1C2334",
};

export const MainContainer = styled.SafeAreaView`
  background-color: ${theme.bg};
  flex: 1;
  height: 100%;
  padding: 15px;
`;

export const MainContainerForScroll = styled.SafeAreaView`
  background-color: ${theme.bg};
  flex: 1;
  height: 100%;
`;

export const Container = styled.View`
  background-color: ${theme.bgLight};
  padding: 15px;
  border-radius: 15px;
  gap: 5px;
  margin-bottom: 10px;
`;

export const ContainerBTHome = styled.View`
  background-color: ${theme.bgLight};
  padding: 15px;
  border-radius: 15px;
  gap: 5px;
`;

export const Infos = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

export const InfoBg = styled.View`
  background-color: ${theme.green};
  padding: 5px 10px;
  border-radius: 5px;
`;

export const Title = styled.Text`
  color: ${theme.text};
  font-size: 20px;
  font-weight: bold;
`;

export const Paragraph = styled.Text`
  color: ${theme.text};
  font-size: 15px;
`;

export const ParagraphDark = styled.Text`
  color: ${theme.textDark};
  font-size: 18px;
`;

export const ParagraphGreen = styled.Text`
  color: ${theme.green};
  font-size: 18px;
`;

export const AbsoluteBgHeader = styled.View`
  position: absolute;
  background-color: ${theme.green};
  height: 250px;
  top: 0px;
  left: 0px;
  width: ${Dimensions.get("window").width};
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
`;
