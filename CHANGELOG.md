# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) with some additions:
- For all changes include one of [PATCH | MINOR | MAJOR] with the scope of the change being made.

## [Unreleased]

### Added

### Changed
- [MAJOR] Changed `onClick` to `onClicked` in `SingleLineInput`
- [MINOR] Added `onFrameClicked` to `SingleLineInput`
- [MINOR] Added `iconRight` and `iconLeft` to `InputFrame`
- [MINOR] Added `isScrollableVertically` and `isScrollableHorizontally` and `shouldMatchAnchorWidth` and `shouldMatchAnchorHeight` to `Portal`
- [MAJOR] Changed `GlobalCSS` to not stop body scrolling on webkit
- [MINOR] Added `shouldSpellCheck` to `SingleLineInput` and `MultiLineInput`
- [MINOR] Changed `Markdown` to render bullets with nested children
- [MINOR] Changed `InputWrapper` to not have tabIndex
- [MAJOR] Converted package into an es-module
- [MINOR] Added `shouldForceWrapper` and `shouldForceBlock` to `Markdown`
- [PATCH] Corrections for how height is calculated in `MultiLineInput`
- [MAJOR] Removed `Head` in favor of react 19 inline metadata tags
- [MINOR] Added `isResizableVertically` and `isResizableHorizontally` to `MultiLineInput`

### Removed

## [0.11.2] - 2024-08-29

### Changed
- [MINOR] Updated assets url to `assets-cdn.kiba.dev`
- [MINOR] Fix alignment for `BulletList` and `BulletText`
- [MINOR] Added numbered variant to `BulletText` to use with `ol` tags
- [MINOR] Update how `Markdown` displays `Media` and captions
- [MINOR] Added `isFullHeight` to `Button`
- [MINOR] Update `Markdown` to render bullets without spaces in between
- [MINOR] Added `isFullHeight` and `isFullWidth` to `IconButton`
- [MINOR] Fix lazyloading opacity in `Image`
- [MINOR] Updated all components to use new style for default props

## [0.11.1] - 2023-08-22

### Added
- [MINOR] Added `shouldSkipRenderingWhenClosed` to `Dialog`
- [MINOR] Added `shouldHideNumberSpinButtons` and `shouldStopNumberScrolling` to `SingleLineInput`
- [MINOR] Added `extraOverrideComponents` to `Markdown`

### Changed
- [MINOR] Fixed `Stack` to not show manual row gutters when `shouldShowGutters=false`
- [MINOR] Updated `MarkdownText` to render newlines more intuitively
- [MINOR] Added `alignmentResponsive` to `Text`
- [MINOR] Added more known extensions to `Media`

## [0.11.0] - 2023-05-16

### Added
- [MINOR] Added `CollapsibleBox`
- [MINOR] Added `SelectableView`
- [MINOR] Added `Baseline` to `Alignment`
- [MAJOR] Replaced react-markdown with markdown-to-js

### Changed
- [MINOR] Fixed `Markdown` to render images at maxWidth=100%
- [MINOR] Added sizing props to `Media`, `Video` and `Image`
- [MINOR] Added `postTarget` as alternative to `onFormSubmitted` for `Form`
- [MINOR] Updated `Stack` to have responsive props for size
- [MINOR] Updated `Grid.Item` to be flex by default
- [MINOR] Added `shouldSkipRenderingWhenCollapsed` to `TitledCollapsibleBox`
- [MINOR] Updated `Checkbox` to not render check when not checked
- [MINOR] Updated `Image` and `Video` to replace ipfs urls
- [MINOR] Updated `Media` to use `Image` by default
- [MAJOR] Moved `Pill` to `atoms` folder
- [MAJOR] Updated `buildTheme` to ignore extra components, they should be added after calling buildTheme
- [MAJOR] Completely changed how css is rendered - see new documentation for detail
- [MAJOR] Change all displayName for component `X` to `KibaX`
- [MINOR] Added `childAlignment` prop to `Button`
- [MINOR] Updated `Icon` to size svg directly instead of container

## [0.10.0] - 2022-10-11

### Changed
- [MINOR] Fixed `Video` lazy loading
- [MINOR] Make `Link` default style use inherit
- [MINOR] Added `placeholderText` to `OptionSelect`
- [MINOR] Use `optionTextVariant` correctly in `OptionSelect`
- [MINOR] Fixed `alternateColors` to be expanded correctly
- [MINOR] Update `ColorSettingView` to set default `color` correctly
- [MINOR] Added `isInvisible` to `HidingView`
- [MINOR] Added `shouldBreakOnWords` and `shouldBreakAnywhere` to `Text`
- [MAJOR] Updated `Image` to support responsive images from pablo-images.kibalabs.com
- [MINOR] Fixed `StatefulTitleCollapsibleBox` to pass through className
- [MINOR] Updated `Button`, `IconButton`, `LinkBase` and `Link` to only show focus when navigating with keyboard
- [MINOR] Updated `Button`, `IconButton`, `LinkBase` and `Link` to stop propagating events
- [MINOR] Updated `Button` to have `contentAlignment` and `isTextFullWidth` props to allow new layouts
- [MINOR] Updated `Box` to have responsive props for size
- [MINOR] Added `opacity` to `IBoxTheme`

