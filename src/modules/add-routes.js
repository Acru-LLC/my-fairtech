import i18n from "@/i18n";
import { ability } from '@/shared/store/ability'
export default [
  {
    name: "Projects",
    path: "/projects",
    component: () => import('@/router/views/dashboards/default'),
    meta: {
      bcLinkText: i18n.t("submodules.projects.title_plural"),
      bcTo: { name: "Projects" }
    },
    children:
      [
        {
          path: 'main',
          name: 'ProjectsMain',
          meta: {
            authRequired: true,
          },
          component: () => import('@/modules/projects/projects-grid')
        },
      ]
  }
]