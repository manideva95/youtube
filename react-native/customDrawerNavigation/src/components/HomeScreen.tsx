import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { AuthContext, DrawerStackParamList } from '../router/Router';
import CustomHeader from './CustomeHeader';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<DrawerStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
    const { signOut } = React.useContext(AuthContext)!;

    return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
            <CustomHeader title="Home" navigation={navigation} />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => navigation.navigate('Details')}
                />
                <Text>Signed in!</Text>
                <Button title="Sign out" onPress={signOut} />
            </View>
        </View>
    );
}