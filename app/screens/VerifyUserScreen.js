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
import { LinkButton } from "../components/LinkButton";
import { LoadingIndicator } from "../components/loading";
import { TextInput } from "../components/TextInput";
import colors from "../config/colors";


export const VerifyUserScreen = ({ navigation }) => {
  const dimensions = Dimensions.get("screen");
  const { authContext: { setUser } } = useContext(AuthContext);

  const [values, setValues] = useState({ otp: "" });
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(0)
  const handleValuesChange = (e, val) => {
    setValues({ ...values, [e]: val });
  };

  React.useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        await request({ uri: `/user/sendVerificationCode`, body: values });
      } catch (err) {
        console.log({ err })
      } finally {
        setLoading(false)
      }
    })()
    return () => {
      setLoading(false)
    }
  }, [])

  const verifyUser = async () => {
    setLoading(true)
    try {
      const response = await request({ uri: `/user/verifyMe`, body: values });
      console.log({ response })
      const userresponse = await request({ uri: '/user/me' });
      setUser({ user: userresponse })
    } catch (err) {
      setLoading(false)
    }
  }

  const resendCode = async () => {
    setLoading(true)
    try {
      await request({ uri: `/user/sendVerificationCode`, body: values });
    } catch (err) {
      console.log({ err })

    } finally {
      setLoading(false)
    }
  }

  return (<>
    {loading && <LoadingIndicator />}
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
        <LinkButton onPress={() => resendCode()}
          text="Resend" />
      </View>
    </SafeAreaView>
  </>
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
