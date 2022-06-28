import React, { useContext } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AuthContext } from "../../App";
import { request } from "../../utils/request";
import { Button } from "../components/Button";
import colors from "../config/colors";
import screenName from "../config/screenName";
import * as AllInOneSDKManager from 'paytm_allinone_react-native'
import { Alert } from 'react-native';

export const Dashboard = ({ navigation }) => {
  const { authContext: { setUser } } = useContext(AuthContext);

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
          const me = await request({ uri: '/user/me' });
          setUser({ user: me })

        }
        return;

      })

      console.log({ payment_response })
    } catch (errorrr) {
      console.log({ errorrr })
    }

  }

  return (
    <AuthContext.Consumer>
      {context =>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.navbar}>
            <Text style={styles.navbarText}>Hello, {context?.state?.user?.username ?? 'User'}</Text>
          </View>
          <View style={styles.container}>
            <View>
              <Text style={styles.dashboardText}>Dashboard</Text>
              <Text style={styles.dashboardSubText}>What do you want to do?</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <Button
                onPress={() => navigation.navigate(screenName.SearchSelectCustomer)}
                text="Search Customer"
              />
              <Button
                onPress={() => navigation.navigate(screenName.ReportSelectCustomer)}
                text="Report Customer"
              />
              <Button
                onPress={() => navigation.navigate(screenName.Profile)}
                text="My Profile"
              />
              <Button
                onPress={() => navigation.navigate(screenName.ReportedByCustomer)}
                text="Reported By Other"
              />
              {!context?.state?.user?.isPaymentDone &&
                <Button
                  onPress={() => makePayment()}
                  text="Make Payment Now"
                />}
            </View>
          </View>
        </SafeAreaView>
      }
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  navbar: {
    height: 50,
    backgroundColor: "#001674",
    width: "100%",
    justifyContent: "center",
    // alignItems: "center",
  },
  navbarText: {
    color: colors.background,
    fontFamily: "Montserrat",
    marginLeft: 34,
    textAlign: "left",
    fontSize: 21,
    fontWeight: "500",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-evenly",
  },
  buttonsContainer: {
    marginRight: 60,
    marginLeft: 60,
  },
  dashboardText: {
    color: colors.black,
    fontFamily: "Montserrat",
    fontSize: 37,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
  },
  dashboardSubText: {
    color: colors.black,
    fontFamily: "Montserrat",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "500",
  },
});
