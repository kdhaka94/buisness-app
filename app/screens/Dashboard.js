import React from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AuthContext } from "../../App";
import { Button } from "../components/Button";
import colors from "../config/colors";
import screenName from "../config/screenName";

export const Dashboard = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AuthContext.Consumer>
        {state => <>
          {console.log(state)}
          <View style={styles.navbar}>
            <Text style={styles.navbarText}>Hello, </Text>
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
                onPress={() => navigation.navigate(screenName.Dashboard)}
                text="My Profile"
              />
              <Button
                onPress={() => navigation.navigate(screenName.Dashboard)}
                text="Reported By Other"
              />
            </View>
          </View>
        </>
        }
      </AuthContext.Consumer>
    </SafeAreaView>
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
