import { ArrowButton, ArrowIcon, DotButtonCSS } from './styles';

interface ArrowsButtonProps {
  enabled: boolean;
  onClick: () => void;
}
interface CarouselDotButtonProps {
  selected: boolean;
  onClick: () => void;
}

export const PrevButton = ({ enabled, onClick }: ArrowsButtonProps) => (
  <ArrowButton
    type="button"
    className="embla__button embla__button--prev"
    onClick={onClick}
    disabled={!enabled}
    tabIndex={-1}
    style={{
      transform: 'rotate(180deg) scale(1)',
    }}
  >
    <ArrowIcon />
  </ArrowButton>
);

export const NextButton = ({ enabled, onClick }: ArrowsButtonProps) => (
  <ArrowButton
    type="button"
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={!enabled}
    tabIndex={-1}
  >
    <ArrowIcon />
  </ArrowButton>
);

export const CarouselDotButton = ({
  selected,
  onClick,
}: CarouselDotButtonProps) => (
  <DotButtonCSS
    type="button"
    className={`embla__dot ${selected ? 'is-selected' : ''}`}
    onClick={onClick}
    tabIndex={-1}
  />
);
