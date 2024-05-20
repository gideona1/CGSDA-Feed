import {ColorTheme, SpacingTheme, Theme} from './Theme.interface';

const DEFAULT_DIM_COLOR_THEME: ColorTheme = {
  accentP: '#666eff',
  accentS: '#ffd6b2',
  textColor: '#dfe6e9',
  bgColor: '#050505',
  bgColorS: '#0f0f0f',
  bgSplash: '#000000',
  olColor: '#1a1a1a',
};

const DEFAULT_DIM_SPACING_THEME: SpacingTheme = {
  base: 14,
  double: 18,
  radius: 12,
  separator: 10,
};

export const DEFAULT_DIM_THEME_ID = 'default-dim';

export const DEFAULT_DIM_THEME: Theme = {
  id: DEFAULT_DIM_THEME_ID,
  color: DEFAULT_DIM_COLOR_THEME,
  spacing: DEFAULT_DIM_SPACING_THEME,
};
