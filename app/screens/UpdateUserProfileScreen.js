import * as SecureStore from 'expo-secure-store';
import React, { useContext, useState } from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { AuthContext } from '../../App';
import { request } from '../../utils/request';
import { Button } from '../components/Button';
import { LoadingIndicator } from '../components/loading';
import { TextInput } from '../components/TextInput';
import colors from '../config/colors';
import screenName from '../config/screenName';

const template = {
  username: "Name",
  mobileNumber: "Mobile Number",
  email: "Email",
  gstNumber: "Gst Number",
  panNumber: "Pan Number",
  designation: "Designation",
  tradeName: "Trade Name",
  startYear: "Start Year",
  addressOfBuisness: "Address Of Buisness",
  typeOfBuisness: "Type Of Buisness",
}

export const UpdateUserProfileScreen = ({ navigation }) => {
  const { state, authContext } = useContext(AuthContext)

  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    ...state.user
  });


  const handleValuesChange = (e, val) => {
    setValues({ ...values, [e]: val });
  };

  const handleUpdateProfile = async () => {
    setLoading(true)
    try {
      const updateduser = await request({ uri: '/user/updateProfile', body: values })
      authContext.setUser({ user: updateduser })
      navigation.navigate(screenName.Profile)
    } catch (err) {
      console.log({ err })
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <LoadingIndicator />}
      <SafeAreaView style={styles.container}>
        <View style={styles.navbar}>
          <Text style={styles.navbarText}>Update Your Profile</Text>
        </View>
        <View style={styles.subcontainer}>
          {/* <View> */}
          <ScrollView>
            {Object.keys(template).map(key => <TextInput
              placeholder={template[key]}
              onChangeText={(e) => handleValuesChange(key, e)}
              value={values[key]}
            />)}
          </ScrollView>
          <Button text="Update Profile" onPress={() => handleUpdateProfile()} />
          {/* </View> */}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 50,
    backgroundColor: '#001674',
    width: '100%',
    justifyContent: 'center',
    // alignItems: "center",
  },
  navbarText: {
    color: colors.background,
    fontFamily: 'Montserrat',
    marginLeft: 34,
    textAlign: 'left',
    fontSize: 21,
    fontWeight: '500',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    justifyContent: 'space-evenly',
  },
  subcontainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    marginRight: 60,
    marginLeft: 60,
    flex: 1,
    justifyContent: 'space-evenly',
  },

  welcomeText: {
    color: colors.black,
    fontFamily: 'Montserrat',
    fontSize: 37,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

// npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
