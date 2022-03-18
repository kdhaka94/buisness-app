import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../config/colors";

export const LinkButton = ({ text = "Button", textStyle = {}, ...props }) => {
  const textStyles = [styles.linkBtnText, textStyle];
  return (
    <TouchableOpacity {...props}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkBtnText: {
    color: colors.text_primary,
    fontSize: 22,
    fontFamily: "Montserrat",
    marginTop: 9,
    textAlign: "center",
  },
});
