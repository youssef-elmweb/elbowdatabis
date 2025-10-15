import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Animated as AnimNat, Dimensions } from "react-native";

import { languages } from '../languages/languages.js';

import { DiameterElbow } from './DiameterElbow.js';

import { ReText } from './ReText.js';
import { DiameterElbowList} from './DiameterElbowList.js';


export function ValuesElbow (props) {

    const { width, height } = Dimensions.get("window");

    const ReTextAnimated = AnimNat.createAnimatedComponent(ReText);

    return (
            <View style={{ flexDirection: "column", height: height*0.08, alignItems: "flex-start", backgroundColor: "transparent" }}>

            <View style={{ flexDirection: "row", height: height*0.08, }}>
                {
                    (
                        (props.idCurrentDiameterForSlider == 1 ?
                                <DiameterElbow sizeText={props.sizeText} color={"aqua"} currentDiameter={props.currentDiameter} norme={props.norme} idSettingsDiameter={props.idSettingsDiameter} />
                            : 
                                <DiameterElbowList sizeText={props.sizeText} color={"aqua"} currentDiameterFree={props.currentDiameterFree} norme={props.norme} idSettingsDiameter={props.idSettingsDiameter} />
                        )
                    )
                }

                <View key={"intra-extra"} style={[ { flexDirection: "column", justifyContent: "space-between", backgroundColor: "transparent" } ]}>
                    <View style={[ { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderRightWidth: width*0.025, borderColor: "#515151", backgroundColor: "transparent" } ]}>
                        <Text style={[ styles.labelTopBar, { width: width*0.375, lineHeight: height*0.0225, fontSize: width*0.03, backgroundColor: "#353535" } ]}>{`${languages[0][props.idLanguage].intra} / ${languages[0][props.idLanguage].extra}`}</Text>
                    </View>

                    <View style={[ { width: width*0.35, paddingInlineStart: width*0.125, backgroundColor: "transparent"} ]}>
                        <ReTextAnimated style={[ styles.datasTopBar ]} fontSize={props.sizeText} color={props.colorDatasCurves} name={props.intra} />
                        <ReTextAnimated style={[ styles.datasTopBar ]} fontSize={props.sizeText} color={props.colorDatasCurves} name={props.extra} />
                    </View>
                </View>

                <View key={"angle-radius"} style={[ { flexDirection: "column", justifyContent: "space-between", backgroundColor: "transparent" } ]}>
                    <View style={[ { lineHeight: height*0.0225, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "transparent" } ]}>
                        <Text style={[ styles.labelTopBar, { width: width*0.325, lineHeight: height*0.0225, fontSize: width*0.03, backgroundColor: "#353535" } ]}>{`${languages[0][props.idLanguage].angle} / ${languages[0][props.idLanguage].radius}`}</Text>
                    </View>

                    <View style={[ {width: width*0.35, paddingInlineStart: width*0.125, justifyContent: "space-between", alignItems: "flex-start", backgroundColor: "transparent"} ]}>
                        <ReTextAnimated style={[ styles.datasTopBar ]} fontSize={props.sizeText} color="white" angle={ props.angle } />
                        <ReTextAnimated style={[ styles.datasTopBar ]} fontSize={props.sizeText} color="lime" name={ props.radius } />
                    </View>
                </View>
            </View>

            {(props.idSettingsAngle != 0 ?
                <View style={{ width: width*0.98, flexDirection: "row", marginBlockStart: height*0.0075, justifyContent: "flex-start", height: height*0.05, backgroundColor: "transparent" }}>
                    <View style={[ { width: width*0.5, flexDirection: "row", alignItems: "center", backgroundColor: "transparent" } ]}></View>

                    <View style={{ width: width*0.425, flexDirection: "row", justifyContent: "flex-end", backgroundColor: "transparent" }}>
                        <View style={{ width: width*0.3, flexDirection: "rcow", justifyContent: "flex-end" }}>
                            <View style={[ {minHeight: height*0.05, maxHeight: height*0.05, flexDirection: "row", alignItems: "center", backgroundColor: "transparent"} ]}> 
                                <View style={[ {width: width*0.3, flexDirection: "row", justifyContent: "space-evenly", alignSelf: "center"} ]}>
                                    <TouchableHighlight style={[ {width: width*0.1, height: width*0.065, justifyContent: "center", alignItems: "center", borderTopRightRadius: 3.5, borderBottomRightRadius: 3.5, borderBottomLeftRadius: 7.5, borderTopLeftRadius: 7.5, backgroundColor: "#414141"}]} activeOpacity={0.25} onPress={ () => { props.subtractAnglePrecision(); (props.idCurrentDiameterForSlider == 1 ? props.makeDatasElbowByAngle(props.getDatasElbows) : props.makeDatasElbowByAngleAndFreeDiameter(props.getDatasElbows)); } }>
                                        <Text style={[ {fontSize: width*0.05, fontWeight: "bold", lineHeight: width*0.05, color: "whitesmoke"} ]}>-</Text>
                                    </TouchableHighlight>

                                    <TouchableHighlight style={[ {width: width*0.1, height: width*0.065, justifyContent: "center", alignItems: "center", borderTopRightRadius: 7.5, borderBottomRightRadius: 7.5, borderBottomLeftRadius: 3.5, borderTopLeftRadius: 3.5, backgroundColor: "#414141"} ]} activeOpacity={0.25} onPress={ () => { props.addAnglePrecision(); (props.idCurrentDiameterForSlider == 1 ? props.makeDatasElbowByAngle(props.getDatasElbows) : props.makeDatasElbowByAngleAndFreeDiameter(props.getDatasElbows)); } }>
                                        <Text style={[ {fontSize: width*0.05, lineHeight: width*0.05, color: "whitesmoke"} ]}>+</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>  
                        </View>
                    </View>
                </View> 
            : false)}
        </View>
    )

}


const styles = StyleSheet.create({
    labelTopBar: {
        fontWeight: "500",
        textAlign: "center",
        color: "white",
        borderRadius: 10,
        backgroundColor: "#515151"
    }
});