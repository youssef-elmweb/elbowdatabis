import { React, useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import { Svg, G } from 'react-native-svg';
import { useSharedValue } from 'react-native-reanimated';

import { Elbow } from  "../../components/Elbow.js";
import { ListCurvesStd } from "../ListCurvesStd.js";


////////////////////////////////////////////// ELBOW
////////////////////////////////////////////////////////////////////
export function ViewElbow (props) {

    const { width, height } = Dimensions.get("window");

    const angleBegin = useSharedValue(false);
    const scaleBegin = useSharedValue(1);

    const ELBOW_MEMOIZED = useMemo(() => {
        return <Elbow scaleBegin={scaleBegin} angleBegin={angleBegin} angle={props.angle} currentDiameter={props.currentDiameter} format={props.format} formatElbow={props.formatElbow} checkboxDatasInterfaceState={props.checkboxDatasInterfaceState} norme={props.norme} idSettingsMeasure={props.idSettingsMeasure} idSettingsAngle={props.baseAngle} idSettingsDatas={props.idSettingsDatas} />;
    }, [props.angle, props.angleAnimated, width, height, props.currentDiameter])
  

    return (
        <View>
            <Svg style={[ styles.elementSvg ]} viewBox={`-${width*0.1} -${(height*0.485)} ${width} ${(height*0.5)}`}> 
                { ELBOW_MEMOIZED }

                {   
                    (props.checkboxDatasInterfaceState == true ? 
                        <G>
                            <ListCurvesStd idCurrentDiameterForSlider={props.idCurrentDiameterForSlider} idSettingsAngle={props.idSettingsAngle} measureUnit={props.measureUnit} angle={props.angle} idSettingsDatas={props.idSettingsDatas} norme={props.norme} curvesMeasure={props.curvesMeasure} idSettingsMeasure={props.idSettingsMeasure} currentDiameter={props.currentDiameter} currentDiameterFree={props.currentDiameterFree} formatElbow={props.formatElbow} />
                        </G> :
                    false) 
                }
            </Svg> 
        </View>
    )
}


const styles = StyleSheet.create({
    elementSvg: {
        width: Dimensions.get("window").width,
        minHeight: Dimensions.get("window").height*0.445,
        maxHeight: Dimensions.get("window").height*0.445,
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#303030" 
    }
});