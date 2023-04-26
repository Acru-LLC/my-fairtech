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
            hasPerm: () => ability.can('view', 'projects')
          },
          component: () => import('@/modules/projects/projects-grid')
        },
        // COMMISSION PROJECT
        {
          path: 'commission',
          name: 'CommissionProjects',
          meta: {
            authRequired: true,
            hasPerm: () => ability.can('view', 'commission-projects')
          },
          component: () => import('@/modules/projects/projects-grid')
        },
        {
          path: 'create/:applicationId',
          name: 'CreateProjectForApplication',
          meta: { authRequired: true },
          component: () => import('@/modules/projects/create')
        },
        {
          name: "projectsSign",
          path: "sign/:id",
          component: () => import('@/modules/projects/signature'),
          meta: {
            // hasPerm: () => ability.can( 'view', 'geo-region-streets' )
          }
        },
        {
          name: "CommissionInvokeLetterSign",
          path: "invoke-letter-sign/:projectId/:letterId",
          component: () => import('@/modules/projects/components/commission/signature'),
          meta: {
            // hasPerm: () => ability.can( 'view', 'geo-region-streets' )
          }
        },
      ]
  }
]