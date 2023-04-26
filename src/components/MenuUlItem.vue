<template>
  <ul v-if="hasItems(list)" class="sub-menu mm-collapse" aria-expanded="false">
    <template v-for="(item, index) of list.subItems">
      <li class="menu-title" v-if="item.isTitle" :key="item.id">
        {{ $t(item.label).toUpperCase() }}
      </li>
      <li v-if="!item.isTitle && !item.isLayout" :key="index">
        <template v-if="hasItems(item)">
          <a class="side-nav-link-a-ref has-arrow" href="javascript:void(0);">
            <i :class="`bx ${item.icon}`" v-if="item.icon"/>
            <span class="effect">
              {{ $t(item.label) }}
            </span>
            <span :class="`badge bg-${item.badge.variant} float-right`" v-if="item.badge">
              {{ itemBadgeTextCall(item.badge) }}
            </span>
          </a>
          <multi-ui-item :list="item"></multi-ui-item>
        </template>
        <router-link :to="item.link" v-else :class="itemLinkClass(item)">
          <i :class="`bx ${item.icon}`" v-if="item.icon"/>
          <span class="effect">
            {{ $t(item.label) }}
          </span>
          <span v-if="item.badge" :class="`badge bg-${item.badge.variant} float-right`">
            <component
                v-if="item.badge.component"
                :params="item.badge.params"
                :is="typeof item.badge.component === 'function' ? item.badge.component() : item.badge.component"
            />
            <template v-else>
              {{ item.badge.text }}
            </template>
          </span>
        </router-link>
      </li>
    </template>
  </ul>
</template>

<script>

export default {
  name: 'MultiUiItem',
  props: {
    list: {
      required: true,
    },
  },
  methods: {
    hasItems(item) {
      return item.subItems !== undefined ? item.subItems.length > 0 : false;
    },
    itemLinkClass(item, additionalClass = '') {
      if (item.linkClass) {
        return `w-100 side-nav-link-ref ${item.linkClass} ${additionalClass}`;
      }
      return `w-100 side-nav-link-ref ${additionalClass}`;
    },
  },
  computed: {},
}
</script>