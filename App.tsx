import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {onboardingScreens} from './src/modules/onboarding/navigators'
import {dashboardScreens} from "./src/modules/dashboard/navigator";

const Stack = createStackNavigator();

function NavStack() {
    const screens = [
        ...onboardingScreens,
        ...dashboardScreens
    ]
  return (
      <Stack.Navigator
        initialRouteName= "SplashScreen"
        screenOptions={{
          headerShown: true,
          gestureEnabled: false
        }}
        >
        {screens.map((screen, index) => (
            <Stack.Screen
                key={index}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                }}
                name= {screen.name}
                component= {screen.component}
            />
        ))}
      </Stack.Navigator>
  )
}

export default function App() {

  return (
    <NavigationContainer>
        <NavStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
