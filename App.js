import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Apploading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import screenName from './app/config/screenName';
import {
  Dashboard,
  LoginScreen, MyProfile,
  ReportCustomer, ReportedByCustomer, ReportSelectCustomer,
  SearchCustomer,
  SearchSelectCustomer, SignUpScreen, UpdateProfileScreen
} from './app/screens';
import { UpdateUserProfileScreen } from './app/screens/UpdateUserProfileScreen';
import { VerifyUserScreen } from './app/screens/VerifyUserScreen';
import { request } from './utils/request';

export const AuthContext = React.createContext();

const getFonts = () =>
  Font.loadAsync({
    Montserrat: require('./app/assets/fonts/Montserrat-Regular.ttf'),
  });

const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsloaded, setFontsLoaded] = useState(false);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            user: action.user,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            user: action.user,
          };
        case 'SIGN_OUT':
          (async () => {
            await SecureStore.deleteItemAsync('access_token');
          })();
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            isLoading: false,
            user: null,
          };
        case 'SET_USER':
          return {
            ...prevState,
            user: action.user,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      user: null,
    }
  );
  React.useEffect(() => {
    (async () => {
      try {
        const token = (await SecureStore.getItemAsync('access_token')) ?? '';
        const response = await request({ uri: '/user/me', showError: false });
        dispatch({ type: 'RESTORE_TOKEN', token: token, user: response });
      } catch (err) {
        console.log({ err });
        dispatch({ type: 'SIGN_OUT' });
      }
    })();
  }, []);
  // return <><SignUpScreen /></>

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        console.log({ data });

        dispatch({ type: 'SIGN_IN', token: data.token, user: data.user });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: data.token });
      },
      setUser: async (data) => {
        dispatch({ type: 'SET_USER', user: data.user });
        // if (!data.user.isPaymentDone) {
        //   await makePayemnt();
        // }
      },
    }),
    []
  );

  if (state.isLoading) {
    return <></>;
  }
  if (fontsloaded) {
    console.log({ state });
    return (
      <AuthContext.Provider value={{ state, authContext }}>
        <NavigationContainer>
          {false ? (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name={screenName.Login} component={LoginScreen} />
              <Stack.Screen name={screenName.SignUp} component={SignUpScreen} />
              <Stack.Screen
                name={screenName.UpdateProfileScreen}
                component={UpdateProfileScreen}
              />
            </Stack.Navigator>
          ) : false ? (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name={screenName.VerifyUser}
                component={VerifyUserScreen}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name={screenName.Dashboard} component={Dashboard} />
              <Stack.Screen
                name={screenName.ReportCustomer}
                component={ReportCustomer}
              />
              <Stack.Screen
                name={screenName.SearchCustomer}
                component={SearchCustomer}
              />
              <Stack.Screen
                name={screenName.SearchSelectCustomer}
                component={SearchSelectCustomer}
              />
              <Stack.Screen
                name={screenName.ReportSelectCustomer}
                component={ReportSelectCustomer}
              />
              <Stack.Screen name={screenName.Profile} component={MyProfile} />
              <Stack.Screen
                name={screenName.ReportedByCustomer}
                component={ReportedByCustomer}
              />
              <Stack.Screen
                name={screenName.UpdateUserProfileScreen}
                component={UpdateUserProfileScreen}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    );
  } else {
    return (
      <Apploading
        startAsync={getFonts}
        onFinish={() => {
          setFontsLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }
}
