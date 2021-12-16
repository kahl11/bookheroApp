import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSignedIn = async (): Promise<boolean> => {
    let token = await AsyncStorage.getItem("userToken");
    if (token) return true;
    return false;
};