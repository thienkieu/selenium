const LoginInterface = require('../interfaces/login');
const SeleniumFunction = require('../libs/SeleniumFunction');

let Login = async (driver) => {
    
    let loginInterface = new LoginInterface(driver);
    let seleniumFunction = new SeleniumFunction(driver);

    await seleniumFunction.visit("https://facebook.com");

    let emailEl = await loginInterface.getInputEmail();
    seleniumFunction.write(emailEl, 'thien1988@gmail.com');

    let password = await loginInterface.getInputPassword();
    seleniumFunction.write(password, 'fb_06082017');

    let loginButton = await loginInterface.getLoginButton();
    seleniumFunction.click(loginButton);
}

module.exports = Login;
