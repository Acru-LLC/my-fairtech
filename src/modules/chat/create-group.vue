<template>
  <div class="card m-0 p-3">
    <div class="card-body">
      <div>
        <div>
          <div class="float-left">
            <b-button v-if="isMembers" variant="primary" class="btn-label">
              <i class="bx bx-smile label-icon"></i>
              {{ `${$t("chat.group_members")} (${members.length})` }}
            </b-button>
          </div>
          <div class="float-right">
            <b-button
              v-if="isMembers"
              variant="outline-danger"
              @click="$emit('cancel')"
              >{{ $t("actions.cancel") }}</b-button
            >
            <b-button class="ml-1" variant="primary" v-if="isMembers" @click="save">
              <i class="fa fa-save"></i>
              {{ $t("actions.save") }}
            </b-button>
          </div>
        </div>
        <b-form v-if="!isMembers">
          <b-form-group
            class="mb-4"
            :label="$t('column.name')"
            label-for="horizontal-password-input"
            label-cols-sm="3"
          >
            <b-form-textarea
              :disabled="isMembers"
              v-model="name"
              rows="3"
              max-rows="10"
            ></b-form-textarea>
          </b-form-group>

          <div class="form-group row justify-content-end" v-if="!isMembers">
            <div class="col-sm-9">
              <div>
                <b-button
                  variant="outline-danger"
                  @click="$emit('cancel')"
                  class="mr-2"
                  >{{ $t("actions.cancel") }}</b-button
                >
                <b-button variant="primary" @click="next">
                  {{ $t("actions.next") }}
                  <i class="fa fa-arrow-right"></i>
                </b-button>
              </div>
            </div>
          </div>
        </b-form>
      </div>
    </div>
    <div v-if="isMembers">
      <div class="p-2">
        <div class="search-box">
          <div class="position-relative">
            <input
              type="text"
              class="form-control"
              v-model="searchValue"
              :placeholder="$t('actions.filter')"
            />
            <i class="bx bx-search-alt search-icon"></i>
          </div>
        </div>
      </div>
      <Contacts
        :members="members"
        @contactUsername="pushMember"
        ref="contactComponent"
      />
    </div>
  </div>
</template>

<script>
// import { required } from "vuelidate/lib/validators";
import Contacts from "./contacts";
import messengerService from "@/shared/services/messengerService";
export default {
  watch: {
    searchValue(v) {
      this.$refs.contactComponent.getClickTab({
        page: 0,
        itemsPerPage: 20,
        search: v
      });
    },
  },
  components: {
    Contacts,
  },
  validations: {
    name: {
      // required,
    },
  },
  data() {
    return {
      name: "",
      isMembers: false,
      searchValue: "",
      members: [],
    };
  },
  methods: {
    pushMember(v) {
      let index = this.members.indexOf(v.employeeId);
      if (index > -1) {
        this.members.splice(index, 1);
      } else {
        this.members.unshift(v.employeeId);
      }
    },
    save() {
      messengerService
        .createGroupChat({
          groupName: this.name,
          employeeIds: this.members,
        })
        .then((rs) => {
          this.members = [];
          this.name = "";
          this.searchValue = "";
          this.isMembers = false;
          this.$emit("cancel", "success");
        })
        .catch((e) => {
          // catchErr(e);
        });
    },
    reset() {
      this.name = "";
    },
    next() {
      if (!this.name || this.name.trim().length == 0) {
        return;
      }
      this.isMembers = true;
      setTimeout(() => {
        this.$refs.contactComponent.getClickTab({ page: 0, itemsPerPage: 20 });
      }, 200);
    },
  },
};
</script>

<style>
</style>