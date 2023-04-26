import { Ability } from "@casl/ability";
export const ability = new Ability()

export default (store) => {
    ability.update(store.state.rules);
    return store.subscribe((mutation) => {
        switch (mutation.type) {
            case 'ROOT_LOGIN_SUCCESS':
                var formattedRules = [];
                if (mutation.payload.permissions.length > 0) {
                    formattedRules = mutation.payload.permissions.map(perm => {
                        let formattedObj = {};
                        formattedObj.action = perm.substr(0, perm.indexOf(' '));
                        formattedObj.subject = perm.substr(perm.indexOf(' ') + 1);
                        return formattedObj;
                    })
                }
                ability.update(formattedRules);
                break
            case 'ROOT_LOGOUT_SUCCESS':
                ability.update([{action: 'read', subject: 'all'}])
                break
        }
    })
}