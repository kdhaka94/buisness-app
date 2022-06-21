import * as SecureStore from 'expo-secure-store';
import { useContext, useState } from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { AuthContext } from '../../App';
import { request } from '../../utils/request';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';
import colors from '../config/colors';

export const UpdateProfileScreen = ({ navigation, route }) => {
  const dimensions = Dimensions.get('screen');
  const { authContext: { signIn, setUser } } = useContext(AuthContext);
  const { userData } = route.params;
  const [values, setValues] = useState({
    ...userData,
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

  const signUpAndMakePayment = async () => {
    try {
      
      const response = await request({ uri: '/auth/signup', body: values });
      (await SecureStore.setItemAsync('access_token', response.access_token)) ??
        '';
      const token = (await SecureStore.getItemAsync('access_token')) ?? '';
      signIn({ token });
      // set the user
      const userresponse = await request('/user/me');
      setUser({ user: userresponse });
    } catch (error) {
      console.log({ error });
    }
    // navigation.navigate(screenName.Dashboard)
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => signUpAndMakePayment()}>
          <Text style={styles.navbarText}>Skip &gt;</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.subcontainer}>
        <Text style={styles.welcomeText}>Update Profile</Text>
        <View>
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
          <Button text="Make Payment" onPress={() => signUpAndMakePayment()} />
          <TouchableOpacity style={styles.paylaterBtn}>
            <Text style={styles.paylaterBtnText}>Pay Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  paylaterBtn: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  paylaterBtnText: {
    color: colors.primary,
    width: "100%",
    textAlign: "center",
    fontFamily: "Montserrat",
    fontSize: 17,
  },
  button: {
    width: "100%",
    height: 50,
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
  loginText: {
    color: colors.text_primary,
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 33,
    marginBottom: 10,
  },
  linksContainer: {
    display: 'flex',
    justifyContent: 'center',
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
