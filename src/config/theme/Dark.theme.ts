import {ColorTheme, SpacingTheme, Theme} from './Theme.interface';

const DEFAULT_DARK_COLOR_THEME: ColorTheme = {
  accentP: '#1e90ff',
  accentS: '#ffd6b2',
  textColor: '#dfe6e9',
  bgColor: '#060709',
  bgColorS: '#0d0e12',
  bgSplash: '#000000',
  olColor: '#15161f',
};

const DEFAULT_DARK_SPACING_THEME: SpacingTheme = {
  base: 14,
  double: 18,
  radius: 8,
  separator: 10,
};

export const DEFAULT_DARK_THEME_ID = 'default-dark';

export const DEFAULT_DARK_THEME: Theme = {
  id: DEFAULT_DARK_THEME_ID,
  color: DEFAULT_DARK_COLOR_THEME,
  spacing: DEFAULT_DARK_SPACING_THEME,
};
