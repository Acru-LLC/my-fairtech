import i18n from "@/i18n";
import { ability } from '@/shared/store/ability'

export default [
    {
        id: "projectsParentMenuId",
        label: i18n.t("submodules.projects.title_plural"),
        icon: "mdi mdi-briefcase",
        hasPerm: () => ability.can('view', 'projects') || ability.can('view', 'commission-projects'),
        subItems: [
            {
                id: "projects-id",
                label: i18n.t("submodules.projects.title_plural"),
                icon: "mdi mdi-briefcase-edit",
                link: { name: "ProjectsMain" },
                parentId: "projectsParentMenuId",
                hasPerm: () => ability.can('view', 'projects')
            },
            {
                id: "commission-porjects-id",
                label: i18n.t("submodules.commission.projects_menu_title"),
                icon: "mdi mdi-briefcase-variant",
                link: { name: "CommissionProjects" },
                parentId: "projectsParentMenuId",
                hasPerm: () => ability.can('view', 'commission-projects')
            }
        ]
    }
];
