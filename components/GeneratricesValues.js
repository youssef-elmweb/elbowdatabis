import React from 'react';
import { Dimensions } from "react-native"; 

import { ReText } from  "./ReText";

export function GeneratricesValues (props) {

    const { height, width } = Dimensions.get("window");
    
    return (
        <ReText fontSize={width*0.035} backgroundColor="transparent" countGenes={props.countGenes} lineHeight={height*0.025} generatriceValue={props.generatriceValue} key={`gene-${2}`} color={((props.countGenes == 4 && (props.i) == 1) || (props.countGenes == 8 && (props.i) == 2) || (props.countGenes == 12 && (props.countGenes/3) == (props.i+1)) || (props.countGenes == 16 && (props.countGenes/4) == (props.i)) || (props.countGenes == 24 && (props.countGenes/4) == (props.i)) || (props.countGenes == 32 && (props.countGenes/4) == (props.i)) ? "#2ecc71" : "white")} name={(`${(props.generatriceValue == "" ? 0 : props.generatriceValue)}`)} />
    )
}

