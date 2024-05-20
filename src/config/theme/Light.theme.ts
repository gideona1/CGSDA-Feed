import {ColorTheme, SpacingTheme, Theme} from './Theme.interface';

const DEFAULT_LIGHT_COLOR_THEME: ColorTheme = {
  accentP: '#1e90ff',
  accentS: '#ffd6b2',
  textColor: '#050505',
  bgColor: '#ffffff',
  bgSplash: '#ffffff',
  bgColorS: '#f1f2f6',
  olColor: '#dfe4ea',
};

const DEFAULT_LIGHT_SPACING_THEME: SpacingTheme = {
  base: 14,
  double: 18,
  radius: 8,
  separator: 10,
};

export const DEFAULT_LIGHT_THEME_ID = 'default-light';

export const DEFAULT_LIGHT_THEME: Theme = {
  id: DEFAULT_LIGHT_THEME_ID,
  color: DEFAULT_LIGHT_COLOR_THEME,
  spacing: DEFAULT_LIGHT_SPACING_THEME,
};
