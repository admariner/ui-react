import React from 'react';

import { getClassName } from '@kibalabs/core';
import { flattenChildren, IMultiAnyChildProps, useInterval, useRenderedRef, useScrollListener } from '@kibalabs/core-react';
import { styled } from 'styled-components';

import { IconButton, IIconButtonTheme } from '../../atoms';
import { Stack } from '../../layouts';
import { Alignment, Direction } from '../../model';
import { getScreenSizeValue, IDimensionGuide, KibaIcon, ScreenSize } from '../../particles';
import { useDimensions } from '../../theming';
import { CssConverter, fieldToResponsiveCss, ResponsiveField } from '../../util';
import { IMoleculeProps } from '../moleculeProps';

const getSlidesPerPageCss: CssConverter<number> = (field: number): string => {
  return `width: calc(100% / ${field});`;
};

export interface ICarouselTheme {
  indexButtonTheme: IIconButtonTheme;
}

const StyledSlider = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;


  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  /* Hide scrollbar on ie 11 */
  -ms-overflow-style: none;
  overflow: auto;
`;
StyledSlider.displayName = 'KibaCarouselSlider';

interface IStyledSlideProps {
  $theme: IDimensionGuide;
  $slidesPerPage: ResponsiveField<number>;
}

const StyledSlide = styled.div<IStyledSlideProps>`
  scroll-snap-align: start;
  flex-shrink: 0;
  height: 100%;
  transform-origin: center center;
  transform: scale(1);
  transition: transform 0.5s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props: IStyledSlideProps): string => fieldToResponsiveCss(props.$slidesPerPage, props.$theme, getSlidesPerPageCss)};
