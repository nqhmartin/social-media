import {Dimensions, PixelRatio} from 'react-native';

export const DEVICE_WIDTH = Dimensions.get('window').width;
const DESIGN_WIDTH = 414;
export const DEVICE_HEIGHT = Dimensions.get('window').height;
const DESIGN_HEIGHT = 736;
export const ratioW = DEVICE_WIDTH / DESIGN_WIDTH;
export const ratioH = DEVICE_HEIGHT / DESIGN_HEIGHT;
export const percentScreen =
  DEVICE_WIDTH / DEVICE_HEIGHT / (DESIGN_WIDTH / DESIGN_HEIGHT);
export const ScaleW = (size: number) => {
  return size * ratioW;
};
export const ScaleH = (size: number) => {
  return size * ratioH;
};
export const Scale = (size: number) => {
  return size * percentScreen;
};

export const scaleFont = (size: number) => size * PixelRatio.getFontScale();
export const FONT = {
  normal: 'Inter-Regular',
  bold: 'Inter-SemiBold',
};
