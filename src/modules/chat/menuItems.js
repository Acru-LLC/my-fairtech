import i18n from "@/i18n";
import { ability } from '@/shared/store/ability'

export default [
  {
    id: "chatMainId",
    label: i18n.t('submodules.chat.title'),
    icon: "mdi mdi-chat",
    link: { name: "Chat" },
    code: "fair_tech",
    hasPerm: () => ability.can('view', 'chat')
  }
];