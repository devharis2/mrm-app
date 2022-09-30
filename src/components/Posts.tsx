import React, { useEffect, useState, useContext, useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  Posts as PostType,
  CurrentUserDatabase,
  FiltersProps,
} from "../../@types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  Container,
  StyledText,
  StyledPressable,
  StyledFlatList,
} from "./StyledComponents";
import { Post as PostCard, PostLoading } from "./utils/index";
import { Queries } from "../queries";
import { AppContext } from "../context/AppContext";

type PostsProps = {
  Home: any;
  Posts: any;
};

type Props = NativeStackScreenProps<PostsProps, "Posts">;

interface FlatList {
  index: number;
  item: PostType;
  separators: any;
}

export default function Posts({}: Props) {
  const { authState } = useContext(AppContext);

  const { data, loading, error, refetch } = useQuery(Queries.FETCHALLPOSTS, {
    notifyOnNetworkStatusChange: true,
  });
  const [
    fetchCurrentUser,
    { data: currentUserDb, loading: fetchingCurrentDb },
  ] = useLazyQuery(Queries.FETCHCURRENTUSERDB, {});
  const [fetchChatFilter, { data: chatFiltersDb, loading: chatFilterLoading }] =
    useLazyQuery(Queries.CHATFILTERS);

  const [posts, setPosts] = useState<Array<PostType>>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUserDatabase>({
    email: null,
    id: null,
    fullname: null,
    image: null,
  });
  const [filters, setFilters] = useState<FiltersProps>({
    type: null,
  });

  const memoizeAuthState = useMemo(() => authState, [authState]);

  useEffect(() => {
    setPosts(data?.allPostsAsc);
  }, [data]);

  useEffect(() => {
    console.log(chatFiltersDb);
    console.log("chat filters db")
    if (!chatFiltersDb?.postFilters?.length) return;

    setPosts(chatFiltersDb?.postFilters);
  }, [chatFiltersDb]);

  useEffect(() => {
    setCurrentUser({ ...currentUserDb?.uniqueUser });
  }, [currentUserDb]);

  useEffect(() => {
    console.log(memoizeAuthState);
    console.log("post auth states");
    if (!memoizeAuthState?.userEmail) return;

    fetchCurrentUser({
      variables: {
        email: memoizeAuthState?.userEmail,
      },
    });
  }, [memoizeAuthState]);

  useEffect(() => {
    if (filters?.type) {
      console.log("filters type");
      fetchChatFilter({
        variables: {
          chatType: filters?.type,
        },
      });
    }
  }, [filters.type]);

  const handleFilters = (type: "HOLIDAY" | "NOTIFICATION") => () => {
    if (filters.type === type) {
      setFilters({ ...filters, type: null });
      return;
    }
    setFilters({ ...filters, type });
  };

  const render = () => {
    const arr = new Array(10);

    if (loading || chatFilterLoading) {
      return (
        <StyledFlatList
          data={arr}
          renderItem={() => <PostLoading />}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ padding: 25 }}
        />
      );
    }

    if (posts?.length) {
      return (
        <StyledFlatList
          onRefresh={refetch}
          refreshing={loading || chatFilterLoading}
          data={posts}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={(data: FlatList) => (
            <PostCard
              {...data?.item}
              lastItem={posts?.length - 1 === data?.index}
              user_id={currentUser?.id}
            />
          )}
          style={{ padding: 25 }}
        />
      );
    }
  };

  return (
    <SafeAreaView>
      <Container className="w-full h-full flex mt-10 flex-col">
        <Container className="w-full flex flex-row pr-4 justify-end">
          <StyledPressable className="w-[100px] h-[40px] rounded-full ">
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
              <StyledText className="text-white font-semibold">
                {" "}
                Filters
              </StyledText>
            </LinearGradient>
          </StyledPressable>
        </Container>
        <Container className="w-full  flex mt-10 flex-row justify-center pb-4 ">
          <Container className="flex flex-row gap-2 items-center mr-4">
            <StyledPressable
              onPress={handleFilters("HOLIDAY")}
              className="w-[20px] h-[20px] bg-gray-700 rounded-full"
            >
              {filters?.type === "HOLIDAY" && (
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
                />
              )}
            </StyledPressable>
            <StyledPressable onPress={handleFilters("HOLIDAY")}>
              <StyledText
                className={`font-semibold ${
                  filters?.type === "HOLIDAY" ? "text-pink-700" : "text-black"
                }`}
              >
                Holidays
              </StyledText>
            </StyledPressable>
          </Container>
          <Container className="flex flex-row gap-2 items-center">
            <StyledPressable
              onPress={handleFilters("NOTIFICATION")}
              className="w-[20px] h-[20px] bg-gray-700 rounded-full"
            >
              {filters?.type === "NOTIFICATION" && (
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
                />
              )}
            </StyledPressable>
            <StyledPressable onPress={handleFilters("NOTIFICATION")}>
              <StyledText
                className={`font-semibold ${
                  filters?.type === "NOTIFICATION"
                    ? "text-pink-700 "
                    : "text-black"
                }`}
              >
                Annoucements
              </StyledText>
            </StyledPressable>
          </Container>
        </Container>
        {render()}
      </Container>
    </SafeAreaView>
  );
}
