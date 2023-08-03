// REGULAR IMPORTS
import { StatusBar } from "expo-status-bar";
import { View, ScrollView, Dimensions, FlatList } from "react-native";

//REDUX IMPORTS
import { useDispatch } from "react-redux";
import { setSelectedPlaylist } from "../../redux/selectedPlaylist";
import { TouchableOpacity } from "react-native-gesture-handler";

//NAVIGATION IMPORTS
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PlaylistsParamList } from "../../routes/RootRoutes";

//CUSTOM IMPORTS
import { playlists } from "../../data/videos";
import { MainContainerForScroll, Title, theme } from "../../styles/styles";
import PlaylistItem from "../../components/PlaylistItem/PlaylistItem";

type Props = StackNavigationProp<PlaylistsParamList, "Playlists">;

const PlaylistScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<Props>();

  // navigate to the videos of the selected playlist
  const goToVideos = (playlistToRender: string) => {
    dispatch(setSelectedPlaylist(playlistToRender));
    navigation.navigate("Videos");
  };

  return (
    <MainContainerForScroll>
      <StatusBar />
      <ScrollView>
        <View style={{ paddingTop: 50 }}></View>
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

        <Title style={{ fontSize: 46, marginBottom: 20, marginHorizontal: 20 }}>Playlists</Title>

        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          data={playlists}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => goToVideos(item.playlistToRender)}>
                <PlaylistItem
                  title={item.nome}
                  img={item.img}
                  videosCount={item.videoList.length}
                />
              </TouchableOpacity>
            );
          }}
          scrollEnabled={false}
          style={{ marginHorizontal: 15 }}
        />
      </ScrollView>
    </MainContainerForScroll>
  );
};

export default PlaylistScreen;
