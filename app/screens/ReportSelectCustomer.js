import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../config/colors";
import { Picker } from "@react-native-picker/picker";
import { Button } from "../components/Button";
import screenName from "../config/screenName";
import { reps } from "./SearchSelectCustomer";
import { TextInput } from "../components/TextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const ReportSelectCustomer = ({ navigation }) => {
  const [values, setValues] = useState({
    gstNumber: '',
    panNumber: '',
    typeOfBuisness: '',
    addressOfBuisness: '',
    startYear: '',
    address: '',
  });
  const handleValuesChange = (e, val) => {
    setValues({ ...values, [e]: val });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>Report Customer</Text>
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <TextInput
            placeholder="GST Number*"
            onChangeText={(e) => handleValuesChange('gstNumber', e)}
            value={values.gstNumber}
          />
          <TextInput
            placeholder="PAN Number*"
            onChangeText={(e) => handleValuesChange('panNumber', e)}
            value={values.panNumber}
          />
          <TextInput
            placeholder="Type of buisness"
            onChangeText={(e) => handleValuesChange('typeOfBuisness', e)}
            value={values.typeOfBuisness}
          />
          <TextInput
            placeholder="Area of buisness*"
            onChangeText={(e) => handleValuesChange('addressOfBuisness', e)}
            value={values.addressOfBuisness}
          />
          <TextInput
            placeholder="Buisness start year*"
            onChangeText={(e) => handleValuesChange('startYear', e)}
            value={values.startYear}
          />
          <TextInput
            placeholder="Address of buisness*"
            onChangeText={(e) => handleValuesChange('address', e)}
            value={values.address}
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.buttonsContainer}>
        <Button
          // onPress={() => navigation.navigate(screenName.ReportCustomer, { selectionBy: selectionCriteria, selectionId })}
          onPress={() => Alert.alert('Report Customer', 'Report has been succussfully submited!')}
          text="Report Customer"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardcontainer: {
    flex: 1
  },
  input: {
    borderRadius: 8,
    paddingBottom: 9,
    borderWidth: 3,
    paddingTop: 9,
    borderColor: colors.black,
    paddingLeft: 17,
    // margin: 15,
    fontSize: 17,
    fontFamily: "Montserrat",
  },
  heading: {
    fontSize: 17,
    fontFamily: "Montserrat",
    color: colors.black
  },
  hDivider: {
    borderWidth: 1,
    borderColor: "#000",
  },
  vDividerContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  vDivider: {
    height: 40,
    borderLeftColor: "#000",
    borderLeftWidth: 2,
  },

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
    marginTop: 42,
    padding: 10
  },
  buttonsContainer: {
    marginRight: 60,
    marginLeft: 60,
  },
  dashboardText: {
    color: colors.black,
    fontFamily: "Montserrat",
    fontSize: 27,
    width: "100%",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 29,
  },
  dashboardSubText: {
    color: colors.black,
    fontFamily: "Montserrat",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "500",
  },
});
const userIcon = require("../assets/user1.png");
const User = ({ name, email, gstNumber }) => {
  return (
    <View style={userStyles.container}>
      <View style={userStyles.subContainer}>
        <Image
          source={userIcon}
          height={36}
          width={36}
          style={userStyles.userImg}
        />
        <View style={userStyles.infoContainer}>
          <Text style={userStyles.email}>{email}</Text>
          <Text style={userStyles.gstNumber}>GST NUMBER #{gstNumber}</Text>
        </View>
      </View>
    </View>
  );
};

const userStyles = StyleSheet.create({
  userImg: {
    height: 40,
    width: 40,
  },
  container: {
    display: "flex",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
  },
  email: {
    color: colors.black,
    fontFamily: "Montserrat",
    fontSize: 15,
    width: "100%",
    textAlign: "center",
    fontWeight: "400",
  },
  gstNumber: {},
  infoContainer: {
    marginLeft: 10,
  },
});
