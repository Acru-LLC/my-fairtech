import i18n from "@/i18n";
import { ability } from "@/shared/store/ability";

export default [
  {
    name: "ReferencesTemplateSample",
    path: "/references/template-sample",
    redirect: "/references/template-sample",
    component: {
      render(c) {
        return c('router-view')
      }
    },
    meta: {
      bcLinkText: i18n.t('submodules.template-sample.menu_title'),
      bcTo: { name: "ReferencesTemplateSample" }
    },
    children: [
      {
        name: "ReferencesTemplateSampleIndex",
        path: "",
        component: () => import("@/modules/references/modules/template-sample/Index"),
        meta: {
          // hasPerm: () => ability.can('list', 'template samples')
        }
      },
      {
        name: "ReferencesTemplateSampleCreate",
        path: "create",
        component: () => import("@/modules/references/modules/template-sample/CreateOrUpdate"),
        meta: {
          // hasPerm: () => ability.can('create', 'template-samples')
        },
      },
      {
        name: "ReferencesTemplateSampleUpdate",
        path: "update/:id",
        component: () => import("@/modules/references/modules/template-sample/CreateOrUpdate"),
        meta: {
          // hasPerm: () => ability.can('update', 'template-samples')
        },
      },
    ]
  }
];