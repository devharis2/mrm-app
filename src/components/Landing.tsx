import React, { useRef } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { styled } from "tailwindcss-react-native";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";

const Container = styled(View);
const CustomButton = styled(View);
const StyledText = styled(Text);

export default function Landing() {
  const animation = useRef(null);

  return (
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
            opacity: 0.4
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("../../assets/lottie/lottie-1.json")}
        ></LottieView>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.image}
        />
        <Container className="w-full items-center flex pt-32 gap-8">
          <Pressable>
            <CustomButton className="w-[250px] h-[60px] bg-white rounded-full flex items-center justify-center">
              <StyledText className="text-lg font-semibold text-gray-600">
                Login
              </StyledText>
            </CustomButton>
          </Pressable>
          <Pressable>
            <CustomButton className="w-[250px] h-[60px] bg-transparent border border-2 border-white  rounded-full flex items-center justify-center">
              <StyledText className="text-lg font-semibold text-gray-600 text-white">
                Signup
              </StyledText>
            </CustomButton>
          </Pressable>
        </Container>
      </Container>
    </LinearGradient>
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
});
