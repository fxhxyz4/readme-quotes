import { DEFAULT_THEME, themes } from '../config/themes';
import { Theme } from '../models/theme';

export const getTheme = (name?: string): Theme => {
  if (!name) {
    return DEFAULT_THEME;
  }

  return themes.find(theme => theme.name === name) ?? DEFAULT_THEME;
};