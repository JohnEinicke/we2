const AccessControl = require("accesscontrol");

const ac = new AccessControl();

ac.grant("admin").readOwn("user").updateOwn("user").deleteOwn("user").createAny("user").readAny("user").updateAny("user").deleteAny("user");

ac.grant("user").readOwn("user").deleteOwn("user");

ac.grant("admin").createAny("group").readAny("group").updateOwn("group").deleteAny("group").createAny("groupMessage").readOwn("groupMessage").readAny("groupMessage");

ac.grant("user").createAny("group").readAny("group").updateOwn("group").createAny("groupMessage").readOwn("groupMessage");

ac.grant("admin").createOwn("message").readOwn("message").deleteOwn("message").readAny("message").deleteAny("message");

ac.grant("user").createOwn("message").readOwn("message").deleteOwn("message");

ac.grant("admin").createOwn("picture").deleteOwn("picture").deleteAny("picture");

ac.grant("user").createOwn("picture").deleteOwn("picture");



module.exports = ac;