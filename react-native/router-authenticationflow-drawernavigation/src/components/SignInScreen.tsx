import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../router/Router';

export const SignInScreen: React.FC = () => {
    const { dispatch } = useAuth();

    const handleSignIn = () => {
        // Add your sign-in logic here
        // If sign-in is successful, dispatch the 'SIGN_IN' action
        dispatch({ type: 'SIGN_IN' });
    };

    return (
        <View>
            {/* Your sign-in UI */}
            <Button title="Sign In" onPress={handleSignIn} />
        </View>
    );
};