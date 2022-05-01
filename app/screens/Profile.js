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

export const MyProfile = ({ navigation }) => {
  return (
    <AuthContext.Consumer>
      {({ state: { user }, authContext: { signOut } }) =>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.navbar}>
            <Text style={styles.navbarText}>Hello, {user?.username ?? 'User'}</Text>
          </View>
          <View style={styles.container}>
            <View>
              <Text style={styles.dashboardText}>Profile</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <Text style={styles.infoText}>Name: {user.username}</Text>
              <Text style={styles.infoText}>GST Number: {user.gstNumber}</Text>
              <Text style={styles.infoText}>Email: {user.email}</Text>
              <Text style={styles.infoText}>Mobile Number: {user.mobileNumber}</Text>
              <Text style={styles.infoText}>PAN Number: {user.panNumber}</Text>
              <Text style={styles.infoText}>Trade Name: {user.tradeName}</Text>
              <Text style={styles.infoText}>Area Of Buisness: {user.areaOfBuisness}</Text>
              <Text style={styles.infoText}>Start Year: {user.startYear}</Text>
            </View>
          </View>
          <View>
            <Button
              onPress={() => {
                signOut()
              }}
              text="Logout" 
            />
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
  infoText: {
    color: colors.black,
    fontFamily: "Montserrat",
    textAlign: "left",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10
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
    marginRight: 30,
    marginLeft: 30,
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
