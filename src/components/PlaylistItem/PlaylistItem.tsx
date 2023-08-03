import { TouchableOpacity, Text, ImageBackground, Dimensions, View } from "react-native";
import { Paragraph, ParagraphDark, Title, theme } from "../../styles/styles";
import { LinearGradient } from "expo-linear-gradient";

interface IPlaylistItem {
  title: string;
  img: string;
  videosCount: number;
}

const PlaylistItem = ({ title, img, videosCount }: IPlaylistItem) => {
  return (
    <TouchableOpacity
      style={{
        width: Dimensions.get("window").width * 0.925,
        height: Dimensions.get("window").height * 0.6,
        backgroundColor: "#000",
        borderRadius: 15,
        overflow: "hidden",
        marginBottom: 10,
        borderColor: theme.green,
        borderWidth: 2,
        elevation: 20,
      }}
    >
      <ImageBackground
        source={{ uri: img }}
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "flex-end",
          // paddingVertical: 20,
          // paddingRight: 50,
        }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,1)"]}
          style={{
            height: 250,
            position: "absolute",
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            paddingHorizontal: 15,
            paddingVertical: 40,
          }}
        >
          <Title
            style={{
              fontSize: 30,
            }}
          >
            {title}
          </Title>
          <View
            style={{
              height: 3,
              width: 60,
              backgroundColor: theme.green,
              marginVertical: 5,
            }}
          ></View>
          <Paragraph
            style={{
              fontSize: 20,
            }}
          >
            Episódios: {videosCount}
          </Paragraph>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default PlaylistItem;
