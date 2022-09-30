import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  SafeArea,
  StyledText,
  Container,
  StyledImage,
  StyledPressable,
} from "./StyledComponents";
import { GetStartedTabs } from "../../@types";

const SlideLeft = {
  0: {
    left: -110,
    opacity: 0,
  },
  0.5: {
    left: 10,
    opacity: 1,
  },
  1: {
    left: 0,
    opacity: 1,
  },
};

const SlideLeft2 = {
  0: {
    left: -100,
    opacity: 0,
  },
  0.5: {
    left: 10,
    opacity: 1,
  },
  1: {
    left: 0,
    opacity: 1,
  },
};

const SlideLeft3 = {
  0: {
    left: -105,
    opacity: 0,
  },
  0.5: {
    left: 10,
    opacity: 1,
  },
  1: {
    left: 0,
    opacity: 1,
  },
};

type HomeProps = {
  Info: any;
  App: any;
};

type Props = NativeStackScreenProps<HomeProps, "Info">;

export default function Info({ navigation }: Props) {
  const [tabs, setTabs] = useState<GetStartedTabs>({
    first: true,
    second: false,
    third: false,
  });

  // NAVIGATIONS
  const navigateHome = () => navigation.navigate("App");

  const handlePresse = () => {
    console.log("pressing button");

    if (tabs.first) {
      setTabs({
        first: false,
        second: true,
        third: false,
      });
      return;
    }

    if (tabs.second) {
      setTabs({
        first: false,
        second: false,
        third: true,
      });

      return;
    }

    if (tabs.third) {
      console.log("navigate to home");
      navigateHome();
    }
  };

  const renderText = () => {
    if (tabs?.first) {
      return (
        <Animatable.View
          animation={SlideLeft}
          iterationCount={1}
          direction="alternate"
          duration={2000}
        >
          <StyledText className="font-semibold text-[30px] text-center text-gray-700">
            MRMSoft Management Notification
          </StyledText>
          <StyledText className="text-lg text-center mt-4 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            distinctio doloremque voluptas quisquam iure culpa nihil at ab
            porro.
          </StyledText>
        </Animatable.View>
      );
    }

    if (tabs?.second) {
      return (
        <Animatable.View
          animation={SlideLeft2}
          direction="alternate"
          duration={2000}
          iterationCount={1}
        >
          <StyledText className="font-semibold text-[30px] text-center text-gray-700">
            MRMSoft Management Employees
          </StyledText>
          <StyledText className="text-lg text-center mt-4 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequatur eos maiores sapiente repellendus aut omnis. Minus nemo,
          </StyledText>
        </Animatable.View>
      );
    }
    if (tabs?.third) {
      return (
        <Animatable.View
          animation={SlideLeft3}
          iterationCount={1}
          direction="alternate"
          duration={2000}
        >
          <StyledText className="font-semibold text-[30px] text-center text-gray-700">
            MRMSoft Management HR
          </StyledText>
          <StyledText className="text-lg text-center mt-4 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            quos voluptatibus vitae ut, aut sequi molestias qui ex fugiat non
            molliti
          </StyledText>
        </Animatable.View>
      );
    }
  };

  return (
    <SafeArea>
      <Container className="w-full h-full items-center justify-center relative">
        {tabs?.first && (
          <StyledImage
            className="w-full h-full absolute"
            source={require("../../assets/images/management-1.jpg")}
          />
        )}
        {tabs?.second && (
          <StyledImage
            className="w-full h-full absolute"
            source={require("../../assets/images/employees.jpg")}
          />
        )}
        {tabs?.third && (
          <StyledImage
            className="w-full h-full absolute"
            source={require("../../assets/images/HR.jpg")}
          />
        )}

        <Container className="w-full h-full flex justify-end  ">
          <Container className="w-full bg-white h-[55%] rounded-t-[25px] flex py-10 items-center px-4">
            <Container className="gap-3 w-full flex items-center mb-8 flex-row justify-center">
              <Container className="w-12 h-2 rounded-full bg-gray-200">
                {tabs?.first && (
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
                      borderRadius: 100,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                )}
              </Container>
              <Container className="w-12 h-2 rounded-full bg-gray-300">
                {tabs?.second && (
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
                      borderRadius: 100,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                )}
              </Container>
              <Container className="w-12 h-2 rounded-full bg-gray-300">
                {tabs?.third && (
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
                      borderRadius: 100,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                )}
              </Container>
            </Container>
            {renderText()}

            <StyledPressable
              onPress={handlePresse}
              className="w-full h-[60px] rounded-full px-10 mt-20"
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
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <StyledText className="text-white font-semibold text-lg">
                  {tabs?.third ? "Get Started" : "Next"}
                </StyledText>
              </LinearGradient>
            </StyledPressable>
          </Container>
        </Container>
      </Container>
    </SafeArea>
  );
}
