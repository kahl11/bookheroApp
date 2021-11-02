import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENDPOINT } from "@env";

export const getUserData = async ():Promise<{school: string, username: string} | null> => {
  var data = null;
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (token !== null) {
      data = fetch(`${ENDPOINT}/getUserData`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          return { school: json.school, username: json.username };
        })
        .catch((error) => {
          console.error(error);
          return null;
        });
    }
  } catch (e) {
    // error reading value
  }
  return data;
};
