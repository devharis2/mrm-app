import React, { useRef, useState, useContext } from "react";
import { StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import { Container, SafeArea, StyledText } from "./StyledComponents";

type LandingParams = {
  Landing: any;
  Login: any;
};

type Props = NativeStackScreenProps<LandingParams, "Landing">;

const zoomOut = {
  0: {
    top: 1,
  },
  0.5: {
    top: 10,
  },
  1: {
    top: 1,
  },
};

export default function Landing({ navigation }: Props) {
  const animation = useRef(null);
  const [swipeUp, setSwipeUp] = useState<number>(0);

  // navigations
  const handleLoginNavigate = () => navigation.navigate("Login");

  return (
    <SafeArea className="w-full h-full flex">
      <LinearGradient
        colors={["#F4942D", "#D82830", "#BE3482", "#483A80"]}
        start={{
          x: 0,
          y: -0.5,
        }}
        end={{
          x: 0.4,
          y: 1,
        }}
        style={styles.container}
      >
        <Container className="w-full items-center flex flex-col h-[70%] gap-10 py-10 relative">
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 350,
              height: 350,
              backgroundColor: "transaprent",
              position: "absolute",
              bottom: 120,
              right: -6,
              opacity: 0.4,
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require("../../assets/lottie/lottie-1.json")}
          ></LottieView>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.image}
          />
          <Container
            onTouchStart={(e) => setSwipeUp(e.nativeEvent.pageY)}
            onTouchEnd={(e) => {
              if (swipeUp - e.nativeEvent.pageY > 30) {
                handleLoginNavigate();
                console.log("Swiped up");
              }
            }}
            className="w-full items-center flex h-full flex-col justify-between pb-10"
          >
            <Container className="gap-4 mt-32 flex items-center">
              <Animatable.View
                animation={zoomOut}
                iterationCount="infinite"
                direction="alternate"
                style={styles.animatedBtn}
                duration={2000}
              >
                <AntDesign name="arrowup" size={20} color="white" />
              </Animatable.View>
              <StyledText className="text-white font-">
                Swipe up to login
              </StyledText>
            </Container>
            <Container className="w-full flex justify-between px-10 flex-row">
              <StyledText className="font- text-white uppercase">
                Digital
              </StyledText>
              <StyledText className="font- text-white uppercase">|</StyledText>
              <StyledText className="font- text-white uppercase">
                Social
              </StyledText>
              <StyledText className="font- text-white uppercase">|</StyledText>
              <StyledText className="font- text-white uppercase">
                Creative
              </StyledText>
            </Container>
          </Container>
        </Container>
      </LinearGradient>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 120,
    width: 260,
  },

  buttonSize: {
    width: 40,
    height: 20,
  },
  roundedLinear: {
    height: "100%",
    width: "100%",
    borderRadius: 100,
  },
  animatedBtn: {
    height: 40,
    width: 40,
    backgroundColor: "#fff",
    borderRadius: 100,
    opacity: 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
});
