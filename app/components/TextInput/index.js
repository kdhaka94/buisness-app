import React from "react";
import { StyleSheet, TextInput as NativeTextInput } from "react-native";
import colors from "../../config/colors";

export const TextInput = ({ style = {}, ...props }) => {
  const custom_style = [styles.input, style];
  return <NativeTextInput style={custom_style} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    borderColor: colors.secondary,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingBottom: 9,
    borderWidth: 3,
    paddingTop: 9,
    paddingLeft: 17,
    marginTop: 9,
    marginBottom: 9,
    width: "100%",
    fontSize: 17,
    fontFamily: "Montserrat",
  },
});
