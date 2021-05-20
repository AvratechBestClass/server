const Encrypt = require ("../utils/encryptUtil")
var split = "_!_";
var ttl = 1000 *  60 * 60;

function UserToken (isNew, token, name, _id, role, roleNumber, email) {
    if(isNew) {
        this.name = name;
        this._id = _id;
        this.role = role;
        this.roleNumber = roleNumber;
        this.email = email;
        this.expirationTime = Date.now() + ttl;
        this.token = Encrypt.getEncrypt(
            name + split+
            _id + split+
            role + split+
            roleNumber + split+
            this.expirationTime + split+
            email);
    } else {
        this.token = token;
        var tokenStr = Encrypt.getDecrypt(token).split(split);
        this.name =  tokenStr[0];
        this._id = tokenStr[1];
        this.role = tokenStr[2];
        this.roleNumber = tokenStr[3];
        this.expirationTime = tokenStr[4];
        this.email = tokenStr[5];
    }

    this.isNotExpired = function () {
        if(this.expirationTime && parseInt(this.expirationTime) > Date.now()){
            return true;
        }
        return false;
    }
}

module.exports = UserToken;