//////////////////////////////////////////////////////////////////////////////////////////
import { React, useRef, useEffect, useState, useMemo } from "react";
import { View, Text, Image, Switch, Pressable, TouchableHighlight, StyleSheet, useWindowDimensions, Animated as AnimNat, Platform } from "react-native";

import * as functions from "./library/functions.js";

import { useSharedValue } from 'react-native-reanimated';

import { cleanEntryInputNumber, getInitialLanguageId } from "./library/functions.js";

import Slider from '@react-native-community/slider';
import { GeneratricesValues } from "./components/GeneratricesValues.js";

import { languages } from './languages/languages.js';

import { DATAS_PIPES, DATAS_PIPES_LIST } from './datas/datas_pipes.js';
import { DATAS_ELBOWS } from "./datas/datas_elbows.js";
import { DATAS_TRIGONOMETRICS } from "./datas/datas_trigonometrics.js";
import { UNITS_MEASURES } from './datas/units_measures.js';

import { ModalSettings } from "./components/modals/ModalSettings.js";
import { ModalLanguages } from "./components/modals/ModalLanguages.js";

import { ModalUtilities } from "./components/modals/ModalUtilities.js";
import { ModalPrinters } from "./components/modals/ModalPrinters.js";
import { ModalInfos } from "./components/modals/ModalInfos.js";
import { ModalPremium } from "./components/modals/ModalPremium.js";

import { ViewElbow } from "./components/view/ViewElbow";
import { ViewElbowSlices } from "./components/view/ViewElbowSlices.js";

import { ValuesElbow } from "./components/ValuesElbow.js";
import { ValuesElbowSlices } from "./components/ValuesElbowSlices.js";

import DropDownPicker from "react-native-dropdown-picker";

import CalculatorPiping from "./components/CalculatorPiping.js";

