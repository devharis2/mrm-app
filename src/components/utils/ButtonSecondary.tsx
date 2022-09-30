import React, { useState } from "react";
import { Container, StyledPressable, StyledText } from "../StyledComponents";

import { MaterialIcons } from "@expo/vector-icons";
import { ButtonSecondaryProps } from "../../../@types";

const ButtonSecondary = ({ onPress, title, Icon }: ButtonSecondaryProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const handlePressIn = () => setToggle(true);
  const handlePressOut = () => setToggle(false);

  return (
    <StyledPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className={`w-full flex flex-row items-center justify-between p-2 rounded-md mb-6 ${
        toggle && "bg-gray-300"
      }`}
    >
      <Container className="flex flex-row items-center gap-4">
        {Icon}
        <StyledText className="text-base font-semibold">{title}</StyledText>
      </Container>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
    </StyledPressable>
  );
};

export default ButtonSecondary;
