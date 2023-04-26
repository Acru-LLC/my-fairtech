<template>
  <b-card-text>
    <div>
      <!-- <h5 class="font-size-14 mb-3">{{$t('ch.chat')}}</h5> -->

      <simplebar style="max-height: 410px" id="chat-list" ref="chatRef">
        <ul class="list-unstyled chat-list">
          <li
            v-for="data in chats"
            :key="data.id"
            :class="{ active: ch && ch.id == data.id }"
            @click="$emit('chatClick', data)"
          >
            <a href="javascript: void(0);">
              <div class="media">
                <div class="align-self-center mr-3"></div>
                <div class="align-self-center mr-3" v-if="data.uploadPath">
                  <img
                    :src="`${publicPath}${data.uploadPath}`"
                    class="rounded-circle avatar-sm"
                    alt
                  />
                </div>
                <div
                  class="avatar-md align-self-center mr-3"
                  v-if="!data.uploadPath"
                >
                  <span
                    class=" avatar-title rounded-circle bg-soft-primary text-white "
                    >{{ data.myName.charAt(0) }}</span
                  >
                </div>
                <div class="media-body overflow-hidden">
                  <h5 class="text-truncate font-size-14 mb-1">
                    {{ data.myName }}
                  </h5>
                  <p class="text-truncate mb-0">{{ data.title }}</p>
                </div>
                <div class="font-size-11">{{ data.dateHour }}</div>
                <br />
                <b-badge
                  v-if="data.count > 0"
                  class="float-right mt-3"
                  variant="info"
                  >+{{ data.count }}</b-badge
                >
              </div>
            </a>
          </li>
        </ul>
      </simplebar>
    </div>
  </b-card-text>
</template>

<script>
import messengerService from "@/shared/services/messengerService";
import simplebar from "simplebar-vue";
import { mapState } from "vuex";

export default {
  watch: {
    unreadData: {
      handler(v) {
        let index = this.chats.findIndex((e) => e.id == v.chatId);
        if (index > -1) {
          this.$set(this.chats[index], "count", v.count);
          this.$set(this.chats[index], "title", v.title);
        }
      },
    },
  },
  props: {
    ch: {
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
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      chats: [],
      chatPage: 0,
    };
  },
  computed: {
    ...mapState("messenger", ["unreadData"]),
  },
  methods: {
    getClickTab(v) {
      this.chatPage = 0;
      this.getChatList(v);
    },
    loadMoreChat() {
      messengerService
        .getChatList({ page: (this.chatPage += 1), itemsPerPage: 20 })
        .then(async ({ data }) => {
          if (data.list.length > 0) {
            this.$nextTick(() => {
              this.chats = this.chats.concat(data.list);
            });
          } else {
            this.chatPage + -1;
          }
        });
    },
    getChatList(v) {
      messengerService.getChatList(v).then((res) => {
        this.$nextTick(() => {
          this.chats = res.data.list;
        });
      });
    },
  },
  async created() {
    await this.getChatList({ page: 0, itemsPerPage: 20, search: "" });
  },
  mounted() {
    var container1 = document.querySelector(
      "#chat-list .simplebar-content-wrapper"
    );
    if (container1) {
      container1.scrollTo({ top: 500, behavior: "smooth" });
    }

    //Chat list actions
    this.$refs.chatRef.SimpleBar.getScrollElement().addEventListener(
      "scroll",
      (e) => {
        let { scrollTop, scrollHeight, clientHeight } = event.target;
        const offsetForTrigger = 1;
        if (scrollHeight - clientHeight - offsetForTrigger < scrollTop) {
          this.loadMoreChat();
        }
      }
    );
  },
};
</script>

<style>
</style>