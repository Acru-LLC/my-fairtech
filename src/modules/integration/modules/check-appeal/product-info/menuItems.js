import i18n from "@/i18n";
import {ability} from "@/shared/store/ability";
import {TokenService} from "@/shared/services/storage.service";

export default [
    //PRODUCT - MONITOR -YaTT
    {
        id: "productMurojaatId",
        label: i18n.t('pharm.murojaat.title'),
        icon: "mdi mdi-arrange-send-backward",
        // badge: {
        //     component: () => MenuBadgeComponent,
        //     params: 'monitor',
        //     variant: 'success',
        // },
        link: {name: "ProductMurojaat"},
        parentId: "productMurojaatId",
        code: "product_info",
        hasPerm: () => ability.can('view', 'product-electron-murojaat')
    },
    {
        id: "producInfosMenuId",
        label: i18n.t('system.product_info.infos'),
        icon: "mdi mdi-shopping",
        link: {name: "ProductInfos"},
        parentId: "producInfosMenuId",
        code: "product_info",
        hasPerm: () => ability.can('view', 'product-electron-murojaat')
    },
    // {
    //     id: "producInfosMenuId",
    //     label: i18n.t("system.product_info.infos"),
    //     icon: "mdi mdi-shopping",
    //     code: "product_info",
    //     // hasPerm: () => ability.can('view', 'product_info-menu-infos')
    //     subItems: [
    //         {
    //             id: "producInfos-tif-tn_shtrix_mxik-code",
    //             label: i18n.t("system.product_info.Shtrix_MXIK"),
    //             icon: "mdi mdi-information-variant",
    //             link: { name: "ProductInfosTIFTNCODE" },
    //             parentId: "producInfosMenuId",
    //             // hasPerm: () => ability.can('view', 'product_info-tif-tn_shtrix_mxik')
    //         },
    //         {
    //             id: "producInfos-tif-tn_shtrix_mxik-code",
    //             label: i18n.t("system.product_info.tif_tn"),
    //             icon: "mdi mdi-information-variant",
    //             link: { name: "ProductInfosTIFTNCODE" },
    //             parentId: "producInfosMenuId",
    //             // hasPerm: () => ability.can('view', 'product_info-tif-tn_shtrix_mxik')
    //         }
    //     ]
    // }

];
