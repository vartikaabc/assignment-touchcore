<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <div>
    <video ref="videoPlayer" controls @timeupdate="updateSubtitle">
      <source :src="videoUrl" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div v-for="subtitle in subtitles" :key="subtitle.timestamp">
      <p>{{ subtitle.text }}</p>
    </div>
  </div>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  data() {
    return {
      videoUrl: '', // Initialize with the video URL you received after uploading
      subtitles: [], // Initialize with the subtitles you received after adding them
    };
  },
  methods: {
    updateSubtitle(event) {
      const videoElement = this.$refs.videoPlayer;
      const currentTime = videoElement.currentTime;
      
      // Find the subtitle that corresponds to the current time
      const currentSubtitle = this.subtitles.find(subtitle => {
        return currentTime >= subtitle.timestamp;
      });
      
      // Display the current subtitle in the console
      if (currentSubtitle) {
        console.log('Current Subtitle:', currentSubtitle.text);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
