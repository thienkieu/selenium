import SeleniumFunction from '../../common/SeleniumFunction';
import { IdentityType } from './ElementIdenity';

const InterfaceResolve = {
    Single: async (elementIdentity, parentEl, driver) => {
        const seleniumFunction = new SeleniumFunction(driver);
        switch(elementIdentity.Type) {
            case IdentityType.XPath :
                return await seleniumFunction.findByXPath(elementIdentity.Identity, parentEl, elementIdentity.Waiting);
            break;
        }
    },

    Mutiple: async (elementIdentity, parentEl, driver) => {
        const seleniumFunction = new SeleniumFunction(driver);
        switch(elementIdentity.Type) {
            case IdentityType.XPath :
                return await seleniumFunction.findElementsByXPaths(elementIdentity.Identity, parentEl, elementIdentity.Waiting);
            break;
        }
    },

}

export default InterfaceResolve;
