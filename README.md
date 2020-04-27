# IBM Platform Communication (examples)

Examples of a node server for random data generation and an Android Expo (React Native) client to gather the data. Communication uses IBM services or infrastructure. IOS version is untested but might work as well.

## Description

This is a simple 3-block test project for IBM realtime info integration. 
First, a Node (or python) generator will produce random numbers to send them to the cloud (IBM tech)
Second, the IBM service will be configured (see appendix) to support the realtime changes and save the stored data.
Third, a react native client in Expo will gather the data and display it somehow

Requirements:
	1. Block 1: Uses any easy-setup communication technology:
		Socket.io, MQTT, Direct Database access API, HTTP APIs, or any other. Must be supported by IBM services or infrastructure.
	2. Block 2: According to B1, the service or infrastructure must be easily-configured and have a free-tier.
	3. Block 3: Gathering data also depend on the selected technology and platform. Graphics are optional.
	4. All Blocks: data struct is dynamic, each key, value is decomposed in (value, timestamp, max, min, other) keys. e.g:
		{ 
			data1: { 
				value: 1, 
				timestamp: <ns-timestamp>,
				max: 2000,
				min: 0,
				other: {}			
			}, 
			data2: { 
				value: 1002, 
				timestamp: <ns-timestamp>,
				max: 2000,
				min: 0,
				other: {}			
			},
			...
		}

## Set-up 🤬

Requires NodeJS, NPM and Expo installed.
Download or clone this repo:

`git clone https://github.com/Kseg97/ibm_platform_communication_examples`

To download just press on the download button and unzip in your working env.
Run `npm install` and then `npm start` in the *node_server_gen_using_ibm* folder to execute the number generator.
Run `npm install` and then `npm start` in the *expo_react_client* folder to execute the Expo server and therefore your app in the Android client
Change *.env* with the team credentials.

## Server configuration

TODO
