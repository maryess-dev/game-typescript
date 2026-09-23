type Props = {
  keyboard: KeyboardEvent;
};

export const walkCharacter = ({ keyboard }: Props) => {
  if (keyboard.key == "ArrowDown") {
    alert("down");
  }
};
