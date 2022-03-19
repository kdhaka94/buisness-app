import React from "react";
import {
  FlatList,
  Image,
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
import { TextInput } from "../components/TextInput";

export const reps = {
  gstNumber: "GST Number",
  email: "Email",
  panNumber: 'PAN Number',
  tradeName: 'Buisness Name',
  mobileNumber: "Mobile Number"
}

export const SearchSelectCustomer = ({ navigation }) => {
  const [selectionCriteria, setSelectionCriteria] = React.useState('gstNumber');
  const [selectionId, setSelectionId] = React.useState("")
  const pickerRef = React.useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }
  
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>Search Customer</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.heading}>Selection criteria</Text>
        <Picker
          selectedValue={selectionCriteria}
          onValueChange={(itemValue, itemIndex) =>
            setSelectionCriteria(itemValue)
          }
          ref={pickerRef}
          prompt="Choose selection criteria"
          style={styles.input}
          accessibilityLabel="Styled Picker Accessibility Label"
        >
          <Picker.Item label="GST Number" value="gstNumber" />
          <Picker.Item label="PAN Number" value="panNumber" />
          <Picker.Item label="Mobile Number" value="mobileNumber" />
          <Picker.Item label="Email ID" value="email" />
          {/* <Picker.Item label="DIN Number" value="dinNumber" /> */}
          <Picker.Item label="Buisness Name" value="tradeName" />
          {/* <Picker.Item label="Individual Name" value="name" /> */}
        </Picker>
        {selectionCriteria &&
          <TextInput
            placeholder={`Enter ${reps[selectionCriteria]}`}
            onChangeText={(e) => setSelectionId(e)}
            value={selectionId}
          />
        }
      </View>
      <View style={styles.buttonsContainer}>

        <Button
          onPress={() => navigation.navigate(screenName.SearchCustomer, { selectionBy: selectionCriteria, selectionId })}
          text="Search Customer"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    // justifyContent: "space-between",
  },
  buttonsContainer: {
    marginRight: 60,
    marginLeft: 60,
    marginBottom: 100,
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
