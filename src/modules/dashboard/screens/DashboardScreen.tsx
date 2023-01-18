import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import productsJson  from '../../../utils/products';
import DisplayProducts from '../components/DisplayProducts';
import * as Location from 'expo-location';
import haversine from 'haversine-distance'
import firebase from './../../../../database/firebase'

export default function DashboardScreen({navigation}: any) {
    const [displayName, setDisplayName] = useState('');
    const [userId, setUserId] = useState('');
    const [errorInfo, setErrorInfo] = useState('');
    const fixedLatitude = 6.4253;
    const fixedLongititude = 3.4095;
    const [dynamicLatitude, setDynamicLatitude] = useState(0);
    const [dynamicLongititude, setDynamicLongititude] = useState(0);
    const [resultsMessage, setResultsMessage] = useState('');
    const [userLocation, setUserLocation] = useState(0);
 
    const signOut = () => {
        firebase.auth().signOut().then(() => {
            navigation.navigate('LoginScreen')
        }).catch(
            (error) => {console.log(error.message)}
        )

    }

    useEffect(() => {
        setDisplayName(firebase.auth().currentUser.displayName);
        setUserId(firebase.auth().currentUser.uid);
        console.log('user display name here: ', displayName)
    }, [userId]);


    const getLocationPositions = () => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorInfo('Permission to access location was denied.');
              return;
            }
            let location = await Location.getCurrentPositionAsync({});
           
            setDynamicLatitude(location?.coords?.latitude);
            setDynamicLongititude(location?.coords?.longitude);
            console.log(dynamicLatitude, '---dynamicLatitude--', dynamicLongititude, '---dynamicLongititude---');
            const a = { lat: fixedLatitude, lng: fixedLongititude }
            const b = { lat: dynamicLatitude, lon: dynamicLongititude }
 
           setUserLocation(Math.trunc(haversine(a, b)));
            console.log(userLocation, typeof userLocation);
          })();  
          renderInfoBasedDistance();
    };

    const renderInfoBasedDistance = () => {
       
         if(userLocation <= 5000 ){
            setResultsMessage( `Your order has been placed since you are ${userLocation} meters away.`)
          }else if(userLocation > 5000){
            setResultsMessage(`Your order was not placed since you are ${userLocation} meters away.`)
          }else{
            setResultsMessage('')
          } 
    }


    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>
                Hello, {displayName}
            </Text>

            <Text style={{...styles.textStyle, textAlign: 'center'}}>Pick your product</Text>

            <View style={styles.wrapper}>
                {productsJson.data.map((product)=> { return(
                    <TouchableOpacity onPress={()=> getLocationPositions()}> 
                         <DisplayProducts products={product} key={product.productName}/>
                    </TouchableOpacity>
                
                )})}
               
            </View>
            {errorInfo && (<Text style={{...styles.textStyle, color: 'red'}}>{errorInfo}</Text>)}
{/* 
          {resultsMessage != '' && (
              <View style={styles.centerContent}>
              <Text>{resultsMessage}</Text>
              </View>
          )} */}

             <View style={styles.centerContent}>
              <Text>{resultsMessage}</Text>
              </View>

             <TouchableOpacity style={styles.button} onPress={() => signOut()}>
                    <Button
                       color="#fff"
                       title="Logout"
                    />
            </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: "center",
        padding: 35,
        backgroundColor: '#fff'

    },
    wrapper: {
        // flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 15,
        marginBottom: 80

    },
    textStyle: {
        fontSize: 15,
        marginBottom: 20
    },
    centerContent: {
        alignItems: 'center',
        marginBottom: 30
    },
    button: {
        width: '40%',
        backgroundColor: "#3740FE",
        padding: 10,
        color: '#fff',
        borderRadius: 10,
        marginTop: 50,
        alignItems: 'center',
        alignSelf: 'center'
    }
})
