import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  // ToastAndroid,
} from "react-native";

import colors from "../config/colors";
import { TextInput } from "../components/TextInput";
import { useState } from "react";
import { Button } from "../components/Button";
import { LinkButton } from "../components/LinkButton";
import screenName from "../config/screenName";

// import { signUpSchema_1 } from "../dataschema/user";
export const SignUpScreen = ({ navigation }) => {
  const dimensions = Dimensions.get("screen");

  const [values, setValues] = useState({
    mobileNumber: "",
    password: "",
    username: "",
    email: "",
    designation: "",
    tradeName: "",
  });

  const handleValuesChange = (e, val) => {
    setValues({ ...values, [e]: val });
  };

  const handleSignup = async () => {
    navigation.navigate(screenName.UpdateProfileScreen, { userData: values });
    // showMsg("Hello There!");
  };

  // const showMsg = (msg) => {
  //   ToastAndroid.show(msg, ToastAndroid.LONG);
  // };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        hidden={false}
        barStyle="dark-content"
      />
      {/* <Text style={styles.welcomeText}>Let’s Get You Setup</Text> */}
      <View>
        <Text style={styles.loginText}>SignUp</Text>
        <TextInput
          placeholder="Name*"
          onChangeText={(e) => handleValuesChange("username", e)}
          value={values.username}
        />
        <TextInput
          placeholder="Mobile Number*"
          onChangeText={(e) => handleValuesChange("mobileNumber", e)}
          keyboardType="numeric"
          value={values.mobileNumber}
        />
        <TextInput
          placeholder="Password*"
          onChangeText={(e) => handleValuesChange("password", e)}
          value={values.password}
        />
        <TextInput
          placeholder="Email"
          onChangeText={(e) => handleValuesChange("email", e)}
          value={values.email}
        />
        <TextInput
          placeholder="Designation"
          onChangeText={(e) => handleValuesChange("designation", e)}
          value={values.designation}
        />
        <TextInput
          placeholder="Trade Name"
          onChangeText={(e) => handleValuesChange("tradeName", e)}
          value={values.tradeName}
        />
        <Button onPress={() => handleSignup()} text="Get Started" />
        <View style={styles.linksContainer}>
          <LinkButton
            onPress={() => navigation.navigate(screenName.Login)}
            text="Already a user?"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginRight: 60,
    marginLeft: 60,
    flex: 1,
    justifyContent: "space-evenly",
  },
  loginText: {
    color: colors.text_primary,
    fontFamily: "Montserrat",
    fontWeight: "600",
    fontSize: 33,
    marginBottom: 10,
  },
  linksContainer: {
    display: "flex",
    justifyContent: "center",
  },

  welcomeText: {
    color: colors.black,
    fontFamily: "Montserrat",
    fontSize: 37,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
  },
});
