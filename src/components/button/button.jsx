import { BaseButton } from './button.styles';
import GoogleSignInButton from './google-sign-in-button/google-sign-in-button';

const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google',
};

const getButton = ({ buttonType = BUTTON_TYPE_CLASSES.base }) => {
  return {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
  }[buttonType];
};

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  if (buttonType == 'google') {
    return <GoogleSignInButton />;
  }
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
