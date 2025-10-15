//////////////////////////////////////////////////////////////////////////////////////////
import React from "react";
import { Dimensions, Pressable, Text, Modal, View } from "react-native";

import {  SafeAreaView } from "react-native-safe-area-context";

import RadioGroup from "react-native-radio-buttons-group";

import SponsorFallback from "../SponsorFallback.js";

import { languages } from "../../languages/languages";
import { languagesEurope } from '../../languages/languagesEurope.js';
import { languagesOther } from '../../languages/languagesOther.js';

export function ModalLanguages (props) {

    const {width, height} = Dimensions.get("window");
    

    return  (
        <View style={[ {justifyContent: "center", alignItems: "center"} ]}>
            <Modal style={[ {justifyContent: "center", alignItems: "center"} ]} animationType={"fade"} transparent={true} visible={props.statusModalLanguages}>
                <Pressable style={[ {width: width, justifyContent: 'space-between', alignSelf: "center", alignItems: 'center', opacity: (height > 650 ? 0.9 : 0.97), backgroundColor : "#151515"} ]} onPress={ props.makeStatusModalLanguages  }>
                    <Pressable style={[ {width: width*0.9, height: height*0.7, marginTop: height*0.05, paddingBottom: height*0.05, justifyContent: 'space-between', alignSelf: "center", alignItems: 'center', borderRadius: 5, backgroundColor : "#3b3b3b"} ]} onTouchEnd={ (e) => e.stopPropagation() }>
                        <View style={[ {width: (width*0.9), paddingTop: 5, paddingBottom: 7.5, flexDirection: "row", justifyContent: "center", alignItems: "center", borderTopRightRadius: 5, borderBottomWidth: 0.75, borderTopLeftRadius: 5, borderColor: "white", backgroundColor: "olivedrab"} ]}>
                            <Text style={[ {fontSize: 15, fontWeight: "bold", textAlign: "center", letterSpacing: 0.5, color: "white"} ]}>{languages[0][props.idLanguage].languages}</Text> 
                        </View>

                        <View style={[ {flexDirection: "row", justifyContent: "center", alignSelf: "flex-start", alignItems: "flex-start"} ]}>
                            <SafeAreaView style={[ {flex: 1, justifyContent: "center", alignSelf: "flex-start", alignItems: "flex-start"} ]}>
                                <RadioGroup selectedId={props.idLanguage} radioButtons={languagesEurope} onPress={ props.setIdLanguage } />                        
                            </SafeAreaView>

                            <SafeAreaView style={[{flex: 1, justifyContent: "center", alignItems: "flex-start"}]}>
                                <RadioGroup selectedId={props.idLanguage} radioButtons={languagesOther} onPress={ props.setIdLanguage } />
                            </SafeAreaView>
                        </View>

                        <Pressable style={[ {height: height*0.1, justifyContent: "center", alignItems: "center"} ]} onPress={ props.makeStatusModalLanguages }>
                            <Text style={[ {width: width*0.35, height: height*0.06, lineHeight: height*0.06, fontSize: height*0.02, textAlign: "center", letterSpacing: 0.5, color: "white", borderRadius: 25, backgroundColor: '#3498db'} ]}>{languages[0][props.idLanguage].close}</Text>
                        </Pressable>
                    </Pressable>
                </Pressable> 
                <SponsorFallback idLanguage={props.idLanguage} />
            </Modal>
        </View>
    )
    
}

