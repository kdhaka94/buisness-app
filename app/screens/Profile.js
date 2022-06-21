import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import { AuthContext } from '../../App';
import { Button } from '../components/Button';
import colors from '../config/colors';
import screenName from '../config/screenName';

export const MyProfile = ({ navigation }) => {
  return (
    <AuthContext.Consumer>
      {({ state: { user }, authContext: { signOut } }) => (
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.navbar}>
            <Text style={styles.navbarText}>My Profile</Text>
          </View>
          <View style={styles.container}>
            <ScrollView>
              <View style={styles.buttonsContainer}>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoText}>Name: </Text>
                  <Text style={styles.infoTextView}>
                    {!!user.username ? user.username : '-'}
                  </Text>
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoText}>GST Number: </Text>
                  <Text style={styles.infoTextView}>
                    {!!user.gstNumber ? user.gstNumber : '-'}
                  </Text>
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoText}>Email: </Text>
                  <Text style={styles.infoTextView}>
                    {!!user.email ? user.email : '-'}
                  </Text>
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoText}>Mobile Number: </Text>
                  <Text style={styles.infoTextView}>
                    {!!user.mobileNumber ? user.mobileNumber : '-'}
                  </Text>
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoText}>PAN Number: </Text>
                  <Text style={styles.infoTextView}>
                    {!!user.panNumber ? user.panNumber : '-'}
                  </Text>
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoText}>Trade Name: </Text>
                  <Text style={styles.infoTextView}>
                    {!!user.tradeName ? user.tradeName : '-'}
                  </Text>
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoText}>Area Of Buisness: </Text>
                  <Text style={styles.infoTextView}>
                    {!!user.areaOfBuisness ? user.areaOfBuisness : '-'}
                  </Text>
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoText}>Start Year: </Text>
                  <Text style={styles.infoTextView}>
                    {!!user.startYear ? user.startYear : '-'}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={styles.buttonsContainer}>

            <Button
              onPress={() => {
                navigation.navigate(screenName.UpdateUserProfileScreen);
              }}
              text="Update Profile"
            />

            <Button
              onPress={() => {
                signOut();
              }}
              text="Logout"
            />
          </View>
        </SafeAreaView>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  infoText: {
    color: colors.black,
    fontFamily: 'Montserrat',
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  infoTextView: {
    color: colors.black,
    fontFamily: 'Montserrat',
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600'
  },
  infoTextContainer: {
    borderColor: colors.black,
    padding: 3,
    marginBottom: 4,
    borderRadius: 5,
    borderBottomWidth: 1
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
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  buttonsContainer: {
    marginRight: 30,
    marginLeft: 30,
  },
  dashboardText: {
    color: colors.black,
    fontFamily: 'Montserrat',
    fontSize: 37,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dashboardSubText: {
    color: colors.black,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
  },
});
