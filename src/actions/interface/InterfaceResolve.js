const SeleniumFunction = require( '../../common/SeleniumFunction');
const { IdentityType } = require('./ElementIdenity');

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

module.exports = InterfaceResolve;
