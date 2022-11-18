import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { reps } from '../app/screens/SearchSelectCustomer';
import { SERVER_URL } from './constants';

export const request = async ({ uri, requestMethod = 'POST', body = {}, showError = true }) => {
  try {
    const token = await SecureStore.getItemAsync('access_token') ?? ''
    const options = {
      method: requestMethod,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    }
    const url = SERVER_URL + uri
    const data = await fetch(url, options)
    const response = await data.text()
    console.log({ response })
    if (response.hasOwnProperty('message')) {
      {
        if (showError) {
          if (typeof response.message === 'string') {
            Alert.alert(
              "Error",
              response.message,
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          } else {
            let message = response.message.join('\n');
            const keys = Object.keys(reps)
            keys.map((key) => {
              message.replace(key, reps[key])
            })

            Alert.alert(
              "Error",
              message,
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          }
        }
      }
      throw new Error(response.message)
    }
    if (response.hasOwnProperty('success_message')) {
      if (typeof response.success_message === 'string') {
        Alert.alert(
          "",
          response.success_message,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
    }
    return response;
  } catch (error) {
    console.log({ error: JSON.stringify(error) })
    throw new Error(error.message)
  }
}


const handleError = (err) => {

}

// DATABASE_URL: mongodb+srv://kdhaka94:YxALSt9MRDwXiAVH@cluster0.gnzhc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// JWT_SECRET: AZM1

