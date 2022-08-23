import { FilePondFile } from 'filepond';
import 'react-filepond';

/**
 * @param getFileEncodeDataURL is an function that transforms an file image in an dataUrl - returns an string
 */
interface FilePondFilePlugins {
  getFileEncodeDataURL: () => string;
}

declare module 'react-filepond' {
  export interface FilePondProps {
    onpreparefile: (
      file: FilePondFile & FilePondFilePlugins,
      output: any,
    ) => void;
  }
}
