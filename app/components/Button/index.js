import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../config/colors";

export const Button = ({
  text = "Button",
  btnStyle = {},
  textStyle = {},
  ...props
}) => {
  const btnStyles = [styles.loginBtn, btnStyle];
  const textStyles = [styles.loginBtnText, textStyle];
  return (
    <TouchableOpacity style={btnStyles} {...props}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginBtn: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.primary,
    borderRadius: 6,
    marginTop: 25,
    marginBottom: 10,
  },
  loginBtnText: {
    color: colors.background,
    width: "100%",
    textAlign: "center",
    fontFamily: "Montserrat",
    fontSize: 17,
  },
  button: {
    width: "100%",
    height: 50,
  },
});
