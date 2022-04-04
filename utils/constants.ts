import {
  FaRegFileExcel,
  FaRegFileImage,
  FaRegFilePdf,
  FaRegFilePowerpoint,
  FaRegFileWord,
} from "react-icons/fa";
import { IconType } from "react-icons";

export const USER_TOKEN = "user-token";

export const fileExtensionMap: { [key: string]: IconType } = {
  pdf: FaRegFilePdf,
  pptx: FaRegFilePowerpoint,
  xlsx: FaRegFileExcel,
  docx: FaRegFileWord,
  png: FaRegFileImage,
  jpg: FaRegFileImage,
  jpeg: FaRegFileImage,
};
