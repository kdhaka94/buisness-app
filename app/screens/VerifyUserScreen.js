import React, { useContext, useState } from "react";
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
import { TextInput } from "../components/TextInput";
import colors from "../config/colors";


export const VerifyUserScreen = ({ navigation }) => {
  const dimensions = Dimensions.get("screen");
  const authContext = useContext(AuthContext);

  console.log({ authContext })
  const [values, setValues] = useState({ otp: "" });
  const [timer, setTimer] = useState(0)
  const handleValuesChange = (e, val) => {
    setValues({ ...values, [e]: val });
  };

  React.useEffect(() => {
    (async () => {
      const response = await request({ uri: `/user/sendVerificationCode`, body: values });
    })()
  }, [])

  const verifyUser = async () => {
    try {
      const response = await request({ uri: `/user/verifyMe`, body: values });
      console.log({ response })
      const userresponse = await request({ uri: '/user/me' });
      authContext.authContext.setuser({ user: userresponse })
    } catch (err) {

    }
  }

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
        <Text style={styles.loginText}>Verify</Text>

        <TextInput
          secureTextEntry={true}
          placeholder="OTP"
          onChangeText={(e) => handleValuesChange("otp", e)}
          value={values.otp}
        />
        <Button onPress={() => verifyUser()} text="Verify OTP" />
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
