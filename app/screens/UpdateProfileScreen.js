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
} from "react-native";

import colors from "../config/colors";
import { TextInput } from "../components/TextInput";
import { useState } from "react";
import { Button } from "../components/Button";
import { LinkButton } from "../components/LinkButton";
import screenName from "../config/screenName";
export const UpdateProfileScreen = ({ navigation }) => {
  const dimensions = Dimensions.get("screen");

  const [values, setValues] = useState({
    gstNumber: "",
    panNumber: "",
    typeOfBuisness: "",
    areaOfBuisness: "",
    startYear: "",
    address: "",
  });

  const handleValuesChange = (e, val) => {
    setValues({ ...values, [e]: val });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>Hello, Kuldeep</Text>
      </View>
      <View style={styles.subcontainer}>
        <Text style={styles.welcomeText}>Update Profile</Text>
        <View>
          <TextInput
            placeholder="GST Number*"
            onChangeText={(e) => handleValuesChange("gstNumber", e)}
            value={values.gstNumber}
          />
          <TextInput
            placeholder="PAN Number*"
            onChangeText={(e) => handleValuesChange("panNumber", e)}
            keyboardType="numeric"
            value={values.panNumber}
          />
          <TextInput
            placeholder="Type of buisness"
            onChangeText={(e) => handleValuesChange("typeofBuisness", e)}
            value={values.typeofBuisness}
          />
          <TextInput
            placeholder="Area of buisness*"
            onChangeText={(e) => handleValuesChange("areaOfBuisness", e)}
            value={values.areaOfBuisness}
          />
          <TextInput
            placeholder="Buisness start year*"
            onChangeText={(e) => handleValuesChange("startYear", e)}
            value={values.startYear}
          />
          <TextInput
            placeholder="Address of buisness*"
            onChangeText={(e) => handleValuesChange("address", e)}
            value={values.address}
          />
          <Button
            text="Make Payment"
            onPress={() => navigation.navigate(screenName.Dashboard)}
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
    flex: 1,
    justifyContent: "space-evenly",
  },
  subcontainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginRight: 60,
    marginLeft: 60,
    flex: 1,
    justifyContent: "space-evenly",
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
