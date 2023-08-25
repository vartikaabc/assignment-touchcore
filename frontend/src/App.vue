<template>
  <div>
    <input type="file" @change="handleFileChange" accept="video/*">
    <video ref="videoPlayer" controls>
      <source :src="videoUrl" type="video/mp4">
    </video>
    <textarea v-model="subtitleText" placeholder="Add subtitles"></textarea>
    <button @click="addSubtitle">Add Subtitle</button>
    <div v-for="subtitle in subtitles" :key="subtitle.timestamp">
      <p>{{ subtitle.text }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      videoUrl: '',
      subtitleText: '',
      subtitles: [],
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      this.videoUrl = URL.createObjectURL(file);
    },
    async addSubtitle() {
      const timestamp = this.$refs.videoPlayer.currentTime;
      this.subtitles.push({ timestamp, text: this.subtitleText });
      this.subtitleText = '';

      // Send subtitle to the back-end
      await axios.post('/api/subtitles', {
        timestamp,
        text: this.subtitleText,
      });
    },
  },
};
</script>
