import React from 'react';
import {Text, StyleSheet, View, Button, TouchableOpacity} from 'react-native';

export default function SplashScreen({navigation}: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Splash Screen</Text>

            <TouchableOpacity style={styles.button}   
            onPress={() => navigation.navigate('OnboardFlow', {screen: 'SignUpScreen'})}>
                <Text style={{color: '#fff', fontSize: 18}}>Sign Up</Text>
            </TouchableOpacity>
            
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    }, 
     textStyle: {
        fontSize: 24
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

