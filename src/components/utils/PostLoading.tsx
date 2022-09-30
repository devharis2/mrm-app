import React from "react";
import { StyleSheet, View } from "react-native";
import { Container } from "../StyledComponents";

import * as Animate from "react-native-animatable";

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

export default () => (
  <Animate.View
    animation={PulseAnimation}
    easing="ease-in"
    iterationCount="infinite"
    style={styles.animateContainer}
  >
    <View style={styles.topBar}>
      <Container className="flex flex-row items-center gap-2">
        <Container className="w-[40px] h-[40px] rounded-full bg-white/70" />
        <Container className="flex flex-col gap-2">
          <Container className="w-[60px] h-[10px] rounded-xl bg-white/70" />
          <Container className="w-[100px] h-[10px] rounded-xl bg-white/70" />
        </Container>
      </Container>
    </View>
    <Container className="p-4 flex flex-col">
      <Container className="w-[100px] h-[12px] rounded-xl bg-white/70" />
      <Container className="w-full h-[60%] bg-gray-300 rounded-md mt-4 mb-4"></Container>
      <Container className="flex flex-row justify-between gap-10 w-full pr-10">
        <Container className="w-[50%] h-[50px] rounded-xl bg-white/70 " />
        <Container className="w-[50%] h-[50px] rounded-xl bg-white/70 " />
      </Container>
    </Container>
  </Animate.View>
);

const styles = StyleSheet.create({
  animateContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: 400,
    backgroundColor: "#e5e7eb",
    marginBottom: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  topBar: {
    width: "100%",
    height: "20%",
    backgroundColor: "#d1d5db",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
