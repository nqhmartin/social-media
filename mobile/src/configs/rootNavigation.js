import {createNavigationContainerRef} from '@react-navigation/native';
export const navigationRef = createNavigationContainerRef();
export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export const reset = () => {
  navigationRef.reset({
    key: 1,
    routes: [{name: 'Post'}],

  })
}