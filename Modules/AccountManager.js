const {LOG, DEBUG, parse, toString, ID, red, magenta, green, yellow} = require(`../Util.js`);

const Account = require(`../Classes/Account`);

module.exports = class AccountManager {
    /**
     * @param {Array<Object>} accounts
     * @param {String} accounts.ID
     * @param {Number} accounts.Discord
     * @param {Object} accounts.Permissions
     * @param {Array<Object>} accounts.Audit
     * @param {Object} accounts.Settings
     * @param {String} accounts.ServiceLevel
     */
    constructor(accounts){
        this.accounts = accounts.map(account=>
            new Account(
                account.ID,
                account.Discord,
                account.Permissions,
                account.Audit,
                account.Settings,
                account.ServiceLevel));
        LOG(`AccountManager`,`Loaded ${this.accounts.length} accounts.`);
    }

    /**
     * @param {String} ID
     */
    get(ID) {
        return this.accounts.find(account=>account.ID === ID);
    }
};