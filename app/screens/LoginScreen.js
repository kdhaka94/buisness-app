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
import * as AllInOneSDKManager from 'paytm_allinone_react-native'
import { Alert } from 'react-native';
import { LoadingIndicator } from '../components/loading';


export const LoginScreen = ({ navigation }) => {
  const dimensions = Dimensions.get("screen");
  const { authContext: { signIn } } = useContext(AuthContext);
  const [values, setValues] = useState({ mobileNumber: "", password: "" });
  const [loading, setLoading] = useState(false)

  const handleValuesChange = (e, val) => {
    setValues({ ...values, [e]: val });
  };


  const makePayment = async () => {
    try {
      const response = await request({ uri: '/user/paymentToken' });

      console.log({ response })
      const orderDetails = {
        orderId: response.orderId,
        mid: response.mid,
        txnToken: response.txnToken,
        amount: response.txnAmount.value,
        callbackUrl: response.callbackUrl,
        isStaging: true,
        restrictAppInvoke: true,
        urlScheme: "paytmMID" + response.MID
      }
      console.log({ AllInOneSDKManager })
      const payment_response = await AllInOneSDKManager.default.startTransaction(
        orderDetails.orderId,
        orderDetails.mid,
        orderDetails.txnToken,
        orderDetails.amount,
        orderDetails.callbackUrl,
        orderDetails.isStaging,
        orderDetails.restrictAppInvoke,
        orderDetails.urlScheme
      ).then(async (value) => {
        if (value.hasOwnProperty("errorMessage")) {
          Alert.alert("Payment Failed", value.errorMessage,
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          )
          return;
        }
        if (value.STATUS == 'TXN_SUCCESS') {
          const verifyRes = await request({ uri: '/user/verifyPayment', body: { data: JSON.stringify(value) } });
          Alert.alert("Payment Sucess", "Payment done sucessfully",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          )
          console.log({ verifyRes })
          handleLogin();
        }
        return;

      })

      console.log({ payment_response })
    } catch (errorrr) {
      console.log({ errorrr })
    }

  }

  const handleLogin = async () => {
    // navigation.navigate(screenName.Dashboard);
    setLoading(true)
    try {
      const response = await request({ uri: `/auth/signin`, body: values })
      await SecureStore.setItemAsync('access_token', response.access_token) ?? ''
      const token = await SecureStore.getItemAsync('access_token') ?? ''
      const userresponse = await request({ uri: '/user/me' });

      signIn({ token, user: userresponse })

      // if (!userresponse.isPaymentDone) {
      //   await makePayment();
      // }
    } catch (err) {
      console.log({ err })
      setLoading(false)
    }

  };
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
