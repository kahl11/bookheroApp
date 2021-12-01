import AsyncStorage from "@react-native-async-storage/async-storage"
import { ENDPOINT } from "@env";
import moment from "moment";

const axios = require("axios").default;

export const getMessages = async () => {
    let syncString: string | null = await AsyncStorage.getItem("lastSyncId");
    let lastSyncId = 0;
    if (syncString)
        lastSyncId = parseInt(syncString);
    let userToken = await AsyncStorage.getItem("userToken");
    let username = await AsyncStorage.getItem("username");
    let messages = [];
    let messageStorageString: string | null = await AsyncStorage.getItem("messages");
    let messageStorageObject = new Object();
    if (messageStorageString != null) {
        messageStorageObject = JSON.parse(messageStorageString);
    } else {
        messageStorageObject = {};
    }
    if (lastSyncId != null) {
        console.log(lastSyncId)
        messages = await axios.get(`${ENDPOINT}/getMessages?userToken=${userToken}&lastSyncId=${lastSyncId}`);
    } else {
        messages = await axios.get(`${ENDPOINT}/getMessages?userToken=${userToken}`);
    }
    messages = messages.data;
    messages.forEach((message: string[]) => {
        // console.log(message[4])
        if (lastSyncId != null)
            if (parseInt(message[4]) > lastSyncId)
                lastSyncId = parseInt(message[4])
        let sender = message[1];
        let receiver = message[2];
        let partner = "";
        if (sender != username) {
            partner = sender
        } else {
            partner = receiver;
        }
        if (Object.keys(messageStorageObject).includes(partner)) {
            // @ts-ignore this is safe, but typescript doesnt like it
            messageStorageObject[partner] = [...messageStorageObject[partner], message];
        } else {
            // @ts-ignore
            messageStorageObject[partner] = [message];
        }
    });
    for (let key of Object.keys(messageStorageObject)) {
        //@ts-ignore
        let chat: MessageInterface[] = messageStorageObject[key];
        chat.sort(function (a, b) {
            return (moment(a[3], "YYYY-MM-DD,h:mm:ss").toDate() > moment(b[3], "YYYY-MM-DD,H:mm:ss").toDate()) ? 1 : -1;
        })
    }
    if (lastSyncId)
        AsyncStorage.setItem("lastSyncId", lastSyncId.toString())
    AsyncStorage.setItem("messages", JSON.stringify(messageStorageObject));
    // AsyncStorage.multiRemove(["messages","lastSyncId"])
}