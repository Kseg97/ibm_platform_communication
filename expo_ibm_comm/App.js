import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

async function getData() {
  const db = "ventilator_db";
  const query = "_find";
  const username = "c612a48e-6c75-40f8-b275-f9958a5e1317-bluemix";
  const password = "346a8f8b4a86fab70993f3ba0a434d1b6d7ead444a387e6bcb651a4750b420f9";
  const url = `https://${username}:${password}@${username}.cloudantnosqldb.appdomain.cloud`;

  var myHeaders = new Headers({
    'Authorization': 'Basic ' + Base64.btoa(`${username}:${password}`),
    "Content-Type": "application/json"
  });

  var raw = JSON.stringify({ "selector": {}, "limit": 10, "skip": 0 });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  try {
    let response = await fetch(`${url}/${db}/${query}`, requestOptions)
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
    };
  }
  componentDidMount() {
    getData()
      .then(data => this.setState({ data: data.docs }))
      .catch((err) => console.error(err))

  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Gotcha!</Text>
        <Text>{JSON.stringify(this.state.data)}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Base64 function. TODO: move to a JS module and just import here.
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const Base64 = {
  btoa: (input: string = '') => {
    let str = input;
    let output = '';

    for (let block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || (map = '=', i % 1);
      output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

      charCode = str.charCodeAt(i += 3 / 4);

      if (charCode > 0xFF) {
        throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }

      block = block << 8 | charCode;
    }

    return output;
  },

  atob: (input: string = '') => {
    let str = input.replace(/=+$/, '');
    let output = '';

    if (str.length % 4 == 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (let bc = 0, bs = 0, buffer, i = 0;
      buffer = str.charAt(i++);

      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  }
};