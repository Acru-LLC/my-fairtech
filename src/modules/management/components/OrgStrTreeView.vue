<template>
  <li>
    <div class="hoverable">
      <div
          :class="{bold: isFolder, notBold: !isFolder}"
          class="d-flex align-items-center"
      >
        <template v-if="isFolder">
          <i
              v-if="!open"
              :id="`dep-toggle-icon-id-${departmentForTree.id}`"
              @click="toggle(departmentForTree)"
              class="mdi mdi-office-building building-icon"
          ></i>
          <i
              v-else-if="open"
              @click="toggle(departmentForTree)"
              class="mdi mdi-domain building-icon"
          ></i>
        </template>
        <template v-else>
          <i class="mdi mdi-office-building-outline building-icon"></i>
        </template>
        <p
            class="dep-name"
            :ref="`depRef-${departmentForTree.id}`"
            :id="`depId-${departmentForTree.id}`"
            @click="$emit('toggleActiveClass', departmentForTree)"
        >
          {{ departmentForTree ?  getName({
          nameRu: departmentForTree.nameRu,
          nameLt: departmentForTree.nameLt,
          nameUz: departmentForTree.nameUz,
        }) : '' }}</p>
      </div>

      <!-- ACTIONS -->
      <div
          class="org-str-actions"
          v-if="!withoutActions"
      >
        <b-btn
            v-if="!withoutAddAction"
            variant="link"
            class="text-decoration-none p-0"
            @click="$emit('addClicked', departmentForTree)"
        >
          <i class="mdi mdi-plus-circle add"></i>
        </b-btn>

        <b-btn
            v-if="!withoutEditAction"
            variant="link"
            class="text-decoration-none p-0"
            @click="$emit('editClicked', departmentForTree)"
        >
          <i class="mdi mdi-circle-edit-outline edit"></i>
        </b-btn>

        <b-btn
            v-if="!withoutDeleteAction"
            variant="link"
            class="text-decoration-none p-0"
            @click="$emit('deleteClicked', departmentForTree)"
        >
          <i class="mdi mdi-trash-can delete text-danger"></i>
        </b-btn>
      </div>
    </div>

    <ul
        v-show="open"
        v-if="isFolder"
    >
      <org-str-tree-view
          @addClicked="emitAddClicked"
          @editClicked="emitEditClicked"
          @deleteClicked="emitDeleteClicked"
          @toggleActiveClass="emitToggleActiveClass"
          :without-actions="withoutActions"
          :without-add-action="withoutAddAction"
          :without-edit-action="withoutEditAction"
          :without-delete-action="withoutDeleteAction"
          class="item"
          v-for="(childDep, index) in departmentForTree.children ? departmentForTree.children : []"
          :key="index + 'depChild'"
          :department-for-tree="childDep"
      >
      </org-str-tree-view>
    </ul>
  </li>
</template>

<script>
export default {
  name: "OrgStrTreeView",
  props: {
    departmentForTree: {
      type: Object,
      default: () => {
      }
    },
    withoutActions: {
      type: Boolean,
      default: false
    },
    withoutAddAction: {
      type: Boolean,
      default: false
    },
    withoutEditAction: {
      type: Boolean,
      default: false
    },
    withoutDeleteAction: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      open: false,
      hoverState: false
    }
  },
  computed: {
    isFolder: function () {
      return this.departmentForTree ? (this.departmentForTree.children &&
          this.departmentForTree.children.length) : ([] && 0)
    }
  },
  methods: {
    emitAddClicked(currentDepartment) {
      this.$emit('addClicked', currentDepartment)
    },
    emitEditClicked(currentDepartment) {
      this.$emit('editClicked', currentDepartment)
    },
    emitDeleteClicked(currentDepartment) {
      this.$emit('deleteClicked', currentDepartment)
    },
    emitToggleActiveClass(id) {
      this.$emit('toggleActiveClass', id)
    },
    toggle: function (departmentForTree) {
      if (this.isFolder) {
        this.open = !this.open
      }
    }
  },
  created() {
    if (!this.departmentForTree.parentId) {
      this.open = true
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep ul {
  padding-left: 1.7em !important;
  line-height: 1.5em;
  list-style-type: none;
}

.hoverable {
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 568px) {
    flex-wrap: wrap;
    .org-str-actions {
      width: 100%;
      flex-shrink: 0;
      justify-content: flex-end;
    }
  }

  .org-str-actions {
    display: flex;
    min-width: 20%;
    align-items: center;

    .btn {
      line-height: 1;

      &:focus {
        outline: none !important;
        box-shadow: none;
      }
    }

    i {
      font-size: 1.3rem;
    }
  }
}

.dep-name {
  display: inline-block;
  margin: 0;
}

::v-deep .org-str-actions {
  visibility: hidden;
  @media (max-width: 568px) {
    display: none !important;
  }
  // display: inline-block;
}

::v-deep li > div {
  &:hover {
    .org-str-actions {
      // display: inline-block !important;
      visibility: visible !important;
      @media (max-width: 568px) {
        display: flex !important;
      }
      // margin: 0;
    }
  }
}

::v-deep li div div:first-child,
.add,
.delete,
.edit {
  display: inline-block;
  margin: 6px 0;
  cursor: pointer;
}

::v-deep li div {
  &:hover {
    p {
      text-decoration: underline;
    }
  }
}

::v-deep li .active {
  font-weight: bold;
}

.mdi {
  margin-right: 0.8em;
}

.building-icon {
  color: #2b6c58;
  font-size: 1.5rem;
  cursor: pointer;

  .mdi-office-building-outline {
    font-size: 1.4rem;
  }
}
</style>