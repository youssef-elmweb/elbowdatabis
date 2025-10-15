import { Alert, Share, Dimensions } from "react-native";
import * as RNLocalize from "react-native-localize";

import { DATAS_TRIGONOMETRICS } from "../datas/datas_trigonometrics";

    const { width, height } = Dimensions.get("window");


    export const getInitialLanguageId = () => {
        const locales = RNLocalize.getLocales();
        
        /*if (Array.isArray(locales) && locales.length > 0) {
            const langCode = locales[0].languageCode; // language system
            return langCode;
        }*/
        
        return "en"; // default language
    };

    export function getHypotenuse(a, b) {
        "worklet";
        return (Math.sqrt((a * a) + (b * b)));
    }
    
    export function getAngleByAbscissa(adjacent, hypotenuse) { 
        "worklet";
        return Math.acos(adjacent / hypotenuse) / DATAS_TRIGONOMETRICS.oneDegreRad; // DEGREE
    }

    export const onShare = async () => {
        "worklet";
        try {
            const result = await Share.share({
                message:
                'https://play.google.com/store/apps/details?id=com.trigotube&gl=FR',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                // shared with activity type of result.activityType
                } else {
                // shared
                }
            }   else if (result.action === Share.dismissedAction) {
                // dismissed
                }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    export const adjustSvgToScreen = (setScale) => {
        "worklet";
        let aspectRatio = width / height;
        let scaleValue = 1;

        if (aspectRatio > 0.75) {
            scaleValue = 0.65;
        }   else if (aspectRatio > 0.625 && aspectRatio <= 0.75) {
                scaleValue = 0.75;
            }   else if (aspectRatio <= 0.625) {
                    scaleValue = 1;
                }

        return setScale(scaleValue);
    };

    export const cleanEntryInputNumber = (v) => {
        let char = v.toString().split("");
        let numericText = v.toString().replace(/[^0-9.]/g, ""); 
        let firstDotIndex = numericText.indexOf(".");

        if (char.filter((e) => e == ",").length > 0 || char.filter((e) => e == "-").length > 0 || char.filter((e) => e == " ").length > 0 || char.filter((e) => e == ".").length > 1) {
            numericText = v.slice(0, v.length-1);
        }

        if (firstDotIndex !== -1) {
            let intPart = numericText.slice(0, firstDotIndex);
            let decimalPart = numericText.slice(firstDotIndex + 1).replace(/\./g, ""); 
            
            numericText = intPart + "." + decimalPart;
        }

        return numericText;
    }

    export const firstLetterToUpperCase = (word) => word.charAt(0).toUpperCase() + word.slice(1);

