import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from '../components/DetailsScreen';
import HomeScreen from '../components/HomeScreen';
import { SignInScreen } from '../components/SignInScreen';
import { SignUpScreen } from '../components/SignUpScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
// Define the types for authentication state and actions
type AuthState = {
    isSignedIn: boolean;
};

type AuthAction = {
    type: 'SIGN_IN' | 'SIGN_OUT';
};

// Create an Auth Context
const AuthContext = createContext<{ state: AuthState; dispatch: React.Dispatch<AuthAction> } | undefined>(
    undefined
);
const Stack = createNativeStackNavigator();

export const Router = () => {
    const initialState: AuthState = {
        isSignedIn: false,
    };

    const reducer = (state: AuthState, action: AuthAction): AuthState => {
        switch (action.type) {
            case 'SIGN_IN':
                return { ...state, isSignedIn: true };
            case 'SIGN_OUT':
                return { ...state, isSignedIn: false };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            <NavigationContainer>
                <Stack.Navigator>
                    {state.isSignedIn ? (
                        <>
                            <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
                                <Drawer.Screen name="Home" component={HomeScreen} />
                                <Drawer.Screen name="Details" component={DetailsScreen} />
                            </Drawer.Navigator>
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="SignIn" component={SignInScreen} />
                            <Stack.Screen name="SignUp" component={SignUpScreen} />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
