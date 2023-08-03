import { TopNavContainer, TopNavIcon } from "./goBackNavStyle";
import { Title } from "../../styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootTabParamsList } from "../../routes/RootRoutes";

type NavigationProp = StackNavigationProp<RootTabParamsList>;

const CloseNav = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <TopNavContainer>
      <TopNavIcon onPress={() => navigation.popToTop()}>
        <Ionicons name="close" size={24} color="#fff" />
      </TopNavIcon>
      <Title style={{ fontWeight: "normal" }}>Fechar</Title>
    </TopNavContainer>
  );
};

export default CloseNav;
