import InterfaceResolve from "../../interface/InterfaceResolve";
import LoginPage from "../../interface/facebook/LoginPage";
import { Key, By } from "selenium-webdriver";
import { sleep, hashCode, getCurrentDateTime } from "../../../../libs/function";
import SeleniumFunction from "../../../common/SeleniumFunction";

class Login {
    constructor(driver) {
        this.loginPage = new LoginPage();
        this.driver = driver;
        this.seleniumFunction = new SeleniumFunction(this.driver);
    }

    reportLoginError = async() => {
        let name = 'loginError_'+ getCurrentDateTime()+'.png';
        console.log('login Error');
        this.seleniumFunction.takeScreenshot(name);
    }

    login = async (email, password) => {
        let inputEmailElementInterface = this.loginPage.inputEmailElementInterface();
        let inputEmailElement = await InterfaceResolve.Single(
            inputEmailElementInterface,
            null,
            this.driver
        );

        if (inputEmailElement) {
            let inputPasswordPasswordInterface = this.loginPage.inputPasswordElementInterface();
            let inputPasswordPassword = await InterfaceResolve.Single(
                inputPasswordPasswordInterface,
                null,
                this.driver
            );

            let submitLoginInterface = this.loginPage.loginElementInterface();
            let submitLogin = await InterfaceResolve.Single(
                submitLoginInterface,
                null,
                this.driver
            );

            if (inputEmailElement && inputPasswordPassword && submitLogin) {
                await this.seleniumFunction.write(inputEmailElement, email);
                await this.seleniumFunction.write(inputPasswordPassword, password);
                await this.seleniumFunction.submit(submitLogin);
            }else {
                this.reportLoginError();
            }
        } else {
            this.reportLoginError();
        }
    };
}

export default Login;
