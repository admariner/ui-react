import React from 'react';

import { getClassName } from '@kibalabs/core';
import { styled } from 'styled-components';

import { IColorGuide } from '../../particles';
import { ColorProvider, useAlternateColors } from '../../theming';
import { colorsToCss } from '../../util';
import { IWrapperProps } from '../wrapperProps';
import { wrappingComponent } from '../wrappingComponent';

interface IStyledColorSettingViewProps extends IWrapperProps {
  $colors: Partial<IColorGuide>;
}

const StyledColorSettingView = wrappingComponent((Component: React.ComponentType<IStyledColorSettingViewProps>): React.ComponentType<IStyledColorSettingViewProps> => {
  return styled(Component)<IStyledColorSettingViewProps>`
    ${(props: IStyledColorSettingViewProps): string => colorsToCss(props.$colors)};
    ${(props: IStyledColorSettingViewProps): string => (props.$colors.text ? `color: ${props.$colors.text}` : '')};
    ${(props: IStyledColorSettingViewProps): string => (props.$colors.background ? `background-color: ${props.$colors.background}` : '')};
  `;
});

export interface IColorSettingViewProps extends IWrapperProps {
  theme?: Partial<IColorGuide>;
  variant?: string;
}

export function ColorSettingView({
  className = '',
  ...props
}: IColorSettingViewProps): React.ReactElement {
  const colors = useAlternateColors(props.variant || undefined, props.theme);

  return (
    <ColorProvider colors={colors}>
      <StyledColorSettingView
        className={getClassName(ColorSettingView.displayName, className)}
        $colors={colors}
      >
        {props.children}
      </StyledColorSettingView>
    </ColorProvider>
  );
}
ColorSettingView.displayName = 'KibaColorSettingView';
