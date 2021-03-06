import React from 'react';

import { RecursivePartial } from '@kibalabs/core';
import { IMultiAnyChildProps, useInitialization } from '@kibalabs/core-react';

import { ITheme } from '..';
import { IColorGuide } from '../particles/colors';
import { IDimensionGuide } from '../particles/dimensions';
import { mergeTheme, ThemeMap, ThemeType, ThemeValue } from '../util';

export const ThemeContext = React.createContext<ITheme | null>(null);

interface IThemeProviderProps extends IMultiAnyChildProps {
  theme: ITheme;
}

export const ThemeProvider = (props: IThemeProviderProps): React.ReactElement => {
  return (
    <ThemeContext.Provider value={props.theme}>
      <ColorProvider colors={props.theme.colors}>
        {props.children}
      </ColorProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ITheme => {
  const theme = React.useContext(ThemeContext);
  if (!theme) {
    throw Error('No theme has been set!');
  }
  return theme;
};

export const useDimensions = (override?: Partial<IDimensionGuide>): IDimensionGuide => {
  const theme = useTheme();
  return { ...theme.dimensions, ...(override || {}) } as IDimensionGuide;
};

export const useBaseColors = (): IColorGuide => {
  const theme = useTheme();
  return theme.colors;
};

export const useAlternateColors = (name?: string, override?: Partial<IColorGuide>): Partial<IColorGuide> => {
  const colors = useColors();
  const theme = useTheme();
  let colorsToUse = theme.colors;
  if (name == null) {
    colorsToUse = colors;
  } else if (name in theme.alternateColors) {
    colorsToUse = theme.alternateColors[name];
  } else {
    console.error(`Unrecognized color variant requested: ${name}`);
  }
  return { ...colorsToUse, ...(override || {}) };
};

export const ColorContext = React.createContext<Partial<IColorGuide> | null>(null);

interface IColorProviderProps extends IMultiAnyChildProps {
  colors: Partial<IColorGuide>;
}

export const ColorProvider = (props: IColorProviderProps): React.ReactElement => {
  return (
    <ColorContext.Provider value={props.colors}>
      {props.children}
    </ColorContext.Provider>
  );
};

export function useColors(): IColorGuide {
  const baseColors = useBaseColors();
  const colors = React.useContext(ColorContext);
  return { ...baseColors, ...(colors || {}) } as IColorGuide;
}

export const useBuiltTheme = <Theme extends ThemeType>(component: string, variant?: string, override?: RecursivePartial<Theme>): Theme => {
  const theme = useTheme();
  const colors = useColors();
  const dimensions = useDimensions();
  // NOTE(krishan711): for SSR ie styles will change on hydration so allow this to have an effect
  const isRendered = useInitialization((): void => undefined);
  const needsRerunningForIe = isIe() && isRendered;
  return React.useMemo((): Theme => {
    const componentThemes = theme[component] as ThemeMap<Theme>;
    if (!componentThemes) {
      throw Error(`Could not find component ${component} in current theme. Valid keys are: ${Object.keys(theme)}`);
    }
    const variants = (variant || 'default').split('-').filter((variantPart: string): boolean => variantPart.length > 0);
    const themeParts = variants.splice(variants.lastIndexOf('default') + 1).reduce((value: RecursivePartial<Theme>[], currentVariant: string): RecursivePartial<Theme>[] => {
      const variantTheme = componentThemes[currentVariant] as RecursivePartial<Theme>;
      if (variantTheme) {
        value.push(variantTheme);
      } else {
        console.error(`Failed to find variant ${currentVariant} in ${component} themes`);
      }
      return value;
    }, []);
    if (override) {
      themeParts.push(override);
    }
    let builtTheme = mergeTheme(componentThemes.default, ...themeParts);
    // NOTE(krishan711): Resolving reference values is only here because ie 11 doesn't support css vars
    if (needsRerunningForIe) {
      builtTheme = resolveThemeValues(builtTheme, colors, dimensions);
    }
    return builtTheme;
  }, [theme, colors, dimensions, variant, override, component, needsRerunningForIe]);
};

declare global {
  interface Document {
    documentMode?: string;
  }
}

const isIe = (): boolean => {
  return typeof document !== 'undefined' && !!document.documentMode;
};

const resolveThemeValues = <Theme extends ThemeType>(theme: Theme, colors: IColorGuide, dimensions: IDimensionGuide): Theme => {
  const derivedTheme = Object.keys(theme).reduce((currentMap: Theme, themeKey: string): Theme => {
    const value = theme[themeKey];
    let themeValue = value;
    if (typeof value === 'string') {
      themeValue = resolveThemeValue(value, colors, dimensions);
    } else if (typeof value === 'object') {
      themeValue = resolveThemeValues(value as ThemeType, colors, dimensions);
    }
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    currentMap[themeKey] = themeValue;
    return currentMap;
  }, theme);
  return derivedTheme;
};

const resolveThemeValue = (value: string, colors: IColorGuide, dimensions: IDimensionGuide): ThemeValue => {
  if (value.startsWith('$')) {
    const strippedValue = value.substring(1);
    const strippedValueParts = strippedValue.split('.');
    const referenceType = strippedValueParts[0];
    const referenceValue = strippedValueParts[1];
    if (referenceType === 'colors') {
      return colors[referenceValue];
    }
    if (referenceType === 'dimensions') {
      return dimensions[referenceValue];
    }
    console.error(`Unknown reference used: ${referenceType} (${value})`);
  }
  return value;
};
