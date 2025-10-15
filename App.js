//////////////////////////////////////////////////////////////////////////////////////////
import { React } from "react";
import { StatusBar } from 'react-native';

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "./HomeScreen";


export default function App() {

return (
    <SafeAreaProvider>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        
        <SafeAreaView style={{ flex: 1 }}>
            <HomeScreen />
        </SafeAreaView>
    </SafeAreaProvider>
);

}







