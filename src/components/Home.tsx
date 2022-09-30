import React, { useEffect, useState, useContext, useMemo } from "react";
import { SafeAreaView, Pressable, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Post, PostLoading } from "./utils/index";
import { useLazyQuery, useQuery } from "@apollo/client";
import * as Animate from "react-native-animatable";

import {
  StyledImage,
  Container,
  StyledText,
  StyledFlatList,
  StyledPressable,
} from "./StyledComponents";
import { Queries } from "../queries";
import { Posts, CurrentUserDatabase } from "../../@types";
import { AppContext } from "../context/AppContext";

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

type HomeProps = {
  Home: any;
  Info: any;
  SettingsStack: any;
};

type Props = NativeStackScreenProps<HomeProps, "Home">;

interface FlatList {
  index: number;
  item: Posts;
  separators: any;
}

export default function Home({ navigation }: Props) {
  const { data, loading, error, refetch } = useQuery(Queries.FETCHHOMEPOSTS, {
    notifyOnNetworkStatusChange: false,
    pollInterval: 1500,
  });
  const [
    fetchCurrentUser,
    { data: curentUserDb, loading: fetchingCurrentUser },
  ] = useLazyQuery(Queries.FETCHCURRENTUSERDB);

  const { authState } = useContext(AppContext);

  // STATES
  const [posts, setPosts] = useState<Array<Posts>>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUserDatabase>({
    id: null,
    fullname: null,
    image: null,
    email: null,
  });
  const [hardRefresh, setHardRefresh] = useState<boolean>(false);

  //memoize
  const memoizeAuthStates = useMemo(() => authState, [authState]);

  //mavigations
  const navigateToProfile = () => navigation.navigate("SettingsStack");

  useEffect(() => {
    setCurrentUser({ ...curentUserDb?.uniqueUser });
  }, [curentUserDb]);

  useEffect(() => {
    if (memoizeAuthStates?.userEmail) {
      console.log("fetching");
      fetchCurrentUser({
        variables: {
          email: memoizeAuthStates?.userEmail,
        },
      });
    }
  }, [memoizeAuthStates]);

  useEffect(() => {
    let subscribed: boolean = false;
    if (subscribed) return;
    setPosts(data?.posts);

    return () => {
      subscribed = true;
    };
  }, [data]);

  const render = () => {
    const arr = new Array(10);

    if (loading || hardRefresh) {
      return (
        <StyledFlatList
          data={arr}
          renderItem={() => <PostLoading />}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      );
    }

    if (posts?.length) {
      return (
        <StyledFlatList
          onRefresh={async () => {
            setHardRefresh(true);
            await refetch();
            setHardRefresh(false);
          }}
          refreshing={loading || hardRefresh}
          data={posts}
          renderItem={(data: FlatList) => (
            <Post
              {...data?.item}
              lastItem={posts?.length - 1 === data?.index}
              user_id={currentUser?.id}
            />
          )}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      );
    }
  };

  const renderTop = () => {
    if (fetchingCurrentUser) {
      return (
        <Animate.View
          animation={PulseAnimation}
          easing="ease-in"
          iterationCount="infinite"
          style={styles.container}
        >
          <Container className="w-[70px] h-[70px] rounded-full bg-gray-300 ml-4" />
          <Container className="flex flex-col gap-2 ml-2 ">
            <Container className="flex w-[100px] rounded-full h-[10px] bg-gray-300"></Container>
            <Container className="flex w-[120px] rounded-full h-[10px] bg-gray-300 " />
          </Container>
        </Animate.View>
      );
    }

    return (
      <StyledPressable
        onPress={navigateToProfile}
        className="flex flex-row items-center gap-2 w-full pb-2"
      >
        <Container className="w-[70px] h-[70px] rounded-full">
          <StyledImage
            source={require("../../assets/images/profile-image.png")}
            className="w-full h-full flex rounded-full "
          />
        </Container>
        <Pressable>
          <Container className="flex">
            <StyledText className="text-lg font-semibold">
              {currentUser?.fullname}
            </StyledText>
            <StyledText className="text-xs font-semibold text-gray-500">
              {currentUser?.email}
            </StyledText>
          </Container>
        </Pressable>
      </StyledPressable>
    );
  };

  return (
    <SafeAreaView>
      <Container className="w-full h-full flex mt-10">
        <Container className="w-full border-b flex">
          <Container className="w-full px-2 flex flex-row justify-between py-4 pt-0 items-center pr-10">
            {renderTop()}

            <Container className="w-[40px] h-[40px] rounded-full ">
              <Ionicons name="notifications" size={24} color="#6b7280" />
            </Container>
          </Container>
        </Container>
        <Container className="w-full flex flex-row justify-center h-full px-6 pt-5">
          {render()}
        </Container>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingBottom: 2,
  },
});
