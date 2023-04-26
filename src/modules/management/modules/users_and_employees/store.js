import i18n from "@/i18n";
const state = {
    userHeaders: [
        {
            label: "#",
            thClass: "text-center",
            tdClass: "text-center",
            sortable: false,
            key: "index",
        },
        { label: i18n.t('auth.username'), key: "username" },
        { label: i18n.t('submodules.roles.title'), key: "roleNames" },
        { label: i18n.t('column.status'), key: "status" },
        { label: i18n.t('column.employee'), key: "employeeFullName" },
        {
            label: i18n.t('column.actions'), key: "actions", sortable: false, thClass: "text-center",
            tdClass: "text-center"
        },
    ],
    employeeHeaders: [
        {
            label: "#",
            thClass: "text-center",
            tdClass: "text-center",
            sortable: false,
            key: "index",
        },
        { label: i18n.t('column.fio'), key: "fullName", stickyColumn: true},
        { label: i18n.t('column.department'), key: "departmentName", thStyle: { 'min-width': '17rem' } },
        { label: i18n.t('column.position'), key: "positionName" },
        { label: i18n.t('column.inn'), key: "inn" },
        { label: i18n.t('column.passport_number'), key: "passportNumber" },
        { label: i18n.t('column.passport_series'), key: "passportSeries" },
        { label: i18n.t('column.passport_given_date'), key: "passportGivenDate" },
        { label: i18n.t('column.passport_end_date'), key: "passportEndDate" },
        { label: i18n.t('column.passport_given_by'), key: "passportGivenWho", thStyle: { 'min-width': '10rem' } },
        { label: i18n.t('column.personal_number'), key: "personalNumber" },
        { label: i18n.t('column.birthdate'), key: "birthday" },
        { label: i18n.t('column.address'), key: "currentAddress", thStyle: { 'min-width': '10rem' } },
        { label: i18n.t('column.status'), key: "status", thStyle: { 'min-width': '10rem' }, thClass: "text-center", tdClass: "text-center"},
        {
            label: i18n.t('column.actions'), key: "actions", sortable: false, thClass: "text-center",
            tdClass: "text-center"
        },
    ],
};

const getters = {}

const actions = {

};

const mutations = {

};

export const user = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}