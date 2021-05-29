// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    spacing: {
      borderRadius: number;
      border: number;
      padding: number;
      margin: number;
    };
    colors: {
      primary: string;
      secondary: string;
      white: string;
      black: string;
      green: string;
      grayLight: string;
      success: string;
    };
    typography: {
      FONT_REGULAR: string;
      FONT_BOLD: string;
    };
  }
}
