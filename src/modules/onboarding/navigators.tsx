import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
    LoginScreen,
    SignUpScreen,
    SplashScreen
} from "./screens";

export const onboardingFlowScreens: {name: string, component: any}[] = [
    {name: 'LoginScreen', component: LoginScreen },
    {name: 'SignUpScreen', component: SignUpScreen },
    {name: 'SplashScreen', component: SplashScreen }
];

export const OnboardFlow = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{
                headerShown: true,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#3740FE',

                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}
        >
            {onboardingFlowScreens.map((screen, index) => (
                <Stack.Screen
                    key={index}
                    options={{
                        headerLeft: null
                    }}
                    name={screen.name}
                    component={screen.component}
                />
            ))}
        </Stack.Navigator>
    );
};

export const onboardingScreens: {name: string, component: any}[] = [
    {name: 'SplashScreen', component: SplashScreen},
    {name: 'OnboardFlow', component: OnboardFlow}
]