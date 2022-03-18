import React from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity, Alert
} from "react-native";
import { request } from "../../utils/request";
import { Button } from "../components/Button";
import colors from "../config/colors";

export const ReportCustomer = ({ navigation, route }) => {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true)
  const { selectionBy = 'mobileNumber', selectionId = '2' } = route.params;
  React.useEffect(() => {
    (async () => {
      const data = await request({ uri: '/user/searchUser', body: { selectionId, selectionBy } })
      setUsers(data)
      setIsLoading(false)
    })()
  }, [])

  const renderItem = ({ item }) => <User {...item} key={item.id} />;
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>Report Customer</Text>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.dashboardText}>{isLoading ? 'Searching...' : users.length + " Results found"}</Text>
        </View>
        <View style={styles.vDividerContainer}>
          <View style={styles.vDivider} />
        </View>
        <View style={styles.hDivider} />
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
const User = ({ name, email, gstNumber, id }) => {

  const reportUser = async () => {
    try {
      const response = await request({ uri: '/user/reportUser', body: { userId: id } })
      Alert.alert(
        "Success",
        "Person reported successfully",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    } catch (err) {
      Alert.alert(
        "Error",
        err.message,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  }
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
      <TouchableOpacity onPress={() => reportUser()}>
        <Text style={userStyles.reportText}>REPORT</Text>
      </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "Montserrat",
    fontWeight: "600",

  },
  reportText: {
    color: "#D32F2F",
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
    fontWeight: "400",
  },
  gstNumber: {},
  infoContainer: {
    marginLeft: 10,
  },
});
