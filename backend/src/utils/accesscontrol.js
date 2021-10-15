import { AccessControl } from "accesscontrol";
const ac = new AccessControl();


function roles() {
    ac.grant("basic")
        .readOwn("profile")
        .updateOwn("profile")

    ac.grant("admin")
        .extend("basic")
        .updateAny("profile")
        .deleteAny("profile")
    return ac;
}


export { roles }