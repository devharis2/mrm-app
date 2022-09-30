import React, { useState, useContext } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Entypo } from "@expo/vector-icons";

import { ButtonSecondary } from "./utils/index";

import {
  Container,
  StyledText,
  StyledImage,
  StyledPressable,
} from "./StyledComponents";
import { LinearGradient } from "expo-linear-gradient";
import { AppContext } from "../context/AppContext";

type compProps = {
  Settings: any;
  MyProfile: any;
  AddPost: any;
};

type props = NativeStackScreenProps<compProps, "Settings">;

export default function Settings({ navigation }: props) {
  const { LogoutMe } = useContext(AppContext);

  const [loading, setLoading] = useState<boolean>(false);

  const navigateMyProfile = () => navigation.navigate("MyProfile");
  const navigateAddPost = () => navigation.navigate("AddPost");

  const handleLogout = async () => {
    try {
      setLoading(true);
      await LogoutMe();
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <Container className="w-full h-full flex items-center justify-center">
        <StyledImage
          source={require("../../assets/images/settings-bg.png")}
          className="absolute"
        />
        <Container className="w-full h-full  flex items-center flex-col justify-between">
          <Container className="flex flex-col items-center">
            <Container className="w-[200px] h-[200px] bg-black rounded-full mt-[20%]">
              <StyledImage
                source={require("../../assets/images/profile-image-2.jpg")}
                className="w-full h-full rounded-full"
              />
            </Container>
            <StyledText className="mt-6 text-white font-semibold text-[30px]">
              Haris Iqbal
            </StyledText>
            <StyledText className=" text-white/60 font-semibold text-sm ">
              Full Stack Developer
            </StyledText>
          </Container>
          <Container className="bg-white h-[55%] w-full  rounded-tr-[25px] rounded-tl-[25px] flex px-10 pt-10 mt-4">
            <ButtonSecondary
              Icon={<FontAwesome name="user" size={24} color="black" />}
              title="My Profile"
              onPress={navigateMyProfile}
            />
            <ButtonSecondary
              Icon={
                <MaterialCommunityIcons
                  name="form-textbox-password"
                  size={24}
                  color="black"
                />
              }
              title="Reset Password"
              onPress={undefined}
            />
            <ButtonSecondary
              Icon={<Entypo name="text-document" size={24} color="black" />}
              title="Annoucement"
              onPress={navigateAddPost}
            />
            <ButtonSecondary
              Icon={
                <MaterialCommunityIcons name="cog" size={24} color="black" />
              }
              title="Settings"
              onPress={undefined}
            />
            <StyledPressable
              onPress={handleLogout}
              className="w-full h-[60px] rounded-full mt-5"
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
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                }}
              >
                <StyledText className="text-white font-semibold text-lg">
                  {loading ? (
                    <ActivityIndicator
                      color="#fff"
                      size="large"
                      style={{ height: 30, width: 30 }}
                    />
                  ) : (
                    "Logout"
                  )}
                </StyledText>
              </LinearGradient>
            </StyledPressable>
          </Container>
        </Container>
      </Container>
    </SafeAreaView>
  );
}
