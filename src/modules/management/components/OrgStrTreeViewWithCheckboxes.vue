<template>
  <li>
    <div
        class="hoverable row"
        :style="bgColor"
    >
      <div
          :class="{bold: isFolder, notBold: !isFolder}"
          class="d-flex align-items-center col-5 cursor-pointer"
          @click="toggle"
      >
        <template v-if="isFolder">
          <i
              v-if="!open"
              class="mdi mdi-office-building building-icon"
          ></i>
          <i
              v-else-if="open"
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
          {{
            departmentForTree ? getName({
              nameRu: departmentForTree.nameRu,
              nameLt: departmentForTree.nameLt,
              nameUz: departmentForTree.nameUz,
            }) : ''
          }}</p>
      </div>

      <!-- ACTIONS -->
      <div class="col-7">
        <table v-if="depth > 0" class="w-100 text-center">
          <tr>
            <td v-for="(permType, index) in allDepPermTypes"
                :key="index"
                :style="`width: ${50 / allDepPermTypes.length}%;`">
              <b-form-checkbox
                  @change="checkboxChanged(permType, $event)"
                  v-if="departmentForTree.departmentPermissionTypeDtos.find(el => el.id === permType.id)"
                  :key="`perm-type-checkbox-${permType.id}-${index}`"
                  v-model="departmentForTree.departmentPermissionTypeDtos.find(el => el.id === permType.id).isChecked"
                  :class="offset"
              />
              <!-- IF THIS PERM_TYPE DOESN'T EXIST IN DEP_PERM_TYPES -->
              <b-form-checkbox
                  v-else
                  :key="`perm-type-checkbox-${permType.id}-${index}`"
                  :class="offset"
              >
              </b-form-checkbox>
            </td>
          </tr>
        </table>
        <table v-else class="w-100 text-center">
          <tbody>
          <tr>
            <td v-for="(permType, index) in allDepPermTypes"
                :key="`dep-perm-type-for-all-${permType.id}-${index}`"
                :style="`width: calc(50% / ${allDepPermTypes.length});`">{{
                  getName({
                    nameLt: permType.nameLt,
                    nameUz: permType.nameUz,
                    nameRu: permType.nameRu,
                  })
            }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <ul
        v-show="open"
        v-if="isFolder"
    >
      <org-str-tree-view-with-checkboxes
          :depth="depth + 1"
          class="item"
          :allDepPermTypes="allDepPermTypes"
          v-for="(childDep, index) in departmentForTree.children ? departmentForTree.children : []"
          :key="`${depth}-${index}-depChild`"
          :department-for-tree="childDep"
      />
    </ul>
  </li>
</template>

<script>
const COLORS = [
  'white',
  'white',
  '#E6F7FF',
  '#F5FFFA',
  'white',
  '#FEFDE6'
];
export default {
  name: "OrgStrTreeViewWithCheckboxes",
  props: {
    depth: {type: Number, default: 0},
    departmentForTree: {
      type: Object,
      default: () => {
      }
    },
    allDepPermTypes: {
      type: Array,
      default: () => []
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
    },
    offset() {
      /* return {
          'padding-left': (this.depth * -10) + 'px'
      }; */
      return 'offset' + (this.depth * 10)
    },
    bgColor() {
      return {'background-color': COLORS[this.depth % COLORS.length]}
    }
  },
  methods: {
    checkboxChanged(permType, $event) {
      if (this.departmentForTree.children && this.departmentForTree.children.length) {
        this.departmentForTree.children.forEach(function f(ch) {
          ch.departmentPermissionTypeDtos.find(el => el.id === permType.id).isChecked = $event
          if (ch.children && ch.children.length) {
            ch.children.forEach(innerCh => {
              f(innerCh)
            })
          }
        })
      }
    },
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
    toggle: function () {
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
  padding-left: 10px !important;
  line-height: 16px;
  list-style-type: none;
}

.all-checkbox {
  label,
  input {
    cursor: pointer;
    font-weight: bold;

    &:before,
    &:after {
      cursor: pointer !important;
    }
  }
}

.hoverable {
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
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
    // padding-left: -1.7em !important;
    .btn {
      line-height: 1;

      &:focus {
        outline: none !important;
        box-shadow: none;
      }
    }

    & > div {
      .offset10 {
        input {
          cursor: pointer;
        }

        label {
          &:after {
            cursor: pointer !important;
          }

          cursor: pointer !important;
        }

        margin-left: -4px !important;

        &:nth-child(2) {
          margin-left: -1px !important;
        }

        &:last-child {
          margin-left: 0px !important;
        }
      }

      .offset20 {
        input {
          cursor: pointer;
        }

        label {
          &:after {
            cursor: pointer !important;
          }

          cursor: pointer !important;
        }

        margin-left: -8px !important;

        &:nth-child(2) {
          margin-left: -3px !important;
        }

        &:last-child {
          margin-left: -1px !important;
        }
      }

      .offset30 {
        input {
          cursor: pointer;
        }

        label {
          &:after {
            cursor: pointer !important;
          }

          cursor: pointer !important;
        }

        margin-left: -14px !important;

        &:nth-child(2) {
          margin-left: -5px !important;
        }

        &:last-child {
          margin-left: -3px !important;
        }
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
  // visibility: hidden;
  @media (max-width: 568px) {
    // display: none !important;
  }
  // display: inline-block;
}

::v-deep li > div {
  &:hover {
    .org-str-actions {
      // display: inline-block !important;
      // visibility: visible !important;
      @media (max-width: 568px) {
        // display: flex !important;
      }
      // margin: 0;
    }
  }
}

/* ::v-deep li div div:first-child,
.add,
.delete,
.edit {
    display: inline-block;
    margin: 6px 0;
    cursor: pointer;
} */

::v-deep li div {
  &:hover {
    p {
      text-decoration: underline;
      cursor: pointer;
    }

    background-color: #f2f2f2 !important;
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