## [0.9.9] - 2022-06-21

### Changed
- [PATCH] Update `Media` to follow redirects when fetching for content-type
- [PATCH] Added `shouldPassThroughTouches` to `LayerContainer.Layer`
- [PATCH] Added `shouldCaptureTouches` to `Box`

## [0.9.8] - 2022-05-22

### Changed
- [PATCH] Make `Dialog` SSR safe
- [PATCH] Added padding props to `EqualGrid`
- [PATCH] Added `minHeight` and `minWidth` to `Box`

## [0.9.7] - 2022-04-05

### Added
- [MINOR] Added overlay theme to `Box`
- [MINOR] Added `onEnded`, `onPlayed` and `onPaused` to `Video`
- [MINOR] Added `onClictked` to `Link`
- [MINOR] Added `isStatic` to `LayerContainer.Layer` to allow layers to size themselves
- [MINOR] Added `buttonType` to `IconButton`

### Changed
- [PATCH] Update `PrettyText` to render bold and italics inline
- [MINOR] Updated `ListItem` to be un-clickable when disabled
- [MINOR] Updated `Form` to have correct theming
- [MINOR] Updated `Link`, `LinkBase`, `IconButton` and `Button` to not use CoreLink for fragments
- [MINOR] Updated `Button` to wrap text in `span`
- [MINOR] Updated `Button` to use `buttonType` correctly
- [MINOR] Updated `Stack` to inherit `min-height` when `isFullHeight` is true

## [0.9.6] - 2021-12-22

### Added
- [MINOR] Added `background` prop to `KibaApp`
- [MINOR] Created `renderHead` for external head rendering
- [MINOR] updated `Media` to check for url extension and trust if present before checking for content-type

### Changed
- [MINOR] Fixed colors theme creation to calculate text and textOnBrand correctly when background is dark
- [MINOR] Fixed `InputWrapper` to set placeholder on correct elements
- [MINOR] Updated to react-markdown v6
- [MINOR] Fixed `Button`, `IconButton`, `Link` and `LinkBase` to only use `CoreLink` for internal links

## [0.9.5] - 2021-11-21

### Added
- [MINOR] Added `HeadProvider` and `Head` to replace Helmet in apps

### Changed
- [MINOR] Updated `Linkbase` to work with core-routing
- [MINOR] Updated `Link` to work with core-routing
- [MINOR] Updated `Button` to work with core-routing
- [MINOR] Updated `IconButton` to work with core-routing
- [MINOR] Updated `KibaApp` to wrap children with a `HeadProvider`
- [MINOR] Updated `KibaApp` to load theme fonts

## [0.9.4] - 2021-10-11

### Changed
- [MINOR] update `linkbase` to render `<a>` when href is set else render `<button>`
- [MINOR] update `KibaApp` to disable all `body` scrolling on ios if `isFullPageApp`
- [MINOR] update `Media` to check Content-Type of links without extension
- [MINOR] update `Link` to not have a default value for shouldOpenSameTab

### Removed

## [0.9.3] - 2021-09-08

### Changed
- [MINOR] update `Media` to work with local files

## [0.9.2] - 2021-08-10

### Added
- [MINOR] Added `isFullPageApp` to `KibaApp` to force root elements to 100% width and height
- [MINOR] Added `extraGlobalCss` to `KibaApp` to allow manual additions to global CSS

### Changed
- [PATCH] Update `Media` to process urls more accurately (e.g. ignore query params)
- [PATCH] Update `TitledCollapsibleBox` to clip children so borders look nice
- [PATCH] Fix `TitledCollapsibleBox` to only collapse when clicking on the title area

## [0.9.1] - 2021-07-09

### Added
- [MINOR] Added `shouldShrinkBelowContentSize` to `Stack.Item`

### Changed
- [PATCH] Fix `Box` to align children correctly when not full width

## [0.9.0] - 2021-07-06

### Added
- [MINOR] Created `Dialog` atom component
- [MINOR] Created `MessageDialog` molecule component
- [MINOR] Created `List` molecule and `List.Item` atom
- [MINOR] Created `Divider` particle for use in `List`s
- [MINOR] Created `useResponsiveScreenSize` hook to get screen size
- [MINOR] Created `OptionSelect` molecule component

