import { TopNavContainer, TopNavIcon } from "./goBackNavStyle";
import { Title } from "../../styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootTabParamsList } from "../../routes/RootRoutes";

type NavigationProp = StackNavigationProp<RootTabParamsList>;

const GoBackNav = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <TopNavContainer>
      <TopNavIcon onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TopNavIcon>
      <Title style={{ fontWeight: "normal" }}>Voltar</Title>
    </TopNavContainer>
  );
};

export default GoBackNav;
