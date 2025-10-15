import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';

import SponsorFallback from './SponsorFallback.js';

import { languages } from '../languages/languages';


const toRadians = (deg) => (deg * Math.PI) / 180;
const toDegrees = (rad) => (rad * 180) / Math.PI;

const {width, height} = Dimensions.get("window");


export default function CalculatorPiping(props) {

    useEffect(() => {
        props.setCloseCalculate(false);
    }, []);

    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');


    function applyDirectTrigFunction(expression, funcName) {
        const regex = new RegExp(`${funcName}\\(([^()]+)\\)`);
        const match = expression.match(regex);

        if (!match) throw new Error(`Expression invalide dans ${funcName}()`);

        const argStr = match[1];
        let angle;
        try {
            angle = eval(argStr);
        } catch (err) {
            throw new Error(`Expression invalide dans ${funcName}()`);
        }

        if (isNaN(angle)) throw new Error(`Argument invalide dans ${funcName}()`);

        const trigValue = Math[funcName](toRadians(angle));
        const expr = expression.replace(regex, `(${trigValue})`);
        return eval(expr);
    }

    function applyInverseTrigFunction(expression, funcName) {
        const regex = new RegExp(`${funcName}\\(([^()]+)\\)`);
        const match = expression.match(regex);

        if (!match) throw new Error(`Expression invalide dans ${funcName}()`);

        const argStr = match[1];
        let value;
        try {
            value = eval(argStr);
        } catch (err) {
            throw new Error(`Expression invalide dans ${funcName}()`);
        }

        if (isNaN(value)) throw new Error(`Argument invalide dans ${funcName}()`);

        if ((funcName === 'acos' || funcName === 'asin') && (value < -1 || value > 1)) {
            throw new Error(`${funcName} attend une valeur entre -1 et 1`);
        }

        const inverseValue = toDegrees(Math[funcName](value));
        const expr = expression.replace(regex, `(${inverseValue})`);
        return eval(expr);
    }


    const clear = () => {
        setExpression('');
        setResult('');
    };

    const calculate = () => {
        try {
            let res = '';

            if (expression.includes('√')) {
                const regex = /√\(([^()]+)\)/;
                const match = expression.match(regex);

                if (match) {
                    const inside = match[1]; 
                    let evaluated;
                    try {
                        evaluated = eval(inside); 
                    } catch (err) {
                        throw new Error("Expression invalide après √");
                    }

                    const sqrtVal = Math.sqrt(evaluated);
                    const expr = expression.replace(regex, `(${sqrtVal})`);
                    res = eval(expr);
                } else {
                    const index = expression.indexOf('√');
                    const substr = expression.slice(index + 1);
                    const matchSimple = substr.match(/^(\d+(\.\d+)?)/);
                    if (!matchSimple) throw new Error("Expression invalide après √");

                    const number = parseFloat(matchSimple[1]);
                    const sqrtVal = Math.sqrt(number);
                    const expr = expression.replace(`√${matchSimple[1]}`, `(${sqrtVal})`);
                    res = eval(expr);
                }
            } else if (expression.includes('²')) {
                const index = expression.indexOf('²');
                let i = index - 1;
                while (i >= 0 && '0123456789.'.includes(expression[i])) i--;

                const number = expression.substring(i + 1, index);
                const squareVal = Math.pow(parseFloat(number), 2).toFixed(10);

                const expr = expression.replace(`${number}²`, `(${squareVal})`);
                res = eval(expr);
            } else if (expression.includes('acos(')) {
                
                res = applyInverseTrigFunction(expression, 'acos');

            } else if (expression.includes('asin(')) {
                
                res = applyInverseTrigFunction(expression, 'asin');

            } else if (expression.includes('atan(')) {
                
                res = applyInverseTrigFunction(expression, 'atan');
                
            } else if (expression.includes('cos(')) {
                
                res = applyDirectTrigFunction(expression, 'cos');
            
            } else if (expression.includes('sin(')) {
                
                res = applyDirectTrigFunction(expression, 'sin');
            
            } else if (expression.includes('tan(')) {
                
                res = applyDirectTrigFunction(expression, 'tan');
                
            }   else {
                        res = eval(expression).toFixed(4);
                    }

                    setResult(Number.parseFloat(res).toFixed(4).toString());
        
        }   catch (err) {
                Alert.alert('Erreur', err.message);
                setResult('');
            }
    };

    const buttons = [
        ['7', '8', '9', '/'],
        ['4', '5', '6', '*'],
        ['1', '2', '3', '-'],
        ['0', '.', '(', ')'],
        ['sin(', 'cos(', 'tan(', '+'],
        ['asin(', 'acos(', 'atan(', 'C'],
        ['√', '²', '⌫', '='],
        ['1.414', '0.414']
    ];

    const handlePress = (val) => {
        if (val === 'C') clear();
        else if (val === '=') calculate();
        else if (val === '⌫') setExpression((prev) => prev.slice(0, -1));
        else setExpression((prev) => prev + val);
    };

    return (
        <View style={ { height: height, backgroundColor: "#252525" } }> 
            <View style={styles.container}>
                <Text style={styles.title}>{ languages[0][props.idLanguage].title_calculate }</Text>

                <TextInput style={styles.input} value={expression} editable={false} placeholder="" />

                <Text style={styles.result}>{result}</Text>

                {buttons.map((row, i) => (
                    <View key={i} style={styles.row}>
                        {row.map((btn) => (
                            <TouchableOpacity key={btn} style={styles.button} onPress={() => handlePress(btn)}>
                                <Text style={ { fontSize: 17.5, textAlign: 'center', color: (btn == "=" ? "green" : "#fff") } }>{btn}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
                <View style={[styles.row, { marginTop: 2.5 }]}>
                    <TouchableOpacity
                        style={[styles.buttonClose, { width: width * 0.93, backgroundColor: '#550000' }]}
                        onPress={ () => { props.setCloseCalculate(true); } }>
                        <Text style={{ fontSize: 16, color: '#fff', textAlign: 'center' }}>
                            { languages[0][props.idLanguage].close_calculate }
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View>
                <SponsorFallback idLanguage={props.idLanguage} />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: { 
        height: height*0.7, 
        marginBlockStart: height*0.05,
        padding: 10, 
        backgroundColor:"#151515"
    },
    title: { color: '#fff', 
        fontSize: 11, 
        textAlign: 'center', 
        marginBottom: 2.5 
    },
    input: {
        backgroundColor: '#272727',
        color: '#fff',
        fontSize: 15,
        paddingHorizontal: 7.5,
        paddingVertical: 5,
        borderRadius: 5,
    },
    result: {
        color: '#00ff88',
        fontSize: 14,
        textAlign: 'right',
        marginVertical: 7.5,
        paddingHorizontal: 5,
    },
    row: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: "center", 
        marginVertical: 1 
    },
    button: {
        minWidth: width*0.2, 
        maxWidth: width*0.2,
        minHeight: height*0.055,
        maxHeight: height*0.055,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#333',
        borderRadius: 7.5,
        marginHorizontal: 1.25,
    },
    buttonClose: {
        minWidth: width*0.8, 
        maxWidth: width*0.8,
        minHeight: height*0.05,
        maxHeight: height*0.05,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#333',
        borderRadius: 7.5,
        marginHorizontal: 1.25,
    }
});











