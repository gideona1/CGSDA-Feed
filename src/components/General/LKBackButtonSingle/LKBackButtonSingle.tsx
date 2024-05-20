import {
  StyleProp,
  TouchableWithoutFeedbackProps,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../../config/theme/Theme.context';
import { LKText } from '../';
import { useThemeAwareObject } from '../../../hooks/ThemeAwareObject.hook';
import { Theme } from '../../../config/theme/Theme.interface';

export interface PropBackButtonSingle extends TouchableWithoutFeedbackProps {
  /**
   * Set custom styling for the button.
   */
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  modal?: boolean | null | undefined;
}

export const LKBackButtonSingle = React.memo<PropBackButtonSingle>(
  ({ children, style, modal, onPress }) => {
    const createStyles = (theme: Theme) => {
      return StyleSheet.create({
        container: {
          // padding: theme.spacing.double,
          flexDirection: 'row',
          alignItems: 'center',
        },
      });
    };

    const Styles = useThemeAwareObject(createStyles);
    const { theme } = useTheme();

    return (
      <TouchableOpacity
        accessibilityRole="button"
        style={[Styles.container, style, { flex: 1 }]}
        onPress={onPress}>
        <FontAwesomeIcon
          style={{ opacity: 0.8 }}
          color={theme.color.textColor}
          size={12}
          icon={modal ? faChevronDown : faChevronLeft}
        />

        <LKText
          maxFontSizeMultiplier={1.25}
          style={{ marginLeft: 5, opacity: 0.8 }}
          weight="medium"
          size={14}>
          {children}
        </LKText>
      </TouchableOpacity>
    );
  },
);
