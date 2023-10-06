import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/HomeScreen';
import DetailsScreen from '../components/DetailsScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SignInScreen from '../components/SignInScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomDrawerContent from './CustomDrawerContent';


export type DrawerStackParamList = {
    Home: undefined;
    Details: undefined
};

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator<DrawerStackParamList>();

type AuthContextType = {
    signIn: (data: { username: string; password: string }) => void
    signOut: () => void;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

function SplashScreen() {
    return (
        <View>
            <Text>Loading...</Text>
        </View>
    );
}


type AppState = {
    isLoading: boolean;
    isSignout: boolean;
    userToken: string | null
}

type AppAction = { type: 'RESTORE_TOKEN'; token: string | null } | { type: 'SIGN_IN'; token: string } | { type: 'SIGN_OUT' }

function Router() {

    const [state, dispatch] = React.useReducer(
        (prevState: AppState, action: AppAction) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );


    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken = null;

            try {
                // Restore token stored in `SecureStore` or any other encrypted storage
                // userToken = await SecureStore.getItemAsync('userToken');
                const value = await AsyncStorage.getItem('userToken');
                if (value !== null) {
                    userToken = value
                }
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data: { username: string; password: string }) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token
                await AsyncStorage.setItem('userToken', 'dummy-auth-token');
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            signOut: async () => {
                await AsyncStorage.clear()
                dispatch({ type: 'SIGN_OUT' })
            },
            signUp: async (data: { username: string; password: string }) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {state.isLoading ? (
                    <Stack.Navigator>
                        <Stack.Screen name="Splash" component={SplashScreen} />
                    </Stack.Navigator>
                ) : state.userToken == null ? (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="SignIn"
                            component={SignInScreen}
                            options={{
                                title: 'Sign in',
                                // When logging out, a pop animation feels intuitive
                                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                            }}
                        />

                        {/* we can add signup screen, forgot password screens here... */}

                    </Stack.Navigator>
                ) : (
                    <Drawer.Navigator
                        initialRouteName="Home"
                        drawerContent={(props) => (
                            <CustomDrawerContent {...props} />
                        )}
                        backBehavior="initialRoute"
                        screenOptions={{
                            headerShown: false
                        }}
                    >
                        <Drawer.Screen name="Home" component={HomeScreen} />
                        <Drawer.Screen name="Details" component={DetailsScreen} />
                    </Drawer.Navigator>
                )}
            </NavigationContainer>
        </AuthContext.Provider>
    );
}

export default Router;
