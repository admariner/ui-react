import React from 'react';

import { getClassName } from '@kibalabs/core';
import { IMultiChildProps, OptionalProppedElement } from '@kibalabs/core-react';
import { styled } from 'styled-components';

import { ITabBarItemProps, ITabBarItemTheme, TabBarItem } from '../../atoms/tabBarItem';
import { Alignment, getFlexContentAlignment } from '../../model';
import { useDimensions } from '../../theming';
import { CssConverter, fieldToResponsiveCss, ResponsiveField } from '../../util';
import { IMoleculeProps } from '../moleculeProps';

export interface ITabBarTheme {
  tabBarItemTheme: ITabBarItemTheme;
}

interface IStyledTabBarProps {
  // theme: ITabBarTheme;
  $contentAlignment: ResponsiveField<Alignment>;
}

const getContentAlignmentCss: CssConverter<Alignment> = (field: Alignment): string => {
  return `justify-content: ${getFlexContentAlignment(field)};`;
};

const StyledTabBar = styled.div<IStyledTabBarProps>`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  overflow: auto;
  ${(props: IStyledTabBarProps): string => fieldToResponsiveCss(props.$contentAlignment, useDimensions(), getContentAlignmentCss)};

  &.fullWidth {
    width: 100%;
  }
`;

// TODO(krishan711): move this somewhere else if it is used again
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface ITabBarItemInnerProps extends Omit<ITabBarItemProps, 'isSelected' | 'onClicked'> {
}

// eslint-disable-next-line unused-imports/no-unused-vars
export function TabBarItemInner(props: ITabBarItemInnerProps): React.ReactElement {
  return <React.Fragment />;
}
TabBarItemInner.displayName = 'KibaTabBarItem';

interface ITabBarProps extends IMoleculeProps<ITabBarTheme>, IMultiChildProps<ITabBarItemInnerProps> {
  isFullWidth?: boolean;
  selectedTabKey: string;
  contentAlignment?: Alignment;
  contentAlignmentResponsive?: ResponsiveField<Alignment>;
  onTabKeySelected(tabKey: string): void;
}

export function TabBar({
  className = '',
  contentAlignment = Alignment.Fill,
  ...props
}: ITabBarProps): React.ReactElement {
  if (React.Children.count(props.children) === 0) {
    throw new Error('TabBar must have at least one child');
  }

  const onTabClicked = (tabKey: string): void => {
    props.onTabKeySelected(tabKey);
  };

  return (
    <StyledTabBar
      id={props.id}
      className={getClassName(TabBar.displayName, className, props.isFullWidth && 'fullWidth')}
      $contentAlignment={{ base: contentAlignment, ...props.contentAlignmentResponsive }}
    >
      { React.Children.map(props.children as OptionalProppedElement<ITabBarItemInnerProps>[], (child: OptionalProppedElement<ITabBarItemInnerProps>, index: number): React.ReactElement | null => {
        if (!child) {
          return null;
        }
        return (
          <TabBarItem
            key={child.props.tabKey}
            id={child.props.id}
            className={child.props.className}
            theme={props.theme?.tabBarItemTheme}
            variant={child.props.variant}
            tabKey={child.props.tabKey}
            text={child.props.text}
            isEnabled={child.props.isEnabled}
            isCollapsible={child.props.isCollapsible != null ? child.props.isCollapsible : props.isFullWidth}
            isExpandable={child.props.isExpandable != null ? child.props.isExpandable : props.isFullWidth}
            isSelected={(props.selectedTabKey == null && index === 0) || props.selectedTabKey === child.props.tabKey}
            onClicked={onTabClicked}
          />
        );
      })}
    </StyledTabBar>
  );
}
TabBar.displayName = 'KibaTabBar';
TabBar.Item = TabBarItemInner;

// interface IManagedTabBarProps extends Omit<ITabBarProps, 'selectedTabKey' | 'onTabKeySelected'> {
//   onTabKeyChanged(tabKey: string): void;
// }

// export const ManagedTabBar = (props: IManagedTabBarProps): React.ReactElement => {
//   const [selectedTabKey, setSelectedTabKey] = React.useState<string>();

//   const onTabKeySelected = (tabKey: string): void => {
//     setSelectedTabKey(tabKey);
//   }

//   return (
//     <TabBar
//       {...props}
//       selectedTabKey={selectedTabKey}
//       onTabKeySelected={onTabKeySelected}
//     >
//       { props.children }
//     </TabBar>
//   )
// }
