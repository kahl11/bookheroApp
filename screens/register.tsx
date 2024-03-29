import React, { Component, useState, setState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { styles } from '../styles/style';
import { touchable_styles } from '../styles/touchable_styles'
import { ENDPOINT } from '@env';
import { SafeAreaView } from 'react-native';
import { Fragment } from 'react';


export const register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [school, setSchool] = useState('uofc');
  const [status, setStatus] = useState('');


  const register = () => {
    if (email != emailConfirm) {
      setStatus("Emails are not the same");
      return;
    }
    fetch(`${ENDPOINT}/createUser`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        school: school
      })
    }).then((response) => response.json())
      .then((json) => {
        if (json.status == "duplicate") {
          setStatus("This username is taken");
        } else if (json.status == "success") {
          navigation.navigate('login');
        }

      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.background} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container_middle_align}>
          <View style={touchable_styles.login}>
            <Text style={styles.title}>Register</Text>
            <TextInput
              style={styles.status}
              placeholder=""
              editable={false}
              onChangeText={status => setStatus(status)}
              defaultValue={status}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={email => setEmail(email)}
              defaultValue={email}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Email"
              onChangeText={emailConfirm => setEmailConfirm(emailConfirm)}
              defaultValue={emailConfirm}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={username => setUsername(username)}
              defaultValue={username}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={password => setPassword(password)}
              defaultValue={password}
              autoCapitalize="none"
              secureTextEntry={true}
            />
            <Text style={styles.text}>School</Text>
            <DropDownPicker
              items={[
                { label: 'University of Calgary', value: 'uofc' },
                { label: 'University of Alberta', value: 'uofa' }
              ]}
              defaultValue={school}
              containerStyle={styles.dropdown}
              style={{ backgroundColor: '#fafafa' }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => setSchool(item.value)}
            />

            {/* <Text style={styles.header}>Billing Information</Text>
          <View style={styles.row}>
              <TextInput
            style={styles.halfInput}
            placeholder="First Name"
          />
          <TextInput
            style={styles.halfInput}
            placeholder="Last Name"
          />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Address"
          />
          <View style={styles.row}>
              <TextInput
            style={styles.halfInput}
            placeholder="City"
          />
          <TextInput
            style={styles.halfInput}
            placeholder="Postal Code"
          />
          </View> */}
            <View style={[styles.row, {marginBottom: 40}]}>
              <TouchableOpacity
                style={[touchable_styles.halfButtonLight]}
                onPress={register}
              >
                <Text style={touchable_styles.darkText}>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[touchable_styles.halfButtonDark]}
                onPress={() =>
                  navigation.navigate('login')
                }
              >
                <Text style={touchable_styles.lightText}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Fragment >
  );
};
