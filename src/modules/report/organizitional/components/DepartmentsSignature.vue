<template>
  <div>
    <div class="card mb-0">
      <div class="card-body">
        <div class="button-items d-flex" style="justify-content: space-between">
          <b-button variant="primary" class="btn-label">
            <i class="bx bx-smile label-icon"></i>
            {{ `(${members.length})` }}
          </b-button>
          <span>
            <b-button variant="outline-danger" @click="$emit('cancel')">
              <i class="fa fa-times"></i>
              {{ $t("actions.close") }}</b-button
            >
            <b-button v-if="!async" variant="success" @click="save">
              <i class="fa fa-save"></i>
              {{ $t("actions.save") }}
            </b-button>
          </span>
        </div>
      </div>
      <div>
        <div class="p-4">
<!--          <div class="search-box mb-2">-->
<!--            <div class="position-relative">-->
<!--              <input-->
<!--                type="text"-->
<!--                class="form-control"-->
<!--                v-model="searchValue"-->
<!--                :placeholder="$t('actions.filter')"-->
<!--              />-->
<!--              <i class="bx bx-search-alt search-icon"></i>-->
<!--            </div>-->
<!--          </div>-->

          <simplebar
            :key="cmpKey + 'ADS'"
            data-simplebar-auto-hide="false"
            :style="`height:${heightWindow - 165}px`"
            id="contact-list"
            ref="contactsRef"
          >

            <ul id="il" class="list-unstyled chat-list">
              <org-str-tree-view
                  :departmentForTree="{children: contactList}"
                  :members="[objectMembers.id]"
                  class="item"
                  @toggleActiveClass="pushMember"
              >
              </org-str-tree-view>
            </ul>
          </simplebar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from "../../reportService";
import simplebar from "simplebar-vue";
import OrgStrTreeView from "../../templates/components/OrgStrTreeView";
export default {
  props: {
    notIn: {
      type: Boolean,
      default: false,
    },
    async: {
      type: Boolean,
      default: false,
    },
    selectedTrItem: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    simplebar,
    OrgStrTreeView,
  },
  data() {
    return {
      heightWindow: window.innerHeight,
      // getName: getName,
      contactList: [],
      contactPage: 0,
      members: [],
      objectMembers: {},
      groupModal: false,
      searchValue: "",
      cmpKey: 0,
    };
  },
  methods: {
    reset() {
      this.cmpKey += 1;
      setTimeout(() => {
        this.scrollActive();
      }, 200);
    },
    scrollActive() {
      if (this.$refs.contactsRef.SimpleBar) {
        this.$refs.contactsRef.SimpleBar.getScrollElement().addEventListener(
          "scroll",
          (e) => {
            let { scrollTop, scrollHeight, clientHeight } = event.target;
            const offsetForTrigger = 1;
            if (scrollHeight - clientHeight - offsetForTrigger < scrollTop) {
              this.loadMoreContact();
            }
          }
        );
      }
    },
    save() {
      this.$emit("save", this.members);
      this.members = [];
      this.$set(this, 'objectMembers', {});
      setTimeout(() => {
        this.getContacts({ page: 0, limit: 20 });
      }, 300);
    },
    pushMember(data) {
      if (data.id === this.objectMembers.id) {
        this.$set(this, 'objectMembers', {});
      } else {
        this.$set(this, 'objectMembers', data);
      }
    },
    check(v) {
      if (this.objectMembers.id === v) {
        return ["font-weight-bold", "text-primary"];
      } else {
        return false;
      }
    },
    getContacts(v) {
      Service.listDepartmentForDocument(this.selectedTrItem.id).then((res) => {
        this.$nextTick(() => {
          this.contactList = res.data;
        });
      });
    },
    loadMoreContact() {
      Service.listDepartmentForDocument(this.selectedTrItem.id).then(async ({ data }) => {
        if (data.length > 0) {
          // this.$nextTick(() => {
            // this.contactList = this.contactList
          // });
        } else {
          this.contactPage = this.contactPage - 1;
        }
      });
    },
  },
  mounted() {
    var container3 = document.querySelector(
      "#contact-list .simplebar-content-wrapper"
    );
    if (container3) {
      container3.scrollTo({ top: 500, behavior: "smooth" });
    }

    // Contact list actions

    this.scrollActive();
  },
  async created() {
    await this.getContacts({ page: 0, limit: 20 });
  },
  watch: {
    searchValue: {
      async handler() {
        await this.getContacts({ page: 0, limit: 20 });
      },
    },
    objectMembers: {
      async handler(v) {
        if (this.async) {
          this.$emit("asyncValue", v);
        }
      },
    },
  },
};
</script>

<style>
</style>