### Changed
- [MINOR] Updated `LayerContainer` wrapper component
- [MINOR] Correct scrollability in `Stack`
- [MINOR] Updated to `Portal` to have offset and placement props
- [MINOR] Updated `Stack` to have `shouldWrapItems` prop to wrap items when it overflows
- [MINOR] Updated `Box` props so that children are optional
- [MINOR] Updated `Box` props to have `title` prop to have a tooltip
- [MINOR] Updated `Grid` and `EqualGrid` to have `defaultGutter` prop to change the gutter size
- [MINOR] Updated `LinkBase` props to have `isFullHeight` prop
- [MINOR] Updated `TabBar` props to have `contentAlignment` prop to control horizontal alignment of tabs
- [MINOR] Updated `InputWrapper` and related component props to have `onClick` event on the component
- [MINOR] Updated `Stack` to have vertical gutters between wrapped items
- [MINOR] Updated `Box` to have `shouldClipContent` prop to clip content wihtin the box
- [MINOR] Updated `Text` to have `lineLimit` prop to truncate text to a specific number of lines
- [MINOR] Updated `Button`, `Link`, `LinkBase` to have `TabIndex` Prop
- [MINOR] Moved colors css to `:root`

## [0.8.4] - 2021-02-06

### Changed
- [MINOR] Updated `ResponsiveContainingView` to have `isCenteredHorizontally` prop to center contents horizontally
- [MINOR] Updated `KibaApp` to have a height so it can have children with `height:100%`

## [0.8.3] - 2021-01-19

### Added
- [MINOR] Created `TitledCollapsibleBox` atom component
- [MINOR] Created `StatefulTitledCollapsibleBox` atom component
- [MINOR] Created `Checkbox` atom component
- [MINOR] Created `MultiLineInput` molecule component

### Changed
- [PATCH] Fixed `Icon` to set color correctly
- [PATCH] Fixed `Markdown` to use un-margined text when embedded in other text (e.g. a <strong> inside a <p>)
- [PATCH] Moved `Markdown` to be a molecule
- [PATCH] Moved `MarkdownText` to be a molecule
- [PATCH] Memoize `Markdown` and `MarkdownText` to prevent expensive re-renders
- [PATCH] Update `Link` to only use inherited text styles with the `inherit` variant

## [0.8.2] - 2021-01-07

### Added
- [PATCH] Added `PaddingSizeProp` (which accepts any string) and use everywhere as a prop instead of `PaddingSize`

### Changed
- [PATCH] Fix `BackgroundView` to not reverse layers in place
- [MINOR] Fix typing for `Grid.Item` and `Stack.Item` children
- [MINOR] Fix typing for `Button`'s `leftIcon` and `rightIcon` props
- [PATCH] Add a default `errorView` to `WebView`

## [0.8.1] - 2020-12-23

### Added
- [PATCH] Change `WebView` to be lazyLoadable
- [MINOR] Extract hard-coded aspect-ratio from `WebView` into `aspectRatio` prop
- [PATCH] Added a `MarkdownText` example to storybook

## [0.8.0] - 2020-12-23

### Added
- [MINOR] Fix `Pill` export
- [MINOR] Add no-js class to main components and change to js if enabled in browser

### Changed
- [MAJOR] Change `Image`, `Video`, `Media` to not be lazy-loadable by default
- [MINOR] Rename crop to cover for fitType in Image
- [MINOR] Update global no-js class to work with SSR by adding `isRehydrating` prop to `KibaApp`
- [MINOR] Update `Image` and `Video` to not populate `data-src` if not lazy-loading
- [PATCH] Update useBuiltTheme to defer resolving values (for SSR on IE11)

## [0.7.4] - 2020-11-22

### Added
- [MINOR] Added `Pill` component
- [MINOR] New 'card' variant for `LinkBase`

### Changed
- [MINOR] Renamed subatoms to particles

## [0.7.3] - 2020-11-05

### Added
- [MINOR] Added `shouldShowLoadingSpinner` prop to `WebView`
- [MINOR] Added `maxHeight`, `maxWidth` and `zIndex` props to `Box`
- [MINOR] Added `inheritTextTheme` to `Text` themes + Use this for base `Link` theme

## [0.7.2] - 2020-10-29

### Added
- [PATCH] Added `TabBar` molecule + `TabBarItem` atom

## [0.7.1] - 2020-10-20

### Added
- [PATCH] Manually added `displayName` to all components.

### Changed
- [PATCH] Added workflow to build pull requests.

## [0.7.0] - 2020-10-06

Initial Commit
