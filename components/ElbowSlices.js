import React, { useState, useEffect } from 'react';
import { Dimensions } from "react-native";
import { G, Path, Line, Text } from 'react-native-svg';

import { DATAS_TRIGONOMETRICS } from '../datas/datas_trigonometrics.js';

import { adjustSvgToScreen } from "../library/functions.js";


export function ElbowSlices (props) {

    const [scale, setScale] = useState(1);

    const generatrices = [];

    const { width } = Dimensions.get("window");


    useEffect(() => {
        adjustSvgToScreen(setScale);
    }, [])


    for (let i = 1; i <= (props.countGenes/2)+1; i++) { 
        if (i == 1) {
            generatrices.push([ <Line //////// Generatrices short bottom
                                    key={`gene-${i}`}
                                        x1={`0`} y1={`-${(width*0.8)}`} 
                                        x2={Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * (width*0.8)} y2={`-${(width*0.8)}`}
                                        stroke={"white"} 
                                        strokeWidth={2.75}
                                        strokeLinecap={"round"}   
                                />])         
        
        }
        if (i == 1) {
            generatrices.push([ <Line //////// Generatrices short bottom
                                    key={`gene-${i}`}
                                        x1={`0`} y1={`-${(width*0.24)}`} 
                                        x2={Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * (width*0.24)} y2={`-${(width*0.24)}`}
                                        stroke={"white"} 
                                        strokeWidth={2.75}
                                        strokeLinecap={"round"}   
                                />,
        
                                <Text key={`text-gene-${i}`} x={`-${width*0.03}`} y={`-${(width*0.23)}`} fontSize={width*0.035} fill={"deepskyblue"} stroke={"deepskyblue"} textAnchor={"end"}>{i}</Text>])         
        
        }   else {

                generatrices.push([ <Line //////// All Generatrices
                                        key={`gene-${i}`}
                                            x1={`0`} y1={`-${(width*0.24) + ((width*0.56)/(props.countGenes/2) * (i-1))}`} 
                                            x2={Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * ((((width*0.56)/(props.countGenes/2)*(i-1))) + (width*0.24))} y2={`-${(width*0.24) + ((width*0.56)/(props.countGenes/2) * (i-1))}`}
                                            stroke={((props.countGenes == 4 && (props.countGenes/2) == (i)) || (props.countGenes == 8 && (props.countGenes/2) == (i+1)) || (props.countGenes == 12 && (props.countGenes/3) == i) || (props.countGenes == 16 && (props.countGenes/4) == (i-1)) || (props.countGenes == 24 && (props.countGenes/3) == (i+1))  || (props.countGenes == 32 && (props.countGenes/4) == (i-1)) ? "#2ecc71" : "white")} 
                                            strokeWidth={1}
                                            strokeLinecap={"round"}   
                                        />,
                    
                                        <Text key={`text-gene-${i}`} x={`-${width*0.03}`} y={`-${(width*0.23) + ((width*0.56)/(props.countGenes/2) * (i-1))}`} fontSize={width*0.035} fill={((props.countGenes == 4 && (props.countGenes/2) == (i)) || (props.countGenes == 8 && (props.countGenes/2) == (i+1)) || (props.countGenes == 12 && (props.countGenes/3) == i) || (props.countGenes == 16 && (props.countGenes/4) == (i-1)) || (props.countGenes == 24 && (props.countGenes/3) == (i+1))  || (props.countGenes == 32 && (props.countGenes/4) == (i-1)) ? "#2ecc71" : (i == ((props.countGenes/2)+1) ? "#f368e0" : "silver"))} stroke={"none"} textAnchor={"end"}>{i}</Text>]);
            }
    }


    return (

        <G style={[{ transform: [{ scale }] }]}>
            <Path strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth={2.75} stroke={"gray"} d={`M ${width*0.24} 0 L ${width*0.8} 0`} />

            <Line //////// Axe (one slice) on 0 or right AXE OF SLICE ENTIER
                key={"elbow-slice-half-section-right"}
                    x1 = {Math.cos(DATAS_TRIGONOMETRICS.oneDegreRad * 30) * width*0.8} y1 = {`-${Math.sin(DATAS_TRIGONOMETRICS.oneDegreRad * 30) * width*0.8}`} 
                    x2 = {Math.cos(DATAS_TRIGONOMETRICS.oneDegreRad * 30) * width*0.24} y2 = {`-${Math.sin(DATAS_TRIGONOMETRICS.oneDegreRad * 30) * width*0.24}`}
                    stroke = "red" 
                    strokeWidth = {0.5}
                    strokeLinecap = {"round"}
                    strokeDasharray = {"18 10 5 10"}  
            />

            <Line //////// Axe (one slice) 0 or right AXE OF SLICE ENTIER
                key={"elbow-slice-half-section-left"}
                    x1 = {Math.cos(DATAS_TRIGONOMETRICS.oneDegreRad * 60) * width*0.8} y1 = {`-${Math.sin(DATAS_TRIGONOMETRICS.oneDegreRad * 60) * width*0.8}`} 
                    x2 = {Math.cos(DATAS_TRIGONOMETRICS.oneDegreRad * 60) * width*0.24} y2 = {`-${Math.sin(DATAS_TRIGONOMETRICS.oneDegreRad * 60) * width*0.24}`}
                    stroke = "red" 
                    strokeWidth = {0.5}
                    strokeLinecap = {"round"}
                    strokeDasharray = {"18 10 5 10"}  
            />

            {generatrices}

            <Line
                key={"elbow-slice-top-a"}
                    x1={Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * width*0.8} y1={`-${width*0.8}`}
                    x2={(Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15)*3) * width*0.8} y2={`-${width*0.8}`}
                    stroke = {"gray"} 
                    strokeWidth = {2.75}
                    strokeLinecap = {"round"}   
                    transform = {`rotate(${30}, ${Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * width*0.8}, -${width*0.8})`}
            />

            <Line
                key={"elbow-slice-bottom-a"}
                    x1={Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * width*0.24} y1={`-${width*0.24}`}
                    x2={(Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15)*3) * width*0.24} y2={`-${width*0.24}`}
                    stroke = {"gray"} 
                    strokeWidth = {2.75}
                    strokeLinecap = {"round"}   
                    transform = {`rotate(${30}, ${Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * width*0.24}, -${width*0.24})`}
            />

            <Line
                key={"elbow-slice-top-b"}
                    x1={width*0.8} y1={`-${Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * width*0.8}`}
                    x2={width*0.8} y2={`-${(Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * width*0.8)*3}`}
                    stroke = {"gray"} 
                    strokeWidth = {2.75}
                    strokeLinecap = {"round"}   
                    transform = {`rotate(${-30}, ${width*0.8}, -${Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * width*0.8})`}
            />

            <Line
                key={"elbow-slice-bottom-b"}
                    x1={width*0.24} y1={`-${Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * width*0.24}`}
                    x2={width*0.24} y2={`-${(Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * width*0.24)*3}`}
                    stroke = {"gray"} 
                    strokeWidth = {2.75}
                    strokeLinecap = {"round"}   
                    transform = {`rotate(${-30}, ${width*0.24}, -${Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * width*0.24})`}
            />

            <Line
                key={"elbow-slice-top-c"}
                    x1 = {width*0.8} y1 = {0} 
                    x2 = {width*0.8} y2 = {`-${Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * width*0.8}`}
                    stroke = {"gray"}
                    strokeWidth = {2.75}
                    strokeLinecap = {"round"}   
            />

            <Line
                key={"elbow-slice-bottom-c"}
                    x1 = {width*0.24} y1 = {0} 
                    x2 = {width*0.24} y2 = {`-${Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * width*0.24}`}
                    stroke = {"gray"}
                    strokeWidth = {2.75}
                    strokeLinecap = {"round"}   
            />

            <Line
                key={"elbow-slice-start"}
                    x1 = {Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad * 15) * width*0.8} y1 = {`-${width*0.8}`}
                    x2 = {Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad * 15) * width*0.24} y2 = {`-${width*0.24}`}
                    stroke = {"white"} 
                    strokeWidth = {2.75}
                    strokeLinecap = {"round"}
            />

            <Line
                key={"elbow-slice-axe"}
                    x1 = {(Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * width*0.24)} y1 = {`-${width*0.24}`} 
                    x2 = {(Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * width*0.8)} y2 = {`-${width*0.8}`}
                    stroke = {"gray"} 
                    strokeWidth = {2.75}
                    strokeLinecap = {"round"}   
                    transform = {`rotate(${30}, ${0}, -${0})`}
            />

            <Line
                key={"elbow-slice-end"}
                    x1 = {width*0.24} y1 = {`-${Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * width*0.24}`} 
                    x2 = {width*0.8} y2 = {`-${Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * width*0.8}`}
                    stroke = {"gray"}
                    strokeWidth = {2.75}
                    strokeLinecap = {"round"}   
            />                                

            <Path strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth={2.75} stroke={"white"} d={`M 0 -${width*0.24} L 0 -${width*0.8}`} />  


            <Text x={width*0.475} y={-(width*0.75)} fill={"magenta"} stroke={"none"} fontSize={props.sizeText} letterSpacing={width*0.02} textAnchor={"middle"}>{props.geneOne}</Text>
            <Text x={width*0.75} y={-(width*0.75)} fill={"deepskyblue"} stroke={"none"} fontSize={props.sizeText} letterSpacing={width*0.02} textAnchor={"middle"}>{props.geneLast}</Text>
        </G>
    )
}