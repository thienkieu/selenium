import ElementIdentity, { IdentityType } from '../ElementIdenity';
import Constant from '../../Constant';

class LoginPage {
  inputEmailElementInterface = () => {
    return new ElementIdentity(IdentityType.XPath, '//input[@type="email"]', Constant.WaittingElementTime);
  }

  inputPasswordElementInterface = () => {
    return new ElementIdentity(IdentityType.XPath, '//input[@type="password"]', Constant.WaittingElementTime);
  }

  loginElementInterface = () => {
    return new ElementIdentity(IdentityType.XPath, '//input[@type="submit"]', Constant.WaittingElementTime);
  }
}

export default LoginPage;
