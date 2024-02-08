<script>
import MetisMenu from "metismenujs/dist/metismenujs";
import MultiUiItem from '@/components/MenuUlItem'

import {menuItems} from "./menu";
import {TokenService} from "@/shared/services/storage.service";

export default {
    data() {
        return {
            menuItems: menuItems,
            menuData: null,
        };
    },
    components: {
        MultiUiItem
    },
    mounted: function () {
        let menuRef = new MetisMenu("#side-menu");
        let simplebarContentWrapper = document.querySelector(".simplebar-content-wrapper");
        let links = document.getElementsByClassName("side-nav-link-ref");
        let matchingMenuItem = null;
        const paths = [];
        for (let i = 0; i < links.length; i++) {
            paths.push(links[i]["pathname"]);
        }
        let itemIndex = paths.indexOf(window.location.pathname);
        if (itemIndex === -1) {
            itemIndex = paths.indexOf(window.location.pathname + '/');
        }
        if (itemIndex === -1) {
            let strIndex = window.location.pathname.lastIndexOf("/");
            let item = window.location.pathname.substr(0, strIndex).toString();
            matchingMenuItem = links[paths.indexOf(item)];
            if (!matchingMenuItem) {
                matchingMenuItem = links[paths.indexOf(item + '/')]
            }
            if (!matchingMenuItem) {
                let strIndex = item.lastIndexOf("/");
                item = item.substr(0, strIndex).toString();
                matchingMenuItem = links[paths.indexOf(item)];
                if (!matchingMenuItem) {
                    matchingMenuItem = links[paths.indexOf(item + '/')]
                }
            }
        } else {
            matchingMenuItem = links[itemIndex];
        }
        if (matchingMenuItem) {
            matchingMenuItem.classList.add("active");
            setTimeout(() => {
                simplebarContentWrapper.scrollTo({
                    top: matchingMenuItem.offsetTop - 100,
                    behavior: "smooth"
                });
            }, 400);
            let parent = matchingMenuItem.parentElement;
            if (parent) {
                parent.classList.add("mm-active");
                const parent2 = parent.parentElement.closest("ul");
                if (parent2 && parent2.id !== "side-menu") {
                    parent2.classList.add("mm-show");
                    const parent3 = parent2.parentElement;
                    if (parent3) {
                        parent3.classList.add("mm-active");
                        let childAnchor = parent3.querySelector(".has-arrow");
                        let childDropdown = parent3.querySelector(".has-dropdown");
                        if (childAnchor) {
                            childAnchor.classList.add("mm-active");
                        }
                        if (childDropdown) {
                            childDropdown.classList.add("mm-active");
                        }
                        const parent4 = parent3.parentElement;
                        if (parent4 && parent4.id !== "side-menu") {
                            parent4.classList.add("mm-show");
                            const parent5 = parent4.parentElement;
                            if (parent5 && parent5.id !== "side-menu") {
                                parent5.classList.add("mm-show");
                                const parent6 = parent5.parentElement;
                                if (parent6 && parent6.id !== "side-menu") {
                                    parent6.classList.add("mm-active");
                                    const childanchor = parent6.querySelector(".is-parent");
                                    if (childanchor && parent6.id !== "side-menu") {
                                        childanchor.classList.add("mm-active");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    methods: {
        getCP(code) {
            return TokenService.getCurrentProject(code)
        },
        hasItems(item) {
            return item.subItems !== undefined ? item.subItems.length > 0 : false;
        },
        toggleMenu(event) {
            event.currentTarget.nextElementSibling.classList.toggle("mm-show");
        },
        itemLinkClass(item, additionalClass = '') {
            if (item.linkClass) {
                return `side-nav-link-ref ${item.linkClass} ${additionalClass}`;
            }
            return `side-nav-link-ref ${additionalClass}`;
        },
    }
};
</script>
<template>
    <div id="sidebar-menu">
        <ul id="side-menu" class="metismenu list-unstyled">
            <template v-for="item in menuItems">
                <li class="menu-title" v-if="item.isTitle" :key="item.id">
                    {{ $t(item.label).toUpperCase() }}
                </li>
              <li v-if="!item.isTitle && !item.isLayout" :key="item.id">
                    <a
                            v-if="hasItems(item)"
                            href="javascript:void(0);"
                            class="is-parent"
                            :class="{ 'has-arrow': !item.badge, 'has-dropdown': item.badge }"
                    >
                        <i :class="`bx ${item.icon}`" v-if="item.icon"/>
                        <span data-animation="upscale" class="effect">
              {{ $t(item.label).toUpperCase() }}
            </span>
                        <span :class="`badge bg-${item.badge.variant} float-end`" v-if="item.badge">
              {{ itemBadgeText(item.badge) }}
            </span>
                    </a>
                    <router-link :to="item.link" v-if="!hasItems(item)" :class="itemLinkClass(item)">
                        <i :class="`bx ${item.icon}`" v-if="item.icon"/>
                        <span class="effect">
              {{ $t(item.label).toUpperCase() }}
            </span>
                        <span :class="`badge bg-${item.badge.variant} float-end`" v-if="item.badge">\
              {{ $t(item.badge.text) }}
            </span>
                    </router-link>
                    <multi-ui-item :list="item"></multi-ui-item>
                </li>
            </template>
        </ul>
    </div>
</template>

<style scoped>

.effect {
    position: relative;
    transition: 400ms;
}

.effect:after {
    content: attr(data-hover);
    position: absolute;
    left: 0;
    bottom: 0;
    transform: rotateX(90deg);
    -webkit-transform: rotateX(90deg);
    -moz-transform: rotateX(90deg);
    -o-transform: rotateX(90deg);
    -ms-transform: rotateX(90deg);
    transition: 0.01ms;
    opacity: 0.9;
    color: #2b6c58;
    height: 0;
}

.effect:hover:after {
    transform: rotateX(0deg);
    -webkit-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
    -o-transform: rotateX(0deg);
    -ms-transform: rotateX(0deg);
    top: 0;
    opacity: 1;
    height: 100%;
}

.effect:hover {
    color: white;
    margin-left: 6px;
}

</style>
