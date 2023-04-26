<template>
  <b-card-text>
    <div class="d-flex" style="align-items:center;justify-content:space-between">
      <!-- <h5 class="font-size-14">{{$t('ch.group')}}</h5> -->
      <b-button @click="addNewGroup" variant="primary">
        <i class="fa fa-users"></i>
        {{$t('actions.add')}}
      </b-button>
    </div>

    <simplebar style="max-height: 410px" id="group-list" ref="groupRef">
      <ul class="list-unstyled chat-list mt-2">
        <li
          :class="{ active: group && group.id == data.id }"
          v-for="(data, index) in groupList"
          :key="index"
          @click="$emit('groupClick', data)"
        >
          <a href="#">
            <div class="media">
              <div class="align-self-center mr-3"></div>
              <div class="align-self-center mr-3" v-if="data.uploadPath">
                <img :src="`${baseUrl}/${data.uploadPath}`" class="rounded-circle avatar-sm" alt />
              </div>
              <div class="avatar-sm align-self-center mr-3" v-if="!data.uploadPath">
                <span
                  class="avatar-title rounded-circle bg-soft-primary text-white"
                >{{ data.groupName.charAt(0) }}</span>
              </div>
              <div class="media-body overflow-hidden">
                <h5 class="text-truncate font-size-14 mb-1">{{ data.groupName }}</h5>
                <p class="text-truncate mb-0">{{ data.title }}</p>
              </div>
              <div class="font-size-11">{{ data.dateHour}}</div>
              <br />
              <b-badge
                v-if="data.count > 0"
                class="float-right mt-3"
                variant="info"
              >{{ data.count }}</b-badge>
            </div>
          </a>
        </li>
      </ul>
    </simplebar>
    <b-modal
      v-model="groupModal"
      size="md"
      :no-close-on-backdrop="true"
      hide-header
      hide-footer
      body-class="p-0"
    >
      <CreateGroup @cancel="close" />
    </b-modal>
  </b-card-text>
</template>

<script>
import messengerService from "@/shared/services/messengerService";
import simplebar from "simplebar-vue";
import CreateGroup from "./create-group";
export default {
  props: {
    group: {
      type: Object,
      default: () => {},
    },
    username: {
      type: String,
      default: "",
    },
  },
  components: {
    simplebar,
    CreateGroup
  },
  data() {
    return {
      groupList: [],
      groupPage: 0,
      groupModal: false
    };
  },
  computed: {
    baseUrl() {
      return process.env.BASE_URL;
    },
  },
  methods: {
    close(v) {
      if (v == "success") {
        setTimeout(() => {
          this.getClickTab({ page: 0, itemsPerPage: 20 });
        }, 200);
      }
      this.groupModal = false;
    },
    addNewGroup() {
      this.groupModal = true;
    },
    getClickTab(v) {
      this.groupPage = 0;
      this.getGroups(v);
    },
    getGroups(v) {
      messengerService
        .groupChatList(v)
        .then(res => {
          this.$nextTick(() => {
            this.groupList = res.data.list;
          });
        })
        .catch(err => {
          // catchErr(err);
        });
    },
    loadMoreGroups() {
      messengerService
        .groupChatList({ page: (this.groupPage += 1), itemsPerPage: 20 })
        .then(async ({ data }) => {
          if (data.list.length > 0) {
            this.$nextTick(() => {
              this.groupList = this.groupList.concat(data.list);
            });
          } else {
            this.groupPage + -1;
          }
        })
        .catch(err => {
          // catchErr(err);
        });
    }
  },
  mounted() {
    var container = document.querySelector(
      "#group-list .simplebar-content-wrapper"
    );
    if (container) {
      container.scrollTo({ top: 500, behavior: "smooth" });
    }
    //Group list actions
    this.$refs.groupRef.SimpleBar.getScrollElement().addEventListener(
      "scroll",
      e => {
        let { scrollTop, scrollHeight, clientHeight } = event.target;
        const offsetForTrigger = 1;
        if (scrollHeight - clientHeight - offsetForTrigger < scrollTop) {
          this.loadMoreGroups();
        }
      }
    );
  }
};
</script>

<style>
</style>