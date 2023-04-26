import i18n from "@/locales/i18n";
import ApiService from "@/shared/services/api.service";
import HorizontalSidebarItems from "@/layouts/full-layout/horizontal-sidebar/HorizontalSidebarItems";
import capitalize from 'lodash/capitalize'

function addRefsToMenu(wmsParentRefs) {
      if (wmsParentRefs.length > 0 && HorizontalSidebarItems.length > 0) {
        let foundIndex = HorizontalSidebarItems.findIndex(el => el.id === 'allReferencesMenuItemId');
        if (foundIndex < 0) {
          let menuItemForReferences = {
            group: "/references",
            model: false,
            icon: "mdi mdi-information",
            openIcon: 'mdi mdi-information-outline',
            name: i18n.t('submodules.all_references'),
            id: "allReferencesMenuItemId",
            to: "/references/all",
            children: [
              // REFERENCES
              {
                icon: 'mdi mdi-information',
                openIcon: 'mdi mdi-information-outline',
                id: 'resApiReferencesId',
                name: i18n.t('submodules.references.title'),
                children: []
              }
            ]
          }
          HorizontalSidebarItems.unshift(menuItemForReferences);
          foundIndex = 0;
        }
        HorizontalSidebarItems[foundIndex].children.find(el => el.id === 'resApiReferencesId').children = [...makeReferences(wmsParentRefs)]
      }
    return 1;
}
function makeReferences(refs) {
    let array = [];
    if (refs.length > 0) {
      for (let ref of refs) {
        let obj = {};
        obj.name = ref.name ? capitalize(ref.name) : '';
        obj.to = `/references/${ref.id}`;
        obj.icon = 'mdi mdi-information-outline';
        obj.id = `wmsRef-${ref.id}`;
        array.push(obj);
      }
    }
    return array;
  }

const state = {
    parentRefsList: [],
    productHeaders: [
      {
          text: "#",
          align: "start",
          sortable: false,
          value: "index",
      },
      {text: i18n.t('column.sku'), value: "sku"},
      {text: i18n.t('column.name'), value: "name"},
      {text: i18n.t('column.unit'), value: "unitName"},
      {text: i18n.t('column.barcodes'), value: "barcode", width: '22rem'},
      {text: i18n.t('column.brand'), value: "brandName"},
      {text: i18n.t('column.category'), value: "itemCategoryName"},
      {text: i18n.t('column.item_models'), value: "itemModels", align: "center", sortable: false},
      {text: i18n.t('column.actions'), value: "actions", align: "center", sortable: false},
  ],
};

const getters = {

};

const actions = {
    async fetchParentRefsList({commit}) {
        try {
            const response = await ApiService.get(`reference/list-parent`);
            commit('setParentRefsList', response.data);
            return true
        } catch (e) {
            return false
        }
    },
}

const mutations = {
    setParentRefsList(state, response) {
        state.parentRefsList = response;
        addRefsToMenu(state.parentRefsList)
    },
}

export const references_shared = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
