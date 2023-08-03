import { View, Text, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { Paragraph, ParagraphDark, Title, theme } from "../../styles/styles";
import { useDispatch } from "react-redux";
import { setSelectedPlaylist } from "../../redux/selectedPlaylist";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

interface IPlaylistHomeProps {
  title: string;
  id: string;
  img: string;
}

const PlaylistHomeItem = ({ title, id, img }: IPlaylistHomeProps) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        height: 180,
        width: Dimensions.get("window").width * 0.7,
        borderRadius: 15,
        marginLeft: id === "0" ? 15 : 0,
        overflow: "hidden",
        borderColor: theme.green,
        borderWidth: 2,
      }}
    >
      <ImageBackground
        source={{
          uri: img,
        }}
        style={{
          flex: 1,
          height: 180,
          width: Dimensions.get("window").width * 0.7,
          borderRadius: 15,
          alignItems: "flex-start",
          justifyContent: "flex-end",
          paddingVertical: 10,
        }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,1)"]}
          style={{
            height: 100,
            position: "absolute",
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}
        >
          <Title
            style={{
              fontSize: 22,
            }}
          >
            {title}
          </Title>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default PlaylistHomeItem;
