<template>
  <div class="result">
    <!-- App bar with nested container, row and col component
      for layout logo and search bar using flex-->
    <v-app-bar
      app
      color="ipfsPrimary lighten-1"
      height="56"
    >
      <v-container
        fluid
        class="px-0 align-start"
      >
        <v-row>
          <v-col
            cols="12"
            class="px-0 d-flex justify-space-between align-center"
          >
            <div
              class="ml-2"
            >
              <div
                class="d-flex align-center"
                style="cursor: pointer;"
                @click="goHome"
              >
                <v-img
                  v-if="$vuetify.breakpoint.mdAndUp"
                  alt="ipfs-search.com logo"
                  contain
                  src="../assets/logo-white.svg"
                  width="168"
                  height="28"
                  :aspect-ratio="6.00840336"
                />
                <v-img
                  v-if="$vuetify.breakpoint.smAndDown"
                  alt="ipfs-search.com logo"
                  contain
                  src="../assets/logo-hexagon-white.svg"
                  width="28"
                  height="28"
                />
              </div>
            </div>
            <div class="flex-grow-1">
              <SearchBar />
            </div>
            <div
              class="d-none d-lg-block"
              style="min-width: 200px"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <SearchFilters />

    <DocumentList
      :results="results"
    />
    <ImageList
      :results="results"
    />
    <AudioList
      :results="results"
    />
    <VideoList
      :results="results"
    />
    <DirectoryList
      :results="results"
    />

    <!-- PAGINATION -->
    <v-container>
      <template>
        <div class="my-16">
          <v-pagination
            v-model="page"
          />
        </div>
      </template>
    </v-container>
  </div>
</template>

<script>
import SearchMixin from '@/mixins/SearchMixin';
import SearchNavigationMixin from '@/mixins/SearchNavigationMixin';
import SearchBar from '@/components/SearchBar.vue';
import SearchFilters from '@/components/SearchFilters.vue';
import DocumentList from '@/components/results/list/DocumentList.vue';
import ImageList from '@/components/results/list/ImageList.vue';
import AudioList from '@/components/results/list/AudioList.vue';
import VideoList from '@/components/results/list/VideoList.vue';
import DirectoryList from '@/components/results/list/DirectoryList.vue';

export default {
  components: {
    SearchBar,
    SearchFilters,
    DocumentList,
    ImageList,
    AudioList,
    VideoList,
    DirectoryList,
  },

  mixins: [SearchMixin, SearchNavigationMixin],

  data: () => ({
  }),

  methods: {
    goHome() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style lang="scss" scoped>

  h2 {
    font-size: 120%;
    letter-spacing: 0.09em;
    font-weight: 500;
    span {
      font-weight: 500;
    }
  }

  .searchbar {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom:0;
  }

</style>
