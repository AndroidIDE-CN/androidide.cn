<!-- .vitepress/components/ReleasesList.vue -->
<template>
  <div class="releases-container" v-if="releases.length">
    <div v-for="release in releases" :key="release.id" class="release-item">
      <div class="release-header">
        <h3>{{ release.name || release.tag_name }}</h3>
        <p class="release-date"><strong>Published at:</strong> {{ new Date(release.published_at).toLocaleDateString() }}</p>
      </div>
      <div class="release-body" v-if="release.body" v-html="release.body"></div>
      <div class="release-body" v-else>No release notes available.</div>
      <div class="release-assets">
        <h4>Assets:</h4>
        <ul>
          <li v-for="asset in release.assets" :key="asset.id">
            <a :href="asset.browser_download_url" target="_blank">{{ asset.name }}</a> ({{ (asset.size / 1024 / 1024).toFixed(2) }} MB)
          </li>
        </ul>
      </div>
      <a class="github-link" :href="release.html_url" target="_blank">View Release on GitHub</a>
    </div>
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
      releases: []
    };
  },
  async mounted() {
    try {
      const response = await axios.get('https://api.github.com/repos/ZeroAicy/AIDE-Plus/releases');
      this.releases = response.data;
    } catch (error) {
      console.error('Error fetching releases:', error);
    }
  }
};
</script>

<style scoped>
.releases-container {
  margin: 20px 0;
}

.release-item {
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
}

.release-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.release-header h3 {
  margin: 0;
  font-size: 1.5em;
  color: #333;
}

.release-date {
  font-size: 0.9em;
  color: #666;
}

.release-body {
  margin: 16px 0;
  font-size: 1em;
  line-height: 1.6;
  color: #444;
}

.release-assets {
  margin: 16px 0;
}

.release-assets ul {
  padding-left: 20px;
  margin: 0;
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
