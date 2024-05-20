import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
  TextInputProps,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';

import { Theme } from '../../../config/theme/Theme.interface';
import { useThemeAwareObject } from '../../../hooks/ThemeAwareObject.hook';
import { Fonts } from '../../../config/fonts/Fonts';
import { LKText } from '../';
import { useTheme } from '../../../config/theme/Theme.context';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


export interface PropInput extends TextInputProps {
  label: string;
  showLabel?: boolean;
  max?: number;

  /**
   * Set custom styling for the button.
   */
  style?: StyleProp<ViewStyle>;

  icon?: IconProp;
  children?: React.ReactNode;
  bottomSheet?: boolean;
  required?: boolean;
  tip?: string;
  noMargin?: boolean;
  reference?: any;
}

export const LKInputField = React.memo<PropInput>(
  ({
    bottomSheet,
    label,
    showLabel,
    value,
    autoFocus,
    max,
    placeholder,
    onChangeText,
    onSubmitEditing,
    returnKeyType,
    autoCorrect,
    autoCapitalize,
    onPressIn,
    onFocus,
    onBlur,
    required,
    multiline,
    secureTextEntry,
    style,
    tip,
    icon,
    noMargin,
    reference,
    textContentType,
    keyboardType,

  }) => {
    const [focus, setFocus] = useState<Boolean>(false);
    const { theme } = useTheme();

    const createStyles = (theme: Theme) => {
      return StyleSheet.create({
        container: {
          marginBottom: noMargin ? 0 : theme.spacing.base,
        },

        inputFieldContainer: {
          backgroundColor: theme.color.olColor,
          borderColor: theme.color.olColor,
          borderWidth: 2,
          borderRadius: theme.spacing.radius,
        },

        inputField: {
          padding: 12,
          flex: icon ? 0.9 : 1,
          paddingLeft: icon ? 0 : 12,
          color: theme.color.textColor,
          fontFamily: Fonts['regular'],
          fontSize: 14,
        },

        iconContainer: {
          flex: 0.1,
          alignItems: 'center',
          justifyContent: 'center',
        },

        cancelContainer: {
          flex: 0.1,
          alignItems: 'center',
          justifyContent: 'center',
        },

        inputCount: {
          padding: 12,
          borderTopColor: theme.color.bgColor,
          borderTopWidth: 1,
        },

        inputFieldFocused: {
          borderColor: theme.color.accentP,
        },
      });
    };

    const Styles = useThemeAwareObject(createStyles);

    return (
      <View style={Styles.container}>
        {showLabel == null || showLabel == true ? (
          <View style={{ flexDirection: 'row' }}>
            <LKText
              accessibilityRole="header"
              size={16}
              weight="bold"
              style={[{
                marginBottom: 10,
                opacity: 0.7
              }]}>
              {label}
            </LKText>
            {required ? (
              <LKText style={{ marginLeft: 4 }} color="#ff6348">
                *
              </LKText>
            ) : null}
          </View>
        ) : null}
        <View
          style={[
            Styles.inputFieldContainer,
            style,
            focus ? Styles.inputFieldFocused : null,
          ]}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            {icon ? (
              <View style={Styles.iconContainer}>
                <FontAwesomeIcon
                  color={theme.color.textColor}
                  size={14}
                  style={{ opacity: 0.7 }}
                  icon={icon}
                />
              </View>
            ) : null}
            <TextInput
              ref={reference}
              accessibilityLabel={label}
              multiline={multiline}
              value={value}
              autoFocus={autoFocus}
              maxLength={max}
              maxFontSizeMultiplier={1.5}
              returnKeyType={returnKeyType}
              placeholder={placeholder}
              onPressIn={onPressIn}
              onChangeText={onChangeText}
              onSubmitEditing={onSubmitEditing}
              autoCorrect={autoCorrect}
              autoCapitalize={autoCapitalize}
              placeholderTextColor={`${theme.color.textColor}5f`}
              textContentType={textContentType}
              keyboardType={keyboardType}
              clearButtonMode={'while-editing'}
              onFocus={() => {
                onFocus;
                setFocus(true);
              }}
              onBlur={() => {
                onBlur;
                setFocus(false);
              }}
              secureTextEntry={secureTextEntry || false}
              style={[
                Styles.inputField,
                multiline ? { paddingTop: 12 } : null,
                secureTextEntry ? { letterSpacing: 3 } : null,
              ]} />

            {/* <View style={Styles.cancelContainer}>
              <TouchableOpacity>
                <FontAwesomeIcon
                  color={theme.color.textColor}
                  size={14}
                  style={{opacity: 0.7}}
                  icon={faXmarkCircle}
                />
              </TouchableOpacity>
            </View> */}
          </View>

          {max ? (
            <View style={Styles.inputCount}>
              <LKText
                weight="medium"
                style={{ opacity: value?.length >= max ? 1 : 0.5 }}
                color={value?.length >= max ? '#ff6348' : undefined}
                size={12}>
                {max - value?.length}{' '}
                {max - value?.length === 1 ? 'character' : 'characters'} left
              </LKText>
            </View>
          ) : null}
        </View>

        {tip ? (
          <LKText size={12} weight="light" style={{ opacity: 0.7, marginTop: 8 }}>
            {tip}
          </LKText>
        ) : null}
      </View>
    );
  },
);
