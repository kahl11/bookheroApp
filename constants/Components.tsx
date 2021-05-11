import React, { Component, useState, useRef, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { colors, styles } from "../styles/style";
import { touchable_styles } from "../styles/touchable_styles";

export function TouchableButton({ style=touchable_styles.wideButtonDark, textStyle=touchable_styles.darkText, text, onClick }: any) {
  return (
    <TouchableOpacity //upload button
      style={style}
      onPress={onClick}
    >
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}
