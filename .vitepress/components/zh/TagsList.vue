<template>
  <div>
    <div v-if="tags.length">
      <div v-for="tag in tags" :key="tag.name" class="tag-item">
        <h3>{{ tag.name }}</h3>
        <p v-if="tag.releaseBody">{{ tag.releaseBody }}</p>
        <p v-else>No release notes available.</p>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tags: []
    };
  },
  async mounted() {
    try {
      // Get the tags
      const tagsResponse = await axios.get('https://api.github.com/repos/ZeroAicy/AIDE-Plus/tags');
      const tags = tagsResponse.data;

      // For each tag, fetch the corresponding release information
      const releasePromises = tags.map(async (tag) => {
        try {
          const releaseResponse = await axios.get(`https://api.github.com/repos/ZeroAicy/AIDE-Plus/releases/tags/${tag.name}`);
          tag.releaseBody = releaseResponse.data.body;
        } catch (error) {
          tag.releaseBody = null;
          console.error(`Error fetching release for tag ${tag.name}:`, error);
        }
        return tag;
      });

      this.tags = await Promise.all(releasePromises);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  }
};
</script>

<style scoped>
.tag-item {
  margin-bottom: 1em;
}
</style>
