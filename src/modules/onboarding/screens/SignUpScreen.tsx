import React, {useState} from 'react';
import {Text, StyleSheet, View, Button, Alert, ActivityIndicator, TextInput, TouchableOpacity} from 'react-native';
import firebase from './../../../../database/firebase'

export default function SignUpScreen({navigation}: any) {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const registerUser = () => {
        if (email === '' && password === '') {
            Alert.alert('Enter details to signup!');
        } else {
            setIsLoading(true);
        }
        firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
            res.user.updateProfile({
                displayName: displayName
            })
            console.log("User registered successfully");
            console.log("user's display name: ", displayName);
            setIsLoading(false);
            setDisplayName('');
            setEmail('');
            setPassword('');
            navigation.navigate('LoginScreen');
        }).catch(
            (error) => {console.log(error.message)}
        )

    }
    return (
        (isLoading) ?

            (<View>
                <ActivityIndicator size='large' color='#9E9E9E'/>
            </View>)
            :
            (
                <View style={styles.container}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Name"
                        placeholderTextColor="#000"
                        value={displayName}
                        onChangeText={(txt) => setDisplayName(txt)}
                    />
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
                       
                    <TouchableOpacity style={styles.button} onPress={() => registerUser()}>
                    <Button
                       color="#fff"
                       title="Signup"
                    />
                    </TouchableOpacity>
                    
                    <Text
                        style={styles.loginText}
                        onPress={() => navigation.navigate('LoginScreen')}
                    >
                        Already Registered? <Text style={{  color: '#3740FE', fontSize: 14}}>Click here to login</Text>
                    </Text>


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

