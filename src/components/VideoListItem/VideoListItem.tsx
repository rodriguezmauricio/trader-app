import { View, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import React, { useState, useCallback } from "react";
import YoutubeIframe from "react-native-youtube-iframe";
import { ParagraphDark, theme } from "../../styles/styles";
import { VideoView } from "./videoListItemStyles";
import { VIDEO_WIDTH, VIDEO_HEIGHT } from "./videoListItemStyles";
import * as ScreenOrientation from "expo-screen-orientation";

interface IVideoListItem {
  videoId: string;
  title: string;
  id: string;
  thumb: string;
}

const VideoListItem = ({ videoId, title, id, thumb }: IVideoListItem) => {
  // quando false, carrega o activity indicator, quando true, carrega o vídeo
  const [videoReady, setVideoReady] = useState(false);

  // quando em tela cheia, vídeo fica na vertical ocupando a tela toda
  const onFullScreenChange = useCallback((isFullScreen: boolean) => {
    if (isFullScreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, []);

  // se o param for "link", extrai o id do link seja de vídeo ou playlist e retorna em string
  // se o param for "thumb", extrai o id e retorn a url da thumbnail do vídeo
  const extractLink = (link: string, param: string) => {
    if (param === "link") {
      const part1 = link.split("v=");
      if (part1[1].includes("&list")) {
        const part2 = part1[1].split("&list");

        return part2[0];
      }

      return String(part1[1]);
    }

    let videoId = "";

    if (param === "thumb") {
      const part1 = link.split("v=");
      if (part1[1].includes("&list")) {
        const part2 = part1[1].split("&list");
        videoId = part2[0];
      } else {
        videoId = part1[1];
      }

      const thumbUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
      return thumbUrl;
    }
  };

  // quando true, carrega o vídeo no lugar da thumbnail
  const [toggleVideo, setToggleVideo] = useState(false);

  return (
    <View style={{ marginBottom: 20 }}>
      <VideoView>
        {toggleVideo ? (
          <>
            {!videoReady && <ActivityIndicator color={theme.green} />}
            <YoutubeIframe
              videoId={extractLink(videoId, "link")}
              height={videoReady ? VIDEO_HEIGHT : 0}
              width={VIDEO_WIDTH - 30}
              onReady={() => {
                setVideoReady(true);
              }}
              onFullScreenChange={onFullScreenChange}
            />
          </>
        ) : (
          <TouchableOpacity
            onPress={() => setToggleVideo(!toggleVideo)}
            style={{ height: "100%", width: "100%", backgroundColor: "#000" }}
          >
            <Image
              source={{ uri: extractLink(thumb, "thumb") }}
              style={{ height: "100%", width: "100%" }}
            />
          </TouchableOpacity>
        )}
      </VideoView>
      <View
        style={{
          backgroundColor: theme.green,
          flexDirection: "row",
          gap: 15,
          padding: 10,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}
      >
        <ParagraphDark style={{ fontSize: 36, fontWeight: "bold" }}>
          #{Number(id) + 1}
        </ParagraphDark>
        <View style={{ paddingRight: 50, width: 360 }}>
          <ParagraphDark>{title}</ParagraphDark>
        </View>
      </View>
    </View>
  );
};

export default VideoListItem;
