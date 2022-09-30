import React, { useState, useContext } from "react";
import { StyleSheet, Vibration, ActivityIndicator } from "react-native";
import {
  SafeArea,
  StyledText,
  Container,
  StyledImage,
  StyledPressable,
  StyledInput,
} from "./StyledComponents";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { FirebaseLogin, LoginnValidate } from "../../@types";
import { login } from "../firebase/firebase";
import { AppContext } from "../context/AppContext";

type LoginParams = {
  Login: any;
};

type Props = NativeStackScreenProps<LoginParams, "Login">;

export default function Login({}: Props) {
  const { authenticate } = useContext(AppContext);

  // STTATES
  const [loginVal, setLoginVal] = useState<FirebaseLogin>({
    email: "",
    password: "",
  });
  const [loginValidate, setLoginValidate] = useState<LoginnValidate>({
    email: false,
    password: false,
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoginValChagne = (name: string) => (val: any) => {
    setLoginVal({ ...loginVal, [name]: val });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setLoginValidate({ password: false, email: false });

      if (!loginVal?.email?.length) {
        setLoginValidate({ email: true, password: false });

        throw new Error("Email Required");
      }

      if (loginVal?.email?.includes(" ")) {
        setLoginValidate({ email: true, password: false });
        throw new Error("Invalid Email, Please Provide Valid Email");
      }

      if (
        !loginVal?.email?.includes("@") ||
        !loginVal?.email.includes(".com")
      ) {
        setLoginValidate({ email: true, password: false });
        throw new Error("Invalid Email, Please Provide Valid Email");
      }

      if (!loginVal?.password?.length) {
        setLoginValidate({ email: false, password: true });
        throw new Error("Password Required");
      }

      const res = await login({ ...loginVal });
      // console.log(res);

      setLoading(false);
      //@ts-ignore
      authenticate({ user: res?.user, userEmail: res?.userEmail });
    } catch (err) {
      //@ts-ignore
      if (err?.message?.toLowerCase()?.includes("(auth/user-not-found)")) {
        console.log(true);
        setErrorMessage("No User Found With This Credentials");
        Vibration.vibrate();
        setLoading(false);

        return;
      }
      // console.log(err);
      Vibration.vibrate();
      //@ts-ignore
      setErrorMessage(err?.message);
      setLoading(false);
    }
  };

  return (
    <SafeArea>
      <Container className="w-full h-full flex items-center justify-center bg-white relative">
        <StyledImage
          source={require("../../assets/images/login-bg-2.jpg")}
          className="w-full h-full absolute"
        />
        <Container className="w-full h-full justify-center items-center flex">
          <Container className="w-full justify-center flex items-center mb-28">
            <StyledText className="font-semibold  text-[50px] text-gray-800 ">
              Welcome Back
            </StyledText>
            <StyledText className="  text-lg text-gray-800 ">
              Login to your account
            </StyledText>
          </Container>
          <Container className="w-full flex justify-center items-center px-10 gap-5">
            <Container className="w-full flex ">
              <StyledText className="text-red-500 text-xs font-medium">
                {errorMessage}
              </StyledText>
            </Container>
            <Container
              className={`w-full flex flex-row bg-gray-200 items-center transition duration-300 px-2 py-2 rounded-md gap-4 border-[0.5px] ${
                loginValidate?.email && "border-red-500 border-[1px]"
              }`}
            >
              <MaterialIcons name="email" size={20} color="#6b7280" />
              <StyledInput
                onChangeText={handleLoginValChagne("email")}
                placeholder="Email"
                value={loginVal.email}
                className="w-full"
              />
            </Container>
            <Container
              className={`w-full flex flex-row bg-gray-200 items-center px-2 py-2 transition duration-300 rounded-md gap-4 border-[0.5px] ${
                loginValidate?.password && "border-red-500 border-[1px]"
              }`}
            >
              <MaterialCommunityIcons
                name="form-textbox-password"
                size={20}
                color="#6b7280"
              />
              <StyledInput
                placeholder="Password"
                className="w-full"
                value={loginVal.password}
                secureTextEntry
                onChangeText={handleLoginValChagne("password")}
              />
            </Container>
          </Container>
          <StyledPressable
            onPress={handleSubmit}
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
                {loading ? (
                  <ActivityIndicator
                    color="#fff"
                    size="large"
                    style={{ height: 30, width: 30 }}
                  />
                ) : (
                  "Login"
                )}
              </StyledText>
            </LinearGradient>
          </StyledPressable>
        </Container>
      </Container>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
