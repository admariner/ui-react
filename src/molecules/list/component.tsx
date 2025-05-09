import React from 'react';

import { getClassName } from '@kibalabs/core';
import { IMultiChildProps, OptionalProppedElement } from '@kibalabs/core-react';
import { styled } from 'styled-components';

import { IListItemProps, IListItemTheme, ListItem } from '../../atoms/listItem';
import { Divider } from '../../particles';
import { IMoleculeProps } from '../moleculeProps';

export interface IListTheme {
  listItemTheme: IListItemTheme;
}

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow: auto;
  &.fullWidth {
    width: 100%;
  }
`;

// TODO(krishan711): move this somewhere else if it is used again
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface IListItemInnerProps extends Omit<IListItemProps, 'onClicked'> {
}

// eslint-disable-next-line unused-imports/no-unused-vars
export function ListItemInner(props: IListItemInnerProps): React.ReactElement {
  return <React.Fragment />;
}
ListItemInner.displayName = 'KibaListItem';

interface IListProps extends IMoleculeProps<IListTheme>, IMultiChildProps<IListItemInnerProps> {
  isFullWidth?: boolean;
  selectedItemKey?: string;
  shouldShowDividers?: boolean;
  itemVariant?: string;
  onItemClicked?(itemKey: string): void;
}

export function List({
  className = '',
  ...props
}: IListProps): React.ReactElement {
  const onItemClicked = props.onItemClicked && ((itemKey: string): void => {
    if (props.onItemClicked) {
      props.onItemClicked(itemKey);
    }
  });

  return (
    <StyledList
      id={props.id}
      className={getClassName(List.displayName, className, props.isFullWidth && 'fullWidth')}
    >
      { React.Children.map(props.children as OptionalProppedElement<IListItemInnerProps>[], (child: OptionalProppedElement<IListItemInnerProps>, index: number): React.ReactElement | null => {
        if (!child) {
          return null;
        }
        return (
          <React.Fragment>
            <ListItem
              key={child.props.itemKey}
              id={child.props.id}
              className={child.props.className}
              theme={props.theme?.listItemTheme}
              variant={props.itemVariant || child.props.variant}
              itemKey={child.props.itemKey}
              isDisabled={child.props.isDisabled}
              isSelected={props.selectedItemKey === child.props.itemKey}
              onClicked={onItemClicked}
            >
              {child.props.children}
            </ListItem>
            {(props.children && props.shouldShowDividers && index !== React.Children.count(props.children) - 1) && (
              <Divider />
            )}
          </React.Fragment>
        );
      })}
    </StyledList>
  );
}
List.displayName = 'KibaList';
List.Item = ListItemInner;
