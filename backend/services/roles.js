const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant("basic")
    .readAny("post")
    .updateOwn("post")
    .createOwn("post")

  ac.grant("admin")
    .extend("basic")
    .createAny("subd")
    .updateAny("subd")
    .deleteAny("subd")

  ac.grant("admin")
    .extend("basic")
    .createAny("schedule")
    .updateAny("schedule")
    .deleteAny("schedule")

  return ac;
})();