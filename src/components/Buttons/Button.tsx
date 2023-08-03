import { ButtonBg } from "./style";
import { ParagraphDark } from "../../styles/styles";

interface IButton {
  title: string;
  onPressButton: () => void;
}

const Button = ({ onPressButton, title = "Button placeholder" }: IButton) => {
  return (
    <ButtonBg onPress={onPressButton}>
      <ParagraphDark>{title}</ParagraphDark>
    </ButtonBg>
  );
};

export default Button;