import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function HomeScreen() {

    //////////////////  HOOKS STATE //////////////////////////////////////////
    const [statusModalLanguages, setStatusModalLanguages] = useState(false);
    const [idLanguage, setIdLanguage] = useState(getInitialLanguageId());
    //////////////////  HOOKS STATE //////////////////////////////////////////


    //////////////////// CONSTANTS /////////////////////////////////////
    ///////////////// constants values /////////////////////////////////
    const { height, width } = useWindowDimensions();
    const insets = useSafeAreaInsets();

    const w = Math.max(0, width - (insets.left + insets.right));
    const h = Math.max(0, height - (insets.top + insets.bottom));
    ///////////////// constants values /////////////////////////////////

    ///////////// constants api Animated ///////////////////////////////
    const angleBaseShared = useSharedValue(DATAS_ELBOWS.angle);

    const ANGLE = useRef(new AnimNat.Value(DATAS_ELBOWS.angle)).current;
    const INTRA = useRef(new AnimNat.Value(DATAS_ELBOWS.intra)).current;
    const EXTRA = useRef(new AnimNat.Value(DATAS_ELBOWS.extra)).current;
    const RADIUS = useRef(new AnimNat.Value(DATAS_ELBOWS.radius)).current;

    const FORMAT = useRef(new AnimNat.Value(3)).current;
    const DIAMETER = useRef(new AnimNat.Value(0)).current; // index of diameters array
    const DIAMETER_FREE = useRef(new AnimNat.Value(0)).current; // index of diameters array
    const NORME = useRef(new AnimNat.Value(2)).current;

    const BASEANGLE = useRef(new AnimNat.Value(0)).current;
    const BASEDATAS = useRef(new AnimNat.Value(2)).current;
    const MEASUREUNIT = useRef(new AnimNat.Value(0)).current;
    ///////////// constants api Animated ///////////////////////////////
    ///////////////// CONSTANTS ////////////////////////////////////////


    //////////////////  HOOKS STATE //////////////////////////////////////////
    const [sizeText, setSizeText] = useState(width*0.0375);

    const [elbowLayer, setElbowLayer] = useState("elbow");
    const [formatElbow, setFormatElbow] = useState(3); 
    
    const [isShown, setIsShown] = useState(false); // Show or Hide the purple box
    const [labelNorme, setLabelNorme] = useState("iso/ansi");
    const [statutSwitch, setStatutSwitch] = useState(true);
    const [colorSwitch, setColorSwitch] = useState("silver");

    const [blocGeneratricesValues, setBlocGeneratricesValues] = useState(null);
    const [currentInputValue, setCurrentInputValue] = useState("");
    const [statusModalGeneratrices, setStatusModalGeneratrices] = useState(false);
    const [currentDiameterElbowForSlider, setCurrentDiameterElbowForSlider] = useState(DIAMETER._value);
    const [currentDiameterElbowSlicesForSlider, setCurrentDiameterElbowSlicesForSlider] = useState(0);
    const [countPoint, setCountPoint] = useState(0);
    const [countGenes, setCountGenes] = useState(4);

    const [statusModalSettings, setStatusModalSettings] = useState(false);
    const [statusModalUtilities, setStatusModalUtilities] = useState(false);
    const [statusModalPrinters, setStatusModalPrinters] = useState(false);
    const [statusModalInfos, setStatusModalInfos] = useState(false);
    const [statusModalPremium, setStatusModalPremium] = useState(false);

    const [idSettingsMeasure, setIdSettingsMeasure] = useState(0);
    const [idSettingsDiameter, setIdSettingsDiameter] = useState(0);
    const [idSettingsAngle, setIdSettingsAngle] = useState(0);
    const [idSettingsDatas, setIdSettingsDatas] = useState(2);

    const [checkboxDatasInterfaceState, setCheckboxDatasInterfaceState] = useState(true);

    const [colorDatasCurves, setColorDatasCurves] = useState("white");

    const [idCurrentDiameterForSlider, setIdCurrentDiameterForSlider] = useState(1);

    const [closeCalculate, setCloseCalculate] = useState(true);


    useEffect(() => {
        if (idSettingsMeasure === 1) {
            const newId = idSettingsDatas === 1 ? 1 : 2;
            
            if (idSettingsDatas !== newId) {
                setIdSettingsDatas(newId);
            }
        }
    }, []);
    //////////////////  HOOKS STATE //////////////////////////////////////////


    ///////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////

    /////////////////////////////////////////////////////// ELBOW ////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const getDatasElbows = (datas = DATAS_ELBOWS) => {
        return datas;
    }

    const makeDatasElbowByAngleAndFreeDiameter = (datas) => { // callback datas argument is return of getDatasElbows
        if (datas.angle) {
            ANGLE.setValue(Number.parseFloat(datas.angle.toFixed(idSettingsAngle)));
        }

        if (Number(parseFloat(Math.tan((DATAS_TRIGONOMETRICS.oneDegreRad * ANGLE._value) / 2) * DATAS_PIPES_LIST[DIAMETER_FREE._value][FORMAT._value] * UNITS_MEASURES[0].unit).toFixed(1)) <= 0.6) { // pour ne pas avoir undefined si valeur trop basse en mm
            RADIUS.setValue(Number(parseFloat(Math.tan((DATAS_TRIGONOMETRICS.oneDegreRad * ANGLE._value) / 2) * DATAS_PIPES_LIST[DIAMETER_FREE._value][FORMAT._value] * UNITS_MEASURES[MEASUREUNIT._value].unit).toFixed(1)));
            INTRA.setValue(Number(parseFloat(((((DATAS_PIPES_LIST[DIAMETER_FREE._value][FORMAT._value] - (DATAS_PIPES_LIST[DIAMETER_FREE._value][2] / 2)) * DATAS_TRIGONOMETRICS.piOverTwo) / 90) * ANGLE._value) * (UNITS_MEASURES[MEASUREUNIT._value].unit)).toFixed(1)));
            EXTRA.setValue(Number(parseFloat((((((DATAS_PIPES_LIST[DIAMETER_FREE._value][2] / 2) + DATAS_PIPES_LIST[DIAMETER_FREE._value][FORMAT._value]) * DATAS_TRIGONOMETRICS.piOverTwo) / 90) * ANGLE._value) * (UNITS_MEASURES[MEASUREUNIT._value].unit)).toFixed(1)));
        }
        if (Number(parseFloat(Math.tan((DATAS_TRIGONOMETRICS.oneDegreRad * ANGLE._value) / 2) * DATAS_PIPES_LIST[DIAMETER._value][FORMAT._value] * UNITS_MEASURES[1].unit).toFixed(1)) <= 0.03) { // pour ne pas avoir undefined si valeur trop basse en pouces
            RADIUS.setValue(Number(parseFloat(Math.tan((DATAS_TRIGONOMETRICS.oneDegreRad * ANGLE._value) / 2) * DATAS_PIPES_LIST[DIAMETER_FREE._value][FORMAT._value] * UNITS_MEASURES[MEASUREUNIT._value].unit).toFixed(2)));
            INTRA.setValue(Number(parseFloat(((((DATAS_PIPES_LIST[DIAMETER_FREE._value][FORMAT._value] - (DATAS_PIPES_LIST[DIAMETER_FREE._value][2] / 2)) * DATAS_TRIGONOMETRICS.piOverTwo) / 90) * ANGLE._value) * (UNITS_MEASURES[MEASUREUNIT._value].unit)).toFixed(2)));
            EXTRA.setValue(Number(parseFloat((((((DATAS_PIPES_LIST[DIAMETER_FREE._value][2] / 2) + DATAS_PIPES_LIST[DIAMETER_FREE._value][FORMAT._value]) * DATAS_TRIGONOMETRICS.piOverTwo) / 90) * ANGLE._value) * (UNITS_MEASURES[MEASUREUNIT._value].unit)).toFixed(2)));
        }   else {
                RADIUS.setValue(Number(parseFloat(Math.tan((DATAS_TRIGONOMETRICS.oneDegreRad * ANGLE._value) / 2) * DATAS_PIPES_LIST[DIAMETER_FREE._value][FORMAT._value] * UNITS_MEASURES[MEASUREUNIT._value].unit).toFixed(idSettingsDatas)));
                INTRA.setValue(Number(parseFloat(((((DATAS_PIPES_LIST[DIAMETER_FREE._value][FORMAT._value] - (DATAS_PIPES_LIST[DIAMETER_FREE._value][2] / 2)) * DATAS_TRIGONOMETRICS.piOverTwo) / 90) * ANGLE._value) * (UNITS_MEASURES[MEASUREUNIT._value].unit)).toFixed(idSettingsDatas)));
                EXTRA.setValue(Number(parseFloat((((((DATAS_PIPES_LIST[DIAMETER_FREE._value][2] / 2) + DATAS_PIPES_LIST[DIAMETER_FREE._value][FORMAT._value]) * DATAS_TRIGONOMETRICS.piOverTwo) / 90) * ANGLE._value) * (UNITS_MEASURES[MEASUREUNIT._value].unit)).toFixed(idSettingsDatas)));
            }
            makeColorDatasCurves();
    }

    const makeDatasElbowByAngle = (datas) => { // callback datas argument is return of getDatasElbows

        if (datas.angle) {
            ANGLE.setValue(Number.parseFloat(datas.angle.toFixed(idSettingsAngle)));
        }

        if (Number(parseFloat(Math.tan((DATAS_TRIGONOMETRICS.oneDegreRad * ANGLE._value) / 2) * DATAS_PIPES[DIAMETER._value][FORMAT._value] * UNITS_MEASURES[0].unit).toFixed(1)) <= 0.6) { // pour ne pas avoir undefined si valeur trop basse en mm
            RADIUS.setValue(Number(parseFloat(Math.tan((DATAS_TRIGONOMETRICS.oneDegreRad * ANGLE._value) / 2) * DATAS_PIPES[DIAMETER._value][FORMAT._value] * UNITS_MEASURES[MEASUREUNIT._value].unit).toFixed(1)));
            INTRA.setValue(Number(parseFloat(((((DATAS_PIPES[DIAMETER._value][FORMAT._value] - (DATAS_PIPES[DIAMETER._value][NORME._value] / 2)) * DATAS_TRIGONOMETRICS.piOverTwo) / 90) * ANGLE._value) * (UNITS_MEASURES[MEASUREUNIT._value].unit)).toFixed(1)));
            EXTRA.setValue(Number(parseFloat((((((DATAS_PIPES[DIAMETER._value][NORME._value] / 2) + DATAS_PIPES[DIAMETER._value][FORMAT._value]) * DATAS_TRIGONOMETRICS.piOverTwo) / 90) * ANGLE._value) * (UNITS_MEASURES[MEASUREUNIT._value].unit)).toFixed(1)));
        }
        if (Number(parseFloat(Math.tan((DATAS_TRIGONOMETRICS.oneDegreRad * ANGLE._value) / 2) * DATAS_PIPES[DIAMETER._value][FORMAT._value] * UNITS_MEASURES[1].unit).toFixed(1)) <= 0.03) { // pour ne pas avoir undefined si valeur trop basse en pouces
            RADIUS.setValue(Number(parseFloat(Math.tan((DATAS_TRIGONOMETRICS.oneDegreRad * ANGLE._value) / 2) * DATAS_PIPES[DIAMETER._value][FORMAT._value] * UNITS_MEASURES[MEASUREUNIT._value].unit).toFixed(2)));
            INTRA.setValue(Number(parseFloat(((((DATAS_PIPES[DIAMETER._value][FORMAT._value] - (DATAS_PIPES[DIAMETER._value][NORME._value] / 2)) * DATAS_TRIGONOMETRICS.piOverTwo) / 90) * ANGLE._value) * (UNITS_MEASURES[MEASUREUNIT._value].unit)).toFixed(2)));
            EXTRA.setValue(Number(parseFloat((((((DATAS_PIPES[DIAMETER._value][NORME._value] / 2) + DATAS_PIPES[DIAMETER._value][FORMAT._value]) * DATAS_TRIGONOMETRICS.piOverTwo) / 90) * ANGLE._value) * (UNITS_MEASURES[MEASUREUNIT._value].unit)).toFixed(2)));
        }   else {
                RADIUS.setValue(Number(parseFloat(Math.tan((DATAS_TRIGONOMETRICS.oneDegreRad * ANGLE._value) / 2) * DATAS_PIPES[DIAMETER._value][FORMAT._value] * UNITS_MEASURES[MEASUREUNIT._value].unit).toFixed(idSettingsDatas)));
                INTRA.setValue(Number(parseFloat(((((DATAS_PIPES[DIAMETER._value][FORMAT._value] - (DATAS_PIPES[DIAMETER._value][NORME._value] / 2)) * DATAS_TRIGONOMETRICS.piOverTwo) / 90) * ANGLE._value) * (UNITS_MEASURES[MEASUREUNIT._value].unit)).toFixed(idSettingsDatas)));
                EXTRA.setValue(Number(parseFloat((((((DATAS_PIPES[DIAMETER._value][NORME._value] / 2) + DATAS_PIPES[DIAMETER._value][FORMAT._value]) * DATAS_TRIGONOMETRICS.piOverTwo) / 90) * ANGLE._value) * (UNITS_MEASURES[MEASUREUNIT._value].unit)).toFixed(idSettingsDatas)));
            }
            makeColorDatasCurves();
    }     

    const addAnglePrecision = () => { 
        let anglePrecision;

            if (BASEANGLE._value == 1 && ANGLE._value < parseFloat(90).toFixed(0)) {
                anglePrecision = 0.1;

                    updateAngleBaseShared(anglePrecision);
                    ANGLE.setValue(parseFloat((ANGLE._value + anglePrecision).toFixed(1)));

            }   else if (BASEANGLE._value == 2 && ANGLE._value < parseFloat(90).toFixed(0)) {
                anglePrecision = 0.01;

                    updateAngleBaseShared(anglePrecision);
                    ANGLE.setValue(parseFloat((ANGLE._value + anglePrecision).toFixed(2)));
                }
    } 

    const subtractAnglePrecision = () => { 
        let anglePrecision;

        if (BASEANGLE._value == 1 && ANGLE._value > parseFloat(1).toFixed(0)) {
            anglePrecision = 0.1;

                ANGLE.setValue(parseFloat((ANGLE._value - anglePrecision).toFixed(1))); 
                subtractAngleBaseShared(anglePrecision);

        }   else if (BASEANGLE._value == 2 && ANGLE._value > parseFloat(1).toFixed(0)) {
            anglePrecision = 0.01;

                ANGLE.setValue(parseFloat((ANGLE._value - anglePrecision).toFixed(2)));
                subtractAngleBaseShared(anglePrecision);
            }
    } 

    const updateAngleBaseSharedOnSlider = (value) => {
        "worklet"
        angleBaseShared.value = value;
    }

    const updateAngleBaseShared = (value) => {
        "worklet"
        angleBaseShared.value = parseFloat((angleBaseShared.value + value));
    }

    const subtractAngleBaseShared = (value) => {
        "worklet"
        angleBaseShared.value = parseFloat((angleBaseShared.value - value));
    }
    /////////////////////////////////////////////////////// ELBOW ////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////
    const toggleTheBox = () => { // This function will be triggered when the Switch changes
        setIsShown((previousState) => !previousState);
        setLabelNorme((value) => (value === "iso" ? "ansi" : "iso"));
        (labelNorme === "iso" ? NORME.setValue(7) : NORME.setValue(2));
        makeDatasElbowSlices(DIAMETER._value);
    };

    function decreaseText() {
        if (sizeText > width*0.03) { // 11 or sizeText is current initial state of size values
            setSizeText(sizeText-0.35); 
        }
    }

    function increaseText() {
        if (sizeText < width*0.04) { 
                setSizeText(sizeText+0.5); 
        }
    }
    ////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////
    const makeColorDatasCurves = () => {
        (DATAS_ELBOWS.roundAngles.includes(ANGLE._value) ? setColorDatasCurves(() => "deepskyblue") : setColorDatasCurves(() => "white"));
    }

    const setCurrentInterface = (currentInterface) => {
        setElbowLayer(currentInterface);
    }

    const makeCheckboxDatasInterfaceState = () => {
        setCheckboxDatasInterfaceState(!checkboxDatasInterfaceState);
    }
    ////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////
    const makeStatusModalSettings = () => {
        setStatusModalSettings(false);
        BASEANGLE.setValue(idSettingsAngle);
        MEASUREUNIT.setValue(idSettingsMeasure);
        BASEDATAS.setValue(idSettingsDatas);
        MEASUREUNIT.setValue(idSettingsMeasure);
        ANGLE.setValue(Number.parseFloat(ANGLE._value.toFixed(idSettingsAngle)));
        (idCurrentDiameterForSlider == 1 ? setValue(0) : setValue(DIAMETER_FREE._value));
        (idCurrentDiameterForSlider == 1 ? DIAMETER_FREE.setValue(0) : DIAMETER_FREE.setValue(DIAMETER_FREE._value));
        
        (idCurrentDiameterForSlider == 1 ? NORME.setValue(NORME._value) : NORME.setValue(2));
        
        (idCurrentDiameterForSlider == 1 ? makeDatasElbowByAngle(getDatasElbows) : makeDatasElbowByAngleAndFreeDiameter(getDatasElbows));
    }

    const makeStatusModalLanguages = () => {
        requestAnimationFrame(() => setStatusModalLanguages(false));
    }
    ////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////
    const makeStatusModalUtilities = () => {
        requestAnimationFrame(() => setStatusModalUtilities(!statusModalUtilities));
    }

    const makeStatusModalPrinters = () => {
        requestAnimationFrame(() => {
            setStatusModalUtilities(() => !statusModalUtilities); 
            setStatusModalPrinters(() => !statusModalPrinters); 
        })
    }

    const makeStatusModalInfos = () => {
        requestAnimationFrame(() => {
            setStatusModalUtilities(() => !statusModalUtilities); 
            setStatusModalInfos(() => !statusModalInfos); 
        })
    }
    ////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////
    const makeStatusModalGeneratrices = () => {
        requestAnimationFrame(() => setStatusModalGeneratrices(false));
        setCountGenes(countGenes);
    }
    ////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////
    const makeDatasElbowSlices = (v = currentInputValue, value = DIAMETER._value) => {

        let tabGeneratricesValues = [];
        let blocTabGeneratricesValues = [];
    
        for (let i = 1; i < (countGenes/2); i++) {
            tabGeneratricesValues.push(<View key={`gene-${i+1}`} style={[ {width: width*0.25, flexDirection: "row", justifyContent: "flex-start", alignSelf: "center"} ]}><Text style={[ {lineHeight: height*0.025, fontSize: width*0.035, color: ((countGenes == 4 && (i) == 1) || (countGenes == 8 && (i) == 2) || (countGenes == 12 && (countGenes/3) == (i+1)) || (countGenes == 16 && (countGenes/4) == (i)) || (countGenes == 24 && (countGenes/4) == (i)) || (countGenes == 32 && (countGenes/4) == (i)) ? "#2ecc71" : "silver")} ]}>{`${i+1}: `}</Text><GeneratricesValues style={[ {backgroundColor: "transparent"} ]} i={i} countGenes={countGenes} generatriceValue={(v != 0 ? Number(parseFloat(Math.tan(DATAS_TRIGONOMETRICS.oneDegreRad*15) * (v - (DATAS_PIPES[value][NORME._value]/2) + (DATAS_PIPES[value][NORME._value] / (countGenes/2)) * i)).toFixed(2)) : 0)} /></View>);

            if (countGenes == 4) {
                blocTabGeneratricesValues.push(<View key={`bloc-genes-to-up-${i}`} style={[ {width: width*0.25, textAlign: "center", justifyContent: "center", alignSelf: "center"} ]}>{tabGeneratricesValues}</View>);
                tabGeneratricesValues = []; 
            }

            if (countGenes == 8 && i % 1 == 0) {
                blocTabGeneratricesValues.push(<View key={`bloc-genes-to-up-${i}`} style={[ {width: width*0.25, textAlign: "center", alignSelf: "center",  backgroundColor: "transparent"} ]}>{tabGeneratricesValues}</View>);
                tabGeneratricesValues = []; 
            }

            if ((countGenes == 12 && i % 3 == 0) || (countGenes == 12 && i % 5 == 0)) {
                blocTabGeneratricesValues.push(<View key={`bloc-genes-to-up-${i}`} style={[ {width: width*0.25, paddingLeft: width*0.025, backgroundColor: "transparent"} ]}>{tabGeneratricesValues}</View>);
                tabGeneratricesValues = [];
            }

            if ((countGenes == 16 && i % 3 == 0) || (countGenes == 16 && i % 7 == 0)) {
                blocTabGeneratricesValues.push(<View key={`bloc-genes-to-up-${i}`} style={[ {width: width*0.25, paddingLeft: width*0.025, backgroundColor: "transparent"} ]}>{tabGeneratricesValues}</View>);
                tabGeneratricesValues = [];
            }

            if ((countGenes == 24 && i % 4 == 0) || (countGenes == 24 && i % 11 == 0)) {
                blocTabGeneratricesValues.push(<View key={`bloc-genes-to-up-${i}`} style={[ {width: width*0.25, paddingLeft: width*0.01, backgroundColor: "transparent"} ]}>{tabGeneratricesValues}</View>);
                tabGeneratricesValues = [];
            }

            if ((countGenes == 32 && i % 4 == 0) || (countGenes == 32 && i % 15 == 0)) {
                blocTabGeneratricesValues.push(<View key={`bloc-genes-to-up-${i}`} style={[ {width: width*0.2425, backgroundColor: "transparent"} ]}>{tabGeneratricesValues}</View>);
                tabGeneratricesValues = [];
            }
        }

        setBlocGeneratricesValues(blocTabGeneratricesValues);    

        let entryInputNumber = cleanEntryInputNumber(v);   
        setCurrentInputValue(entryInputNumber); 
    }
    ////////////////////////////////////////////////////////////////////////


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(DIAMETER_FREE._value);

    const diameterSet = new Set();
    const diameterArray = [];

    DATAS_PIPES_LIST.map((item, index) => {
        let diameter = index;

        if (!diameterSet.has(diameter)) {
            diameterSet.add(diameter);
            
            diameterArray.push({
                label: `${DATAS_PIPES_LIST[index][2].toString()} (${DATAS_PIPES_LIST[index][6].toString()})`,
                value: diameter.toString()
            });
        }
    })

    const [items, setItems] = useState(diameterArray);

    const LIST_DIAMETER = useMemo(() => {
        return  <DropDownPicker
                    open={ open }
                    value={ value }
                    items={ items }
                    setOpen={ setOpen }
                    setValue={ (v) => { setValue(v); } }
                    onChangeValue={(v) => {
                        const index = parseInt(v);
                        DIAMETER_FREE.setValue(index);
                        makeDatasElbowByAngleAndFreeDiameter(getDatasElbows);
                        updateAngleBaseSharedOnSlider(ANGLE._value); 
                    }}
                    setItems={setItems}
                    containerStyle={{ width: width * 0.75 }}
                    listMode="SCROLLVIEW"
                    autoScroll={true}
                    placeholder={`${languages[0][idLanguage].choice_diameter}`}
                />
    })


    const makeStatusModalPremium = () => {
        requestAnimationFrame(() => {
            setStatusModalUtilities(() => !statusModalUtilities); 
            setStatusModalPremium(() => !statusModalPremium); 
        })
    }

    const makeStatusModalPremiumOnModalPremium = () => {
        requestAnimationFrame(() => setStatusModalPremium(false));
    }

    const handlePressElbow = () => {
        setCurrentInterface('elbow');
        setCurrentDiameterElbowForSlider(0);
        NORME.setValue(2);
        setLabelNorme('iso');
    };

    const handlePressElbowSlices = () => {
        setCurrentInterface('elbow-slices');
        setCurrentDiameterElbowSlicesForSlider(0);
        NORME.setValue(2);
        setLabelNorme('iso');
    };
    

    ///////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////
    return (
        <View style={[ styles.container, { flex: 1, height: height - (insets.top + insets.bottom), flexDirection: "column" } ]}>
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            {/*/////////////////////////////////////////////   HEADER   //////////////////////////////////////////////////*/}

            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            {/*/////////////////////////////////////////////   MODALS   //////////////////////////////////////////////////*/}
            <ModalSettings style={{ flex: 1, marginLeft: 200, textAlign: "center", alignSelf: "center" }} idLanguage={idLanguage} idCurrentDiameterForSlider={idCurrentDiameterForSlider} setIdCurrentDiameterForSlider={ setIdCurrentDiameterForSlider } statusModalSettings={statusModalSettings} checkboxDatasInterfaceState={checkboxDatasInterfaceState} idSettingsMeasure={idSettingsMeasure} idSettingsDiameter={idSettingsDiameter} idSettingsAngle={idSettingsAngle} idSettingsDatas={idSettingsDatas} setIdSettingsMeasure={ setIdSettingsMeasure } setIdSettingsDiameter={ setIdSettingsDiameter } setIdSettingsAngle={ setIdSettingsAngle } setIdSettingsDatas={ setIdSettingsDatas } makeCheckboxDatasInterfaceState={ makeCheckboxDatasInterfaceState } makeStatusModalSettings={ makeStatusModalSettings } />
            <ModalLanguages idLanguage={idLanguage} statusModalLanguages={ statusModalLanguages } setIdLanguage={ setIdLanguage } makeStatusModalLanguages={ makeStatusModalLanguages } />

            <ModalUtilities idLanguage={idLanguage} statusModalUtilities={statusModalUtilities} makeStatusModalUtilities={ makeStatusModalUtilities } makeStatusModalPrinters={ makeStatusModalPrinters } makeStatusModalInfos={ makeStatusModalInfos } setStatusModalPremium={setStatusModalPremium} makeStatusModalPremium={makeStatusModalPremium} />
            
            <ModalPrinters idLanguage={idLanguage} statusModalPrinters={statusModalPrinters} makeStatusModalPrinters={ makeStatusModalPrinters } />
            <ModalInfos idLanguage={idLanguage} statusModalInfos={statusModalInfos} makeStatusModalInfos={makeStatusModalInfos} />
            
            <ModalPremium idLanguage={idLanguage} statusModalPremium={statusModalPremium} makeStatusModalPremiumOnModalPremium={makeStatusModalPremiumOnModalPremium} setIdLanguage={ setIdLanguage } makeStatusModalPremium={makeStatusModalPremium} />
            {/*/////////////////////////////////////////////   MODALS   //////////////////////////////////////////////////*/}
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

            {(elbowLayer ?
            <View style={[ { minHeight: height*0.3, maxHeight: height*0.3, paddingTop: Number.parseFloat(height*0.025), justifyContent: "flex-start", alignItems: "center", backgroundColor: "transparent" } ]}>
                <View style={[ { width: width, flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "transparent" } ]}>
                    <View style={[ { width: width, paddingLeft: width*0.035, paddingRight: width*0.035, flexDirection: "row", justifyContent: "center", alignItems: "center" } ]}>
                        <View style={[ { flex: width*0.12 } ]}>
                            <Pressable style={[ {justifyContent: "center", alignItems: "flex-start"} ]} onPress={ () => setStatusModalUtilities(true) }>
                                <Image alt={"utility"} style={[ { width: width*0.075, height: width*0.075 } ]} source={require("./assets/images/utility.png")} />
                            </Pressable>
                        </View>

                        <View style={[ {flex: width*0.23, flexDirection: "row", justifyContent: "space-between", alignItems: "center"} ]}>
                            <TouchableHighlight style={[ {width: width*0.09, height: width*0.065, justifyContent: "center", alignItems: "center", borderTopRightRadius: 5, borderBottomRightRadius: 5, borderBottomLeftRadius: 10, borderTopLeftRadius: 10, backgroundColor: "#313131"} ]} activeOpacity={0.25} onPress={ () => decreaseText() }>
                                <Image alt={"decrease"} style={[ {width: width*0.04, height: width*0.05} ]} source={require("./assets/images/text-decrease.png")} />
                            </TouchableHighlight>

                            <TouchableHighlight style={[ {width: width*0.09, height: width*0.065, justifyContent: "center", alignItems: "center", borderTopRightRadius: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 5, borderTopLeftRadius: 5, backgroundColor: "#313131"} ]} activeOpacity={0.25} onPress={ () => increaseText() }>
                                <Image alt={"increase"} style={[ {width: width*0.04, height: width*0.05} ]} source={require("./assets/images/text-increase.png")} />
                            </TouchableHighlight>
                        </View>

                        <View style={[ {height: width*0.1, marginTop: (height > 1200 ? (height*0.045) : (height*0.0075)), flex: (height > 700 ? width*0.30 : width*0.53), justifyContent: "flex-start", alignContent: "flex-start", alignItems: "center"} ]}>
                            <Text style={[ {height: width*0.1, fontSize: width*0.025, color: "#D1D1D1"} ]}>{`${languages[0][idLanguage].unit} | ${languages[0][idLanguage][UNITS_MEASURES[idSettingsMeasure].label]}`}</Text>
                        </View>

                        <View style={[ {flex: width*0.35, flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end"} ]}>
                            <Pressable style={[ {marginRight: 25, justifyContent: "center", alignItems: (height > 700 ? "center" : "flex-start")} ]} onPress={ () => setStatusModalLanguages(true) }>
                                <Image alt={"languages"} style={[ {width: width*0.075, height: width*0.075} ]} source={require("./assets/images/languages.png")} />
                            </Pressable>

                            <Pressable style={[ {justifyContent: "center", alignItems: (height > 700 ? "center" : "flex-start")} ]} title={"settings"} onPress={ () => { setStatusModalSettings(true); } }>
                                <Image alt={"settings"} style={[ {width: width*0.075, height: width*0.075} ]} source={require("./assets/images/setting.png")} />
                            </Pressable>
                        </View>
                    </View>

                    <View style={[ {width: width, padding: width*0.00725, flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "#404040"} ]}>
                        <Pressable style={[ styles.menuBox, { backgroundColor: (elbowLayer === "elbow" ? "forestgreen" : "tomato") } ]} onPress={ handlePressElbow }>
                            <Image alt={"elbow"} style={[ { width: width*0.08, height: width*0.08 } ]} source={require('./assets/images/elbow.png')} />
                        </Pressable>

                        <Pressable style={[ styles.menuBox, { backgroundColor: (elbowLayer === "elbow-slices" ? "forestgreen" : "tomato") } ]} onPress={ handlePressElbowSlices }>
                            <Image alt={"elbow-slices"} style={[ { width: width*0.08, height: width*0.08 } ]} source={require('./assets/images/elbow_slice.png')} />
                        </Pressable>

                        <Pressable style={[ styles.menuBox, { backgroundColor: (closeCalculate === false ? "forestgreen" : "tomato") } ]} onPress={ () => { setCloseCalculate(false); } }>
                            <Image alt={"calculate"} style={[ { width: width*0.08, height: width*0.08 } ]} source={require('./assets/images/calculate.png')} />
                        </Pressable>

                        <Pressable style={[ styles.labelTopBar, { flexDirection: "row", justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "silver" } ]} onPress={ () => { setStatusModalPremium(() => true); } }>
                            <Text key={"pro"} style={[ styles.labelTopBar, { width: width*0.2, height: width*0.06, lineHeight: width*0.06, fontSize: width*0.035, fontWeight: "bold", letterSpacing: 1 } ]}>{functions.firstLetterToUpperCase(languages[0][idLanguage].pro)}</Text>                        
                        </Pressable>
                    </View>
                </View>

                <View style={[ { width: width*0.98, minHeight: height*0.08, maxHeight: height*0.08, marginTop: height*0.0025, flexDirection: "row", justifyContent: "space-between", backgroundColor: "transparent" } ]}>                  
                    {
                        <View style={[ { width: width*0.98, flexDirection: "column", alignItems: "flex-end", backgroundColor: "transparent" } ]}>
                            <View style={[ { width: width*0.95, minHeight: height*0.08, maxHeight: height*0.08, flexDirection: "row", backgroundColor: "transparent" } ]}>
                                
                                {( elbowLayer == "elbow" ?
                                    <ValuesElbow idCurrentDiameterForSlider={idCurrentDiameterForSlider} idLanguage={idLanguage} sizeText={sizeText} currentDiameter={DIAMETER} currentDiameterFree={DIAMETER_FREE} norme={NORME} angle={ANGLE} intra={INTRA} extra={EXTRA} radius={RADIUS} colorDatasCurves={colorDatasCurves} idSettingsDiameter={idSettingsDiameter} idSettingsAngle={idSettingsAngle} subtractAnglePrecision={subtractAnglePrecision} addAnglePrecision={addAnglePrecision} makeDatasElbowByAngle={makeDatasElbowByAngle} makeDatasElbowByAngleAndFreeDiameter={makeDatasElbowByAngleAndFreeDiameter} getDatasElbows={getDatasElbows} />
                                : false )}

                                {(elbowLayer == "elbow-slices" ?
                                    <ValuesElbowSlices setBlocGeneratricesValues={setBlocGeneratricesValues} makeDatasElbowSlices={makeDatasElbowSlices} currentDiameter={DIAMETER} countGenes={countGenes} setCountGenes={setCountGenes} idLanguage={idLanguage} sizeText={sizeText} idSettingsDiameter={idSettingsDiameter} norme={NORME} labelNorme={labelNorme} currentInputValue={currentInputValue} setCurrentInputValue={setCurrentInputValue} countPoint={countPoint} setCountPoint={setCountPoint} blocGeneratricesValues={blocGeneratricesValues} setStatusModalGeneratrices={setStatusModalGeneratrices} makeStatusModalGeneratrices={makeStatusModalGeneratrices} isShown={isShown} colorSwitch={colorSwitch} statutSwitch={statutSwitch} toggleTheBox={toggleTheBox} statusModalGeneratrices={statusModalGeneratrices} />                               
                                : false )}

                            </View>
                        </View>
                    }
                </View>                 
            </View> : false)}
            {/*/////////////////////////////////////////////   HEADER   //////////////////////////////////////////////////*/}
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}


            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            {/*///////////////////////////////////////////   CALCULATOR   ////////////////////////////////////////////////*/}
            {
                (
                    closeCalculate === false ?
                        <View style={{zIndex: 9999, margin: 0, padding: 0, position: "absolute", top: 0, width: width, height: height*0.85}}>
                            <CalculatorPiping idLanguage={idLanguage} setCloseCalculate={setCloseCalculate} />
                        </View> 
                    :
                    false
                ) 
            }
            {/*///////////////////////////////////////////   CALCULATOR   ////////////////////////////////////////////////*/}
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}


            {/*/////////////////////////////////////////   INTERFACE VIEW   //////////////////////////////////////////////*/}
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            {(elbowLayer == "elbow" ?
                <ViewElbow idCurrentDiameterForSlider={idCurrentDiameterForSlider} sizeText={sizeText} baseAngle={BASEANGLE} angle={angleBaseShared} curvesMeasure={ {angle: ANGLE, intra: INTRA, extra: EXTRA} } format={formatElbow} currentDiameter={DIAMETER} currentDiameterFree={DIAMETER_FREE} norme={NORME} formatElbow={formatElbow} measureUnit={MEASUREUNIT} idSettingsMeasure={idSettingsMeasure} idSettingsAngle={idSettingsAngle} idSettingsDatas={idSettingsDatas} checkboxDatasInterfaceState={checkboxDatasInterfaceState} shareAngleElbow={makeDatasElbowByAngle} />                                                        
            : false)}

            {(elbowLayer == "elbow-slices" ?
                <ViewElbowSlices countGenes={countGenes} currentDiameter={DIAMETER} currentInputValue={currentInputValue} setCurrentInputValue={setCurrentInputValue} idLanguage={idLanguage} sizeText={sizeText} norme={NORME} idSettingsMeasure={idSettingsMeasure} idSettingsDatas={idSettingsDatas} checkboxDatasInterfaceState={checkboxDatasInterfaceState} /> 
            : false)}
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            {/*/////////////////////////////////////////   INTERFACE VIEW   //////////////////////////////////////////////*/}

            
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            {/*/////////////////////////////////////////////   FOOTER   //////////////////////////////////////////////////*/}
            
            <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "transparent" }}>
                  
                {
                    (elbowLayer == "elbow-slices" ?
                        <View key={"square-screen-options-footer"} style={[ { width: width, minHeight: height*0.19, maxHeight: height*0.19, justifyContent: "flex-start", alignItems: "center", backgroundColor: "transparent" } ]}> 
                            <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "transparent" }}>
                                <View style={{ minHeight: height*0.111, maxHeight: height*111, paddingInlineStart: width*0.2, paddingHorizontal: width*0.05, flexDirection: "row", alignItems: "flex-start", justifyContent: "center", backgroundColor: "transparent" }}>
                                    { blocGeneratricesValues }
                                </View>

                                <View>
                                    <Slider 
                                        aria-label = {"diameter-elbow-slices"}
                                        thumbTintColor	= {"aqua"}
                                        style = {[ { width: width*0.97, height: height*0.045 } ]} 
                                        minimumValue = {0}
                                        maximumValue = {DATAS_PIPES.length-1}
                                        step = {1}
                                        value = { currentDiameterElbowSlicesForSlider }
                                        minimumTrackTintColor = {"white"}
                                        maximumTrackTintColor = {"white"}
                                        onValueChange = {
                                                            (value) => { 
                                                                if (DATAS_PIPES[value][6] === "sms") {
                                                                    NORME.setValue(2); setLabelNorme(() => 'sms'); setIsShown(false); setStatutSwitch(true); setColorSwitch('silver');
                                                                }   else if (DATAS_PIPES[value][6] === 73 || DATAS_PIPES[value][6] === 141 || DATAS_PIPES[value][2] === 76.1 || DATAS_PIPES[value][2] === 139.7) { 
                                                                        (labelNorme === "ansi" ? NORME.setValue(6) : NORME.setValue(2)); (2 === 2 ? setLabelNorme('iso') : setLabelNorme('ansi')); setStatutSwitch(false); setColorSwitch('forestgreen');
                                                                    }   else {
                                                                            NORME.setValue(2); setLabelNorme(() => 'iso/ansi'); setIsShown(false); setStatutSwitch(true); setColorSwitch('silver');
                                                                        }

                                                                requestAnimationFrame(() => {
                                                                    try {
                                                                        DIAMETER.setValue(Number.parseInt(value));
                                                                        makeDatasElbowSlices(currentInputValue);
                                                                    }   catch (e) {
                                                                            console.warn('diameter onValueChange error', e);
                                                                        }
                                                                })
                                                            }
                                                        }
                                    />
                                </View>
                            </View>
                        </View>

                        :

                        <View key={"square-screen-options-footer"} style={[ { width: width, minHeight: height*0.19, maxHeight: height*0.19, justifyContent: "flex-start", alignItems: "center", backgroundColor: "transparent" } ]}> 
                            <View style={[ { width: width*0.95, minHeight: height*0.07, maxHeight: height*0.07, paddingVertical: width*0.02, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: "center", backgroundColor: "transparent" } ]}>
                                <View style={[ {width: width*0.475, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", backgroundColor: "transparent"} ]} key="bloc-formats" id="formats">
                                    <Pressable style={[ styles.format, {width: width*0.125, height: height*0.045, backgroundColor: (formatElbow === 4 ? "forestgreen" : "#353535") } ]} onPress={ () => { setFormatElbow(4); FORMAT.setValue(4); (idCurrentDiameterForSlider == 1 ? makeDatasElbowByAngle(getDatasElbows) : makeDatasElbowByAngleAndFreeDiameter(getDatasElbows)); }}><Text style={[ {fontSize: width*0.04, fontWeight: '600', color: 'white'} ]}>{`2D`}</Text></Pressable>
                                    <Pressable style={[ styles.formatStd, {width: width*0.125, height: height*0.045, backgroundColor: (formatElbow === 3 ? "forestgreen" : "#353535") } ]} onPress={ () => { setFormatElbow(3); FORMAT.setValue(3); (idCurrentDiameterForSlider == 1 ? makeDatasElbowByAngle(getDatasElbows) : makeDatasElbowByAngleAndFreeDiameter(getDatasElbows)); }}><Text style={[ {fontSize: width*0.04, fontWeight: '600', color: 'white'} ]}>{`3D`}</Text></Pressable>
                                    <Pressable style={[ styles.format, {width: width*0.125, height: height*0.045, backgroundColor: (formatElbow === 5 ? "forestgreen" : "#353535") } ]} onPress={ () => { setFormatElbow(5); FORMAT.setValue(5); (idCurrentDiameterForSlider == 1 ? makeDatasElbowByAngle(getDatasElbows) : makeDatasElbowByAngleAndFreeDiameter(getDatasElbows)); }}><Text style={[ {fontSize: width*0.04, fontWeight: '600', color: 'white'} ]}>{`5D`}</Text></Pressable>
                                </View>
         
                                {   
                                    (
                                        idCurrentDiameterForSlider == 1 ?
                                            <View style={[ {width: width*0.3, height: height*0.045, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: (Platform.OS != "ios" ? 5 : false), backgroundColor: (Platform.OS != "ios" ? "#525252" : false)} ]}>
                                                <Text style={[ {fontSize: width*0.035, fontWeight: 'bold', color: 'white'} ]}>{labelNorme}</Text>
                                                
                                                <Switch
                                                    trackColor={ {false: "#ddd", true: "#ddd"} }
                                                    thumbColor={isShown ? colorSwitch : colorSwitch}
                                                    ios_backgroundColor="#3e3e3e"
                                                    onValueChange={() => { toggleTheBox(); makeDatasElbowByAngle(getDatasElbows); } }
                                                    value={isShown}
                                                    disabled={statutSwitch}
                                                />
                                            </View> :
                                        false
                                    )
                                }
                            </View> 

                            <View>
                                {
                                    (
                                        idCurrentDiameterForSlider == 1 ?
                                            <Slider 
                                                aria-label = {"diameter"}
                                                thumbTintColor	= {"aqua"}
                                                style = {[ { width: width*0.97, height: height*0.05, backgroundColor: "transparent" } ]} 
                                                minimumValue = {0}
                                                maximumValue = {DATAS_PIPES.length-1}
                                                step = {1}
                                                value={ currentDiameterElbowForSlider }
                                                minimumTrackTintColor = {"white"}
                                                maximumTrackTintColor = {"white"}
                                                onValueChange = {
                                                                    (value) => {
                                                                        if (DATAS_PIPES[value][6] === "sms") {
                                                                            NORME.setValue(2); setLabelNorme(() => 'sms'); setIsShown(false); setStatutSwitch(true); setColorSwitch('silver');
                                                                        }   else if (DATAS_PIPES[value][6] === 73 || DATAS_PIPES[value][6] === 141 || DATAS_PIPES[value][2] === 76.1 || DATAS_PIPES[value][2] === 139.7) { 
                                                                                (labelNorme === "ansi" ? NORME.setValue(6) : NORME.setValue(2)); (2 === 2 ? setLabelNorme('iso') : setLabelNorme('ansi')); setStatutSwitch(false); setColorSwitch('forestgreen');
                                                                            }   else {
                                                                                    NORME.setValue(2); setLabelNorme(() => 'iso/ansi'); setIsShown(false); setStatutSwitch(true); setColorSwitch('silver');
                                                                                }

                                                                        requestAnimationFrame(() => {
                                                                            try {
                                                                                DIAMETER.setValue(Number.parseInt(value));
                                                                                (idCurrentDiameterForSlider == 1
                                                                                ? makeDatasElbowByAngle(getDatasElbows)
                                                                                : makeDatasElbowByAngleAndFreeDiameter(getDatasElbows));
                                                                            }   catch (e) {
                                                                                    console.warn('diameter onValueChange error', e);
                                                                                }
                                                                        })        
                                                                    }
                                                                }
                                            />
                                        :
                                        
                                            LIST_DIAMETER
                                  
                                    )
                                }
                            </View>

                            <View>
                                <Slider 
                                    aria-label = {"radius"}
                                    thumbTintColor	= {"aqua"}
                                    style = {[ { width: width*0.97, height: height*0.05, backgroundColor: "transparent" } ]} 
                                    minimumValue = {1}
                                    maximumValue = {90}
                                    step = {1}
                                    value={ 90 }
                                    minimumTrackTintColor = {"white"}
                                    maximumTrackTintColor = {"white"}
                                    onValueChange = {
                                                        (value) => {
                                                            ANGLE.setValue(value);
                                                            updateAngleBaseSharedOnSlider(value);
                                                            (idCurrentDiameterForSlider == 1 ? makeDatasElbowByAngle(getDatasElbows) : makeDatasElbowByAngleAndFreeDiameter(getDatasElbows));
                                                        }
                                                    }
                                />
                            </View>
                        </View>
                    )
                }

            </View>
            {/*/////////////////////////////////////////////   FOOTER   //////////////////////////////////////////////////*/}
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#505050",
    },
    elementSvg: {
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#505050" 
    },
    menuBox: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    }, 
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
    },
    blocNormes: {
        justifyContent: 'space-evenly',
        borderRadius: 5,
        backgroundColor: '#525252'
    },
    format: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    formatStd: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    spacer: {
        height: 8,
    }
});






