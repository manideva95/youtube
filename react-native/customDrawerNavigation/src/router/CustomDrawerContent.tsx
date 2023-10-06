

import React from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import {
    DrawerContentScrollView, DrawerContentComponentProps
} from "@react-navigation/drawer";
import { TouchableOpacity } from 'react-native';
type CustomDrawerContentProps = DrawerContentComponentProps;

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = (props) => {

    let activeItemKey = props?.state?.routes[props.state.index].name

    return (
        <DrawerContentScrollView contentContainerStyle={[{}]} {...props}>
            <View style={{ height: 200, justifyContent: 'center', alignItems: 'center', }}>
                <Image
                    style={{ height: 100, width: 100, borderRadius: 100, borderWidth: 3, borderColor: "#2d8adc" }}
                    resizeMode='center'
                    source={{
                        uri: 'https://picsum.photos/id/237/200/300',
                    }}
                />
                <Text style={{ marginTop: 10 }}>Mani Deva</Text>
            </View>
            <ScrollView style={[{ flex: 1, backgroundColor: 'white' }]}>
                <StatusBar backgroundColor="#2E2E2E" barStyle="light-content" />
                <SafeAreaView>
                    <View style={[{ flex: 1, alignSelf: "stretch" }]}>

                        <TouchableOpacity style={[styles.screenStyle, (activeItemKey == 'Home') ? styles.activeBackgroundColor : null]} onPress={() => props.navigation.navigate('Home')}>
                            <>
                                <Text style={[styles.screenTextStyle, (activeItemKey == 'Home') ? styles.activeTextColor : { color: 'black' }]}>Home</Text>
                            </>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.screenStyle, (activeItemKey == 'Details') ? styles.activeBackgroundColor : null]} onPress={() => props.navigation.navigate('Details')}>
                            <>
                                <Text style={[styles.screenTextStyle, (activeItemKey == 'Details') ? styles.activeTextColor : { color: 'black' }]}>Details</Text>
                            </>
                        </TouchableOpacity>

                    </View>
                </SafeAreaView>
            </ScrollView>
        </DrawerContentScrollView >
    )
}



export default CustomDrawerContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    headerContainer: {
        height: 150,
    },
    headerText: {
    },
    screenContainer: {
        width: '100%'
    },
    screenStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: '100%',
        padding: 10
    },
    screenTextStyle: {
        fontSize: 14,
        textAlign: 'center'
    },
    icon: {
        fontSize: 20,
        marginHorizontal: 16,
    },
    activeBackgroundColor: {
        backgroundColor: "#2d8adc"
    },
    activeTextColor: {
        color: "#ffffff"
    },
});