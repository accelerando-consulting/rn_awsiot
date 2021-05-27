/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {Buffer} from 'buffer';
import {
    Button,
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import * as Mqtt from 'react-native-native-mqtt';


const cert=`-----BEGIN CERTIFICATE-----
MIIDWjCCAkKgAwIBAgIVANOc1xiNGvWMV2K4qdWJGghWRX9WMA0GCSqGSIb3DQEB
CwUAME0xSzBJBgNVBAsMQkFtYXpvbiBXZWIgU2VydmljZXMgTz1BbWF6b24uY29t
IEluYy4gTD1TZWF0dGxlIFNUPVdhc2hpbmd0b24gQz1VUzAeFw0yMTA1MjUwNzEw
MDRaFw00OTEyMzEyMzU5NTlaMB4xHDAaBgNVBAMME0FXUyBJb1QgQ2VydGlmaWNh
dGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDf1krKaeXSdIj3okuq
LfBg3YqmswOcHYmNd2183rUkb2SF/uDD23ld9NP6i/ESOVRvSzD9sNoXpcVRHTBC
rj6cSg8Rjq+uEj63XQjQ8FiDkaNUI5OTBgCCLkRSuWrgZGecFpYwkw5si3T6McdT
efIaEDRkFIIdjKvbB9nN3nPq+vVZvRCN/6Dwg+91IJ41HD8psiCMgN9+aOd04kcV
CtXeE0T6bhWfisg8xRf0B14Mzh6qWItrcAF7nUDw0MbzOfPU/j4kwXrqT9j1YZFy
9glupFIL2i1QntldKd8VZ3uNY3JmhsR8E5q1Jas6VJTEkghhpGyLL8Wv4LGh8vJu
RjWFAgMBAAGjYDBeMB8GA1UdIwQYMBaAFKQfib/YDtoHT2OSEcElF4vuxduLMB0G
A1UdDgQWBBQiLhNuHCrURSVapBxInsCkpEs98DAMBgNVHRMBAf8EAjAAMA4GA1Ud
DwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAQEAcKHcVpmHHXznp94cT1qnVxTP
jxRJIvfjBo9SgxoiTqO8WhH+q/Sqj4TOxjCLqTNj7lhqsWgL7ERUBrc5OflqAMEt
MDctvckFH3al6VcPShC5kM10wVAIFGsPCybCUN07iN4lIQ14Dwttg//PRe4AvAac
udPV56o96ClMML3U49fnHxS/rutRVfMtfkECwxIHawJxp2mist1/MwzdUB59nN36
om56Z7oo85plYeCTAc5GbuoYmHTOB9/lPXn15NHjkdO7SBk1hDii2Xnkj1Pzh4tp
bFIVPdP1CTTPpZBkgFoBMdKEgIfBgvb5hfOXs0fGZ4GulXQXjO1Vy8WIX7gPMA==
-----END CERTIFICATE-----`;

const key=`-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA39ZKymnl0nSI96JLqi3wYN2KprMDnB2JjXdtfN61JG9khf7g
w9t5XfTT+ovxEjlUb0sw/bDaF6XFUR0wQq4+nEoPEY6vrhI+t10I0PBYg5GjVCOT
kwYAgi5EUrlq4GRnnBaWMJMObIt0+jHHU3nyGhA0ZBSCHYyr2wfZzd5z6vr1Wb0Q
jf+g8IPvdSCeNRw/KbIgjIDffmjndOJHFQrV3hNE+m4Vn4rIPMUX9AdeDM4eqliL
a3ABe51A8NDG8znz1P4+JMF66k/Y9WGRcvYJbqRSC9otUJ7ZXSnfFWd7jWNyZobE
fBOatSWrOlSUxJIIYaRsiy/Fr+CxofLybkY1hQIDAQABAoIBAGA5Ecuz/G0dVagG
p7pPp08szabdu8aH2BLtbS7J2lsAW9lSeTMZDTJ7xgil0gtAg/CYBUZ5mTejNpCp
GI8Bsr6jA5lLmnAdPcK7hsezGonsuKa56H3CjcNoukxJkw1FfFjYSNY20XON+8p2
Tbav7IiRwMPpIQos58/vrwzV/UTcsT+rie1NSeyOH9FqzIy0GWTGNpUrmwNynl5n
UvTO6HxjOTBTxhkGafFq/CvuTOwZj0nChqGxrz+DKnT1QM66aZNoXdoPd1vKN9wi
wcJqbknNlZoWxcDDYQxN6biVRbuMxD6Tdh9CMj+NZtIlskZBIFFhrjeWag99jgjZ
wQjxp70CgYEA+18+tcq80BDdbTAq7k8VtUJHzK5ZKrz5Ob5gGMGWceNuaPjJtIgQ
jTjzkqHMBjDQe/C2Oja5mtwg0YvDMRLWHuonhESuwHIXo7XC4by1uu+QXoUsO1Ea
U2wZ7F8eKB2U6HVtvnGN/3yAYF63tZFSsVlMroMiQEcaA8XbYQ4u9AMCgYEA4/VF
SNheEvHOJEfTVJ4wbXRhkJTsbohynYCEnzx+ZsQZXS/uH4hrsSvF/ADpF3L2TugI
UjQVKFvp242Cf0vUS5LDA78Tj4FbBbsaSz0RrSHlFAznrwiDJx/p64LIcjlhxdHz
f4rHKZEioZOT4+9PvtEBMevE6+YxxTfOYm+mbdcCgYAmTVL+3E983LUAqDBCc6Z5
IgpSs9Y+XuES3WFDJGxKGj9+mzoQ2hK7kgv7MdAmuVVrLTh3ElOhtx0BEOzDE32w
5Dj1PInsJPZZKZ7ySpDeVRaIcH5W43rBb11b2Pp9XlSMPyhjtmXOoiflh0kyz1vs
ThETHkQfyzW5kXJmDYU2BQKBgQCMOJ4yze0oKBeOl6P2JAxT98fgAMtivooKOjja
HoL+Qdf8S3RlbywXYn65ofG/m9bI+M/NiP4OwmMay3QfS4y+I/vTfSDSIFbWMp5c
86bA4d2gtMN7Fnheg7IHTX5xTLzIy3nF1Z7nAcDUtQu+pMFf9f6PL6EFHqc00jwg
rt8oJwKBgB/YHz/0RTrscHNvobdLIo2XI6s4TFDnbPT1PMFDcz/ih7toGu/s0Q5Q
dIfjugq0GGM83b6pQUPNEdxwcKA9Y6M70dpzQT0coI/XRU26glF2D0niw7lZRdNg
JWPHkjejJL04hXPeG+rrBumLJZx6fJSGQuBKOUh1D5wcKpj1sVa/
-----END RSA PRIVATE KEY-----`;

const caDer=`-----BEGIN CERTIFICATE-----
MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF
ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6
b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL
MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv
b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj
ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM
9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw
IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6
VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L
93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm
jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC
AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA
A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI
U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs
N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv
o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU
5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy
rqXRfboQnoZsG4q5WTP468SQvvG5
-----END CERTIFICATE-----`;



const MqttClient = () => {

    const clientId = 'demoForReiah';
    const [mqttClient,setMqttClient] = useState();
    const [mqttStatus,setMqttStatus] = useState("disconnected");
    const [mqttHistory,setMqttHistory] = useState([]);
    const [topic,setTopic] = useState(`sammobile/event-from/${clientId}/hello`);
    const [payload,setPayload] = useState("world");

    const publish = (client, topic, payload) => {
	const msg = `PUB ${topic} <= ${payload}`;
        console.log("publish:",msg);
        client.publish(topic,Buffer.from(JSON.stringify(payload),'utf8'))
        setMqttHistory([msg,...mqttHistory]);
    };

    useEffect(async ()=>{
        console.log("MqttClient setup hook");
        const tls = {caDer, cert, key};
        const endpointAddress = 'a2k22a470d0mwq-ats.iot.ap-southeast-2.amazonaws.com'
        const clientUrl = `ssl://${endpointAddress}:8883`;
        const options = {
            clientId,
            tls,
            autoReconnect: false,
            enableSsl: true
        }
        console.log("Creating MQTT client for ",clientUrl);
        const client = new Mqtt.Client(clientUrl);
        setMqttClient(client);

        try {
            console.log("Connecting with options ",options);
            setMqttStatus('connecting');
            await client.connect(options);
            console.log("Connection done");
        }
        catch (err) {
            console.error("MQTT connect failed", err);
            setMqttStatus('Error '+err);
        }

        client.on(Mqtt.Event.Connect, () => {
            console.log("NOTICE MQTT Connection established");

            console.log("Subscribe to topics");
            client.subscribe([`sammobile/request-to/${clientId}/#`], [1]);
            client.subscribe([`sammobile/result-to/${clientId}/#`], [1]);

            console.log("Publish a message");
            publish(client, topic, payload);

            console.log("Update status");
            setMqttStatus("connected");
        });

        client.on(Mqtt.Event.Error, error => {
            console.warn('MQTT Error:', error);
            setMqttStatus("error"+err);
        });

        client.on(Mqtt.Event.Disconnect, cause => {
            console.warn('MQTT disconnect:', cause);
            setMqttStatus('disconnected');
        });

        client.on(Mqtt.Event.Message, (topic, message) => {
            const msg = `CON ${topic} <= ${message}`;
            setMqttHistory([msg,...mqttHistory]);
        });


    },[]);

    const Item=(item)=>{
        console.log("RenderHistoryItem",item);
        return <View key={`history-${item.index}`}><Text>{item.item}</Text></View>
    }

    return <View>
	      <View><Text>{`Status: ${mqttStatus}`}</Text></View>
	      <View>
                   <TextInput onChangeText={setPayload} value={payload}/>
                  <Button title="Publish" onPress={()=>publish(mqttClient, topic,payload)}/>
	      </View>
	      <FlatList data={mqttHistory} renderItem={Item}/>
	  </View>;
}

const App: () => Node = () => {
  return (
    <SafeAreaView>
      <StatusBar/>
      <MqttClient/>
    </SafeAreaView>
  );
};


export default App;