`;
StyledSlide.displayName = 'KibaCarouselSliderSlide';

export interface ICarouselProps extends IMoleculeProps<ICarouselTheme>, IMultiAnyChildProps {
  shouldShowButtons?: boolean;
  autoplaySeconds?: number;
  initialIndex?: number;
  indexButtonVariant?: string;
  slidesPerPage?: number;
  slidesPerPageResponsive?: ResponsiveField<number>;
  onIndexProgressed?: (slideIndexProgress: number) => void;
  onIndexChanged?: (slideIndex: number) => void;
}

// NOTE(krishan711): the slider could potentially be its own component here!
export function Carousel({
  className = '',
  shouldShowButtons = true,
  autoplaySeconds = 7,
  initialIndex = 0,
  slidesPerPage = 1,
  ...props
}: ICarouselProps): React.ReactElement {
  const dimensions = useDimensions();
  const [sliderRef] = useRenderedRef<HTMLDivElement>();
  const scrollTimeoutRef = React.useRef<number | null>(null);
  const children = flattenChildren(props.children);
  const [slideIndex, setSlideIndex] = React.useState<number>(initialIndex);

  const onPreviousClicked = (): void => {
    if (sliderRef.current && !sliderRef.current.scrollTo) {
      // ie 11 doesn't support scrollTo (this doesn't animate nicely)
      sliderRef.current.scrollLeft = (slideIndex - 1) * sliderRef.current.clientWidth;
    } else {
      sliderRef.current?.scrollTo((slideIndex - 1) * (sliderRef.current?.clientWidth || 0), 0);
    }
  };

  const onNextClicked = (): void => {
    goToNext();
  };

  const goToNext = (): void => {
    if (sliderRef.current && !sliderRef.current.scrollTo) {
      // ie 11 doesn't support scrollTo (this doesn't animate nicely)
      sliderRef.current.scrollLeft = (slideIndex + 1) * sliderRef.current.clientWidth;
    } else {
      sliderRef.current?.scrollTo((slideIndex + 1) * (sliderRef.current?.clientWidth || 0), 0);
    }
  };

  useInterval(autoplaySeconds || 10000000, (): void => {
    if (autoplaySeconds) {
      goToNext();
    }
  }, false, [slideIndex]);

  React.useEffect((): void => {
    setTimeout((): void => {
      if (sliderRef.current && !sliderRef.current.scrollTo) {
        // ie 11 doesn't support scrollTo (this doesn't animate nicely)
        sliderRef.current.scrollLeft = sliderRef.current.clientWidth * initialIndex;
      } else {
        sliderRef.current?.scrollTo((sliderRef.current?.clientWidth || 0) * initialIndex, 0);
      }
    }, 50);
  }, [initialIndex, sliderRef]);

  const innerSlidesPerPage = props.slidesPerPageResponsive?.base || slidesPerPage;
  const innerSlidesPerPageSmall = props.slidesPerPageResponsive?.small || innerSlidesPerPage;
  const innerSlidesPerPageMedium = props.slidesPerPageResponsive?.medium || innerSlidesPerPageSmall;
  const innerSlidesPerPageLarge = props.slidesPerPageResponsive?.large || innerSlidesPerPageMedium;
  const innerSlidesPerPageExtraLarge = props.slidesPerPageResponsive?.extraLarge || innerSlidesPerPageLarge;

  useScrollListener(sliderRef.current, (): void => {
    if (!sliderRef.current) {
      return;
    }
    const position = Math.ceil(sliderRef.current.scrollLeft);
    // TODO(krishan711): this doesn't work in everypage console because it refers to the global document, not the local (inside iframe) one
    const screenWidth = Math.ceil(document.body.clientWidth);
    let slideCount = innerSlidesPerPage;
    if (screenWidth > getScreenSizeValue(ScreenSize.Small, dimensions)) {
      slideCount = innerSlidesPerPageSmall;
    }
    if (screenWidth > getScreenSizeValue(ScreenSize.Medium, dimensions)) {
      slideCount = innerSlidesPerPageMedium;
    }
    if (screenWidth > getScreenSizeValue(ScreenSize.Large, dimensions)) {
      slideCount = innerSlidesPerPageLarge;
    }
    if (screenWidth > getScreenSizeValue(ScreenSize.ExtraLarge, dimensions)) {
      slideCount = innerSlidesPerPageExtraLarge;
    }
    const width = Math.ceil(sliderRef.current.scrollWidth);
    const progress = (children.length / slideCount) * (position / width);
    const progressRounded = Math.round(progress * 100.0) / 100;
    const newSlideIndex = Math.round(progress);
    if (props.onIndexProgressed) {
      props.onIndexProgressed(progressRounded);
    }
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = window.setTimeout((): void => {
      setSlideIndex(newSlideIndex);
      scrollTimeoutRef.current = null;
    }, 50);
  });

  React.useEffect((): void => {
    if (props.onIndexChanged) {
      props.onIndexChanged(slideIndex);
    }
  // NOTE(krishan711): Don't put props.onIndexChanged as a prop because if it is changing every time, this effect will run every time and
  // that will mean the initialIndex won't have an effect when changed because the setTimeout above will not have time to finish the transition
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideIndex]);

  return (
    <Stack
      id={props.id}
      className={getClassName(Carousel.displayName, className)}
      direction={Direction.Horizontal}
      childAlignment={Alignment.Center}
    >
      {shouldShowButtons && (
        <IconButton
          theme={props.theme?.indexButtonTheme}
          variant={props.indexButtonVariant}
          icon={<KibaIcon iconId='mui-chevron-left' />}
          label='Previous'
          onClicked={onPreviousClicked}
        />
      )}
      <Stack.Item growthFactor={1} shrinkFactor={1}>
        <StyledSlider
          ref={sliderRef}
          className={getClassName(StyledSlider.displayName)}
        >
          {children.map((child: (React.ReactElement | string | number), index: number): React.ReactElement => {
            return (
              <StyledSlide
              // eslint-disable-next-line react/no-array-index-key
                key={index}
                className={getClassName(StyledSlide.displayName)}
                $theme={dimensions}
                $slidesPerPage={{ base: slidesPerPage, ...props.slidesPerPageResponsive }}
              >
                {child}
              </StyledSlide>
            );
          })}
        </StyledSlider>
      </Stack.Item>
      {shouldShowButtons && (
        <IconButton
          theme={props.theme?.indexButtonTheme}
          variant={props.indexButtonVariant}
          icon={<KibaIcon iconId='mui-chevron-right' />}
          label='Next'
          onClicked={onNextClicked}
        />
      )}
    </Stack>
  );
}
Carousel.displayName = 'KibaCarousel';
