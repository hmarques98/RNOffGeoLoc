// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    space: number[];
    colors: {
      primary: string;
      secondary: string;
      white: string;
      black: string;
      green: string;
      grayLight: string;
      success: string;
      greenOpacity: string;
    };
    typography: {
      FONT_REGULAR: string;
      FONT_BOLD: string;
    };
    borderWidths: number[];
    bordersColors: {
      primary: string;
      secondary: string;
      white: string;
      black: string;
      green: string;
      grayLight: string;
      success: string;
      greenOpacity: string;
    };
    radii: number[];
  }
}
