//////////////////////////////////////////////////////////////////////////////////////////
import React from 'react';
import { View, TouchableOpacity, Linking, StyleSheet, Text, Dimensions } from 'react-native';

import { languages } from '../languages/languages';


const { width, height } = Dimensions.get('window');


export default function SponsorFallback(props) {
    
    const displaySponsor = () => {
        Linking.openURL("https://play.google.com/store/apps/details?id=com.production.pipingdata&utm_source=emea_Med"); 
    };

    return (
        <View style={ { justifyContent: "flex-end" } }>
            <View style={styles.separator} />

            <TouchableOpacity onPress={displaySponsor} style={styles.container}>
                <View style={styles.containerText}>
                    <Text style={styles.labelText}>{ languages[0][props.idLanguage].sponsor_text }</Text>
                </View>


                <View style={styles.labelOverlay}>
                    <Text style={styles.labelSponsor}>Sponsors</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

}


const styles = StyleSheet.create({
    separator: {
        backgroundColor: '#555',
        alignSelf: 'center'
    },
    container: {
        width: width,
        maxHeight: height * 0.2,
        backgroundColor: '#505050',
        borderTopWidth: 1,
        borderTopColor: "whitesmoke",
    },
    containerText: {
        maxWidth: width,
        height: height*0.14,
        paddingVertical: height*0.01,
        paddingHorizontal: width*0.025,
    },
    containerImg: {
        maxWidth: width,
        height: height*0.1,
    },
    image: {
        maxWidth: width,
        maxHeight: height*0.2,
    },
    labelOverlay: {
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "flex-end",
        width: width*0.5,
        backgroundColor: '#181818',
        borderStartStartRadius: 5,
         borderStartEndRadius: 5
    },
    labelText: {
        color: 'black',
        fontSize: height*0.015,
        textAlign: "center",
        backgroundColor: "#ecf1f1",
        borderRadius: 5,
        padding: width*0.05,
        fontWeight: 600,
        height: height*0.17,
        flexShrink: 1,
        lineHeight: height*0.03,
        alignSelf: "center"
    },
    labelSponsor: {
        color: 'white',
        fontSize: height*0.02,
        height: height*0.03,
        lineHeight: height*0.03,
        alignSelf: "center"
    },
});

