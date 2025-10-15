import React from 'react';
import { View, Text, Pressable, Image, Switch, Modal, Dimensions, Platform } from "react-native";

import { cleanEntryInputNumber } from '../library/functions.js';

import { NumericInput } from './NumercInput.js';

import { DiameterElbowSlices } from './DiameterElbowSlices.js';

import { languages } from '../languages/languages.js';


export function ValuesElbowSlices (props) {

    const { width, height } = Dimensions.get("window");

    /////////// BUTTONS GENERATRICES NUMBER CHOICE //////////////////////
    const GENERATRICES_BUTTONS = [
        <View key={`bloc-gen-4-12`} style={[ {width: ((width*0.9)), height: ((height*0.35) / 2.75), flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"} ]}>
            <Pressable key={`gen-4`} style={[ {width: ((width*0.9) / 4), height: ((height*0.375) / 5.75), justifyContent: "center", alignItems: "center", borderRadius: (width*0.025), backgroundColor: (props.countGenes === 4 ? "#009432" : "#252525")} ]} onPress={ () => props.setCountGenes(() => 4) }>
                <Text style={[ {fontSize: (width*0.035), fontWeight: "bold", color: "#b2bec3"} ]}>4</Text>
            </Pressable>

            <Pressable key={`gen-8`} style={[ {width: ((width*0.9) / 4), height: ((height*0.375) / 5.75), justifyContent: "center", alignItems: "center", borderRadius: (width*0.025), backgroundColor: (props.countGenes === 8 ? "#009432" : "#252525")} ]} onPress={ () => props.setCountGenes(() => 8) }>
                <Text style={[ {fontSize: (width*0.035), fontWeight: "bold", color: "#b2bec3"} ]}>8</Text>
            </Pressable>     
            
            <Pressable key={`gen-12`} style={[ {width: ((width*0.9) / 4), height: ((height*0.375) / 5.75), justifyContent: "center", alignItems: "center", borderRadius: (width*0.025), backgroundColor: (props.countGenes === 12 ? "#009432" : "#252525")} ]} onPress={ () => props.setCountGenes(() => 12) }>
                <Text style={[ {fontSize: (width*0.035), fontWeight: "bold", color: "#b2bec3"} ]}>12</Text>
            </Pressable>  
        </View>,   
        
        <View key={`bloc-gen-16-32`} style={[ {width: ((width*0.9)), height: ((height*0.35) / 2.75), flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"} ]}>
            <Pressable key={`gen-16`} style={[ {width: ((width*0.9) / 4), height: ((height*0.375) / 5.75), justifyContent: "center", alignItems: "center", borderRadius: (width*0.025), backgroundColor: (props.countGenes === 16 ? "#009432" : "#252525")} ]} onPress={ () => props.setCountGenes(() => 16) }>
                <Text style={[ {fontSize: (width*0.035), fontWeight: "bold", color: "#b2bec3"} ]}>16</Text>
            </Pressable>

            <Pressable key={`gen-24`} style={[ {width: ((width*0.9) / 4), height: ((height*0.375) / 5.75), justifyContent: "center", alignItems: "center", borderRadius: (width*0.025), backgroundColor: (props.countGenes === 24 ? "#009432" : "#252525")} ]} onPress={ () => props.setCountGenes(() => 24) }>
                <Text style={[ {fontSize: (width*0.035), fontWeight: "bold", color: "#b2bec3"} ]}>24</Text>
            </Pressable>      
            
            <Pressable key={`gen-32`} style={[ {width: ((width*0.9) / 4), height: ((height*0.375) / 5.75), justifyContent: "center", alignItems: "center", borderRadius: (width*0.025), backgroundColor: (props.countGenes === 32 ? "#009432" : "#252525")} ]} onPress={ () => props.setCountGenes(() => 32) }>
                <Text style={[ {fontSize: (width*0.035), fontWeight: "bold", color: "#b2bec3"} ]}>32</Text>
            </Pressable>   
        </View>
    ];
    /////////// BUTTONS GENERATRICES NUMBER CHOICE //////////////////////


    return (
        <View style={{ flexDirection: "row", backgroundColor: "transparent" }}>
            <Modal style={[ {height: height, justifyContent: "center", alignItems: "center"} ]} animationType={"fade"} transparent={true} visible={props.statusModalGeneratrices}>
                <Pressable style={[ {width: width, height: height, justifyContent: 'center', alignItems: 'center', opacity: (height > 650 ? 0.9 : 0.97), backgroundColor : "#151515"} ]} onPress={ props.makeStatusModalGeneratrices }>
                    <Pressable style={[ {width: width*0.9, height: (height*0.465), justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: "#3A3A3A"} ]} onTouchEnd={ (e) => e.stopPropagation() }>
                        <View style={[ {width: (width*0.9), height: (height*0.065), flexDirection: "row", justifyContent: "center", alignItems: "center", borderBottomWidth: 0.75, borderColor: "white", borderTopRightRadius: 5, borderTopLeftRadius: 5, backgroundColor: "#252525"} ]}>
                            <Text style={[ {fontSize: width*0.05, fontWeight: "600", textAlign: "center", letterSpacing: 0.5, color: "white"} ]}>{languages[0][props.idLanguage].generators}</Text> 
                        </View>

                        <View style={[ {width: (width*0.9), height: (height*0.3), flexDirection: "column", justifyContent: "center", alignSelf: "center", alignItems: "center", backgroundColor: "transparent"} ]}>
                            { GENERATRICES_BUTTONS }
                        </View>

                        <Pressable style={[ {width: width*0.9, height: height*0.1, justifyContent: "center", alignItems: "center", alignSelf: "center", borderBottomRightRadius: 5, borderBottomLeftRadius: 5, backgroundColor: "#252525"} ]} onPress={ () => { props.makeStatusModalGeneratrices(); props.makeDatasElbowSlices() } }>
                            <Text style={[ {width: width*0.45, height: height*0.06, lineHeight: height*0.06, textAlign: "center", letterSpacing: 0.5, fontSize: width*0.035, fontWeight: "bold", color: "white", borderRadius: 25, backgroundColor: '#3498db'} ]}>{languages[0][props.idLanguage].close}</Text>
                        </Pressable>
                    </Pressable>
                </Pressable> 
            </Modal>

            <DiameterElbowSlices sizeText={props.sizeText} color={"aqua"} currentDiameter={props.currentDiameter._value} norme={props.norme} idSettingsDiameter={props.idSettingsDiameter} />

            <View style={[ { width: width*0.75, height: height*0.05, marginRight: width*0.015, flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start" } ]}>
                <View style={[ { width: width*0.115, minHeight: height*0.05, maxHeight: height*0.05, marginLeft: width*0.01, flexDirection: "row", justifyContent: "center", alignItems: "center",  borderWidth: 0.5, borderColor: "white", backgroundColor: "#353535", borderRadius: (Platform.OS != "ios" ? 2.5 : false) } ]}>
                    <Pressable style={[ {width: (height > 700 ? width*0.07 : width*0.08), height: (height > 700 ? height*0.05 : width*0.08), justifyContent: "center", alignItems: "flex-start"} ]} onPress={ () => props.setStatusModalGeneratrices(true) }>
                        <Image alt={"generators"} style={[ {width: (height > 700 ? width*0.07 : width*0.08), height: (height > 700 ? height*0.05 : width*0.08)} ]} source={require("../assets/images/generatrices.png")} />
                    </Pressable>
                </View>

                <View style={[ { width: width*0.275, height: height*0.05, marginHorizontal: width*0.0175, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: (Platform.OS != "ios" ? 2.5 : false), backgroundColor: (Platform.OS != "ios" ? "#525252" : false) } ]}>
                    <Text style={[ { textAlign: "center", fontSize: width*0.0325, fontWeight: 'bold', color: 'white' } ]}>{props.labelNorme}</Text>
                        
                    <Switch
                        trackColor={ {false: "#ddd", true: "#ddd"} }
                        thumbColor={ props.isShown ? props.colorSwitch : props.colorSwitch }
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={ () => { props.toggleTheBox(); props.makeDatasElbowSlices(); } }
                        value={ props.isShown }
                        disabled={ props.statutSwitch }
                    />                             
                </View>

                <View>
                    <NumericInput
                        style={[ {width: width*0.3, height: height*0.05, paddingLeft: width*0.015, justifyContent: "center", alignItems: "flex-start", backgroundColor: "white"} ]}
                        value={props.currentInputValue}
                        onChangeText={ (v) => { if (Number.parseFloat(v) > 100000) { props.makeDatasElbowSlices("100000"); } else { let entryInputNumber = cleanEntryInputNumber(v); props.makeDatasElbowSlices(entryInputNumber); } } }
                        maxLength={6}
                        maxValue={100000}
                        minValue={0}
                        showError={true}
                        maxDecimals={2}
                        onSubmitEditing={() => {
                            props.makeDatasElbowSlices(props.currentInputValue); 
                        }}
                    />
                </View>
            </View>
        </View>
    )
}
