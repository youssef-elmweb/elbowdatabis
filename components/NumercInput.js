import React from "react";
import { TextInput, View, Keyboard } from "react-native";


export const NumericInput = ({ value, maxLength = 6, maxValue = null, minValue = null, showError = true, style, errorStyle, ...props }) => {

    return (
        <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
            <TextInput
                value={value}
                defaultValue={`${props.test}`}
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                inputMode="numeric"
                maxLength={maxLength}
                style={style}
                {...props}
            />
        </View>
    );

};

