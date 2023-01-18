import React, {useState} from 'react';
import {Text, StyleSheet, View, Button, Alert, ActivityIndicator, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from './../../../../database/firebase'


export default function LoginScreen({navigation}: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorInfo, setErrorInfo] = useState('');

    const userLogin = () => {

        if(email === '' && password === '') {
            Alert.alert('Enter details to login!')
        } else {
            setIsLoading(true)
        }
        firebase.auth().signInWithEmailAndPassword(email, password).then((res) => {
            console.log(res)
            console.log('User logged-in successfully')
            setIsLoading(false);
            setEmail('');
            setPassword('');
            navigation.navigate('DashboardFlow', {screen: 'DashboardScreen'});
        }).catch(
            (error) => {
                 setIsLoading(false);
                 setErrorInfo(error.message);
                console.log(error.message)
            }
        )
    }

    return (
        isLoading ? (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>

            ) : (
                <View style={styles.container}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Email"
                        placeholderTextColor="#000"
                        value={email}
                        onChangeText={(txt) => setEmail(txt)}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Password"
                        placeholderTextColor="#000"
                        value={password}
                        onChangeText={(txt) => setPassword(txt)}
                        maxLength={15}
                        secureTextEntry={true}
                    />
                    
                    <TouchableOpacity style={styles.button} onPress={() => userLogin()}>
                    <Button
                       color="#fff"
                        title="Signin"
                    />
                    </TouchableOpacity>
                    
                    <Text
                        style={styles.loginText}
                        onPress={() => navigation.navigate('SignUpScreen')}
                    >
                         Don't have an account? <Text style={{  color: '#3740FE', fontSize: 14}}>Click here to signup</Text>
                    </Text>

                    {errorInfo && (<Text style={{  color: 'red', fontSize: 14, marginVertical: 40}}>{errorInfo}</Text>)}
                </View>
            )



    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#fff'

    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: 'center',
        borderColor: '#ccc',
        borderBottomWidth: 1
    },
    loginText: {
        marginTop: 25,
        textAlign: 'center'
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
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



