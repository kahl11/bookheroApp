import React, {useState} from "react";
import { ImageBackground, StyleSheet, Text, View,TextInput, TouchableOpacity, Alert } from "react-native";

export const colors = { 
  pink: "#FF99C9",
  green: "#75D18E",
  black: "#363537",
  blue: "#5296A5",
  brown: "#F5CDA7"
}

const App = () => {
  const [text, setText] = useState('');
  // const onPress = () => ;
  return(
  <View style={styles.container}>
    <ImageBackground source={require('./assets/images/books.jpg')} style={styles.image}>
      <View style={styles.login}>
      <Text style={styles.title}>Book Heroes</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <View style={styles.row}>
      <TouchableOpacity
        style={[styles.loginButton, styles.customerLogin]}
        // onPress={onPress}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.loginButton, styles.heroLogin]}
        // onPress={onPress}
      >
        <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>
      </View>
      </View>
    </ImageBackground>
  </View>
);
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  title: {
    paddingTop: 30,
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase"
  },
  login: {
    backgroundColor: "rgba(50,50,50,0.7)",
    marginLeft: "10%",
    marginRight: "10%",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 3

  },
  input: {
    marginTop: "10%",
    width: "80%",
    backgroundColor: "white",
    height: 40,
    borderRadius: 3,
    paddingLeft: 10,
  },
  loginButton: {
    marginTop: "10%",
    marginLeft: "2%",
    marginRight: "2%",
    width: "38%",
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    paddingTop: 12,
    borderRadius: 3,
  },
  loginButtonText: {
    fontWeight: "600",
    color: "#fefefe",
    textTransform: "uppercase",
    fontSize: 12,
    textAlign: "center"
  },
  register:{
    marginBottom: 50,
    width: "80%",
    backgroundColor: "grey"
  },
  row: {
    flexDirection:'row',
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    marginBottom: 50
  },
  heroLogin:{
    backgroundColor: colors.green
  },
  customerLogin: {
    backgroundColor: colors.pink
  }
});

export default App;
