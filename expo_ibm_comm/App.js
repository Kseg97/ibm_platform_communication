import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

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

  var raw = JSON.stringify({
    "selector": {},
    "fields": [
      "_id",
      "_rev",
      "timestampCreated",
      "value"
    ],
    "sort": [
      {
        "timestampCreated": "desc"
      }
    ],
    limit: 20
  });

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
      data: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }],
    };
  }

  componentDidMount() {
    this.dataInterval = setInterval(() => getData()
      .then(data => this.setState({ data: data.docs || this.state.data }))
      .catch((err) => console.error(err))
      , 500)
  }

  componentWillUnmount() {
    clearInterval(this.dataInterval);
  }

  render() {
    const data = this.state.data.map(item => item.value);//[50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
    const contentInset = { top: 20, bottom: 20 }

    return (
      <View style={styles.container}>
        <Text>Gotcha!</Text>
        {/* <Text>{JSON.stringify(this.state.data)}</Text> */}
        <View style={{ height: '60%', width: '100%', flexDirection: 'row' }}>
          <YAxis
            data={data}
            contentInset={contentInset}
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            numberOfTicks={10}
            formatLabel={(value) => `${value} ppm`}
          />
          <LineChart
            style={{ width: '80%', marginLeft: 16 }}
            data={data}
            svg={{ stroke: 'rgb(134, 65, 244)', strokeWidth: 3 }}
            contentInset={contentInset}
            curve={shape.curveNatural}
          >
            <Grid />
          </LineChart>
          {/* <XAxis
                    style={{ marginHorizontal: -10 }}
                    data={data}
                    formatLabel={(value, index) => index}
                    contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                /> */}
        </View>
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