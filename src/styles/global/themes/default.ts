import type { iTheme } from 'types/iTheme';
import { sharedTheme } from './shared';

export const defaultTheme: iTheme = {
  name: 'default',

  colors: {
    primary: '025, 118, 210', // rgb(025, 118, 210) or #1976D2
    text100: '255, 255, 255', // rgb(255, 255, 255) or #FFFFFF
    text300: '171, 171, 171', // rgb(171, 171, 171) or #ABABAB
    text600: '088, 089, 091', // rgb(088, 089, 091) or #58595B
    text900: '000, 000, 000', // rgb(000, 000, 000) or #000000
    background100: '255, 255, 255', // rgb(255, 255, 255) or #FFFFFF
    background300: '222, 222, 222', // rgb(222, 222, 222) or #DEDEDE
    background600: '164, 164, 164', // rgb(164, 164, 164) or #A4A4A4
    background900: '000, 000, 000', // rgb(000, 000, 000) or #000000
  },
  ...sharedTheme,
};
