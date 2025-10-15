import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Animated as AnimNat } from "react-native";

import { DATAS_PIPES_LIST } from '../datas/datas_pipes.js';

import { ReText } from './ReText.js';


export function DiameterElbowList (props) {

    const { height, width } = Dimensions.get("window");
    const ReTextAnimated = AnimNat.createAnimatedComponent(ReText);


    const [diameter, setDiameter] = useState(props.currentDiameterFree._value);
    const lastValueRef = useRef(diameter);

    useEffect(() => {
        // écoute une seule fois, jamais relancé
        const listenerId = props.currentDiameterFree.addListener(({ value }) => {
            if (value !== lastValueRef.current) {
                lastValueRef.current = value;
                setDiameter(value);
            }
        });

        return () => {
            props.currentDiameterFree.removeListener(listenerId); // cleaning
        };
    }, []);


    return (
        <View key={"diam-elbows"} style={[ { width: width*0.19, flexDirection: "column", justifyContent: "space-between", backgroundColor: "transparent" } ]}>
            <View style={[ { lineHeight: height*0.0225, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "transparent" } ]}>
                <Text style={[ styles.labelTopBar, {width: width*0.15, lineHeight: height*0.0225, fontSize: width*0.03, backgroundColor: "#353535" } ]}>{`Ø`}</Text>
            </View>

            <View style={[ {paddingLeft: width*0.007, justifyContent: "space-between", alignItems: "flex-start", backgroundColor: "transparent"} ]}>
                <ReTextAnimated style={[ styles.datasTopBar ]} fontSize={props.sizeText} color={props.color} name={DATAS_PIPES_LIST[diameter][props.norme._value]} />
                <ReTextAnimated style={[ styles.datasTopBar ]} fontSize={props.sizeText} color={props.color} name={(props.idSettingsDiameter == 0 ? `DN ${DATAS_PIPES_LIST[diameter][0]}` : `${DATAS_PIPES_LIST[diameter][props.idSettingsDiameter]} "`)} />
            </View>
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
    },
    datasTopBar: {
        marginBottom: 7.5,
        paddingRight: 11,
        paddingLeft: 11,
        fontWeight: "500",
        textAlign: "center",
        color: "white",
        borderRadius: 10,
        backgroundColor: "#515151"
    }
});