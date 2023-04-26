import i18n from "@/i18n";
import {ability} from "@/shared/store/ability";

export default [
    {
        name: "Management",
        path: "/management",
        redirect: "/management",
        component: () => import('@/router/views/dashboards/default'),
        meta: {
            bcLinkText: i18n.t("modules.management.title"),
            bcTo: {name: "Management"}
        },
        children: [
            // DEPARTMENTS
            {
                name: "Departments",
                path: "departments",
                redirect: "departments",
                component: {
                    render(c) {
                        return c("router-view");
                    }
                },
                meta: {
                    bcLinkText: i18n.t("submodules.organisation_structure.title"),
                    bcTo: {name: "Departments"}
                },
                children: [
                    {
                        name: "Departments",
                        path: "",
                        component: () =>
                            import("@/modules/management/modules/departments/Index"),
                        meta: {
                            hasPerm: () => ability.can('view', 'departments')
                        },
                    },
                    {
                        name: "CreateDepartment",
                        path: ":parentDepId/create",
                        component: () =>
                            import("@/modules/management/modules/departments/CreateOrUpdate"),
                        meta: {
                            bcLinkText: i18n.t("actions.create"),
                            bcTo: {name: "CreateDepartment"},
                            hasPerm: () => ability.can('create', 'department')
                        }
                    },
                    {
                        name: "UpdateDepartment",
                        path: "update/:id",
                        component: () =>
                            import("@/modules/management/modules/departments/CreateOrUpdate"),
                        meta: {
                            bcDynamic: true,
                            paramName: "id",
                            bcStateVarAndModuleName: {
                                stateVar: "currentItem",
                                moduleName: "managementDepartments",
                                stateVarKey: "name"
                            },
                            bcLinkText: i18n.t("actions.update"),
                            hasPerm: () => ability.can('update', 'department')
                        }
                    }
                ]
            },
            // USERS AND EMPLOYEES
            {
                name: "UsersAndEmployees",
                path: "users-and-employees",
                redirect: "users-and-employees",
                component: {
                    render(c) {
                        return c("router-view");
                    }
                },
                meta: {
                    bcLinkText: i18n.t("submodules.users.title"),
                    bcTo: {name: "UsersAndEmployees"}
                },
                children: [
                    {
                        name: "UsersAndEmployees",
                        path: "",
                        component: () =>
                            import("@/modules/management/modules/users_and_employees/Index"),
                        meta: {
                            hasPerm: () => ability.can('view', 'users-and-employees')
                        }
                    },
                    // USER
                    {
                        name: "CreateUser",
                        path: "create-user",
                        component: () =>
                            import("@/modules/management/modules/users_and_employees/CreateOrUpdateUser"),
                        meta: {
                            bcLinkText: i18n.t("submodules.users.title"),
                            bcTo: {name: "CreateUser"},
                            hasPerm: () => ability.can('create', 'user')
                        }
                    },
                    {
                        name: "UpdateUser",
                        path: "update-user/:id",
                        component: () =>
                            import("@/modules/management/modules/users_and_employees/CreateOrUpdateUser"),
                        meta: {
                            bcDynamic: true,
                            paramName: "id",
                            bcStateVarAndModuleName: {
                                stateVar: "currentItem",
                                moduleName: "managementUsersAndEmployees",
                                stateVarKey: "name"
                            },
                            bcLinkText: i18n.t("submodules.users.title"),
                            hasPerm: () => ability.can('update', 'user')
                        }
                    },
                    // UPDATE DEPARTMENT PERMISSIONS BY USER_ID
                    {
                        name: "UpdateUserPermissionsToDepartments",
                        path: "update-dep-permissions/:id",
                        component: () =>
                            import("@/modules/management/modules/users_and_employees/UpdateDepPermissions"),
                        meta: {
                            bcDynamic: true,
                            paramName: "id",
                            bcStateVarAndModuleName: {
                                stateVar: "currentItem",
                                moduleName: "managementUsersAndEmployees",
                                stateVarKey: "name"
                            },
                            bcLinkText: i18n.t('actions.update'),
                            hasPerm: () => ability.can('update', 'user')
                        }
                    },
                    // EMPLOYEE
                    {
                        name: "CreateEmployee",
                        path: "create-employee",
                        component: () =>
                            import("@/modules/management/modules/users_and_employees/CreateOrUpdateEmployee"),
                        meta: {
                            bcLinkText: i18n.t("submodules.employees.title"),
                            bcTo: {name: "CreateEmployee"},
                            // hasPerm: () => ability.can('create', 'employee')
                        }
                    },
                    {
                        name: "UpdateEmployee",
                        path: "update-employee/:id",
                        component: () =>
                            import("@/modules/management/modules/users_and_employees/CreateOrUpdateEmployee"),
                        meta: {
                            bcDynamic: true,
                            paramName: "id",
                            bcStateVarAndModuleName: {
                                stateVar: "currentItem",
                                moduleName: "managementUsersAndEmployees",
                                stateVarKey: "name"
                            },
                            bcLinkText: i18n.t("submodules.employees.title"),
                            hasPerm: () => ability.can('update', 'employee')
                        }
                    }
                ]
            },
            // OUTER USERS AND EMPLOYEES
            {
                name: "OuterUsersAndEmployees",
                path: "outer-users-and-employees",
                redirect: "outer-users-and-employees",
                component: {
                    render(c) {
                        return c("router-view");
                    }
                },
                meta: {
                    bcLinkText: i18n.t("submodules.users.outer_users_title"),
                    bcTo: {name: "OuterUsersAndEmployees"}
                },
                children: [
                    {
                        name: "OuterUsersAndEmployees",
                        path: "",
                        component: () =>
                            import("@/modules/management/modules/outer_users_and_employees/Index"),
                        meta: {
                            hasPerm: () => ability.can('view', 'outer-users-and-employees')
                        }
                    },
                    // USER
                    {
                        name: "CreateOuterUser",
                        path: "create-outer-user",
                        component: () =>
                            import("@/modules/management/modules/outer_users_and_employees/CreateOrUpdateUser"),
                        meta: {
                            bcLinkText: i18n.t("actions.create"),
                            bcTo: {name: "CreateOuterUser"},
                            hasPerm: () => ability.can('create', 'user')
                        }
                    },
                    {
                        name: "UpdateOuterUser",
                        path: "update-outer-user/:id",
                        component: () =>
                            import("@/modules/management/modules/outer_users_and_employees/CreateOrUpdateUser"),
                        meta: {
                            bcDynamic: true,
                            paramName: "id",
                            bcStateVarAndModuleName: {
                                stateVar: "currentItem",
                                moduleName: "managementUsersAndEmployees",
                                stateVarKey: "name"
                            },
                            bcLinkText: i18n.t("actions.update"),
                            hasPerm: () => ability.can('update', 'user')
                        }
                    },
                    // EMPLOYEE
                    {
                        name: "CreateOuterEmployee",
                        path: "create-outer-employee",
                        component: () =>
                            import("@/modules/management/modules/outer_users_and_employees/CreateOrUpdateEmployee"),
                        meta: {
                            bcLinkText: i18n.t("actions.create"),
                            bcTo: {name: "CreateOuterEmployee"},
                            // hasPerm: () => ability.can('create', 'employee')
                        }
                    },
                    {
                        name: "UpdateOuterEmployee",
                        path: "update-outer-employee/:id",
                        component: () =>
                            import("@/modules/management/modules/outer_users_and_employees/CreateOrUpdateEmployee"),
                        meta: {
                            bcDynamic: true,
                            paramName: "id",
                            bcStateVarAndModuleName: {
                                stateVar: "currentItem",
                                moduleName: "managementUsersAndEmployees",
                                stateVarKey: "name"
                            },
                            bcLinkText: i18n.t("actions.update"),
                            hasPerm: () => ability.can('update', 'employee')
                        }
                    }
                ]
            },
            // ALL USERS AND EMPLOYEES
            {
                name: "AllUsersAndEmployees",
                path: "all-users-and-employees",
                redirect: "all-users-and-employees",
                component: {
                    render(c) {
                        return c("router-view");
                    }
                },
                meta: {
                    bcLinkText: i18n.t("submodules.users.all_users"),
                    bcTo: {name: "AllUsersAndEmployees"}
                },
                children: [
                    {
                        name: "AllUsersAndEmployees",
                        path: "",
                        component: () =>
                            import("@/modules/management/modules/all_users_and_employees/Index"),
                        meta: {
                            hasPerm: () => ability.can('view', 'all-users-and-employees')
                        }
                    },
                ]
            },
            // ALL EMPLOYEES
            {
                name: "AllEmployees",
                path: "all-employees",
                redirect: "all-employees",
                component: {
                    render(c) {
                        return c("router-view");
                    }
                },
                meta: {
                    bcLinkText: i18n.t("submodules.employees.all_employees"),
                    bcTo: {name: "AllEmployees"}
                },
                children: [
                    {
                        name: "AllEmployees",
                        path: "",
                        component: () =>
                            import("@/modules/management/modules/all_employees/Index"),
                        meta: {
                            hasPerm: () => ability.can('view', 'all-employees')
                        }
                    },
                ]
            },
            // ROLES
            {
                name: "Roles",
                path: "roles",
                redirect: "roles",
                component: {
                    render(c) {
                        return c("router-view");
                    }
                },
                meta: {
                    bcLinkText: i18n.t("submodules.roles.title"),
                    bcTo: {name: "Roles"}
                },
                children: [
                    {
                        name: "Roles",
                        path: "",
                        component: () =>
                            import("@/modules/management/modules/roles/Index"),
                        meta: {
                            hasPerm: () => ability.can('view', 'roles')
                        }
                    },
                    {
                        name: "CreateRole",
                        path: "create",
                        component: () =>
                            import("@/modules/management/modules/roles/CreateOrUpdate"),
                        meta: {
                            bcLinkText: i18n.t("submodules.roles.title"),
                            bcTo: {name: "CreateRole"},
                            hasPerm: () => ability.can('create', 'role')
                        }
                    },
                    {
                        name: "UpdateRole",
                        path: "update/:id",
                        component: () =>
                            import("@/modules/management/modules/roles/CreateOrUpdate"),
                        meta: {
                            bcDynamic: true,
                            paramName: "id",
                            bcStateVarAndModuleName: {
                                stateVar: "currentItem",
                                moduleName: "managementRoles",
                                stateVarKey: "name"
                            },
                            bcLinkText: i18n.t("submodules.roles.title"),
                            hasPerm: () => ability.can('update', 'role')
                        }
                    },
                    {
                        name: "UpdateRolePermissions",
                        path: "update-role-permissions/:id",
                        component: () =>
                            import(/* webpackChunkName: "UpdateRolePermissions" */"@/modules/management/modules/roles/UpdateRolePermissions"),
                        meta: {
                            bcDynamic: true,
                            paramName: "id",
                            bcStateVarAndModuleName: {
                                stateVar: "currentItem",
                                moduleName: "managementRoles",
                                stateVarKey: "name"
                            },
                            bcLinkText: "",
                            hasPerm: () => ability.can('add', 'permission to role')
                        }
                    }
                ]
            },
            // PERMISSIONS
            {
                name: "Permissions",
                path: "permissions",
                redirect: "permissions",
                component: {
                    render(c) {
                        return c("router-view");
                    }
                },
                meta: {
                    bcLinkText: i18n.t("submodules.permissions.title"),
                    bcTo: {name: "Permissions"}
                },
                children: [
                    {
                        name: "Permissions",
                        path: "",
                        component: () =>
                            import("@/modules/management/modules/permissions/Index"),
                        meta: {
                            hasPerm: () => ability.can('view', 'permissions')
                        }
                    },
                    {
                        name: "UpdatePermissions",
                        path: "update/:id",
                        component: () =>
                            import("@/modules/management/modules/permissions/CreateOrUpdate"),
                        meta: {
                            bcDynamic: true,
                            paramName: "id",
                            bcStateVarAndModuleName: {
                                stateVar: "currentItem",
                                moduleName: "managementPermissions",
                                stateVarKey: "name"
                            },
                            bcLinkText: i18n.t("submodules.permissions.title"),
                            hasPerm: () => ability.can('update', 'permission')
                        }
                    },
                ]
            },
            // ADVERTISEMENT_VOLUME_TYPES_BY_LOCATION_TYPE
            {
                name: "DepartmentPermissionsByDepartmentType",
                path: "dep-perms-by-dep-type",
                redirect: "dep-perms-by-dep-type",
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                meta: {
                    bcLinkText: i18n.t('submodules.dep_perm_types_by_dep_type.title'),
                    bcTo: {name: "DepartmentPermissionsByDepartmentType"}
                },
                children: [
                    {
                        name: "DepartmentPermissionsByDepartmentType",
                        path: "",
                        component: () => import("@/modules/management/modules/dep_perm_types_by_dep_type/Index"),
                        meta: {
                            hasPerm: () => ability.can('view', 'department-permissions-by-department-type')
                        }
                    },
                    {
                        name: "CreateDepartmentPermissionsByDepartmentType",
                        path: "create",
                        component: () => import("@/modules/management/modules/dep_perm_types_by_dep_type/CreateOrUpdate"),
                        meta: {
                            bcLinkText: i18n.t('submodules.dep_perm_types_by_dep_type.title'),
                            bcTo: {name: "CreateDepartmentPermissionsByDepartmentType"}
                        },
                    },
                    {
                        name: "UpdateDepartmentPermissionsByDepartmentType",
                        path: "update/:id",
                        component: () => import("@/modules/management/modules/dep_perm_types_by_dep_type/CreateOrUpdate"),
                        meta: {
                            bcDynamic: true,
                            paramName: 'id',
                            bcStateVarAndModuleName: {
                                stateVar: 'currentItem',
                                moduleName: 'refDepartmentPermissionsByDepartmentType',
                                stateVarKey: 'name'
                            },
                            bcLinkText: i18n.t('submodules.dep_perm_types_by_dep_type.title')
                        },
                    },
                ]
            },
            // ADVERTISEMENT_VOLUME_TYPES_BY_LOCATION_TYPE
            {
                name: "DepartmentPermissionsByDepartmentType",
                path: "dep-perms-by-dep-type",
                redirect: "dep-perms-by-dep-type",
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                meta: {
                    bcLinkText: i18n.t('submodules.dep_perm_types_by_dep_type.title'),
                    bcTo: {name: "DepartmentPermissionsByDepartmentType"}
                },
                children: [
                    {
                        name: "DepartmentPermissionsByDepartmentType",
                        path: "",
                        component: () => import("@/modules/management/modules/dep_perm_types_by_dep_type/Index"),
                        meta: {
                            hasPerm: () => ability.can('view', 'department-permissions-by-department-type')
                        }
                    },
                    {
                        name: "CreateDepartmentPermissionsByDepartmentType",
                        path: "create",
                        component: () => import("@/modules/management/modules/dep_perm_types_by_dep_type/CreateOrUpdate"),
                        meta: {
                            bcLinkText: i18n.t('submodules.dep_perm_types_by_dep_type.title'),
                            bcTo: {name: "CreateDepartmentPermissionsByDepartmentType"}
                        },
                    },
                    {
                        name: "UpdateDepartmentPermissionsByDepartmentType",
                        path: "update/:id",
                        component: () => import("@/modules/management/modules/dep_perm_types_by_dep_type/CreateOrUpdate"),
                        meta: {
                            bcDynamic: true,
                            paramName: 'id',
                            bcStateVarAndModuleName: {
                                stateVar: 'currentItem',
                                moduleName: 'refDepartmentPermissionsByDepartmentType',
                                stateVarKey: 'name'
                            },
                            bcLinkText: i18n.t('submodules.dep_perm_types_by_dep_type.title')
                        },
                    },
                ]
            },

            {
                name: "ManagementTest",
                path: "test",
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        name: "ManagementTestDbq",
                        path: "dbq",
                        component: () => import("@/modules/management/modules/test/dbq"),
                    },
                ],
            },
        ]
    }
];