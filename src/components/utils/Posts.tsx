import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import * as Animate from "react-native-animatable";

import {
  Container,
  StyledImage,
  StyledPressable,
  StyledText,
} from "../StyledComponents";
import type { Posts as PostType } from "../../../@types";

const Animation = {
  0: {
    width: 0,
  },
  1: {
    width: 300,
  },
};

export default function Posts({
  Sender,
  createdAt,
  message,
  regards,
  greetings,
  lastItem,
  user_id,
  Acknowledgements,
  type,
}: PostType) {
  const [acknowledge, setAcknowLedge] = useState(false);

  const handleClick = () => {
    setAcknowLedge(true);
  };

  useEffect(() => {
    const isExisted = Acknowledgements.find((el) => el?.id === user_id);
    if (isExisted) {
      setAcknowLedge(true);
      return;
    }
  }, [user_id]);

  return (
    <Container
      className={`w-full bg-gray-300 rounded-t-[25px] h-[400px] rounded-b-md flex flex-col mb-10 ${
        lastItem && "mb-60"
      }`}
    >
      <Container className="w-full h-[20%] rounded-t-[25px]">
        <LinearGradient
          colors={
            type === "NOTIFICATION"
              ? ["#F4942D", "#D82830", "#BE3482"]
              : ["#475569", "#334155"]
          }
          start={{
            x: -0.1,
            y: -0.9,
          }}
          end={{
            x: 0.4,
            y: 1,
          }}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <Container className="w-full h-full flex flex-row items-center justify-between px-4 rounded-b-md">
            <Container className="flex flex-row items-center gap-2">
              <Container className="w-[50px] h-[50px] rounded-full bg-white">
                <StyledImage
                  source={require("../../../assets/images/profile-image.jpg")}
                  className="flex h-full w-full rounded-full"
                />
              </Container>
              <Container className="flex flex-col">
                <StyledText className="font-semibold text-white text-base">
                  {Sender?.fullname}
                </StyledText>
                <StyledText className="text-white text-xs">
                  {Sender?.role}
                </StyledText>
              </Container>
            </Container>
            <StyledText className="text-white">
              {new Date(parseInt(createdAt))?.toDateString()}
            </StyledText>
          </Container>
        </LinearGradient>
      </Container>
      <Container className="w-full h-[80%] flex  justify-between p-4 gap-2 ">
        <Container className="w-full flex flex-col gap-5 h-[75%]">
          <StyledText className="font-medium text-gray-600">
            {greetings},
          </StyledText>
          <StyledText className="font-medium text-gray-600">
            {message}
          </StyledText>
          <Container className="w-full flex flex-col">
            <StyledText className="font-medium text-gray-600">
              Regards
            </StyledText>
            <StyledText className="font-medium text-gray-600">
              {Sender?.fullname}
            </StyledText>
            <StyledText className="font-medium text-gray-600">
              {Sender?.role}
            </StyledText>
          </Container>
        </Container>
        <Container style={{ flex: 1, flexDirection: "row" }} className="gap-2">
          {acknowledge ? (
            <Animate.View
              animation={Animation}
              duration={500}
              style={{ width: "100%", borderRadius: 100 }}
            >
              <LinearGradient
                colors={
                  type === "NOTIFICATION"
                    ? ["#F4942D", "#D82830", "#BE3482"]
                    : ["#475569", "#334155"]
                }
                start={{
                  x: -0.1,
                  y: -0.9,
                }}
                end={{
                  x: 0.4,
                  y: 1,
                }}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 100,
                }}
              >
                <AntDesign name="checkcircle" size={24} color="#fff" />
              </LinearGradient>
            </Animate.View>
          ) : (
            <React.Fragment>
              <StyledPressable
                onPress={handleClick}
                className="w-[50%]  rounded-full"
              >
                <LinearGradient
                  colors={["#F4942D", "#D82830", "#BE3482"]}
                  start={{
                    x: -0.1,
                    y: -0.9,
                  }}
                  end={{
                    x: 0.4,
                    y: 1,
                  }}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 100,
                  }}
                >
                  <StyledText className="text-white font-semibold text-base">
                    Acknowledge
                  </StyledText>
                </LinearGradient>
              </StyledPressable>
              <Container className="w-[50%] rounded-full bg-gray-600 flex items-center justify-center">
                <StyledText className="text-base text-white font-semibold">
                  Disagree
                </StyledText>
              </Container>
            </React.Fragment>
          )}
        </Container>
      </Container>
    </Container>
  );
}
