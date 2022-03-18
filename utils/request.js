import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { SERVER_URL } from './constants';

export const request = async ({ uri, requestMethod = 'POST', body = {} }) => {
  const token = await SecureStore.getItemAsync('access_token') ?? ''
  const data = await fetch(SERVER_URL + uri, {
    method: requestMethod,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  })
  const response = await data.json()
  console.log({ response })
  if (response.hasOwnProperty('error')) {
    Alert.alert(
      "Error",
      response.message,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
    throw new Error(response.message)
  }
  return response;

}





