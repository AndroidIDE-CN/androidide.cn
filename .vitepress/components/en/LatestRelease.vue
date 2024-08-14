<template>
  <div class="release-container" v-if="release">
    <div class="release-header">
      <h3>{{ release.name || release.tag_name }}</h3>
      <p class="release-date"><strong>Published at:</strong> {{ new Date(release.published_at).toLocaleDateString() }}</p>
    </div>
    <div class="release-body" v-if="release.body" v-html="release.body.replace(/\r?\n/g, '<br>')"></div>
    <div class="release-body" v-else>No release notes available..</div>
    <div class="release-assets">
      <h4>Assets:</h4>
      <ul>
        <li v-for="asset in release.assets" :key="asset.id">
          <a :href="`${asset.browser_download_url}`" target="_blank">{{ asset.name }}</a> ({{ (asset.size / 1024 / 1024).toFixed(2) }} MB)
          <br>
          <a :href="`https://mirror.ghproxy.com/${asset.browser_download_url}`" target="_blank">ghproxy mirror CDN</a>
          <br>
          <a :href="`https://ghproxy.net/${asset.browser_download_url}`" target="_blank">hproxy CDN</a>
          <br>
          <a :href="`https://cors.isteed.cc/${asset.browser_download_url}`" target="_blank">Lufs CDN</a>
        </li>
      </ul>

    </div>
    <mdui-button variant="tonal" :href="release.html_url" target="_blank" full-width>View Release on GitHub</mdui-button>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      release: null
    };
  },
  async mounted() {
    try {
      const response = await axios.get('https://api.github.com/repos/ZeroAicy/AIDE-Plus/releases/latest');
      this.release = response.data;
    } catch (error) {
      console.error('Error fetching the latest release:', error);
    }
  }
};
</script>

<style scoped>
.release-container {
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 16px;
  margin: 20px 0;
  background-color: #fafbfc;
  box-shadow: 0 1px 3px rgba(27, 31, 35, 0.12), 0 1px 2px rgba(27, 31, 35, 0.24);
}

.release-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.release-header h3 {
  margin: 0;
  font-size: 1.5em;
}

.release-date {
  font-size: 0.9em;
  color: #586069;
}

.release-body {
  margin: 16px 0;
  font-size: 1em;
  line-height: 1.5;
}

.release-assets {
  margin: 16px 0;
}

.release-assets ul {
  padding-left: 20px;
}

.release-assets li {
  list-style-type: disc;
  margin: 8px 0;
}

.github-link {
  display: inline-block;
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #0366d6;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.github-link:hover {
  background-color: #005bb5;
}
</style>


