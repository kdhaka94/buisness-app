import React, { useState } from "react";
import { LoginScreen } from "./app/screens/LoginScreen";
import * as Font from "expo-font";
import Apploading from "expo-app-loading";
import { Dashboard } from "./app/screens/Dashboard";
import { SearchCustomer } from "./app/screens/SearchCustomer";
import { ReportCustomer } from "./app/screens/ReportCustomer";
import { SearchSelectCustomer } from "./app/screens/SearchSelectCustomer";
import { SignUpScreen } from "./app/screens/SignUpScreen";
import { UpdateProfileScreen } from "./app/screens/UpdateProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import screenName from "./app/config/screenName";
import { ReportSelectCustomer } from "./app/screens/ReportSelectCustomer";
import { QueryClient, QueryClientProvider } from "react-query";
import * as SecureStore from 'expo-secure-store';
import { request } from "./utils/request";

export const AuthContext = React.createContext();


const getFonts = () =>
  Font.loadAsync({
    Montserrat: require("./app/assets/fonts/Montserrat-Regular.ttf"),
  });

const Stack = createNativeStackNavigator();
const client = new QueryClient()
export default function App() {
  const [fontsloaded, setFontsLoaded] = useState(false);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            isLoading: false
          };
        case 'SET_USER':
          return {
            ...prevState,
            user: action.user
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      user: null
    }
  );
  React.useEffect(() => {
    (async () => {
      try {
        const response = await request('/user/me');
        const token = await SecureStore.getItemAsync('access_token') ?? ''
        dispatch({ type: 'RESTORE_TOKEN', token: token });
        dispatch({ type: 'SET_USER', user: response });
      } catch (err) {
        dispatch({ type: 'SIGN_OUT' });
      }
    })()
  }, [])
  // return <><SignUpScreen /></>


  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: data.token });
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
        dispatch({ type: "SET_USER", user: data.user })
      }
    }),
    []
  );

  React.useEffect(() => {
    console.log({ state })
  }, [state])

  if (state.isLoading) {
    return <></>
  }
  if (fontsloaded) {
    return (
      <QueryClientProvider client={client}>
        <AuthContext.Provider value={authContext} >
          <NavigationContainer>
            {state.isSignout ? <Stack.Navigator
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
            </Stack.Navigator> :
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

              </Stack.Navigator>
            }
          </NavigationContainer>
        </AuthContext.Provider>
      </QueryClientProvider>
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
