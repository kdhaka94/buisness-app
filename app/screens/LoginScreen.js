import * as SecureStore from 'expo-secure-store';
import { useContext, useState } from "react";
import {
  Dimensions, Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text, View
} from "react-native";
import { AuthContext } from "../../App";
import { request } from "../../utils/request";
import { Button } from "../components/Button";
import { LinkButton } from "../components/LinkButton";
import { TextInput } from "../components/TextInput";
import colors from "../config/colors";
import screenName from "../config/screenName";


export const LoginScreen = ({ navigation }) => {
  const dimensions = Dimensions.get("screen");
  const { authContext: { signIn } } = useContext(AuthContext);

  const [values, setValues] = useState({ mobileNumber: "", password: "" });

  const handleValuesChange = (e, val) => {
    setValues({ ...values, [e]: val });
  };

  const handleLogin = async () => {
    // navigation.navigate(screenName.Dashboard);
    try {
      const response = await request({ uri: `/auth/signin`, body: values })
      await SecureStore.setItemAsync('access_token', response.access_token) ?? ''
      const token = await SecureStore.getItemAsync('access_token') ?? ''
      const userresponse = await request({ uri: '/user/me' });
      signIn({ token, user: userresponse })
    } catch (err) {
      console.log({ err })
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        hidden={false}
        barStyle="dark-content"
      />
      <Text style={styles.welcomeText}>Welcome</Text>
      <View>
        <Text style={styles.loginText}>Login</Text>
        <TextInput
          placeholder="Mobile Number*"
          onChangeText={(e) => handleValuesChange("mobileNumber", e)}
          keyboardType="numeric"
          value={values.mobileNumber}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(e) => handleValuesChange("password", e)}
          value={values.password}
        />
        <Button onPress={() => handleLogin()} text="Login" />
        <View style={styles.linksContainer}>
          <LinkButton
            onPress={() => navigation.navigate(screenName.Login)}
            text="Forgot Password?"
          />
          <LinkButton
            onPress={() => navigation.navigate(screenName.SignUp)}
            text="New User?"
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
