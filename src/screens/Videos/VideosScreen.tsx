import { View, FlatList, Dimensions } from "react-native";
import React from "react";
import { MainContainer, Title, theme } from "../../styles/styles";
import { useSelector } from "react-redux";
import {
  VqueroSerTrader,
  VcursoAnaliseTecnica,
  VguiaDeSetups,
  Vindicadores,
} from "../../data/videos";
import VideoListItem from "../../components/VideoListItem/VideoListItem";
import { RootState } from "../../redux/store";
import { StatusBar } from "expo-status-bar";
import GoBackNav from "../../components/headerNavigationComp/GoBackNav";

const VideosScreen = () => {
  const selectedPlaylist = useSelector((state: RootState) => state.selectPlaylist);

  const ListToRender = (listName: string) => {
    if (listName === "VqueroSerTrader") {
      return { playlist: VqueroSerTrader, title: "Quero ser Trader" };
    }
    if (listName === "VcursoAnaliseTecnica") {
      return { playlist: VcursoAnaliseTecnica, title: "Curso de Análise Técnica" };
    }
    if (listName === "VguiaDeSetups") {
      return { playlist: VguiaDeSetups, title: "Guia de Setups" };
    }
    if (listName === "Vindicadores") {
      return { playlist: Vindicadores, title: "Entendendo Indicadores" };
    }
  };

  return (
    <MainContainer>
      <StatusBar />

      <View
        style={{
          position: "absolute",
          backgroundColor: theme.green,
          height: 250,
          top: 0,
          left: 0,
          width: Dimensions.get("window").width,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      ></View>
      <GoBackNav />

      {/* <Title style={{ fontSize: 46, marginBottom: -20 }}>Vídeos</Title> */}
      <Title style={{ fontSize: 46 }}>{ListToRender(selectedPlaylist)?.title}</Title>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={ListToRender(selectedPlaylist)?.playlist}
        renderItem={({ item }) => {
          return (
            <VideoListItem videoId={item.link} title={item.title} id={item.id} thumb={item.link} />
          );
        }}
      />
    </MainContainer>
  );
};

export default VideosScreen;
