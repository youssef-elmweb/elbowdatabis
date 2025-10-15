//////////////////////////////////////////////////////////////////////////////////////////
import React from "react";
import { StyleSheet, Dimensions, Button, Pressable, TouchableOpacity, Text, Modal, View, Image, Linking, Platform, FlatList } from "react-native";

import {  SafeAreaView } from "react-native-safe-area-context";

import * as functions from "./../../library/functions.js";

import { languages } from "../../languages/languages";

import SponsorFallback from "../SponsorFallback.js";


export function ModalUtilities (props) {

    const {width, height} = Dimensions.get("window");

    const DATA = [
        {
            id: 1,
            title: languages[0][props.idLanguage].download
        },
        {
            id: 2,
            title: languages[0][props.idLanguage].info
        },
        {
            id: 3,

            title: languages[0][props.idLanguage].share
        },
        {
            id: 4,

            title:  <Pressable style={ {width: Number(width*0.75), borderRightWidth: Number(0.75), borderColor: "gray", backgroundColor: '#202020'} } onPress={() => { if (Platform.OS == "android" ? Linking.openURL('https://play.google.com/store/apps/details?id=com.jos59.pipingdatalt&hl=fr') : Linking.openURL('https://apps.apple.com/us/app/pipingdatalt/id6745983965?l=fr-FR')); } }>
                        <Text style={[ styles.titleUtility, {height: height*0.075, lineHeight: Number(height*0.06), fontSize: Number(height*0.02)} ]}>{ "PipingDataLT" }</Text>
                    </Pressable>
        }
    ];


    const Item = ({title}) => (
        <View style={ {width: Number(width*0.75), paddingLeft: Number(width*0.075), borderRightWidth: Number(0.75), borderColor: "gray", backgroundColor: '#202020'} }>
            <Text style={[ styles.titleUtility, {height: height*0.06, lineHeight: Number(height*0.06), fontSize: Number(height*0.02)} ]}>{ title }</Text>
        </View>
    );


    return  (
                <View>
                    <Modal style={[ { justifyContent: "center", alignItems: "center", backgroundColor: "transparent"} ]} animationType={"slide"} transparent={true} visible={props.statusModalUtilities}>
                        <Pressable style={[ {width: width, height: Number(height*0.7), marginBlockStart: height*0.05, backgroundColor: "transparent"} ]} onPress={ props.makeStatusModalUtilities }>
                            <Pressable style={[ {width: width, flexDirection: "row", flexDirection: "column", justifyContent: "space-around", alignSelf: "flex-start", alignItems: "flex-start", opacity: 0.95, backgroundColor: "#353535"} ]} onTouchEnd={ (e) => { e.stopPropagation() } }>
                                <View style={[ {paddingBottom: width*0.06, flexDirection: "row", justifyContent: "center", alignItems: "center"} ]}>
                                    <View style={[ {width: width*0.8, height: height*0.06, flexDirection: "row", justifyContent: "center", alignItems: "center", borderBottomWidth: 1, borderColor: "white", backgroundColor: "#2c3e50"} ]}>
                                        <Text style={[{ fontSize: height*0.02, fontWeight: "bold", color: "white", letterSpacing: 0.5 }]}>{languages[0][props.idLanguage].utilities}</Text> 
                                    </View>
                                    
                                    {(height > 650 ?
                                    <Pressable style={[ {width: width*0.2, height: height*0.06, flexDirection: "row", justifyContent: "center", alignItems: "center"} ]} onPress={ () => { props.makeStatusModalUtilities(); } }>
                                        <View style={[ {width: width*0.2, height: height*0.06, lineHeight: height*0.035, fontSize: height*0.02, justifyContent: "center", alignItems: "center", textAlign: "center", letterSpacing: 0.5, color: "white", borderBottomWidth: 0.75, borderColor: "white", backgroundColor: 'dodgerblue'} ]}>
                                            <Image alt={"down"} style={[ {width: height*0.06, height: height*0.06} ]} source={ require("../../assets/images/chevron-bas.png") } />
                                        </View>
                                    </Pressable> : 

                                    <View style={[ {width: width*0.2, height: height*0.06, justifyContent: "center", alignItems: "center", backgroundColor: 'dodgerblue'} ]}>
                                        <Button style={[ {width: width*0.2, height: height*0.06, lineHeight: height*0.06, fontSize: height*0.02, backgroundColor: 'white'} ]} color={"white"} title={"⌄"} onPress={ props.makeStatusModalUtilities } />
                                    </View>)}
                                </View>

                                <SafeAreaView>
                                    <Text style={[ styles.titleUtility, {width: width*0.6, height: Number(height*0.05), textAlign: "center", fontSize: Number(height*0.03)} ]}>{"ElbowData"}</Text>
                                    
                                    <FlatList
                                        keyboardShouldPersistTaps="handled"
                                        keyExtractor={(item) => item.id.toString()}
                                        data={DATA}
                                        style={{ zIndex: 999, pointerEvents: 'box-none' }}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={{ zIndex: 10, height: height * 0.1, backgroundColor: 'transparent' }}

                                                onPress={() => {
                                                        if (item.id === 1) props.makeStatusModalPrinters();
                                                        else if (item.id === 2) props.makeStatusModalInfos();
                                                        else if (item.id === 3) functions.onShare();
                                                }}>
                                            <Item title={item.title} />
                                            </TouchableOpacity>
                                    )}/>
                                </SafeAreaView>
                            </Pressable>
                        </Pressable> 
                        <SponsorFallback idLanguage={props.idLanguage} />
                    </Modal>
                </View>
            )
}

const styles = StyleSheet.create({
    titleUtility: {
        fontSize: 15,
        color: "white"
    }
});

