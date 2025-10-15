import { React } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Svg } from 'react-native-svg';

import { ElbowSlices } from  "../ElbowSlices.js";

import { DATAS_PIPES } from "../../datas/datas_pipes.js";
import { DATAS_TRIGONOMETRICS } from "../../datas/datas_trigonometrics.js";


export function ViewElbowSlices (props) {

    //////////////////// GENERAL CONST //////////////////////////////////
    const { width, height } = Dimensions.get("window");
    //////////////////// GENERAL CONST //////////////////////////////////

    return  (
        <Svg style={[ styles.elementSvg ]} viewBox={`-${width*0.1} -${(height*0.485)} ${width} ${height*0.5}`}>
            <ElbowSlices sizeText={props.sizeText} geneOne={(Number(props.currentInputValue) == "" || Number(props.currentInputValue) == 0 ? "0" : parseFloat(Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * (Number(props.currentInputValue) - (DATAS_PIPES[props.currentDiameter._value][props.norme._value]/2))).toFixed(2))} geneLast={(Number(props.currentInputValue) == "" || Number(props.currentInputValue) == 0 ? "0" : parseFloat(Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * ((DATAS_PIPES[props.currentDiameter._value][props.norme._value]/2) + Number(props.currentInputValue))).toFixed(2))} countGenes={props.countGenes} idSettingsMeasure={props.idSettingsMeasure} idSettingsDatas={props.idSettingsDatas} checkboxDatasInterfaceState={props.checkboxDatasInterfaceState} /> 
        </Svg>
    )

}


const styles = StyleSheet.create({
    elementSvg: {
        width: Dimensions.get("window").width,
        minHeight: Dimensions.get("window").height*0.445,
        maxHeight: Dimensions.get("window").height*0.445,
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#252525" 
        
    }
});

