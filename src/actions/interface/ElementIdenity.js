class ElementIdentity {
  constructor(type, identity, waiting) {
    this.Type = type;
    this.Identity = identity;
    this.Waiting = waiting;
  }

}

const IdentityType = () => {
  this.XPath = 'xpath';
}

const DynamixElementIdentity = (fn) => {
  this.fn = fn;
}

module.exports = {
  ElementIdentity,
  DynamixElementIdentity,
  IdentityType
};
