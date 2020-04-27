import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

async function getData() {
  const db = "ventilator_db";
  const query = "_find";
  const url = "https://c612a48e-6c75-40f8-b275-f9958a5e1317-bluemix:346a8f8b4a86fab70993f3ba0a434d1b6d7ead444a387e6bcb651a4750b420f9@c612a48e-6c75-40f8-b275-f9958a5e1317-bluemix.cloudantnosqldb.appdomain.cloud"; f


  try {
    let response = await fetch(`${url}/${db}/${query}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "selector": {
        },
        "limit": 10,
        "skip": 0
      }),
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export default class App extends Component {
  static state = {
    data=""
  }
  
  componentDidMount() {
    this.setState({ data: getData() })
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
