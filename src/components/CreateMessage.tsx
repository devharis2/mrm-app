import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as Animate from "react-native-animatable";

import {
  Container,
  StyledImage,
  StyledInput,
  StyledPressable,
  StyledText,
} from "./StyledComponents";
import { Queries } from "../queries";
import { TeamsProps, CreateMessagProps } from "../../@types";

const PulseAnimation = {
  0: {
    opacity: 0.9,
  },

  0.5: {
    opacity: 0.5,
  },

  1: {
    opacity: 1,
  },
};

type messageProps = {
  Settings: any;
  MyProfile: any;
  AddPost: any;
};

type props = NativeStackScreenProps<messageProps, "AddPost">;

const CreateMessage = ({ navigation }: props) => {
  const { data: teamsDB, loading: fetchingTeams } = useQuery(Queries.FETCHTEAM);
  const [createMessage, { loading: creatingPost }] = useMutation(
    Queries.CREATEPOST
  );

  // States
  const [teams, setTeams] = useState<Array<TeamsProps>>([]);
  const [message, setMessage] = useState<CreateMessagProps>({
    message: null,
    greetings: "Hi Team",
    type: null,
  });
  const [error, setError] = useState(null);

  const [messageFullScreen, setShowMessageFullScreen] =
    useState<boolean>(false);

  useEffect(() => {
    setTeams(teamsDB?.users);
  }, [teamsDB]);

  const handleCategory = (type: "NOTIFICATION" | "HOLIDAY") => () => {
    setMessage({
      ...message,
      type,
    });
  };
  const messageChange = (type: "message" | "greetings") => (text: any) => {
    setMessage({ ...message, [type]: text });
  };

  const handleBack = () => {
    if (messageFullScreen) {
      setShowMessageFullScreen(false);
      return;
    }

    navigation.navigate("Settings");
  };

  const handleMessageFull = (val: boolean) => () => {
    setShowMessageFullScreen(val);
  };

  const renderTeams = () => {
    const array = new Array(10);

    if (fetchingTeams) {
      return (
        <FlatList
          data={array}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={(data) => {
            return (
              <Animate.View
                style={styles.imageLoader}
                animation={PulseAnimation}
                easing="ease-in"
                iterationCount="infinite"
              />
            );
          }}
        />
      );
    }

    return (
      <FlatList
        data={teams}
        renderItem={(data) => {
          if (data?.item?.image) {
            return (
              <StyledImage
                source={{ uri: data?.item?.image }}
                className="w-[50px] h-[50px] rounded-full ml-2"
              />
            );
          }

          return (
            <StyledImage
              source={require("../../assets/images/profile-image.jpg")}
              className="w-[50px] h-[50px] rounded-full bg-black ml-2"
            />
          );
        }}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  const handlePost = async () => {
    try {
      if (!message?.type) {
        throw new Error("Please Select Type*");
      }

      if (!message?.greetings) {
        throw new Error("Greetings Required*");
      }

      if (!message?.message) {
        throw new Error("Message Required*");
      }

      createMessage({
        variables: {
          input: {
            message: message?.message,
            greetings: message?.greetings,
            regards: "regards",
            senderId: "25f421e4-f33e-4015-89d8-e36d31ff9642",
            type: message?.type,
          },
        },
      });

      setMessage({
        message: null,
        type: null,
        greetings: "Hi Team",
      });
    } catch (err) {
      console.log(err);
      setError(err?.message);
    }
  };

  return (
    <SafeAreaView>
      <Container className="w-full h-full  py-12 px-5">
        <Container className="w-full flex flex-row justify-between items-center ">
          <StyledPressable
            onPress={handleBack}
            className="w-[40px] h-[40px] rounded-full bg-black flex items-center justify-center"
          >
            <Ionicons name="chevron-back-outline" size={24} color="#fff" />
          </StyledPressable>
          <StyledText className="text-2xl font-semibold">
            {messageFullScreen ? "Write" : "Create"} Message
          </StyledText>
          <Container className="w-[40px] h-[40px] rounded-full bg-black flex items-center justify-center">
            <MaterialCommunityIcons
              name="bell-outline"
              size={24}
              color="#fff"
            />
          </Container>
        </Container>
        {messageFullScreen ? (
          <Container>
            <Container
              className={`w-full flex flex-col bg-gray-200 items-center px-2 py-2 transition duration-300 rounded-md gap-4 border-[0.5px] mt-10 h-[200px]`}
            >
              <StyledInput
                placeholder="Message"
                className="w-full"
                multiline
                onFocus={handleMessageFull(true)}
                onBlur={handleMessageFull(false)}
                onChangeText={messageChange("message")}
                value={message.message}
                autoFocus

                // value={loginVal.password}
                // onChangeText={handleLoginValChagne("password")}
              />
            </Container>
            <StyledPressable
              onPress={handleMessageFull(false)}
              className="w-[120px] h-[45px] rounded-full mt-10 "
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
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  borderRadius: 100,
                }}
              >
                <StyledText className="text-white font-semibold">
                  Done
                </StyledText>
              </LinearGradient>
            </StyledPressable>
          </Container>
        ) : (
          <Container className="mt-10 flex flex-col justify-between h-full">
            <Container>
              <Container className="flex flex-row items-center gap-2">
                <StyledText className="text-2xl font-semibold">
                  Category
                </StyledText>
              </Container>
              <Container className="w-full gap-2 flex flex-row  mt-4 ">
                <StyledPressable
                  onPress={handleCategory("NOTIFICATION")}
                  className=""
                >
                  {message?.type === "NOTIFICATION" ? (
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
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 6,
                      }}
                    >
                      <StyledText className="text-white">
                        Annoucements
                      </StyledText>
                    </LinearGradient>
                  ) : (
                    <StyledPressable
                      onPress={handleCategory("NOTIFICATION")}
                      className="px-4 py-2 rounded-md bg-black"
                    >
                      <StyledText className="text-white">
                        Annoucements
                      </StyledText>
                    </StyledPressable>
                  )}
                </StyledPressable>
                <StyledPressable
                  onPress={handleCategory("HOLIDAY")}
                  className=""
                >
                  {message?.type === "HOLIDAY" ? (
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
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 6,
                      }}
                    >
                      <StyledText className="text-white">Holiday</StyledText>
                    </LinearGradient>
                  ) : (
                    <StyledPressable
                      onPress={handleCategory("HOLIDAY")}
                      className="px-4 py-2 rounded-md bg-black"
                    >
                      <StyledText className="text-white">Holiday</StyledText>
                    </StyledPressable>
                  )}
                </StyledPressable>
              </Container>
              <Container className="w-full flex flex-col mt-10 px-2">
                <StyledText className="font-semibold">Greetings</StyledText>
                <Container
                  className={`w-full flex flex-row bg-gray-200 items-center px-2 py-2 transition duration-300 rounded-md gap-4 border-[0.5px] mt-4`}
                >
                  <FontAwesome name="handshake-o" size={20} color="#6b7280" />
                  <StyledInput
                    placeholder="Greetings"
                    className="w-full"
                    // value={loginVal.password}
                    // onChangeText={handleLoginValChagne("password")}
                    value={message?.greetings}
                    onChangeText={messageChange("greetings")}
                  />
                </Container>
              </Container>
              <Container className="w-full flex flex-col mt-10 px-2">
                <StyledText className="font-semibold">Message</StyledText>
                <Container
                  className={`w-full flex flex-row bg-gray-200 items-center px-2 py-2 transition duration-300 rounded-md gap-4 border-[0.5px] mt-4`}
                >
                  <StyledInput
                    placeholder="Message"
                    className="w-full"
                    onFocus={handleMessageFull(true)}
                    onBlur={handleMessageFull(false)}
                    value={message.message}

                    // value={loginVal.password}
                    // onChangeText={handleLoginValChagne("password")}
                  />
                </Container>
              </Container>
            </Container>
            <Container className="w-full flex flex-col mb-14 justify-start">
              <Container>
                <StyledText className="text-red-500 font-semibold mb-2">
                  {error}
                </StyledText>
                <StyledPressable
                  onPress={handlePost}
                  className="w-[120px] h-[45px] rounded-full mb-5"
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
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                      borderRadius: 100,
                    }}
                  >
                    <StyledText className="text-white font-semibold">
                      {creatingPost ? (
                        <ActivityIndicator color="#fff" size={25} />
                      ) : (
                        "Post"
                      )}
                    </StyledText>
                  </LinearGradient>
                </StyledPressable>
              </Container>

              <StyledText className="text-black font-semibold text-lg">
                Team MRMSoft
              </StyledText>
              <Container className="w-full flex flex-row mt-2 gap-x-4">
                {renderTeams()}
              </Container>
            </Container>
          </Container>
        )}
      </Container>
    </SafeAreaView>
  );
};

export default CreateMessage;

const styles = StyleSheet.create({
  imageLoader: {
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: "#d1d5db",
    marginLeft: 2,
  },
});
