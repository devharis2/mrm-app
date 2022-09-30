import React, { useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as Animate from "react-native-animatable";

import {
  Container,
  StyledImage,
  StyledPressable,
  StyledText,
  StyledInput,
} from "./StyledComponents";
import { LinearGradient } from "expo-linear-gradient";

const Animation = {
  0: {
    bottom: -100,
  },

  1: {
    bottom: 0,
  },
};

export default function MyProfile() {
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const showModal = () => setShowPicker(true);
  const hideModal = () => setShowPicker(false);

  const handleImageGallery = async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
  };

  const handleCamera = async () => {
    await ImagePicker.launchCameraAsync({});
  };

  // console.log(result);

  return (
    <SafeAreaView>
      <Container className="w-full h-full flex items-center justify-center relative">
        <StyledImage
          source={require("../../assets/images/settings-bg.png")}
          className="absolute"
        />
        <Container className="w-full h-full  flex items-center flex-col justify-between">
          <Container className="flex flex-col items-center">
            <StyledPressable
              onPress={showModal}
              className="w-[200px] h-[200px] bg-black rounded-full mt-[20%] relative"
            >
              <StyledImage
                source={require("../../assets/images/profile-image-2.jpg")}
                className="w-full h-full rounded-full"
              />
              <Container className="w-[65px] h-[65px] absolute bg-white rounded-full bottom-0 right-0 flex items-center justify-center">
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
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <MaterialCommunityIcons
                    name="camera-image"
                    size={32}
                    color="#fff"
                  />
                </LinearGradient>
              </Container>
            </StyledPressable>
            <StyledText className="mt-6 text-white font-semibold text-[30px]">
              Haris Iqbal
            </StyledText>
            <StyledText className=" text-white/60 font-semibold text-sm ">
              Full Stack Developer
            </StyledText>
          </Container>
          <Container className="bg-white h-[50%] w-full  rounded-tr-[25px] rounded-tl-[25px] flex px-10 pt-10 flex-col gap-4 gap-y-5 items-center ">
            <Container className="w-full flex flex-row bg-gray-200 items-center px-2 py-2 transition duration-300 rounded-md gap-4 border-[0.5px]">
              <AntDesign name="edit" size={20} color="#6b7280" />
              <StyledInput className="w-full" placeholder="Full Name" />
            </Container>
            <Container className="w-full flex flex-row bg-gray-200 items-center px-2 py-2 transition duration-300 rounded-md gap-4 border-[0.5px]">
              <MaterialIcons name="email" size={20} color="#6b7280" />
              <StyledInput className="w-full" placeholder="Email Address" />
            </Container>
            <Container className="w-full flex flex-row bg-gray-200 items-center px-2 py-2 transition duration-300 rounded-md gap-4 border-[0.5px]">
              <AntDesign name="tags" size={24} color="#6b7280" />
              <StyledInput className="w-full" placeholder="Role" />
            </Container>
            <StyledPressable className="w-full h-[60px] rounded-full px-10">
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
                  {false ? (
                    <ActivityIndicator
                      color="#fff"
                      size="large"
                      style={{ height: 30, width: 30 }}
                    />
                  ) : (
                    "Save"
                  )}
                </StyledText>
              </LinearGradient>
            </StyledPressable>
          </Container>
        </Container>
        {showPicker && (
          <Animate.View
            animation={Animation}
            duration={500}
            style={styles.modal}
          >
            <LinearGradient
              colors={["#fff", "#fff"]}
              start={{
                x: -0.1,
                y: -0.9,
              }}
              end={{
                x: 0.4,
                y: 1,
              }}
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                flexDirection: "column",
                justifyContent: "center",
                paddingHorizontal: 10,
              }}
            >
              <StyledPressable
                onPress={handleCamera}
                className="w-full flex flex-row items-center rounded-md bg-gray-200 p-4"
              >
                <AntDesign name="camera" size={24} color="#6b7280" />
                <StyledText className="text-gray-700 ml-2 font-medium">
                  Take Photo
                </StyledText>
              </StyledPressable>
              <StyledPressable
                onPress={handleImageGallery}
                className="w-full flex flex-row items-center rounded-md bg-gray-200 p-4 mt-2"
              >
                <Entypo name="image-inverted" size={24} color="#6b7280" />
                <StyledText className="text-gray-700 ml-2 font-medium">
                  Pick From Gallery
                </StyledText>
              </StyledPressable>
              <StyledPressable
                onPress={hideModal}
                className="w-full flex flex-row items-center rounded-md bg-gray-200 p-4 mt-2"
              >
                <MaterialIcons name="cancel" size={24} color="#6b7280" />
                <StyledText className="text-gray-700 ml-2 font-medium">
                  Cancel
                </StyledText>
              </StyledPressable>
            </LinearGradient>
          </Animate.View>
        )}
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    height: 230,
    backgroundColor: "black",
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "column",
  },
});
