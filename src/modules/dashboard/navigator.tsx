import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
    DashboardScreen,
} from "./screens";

export const dashboardFlowScreens: {name: string, component: any}[] = [
    {name: 'DashboardScreen', component: DashboardScreen },
];

export const DashboardFlow = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="DashboardScreen"
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
            {dashboardFlowScreens.map((screen, index) => (
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

export const dashboardScreens: {name: string, component: any}[] = [
    {name: 'DashboardFlow', component: DashboardFlow}
]