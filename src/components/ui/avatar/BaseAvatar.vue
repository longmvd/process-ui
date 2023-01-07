<template>
  <img
    id="avatar"
    alt="Avatar"
    :class="imageClass"
    :src="generateAvatar('white')"
  />
</template>

<script>
export default {
  name: "BaseAvatar",
  props: {
    // tên người dùng
    username:{
      type: String,
      default: " "
    },
    width: String,
    height: String,
    imageClass: String,
  },
  data(){
    return {
      backgroundColors: [
        '#F44336', '#FF4081', '#9C27B0', '#673AB7',
        '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688',
        '#4CAF50', '#8BC34A', '#CDDC39',  '#FFEB3B' , '#FFC107',
        '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'],
      imgError: false
    }
  },
  computed: {
    getText() {
        // eslint-disable-next-line
        // let x = this.username
        // .match(/(^\S|\S$)?/g)
        
      let name =  this.username.toUpperCase().split(' ')
        return `${name[0][0]}${name[name.length-1][0]}`
    },
  },
  methods: {
    /**
     *
     * @param {string} text --tên
     * @param {string} foregroundColor --màu chữ
     * @param {*} backgroundColor -- màu background
     */
    generateAvatar(foregroundColor) {
      let initials = this.getText

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = 32;
      canvas.height = 32;
      var charIndex = initials.charCodeAt(1) - 65,
    colorIndex = charIndex % 19;
      // Draw background
      context.fillStyle = this.backgroundColors[colorIndex];
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw text
      context.font = "bold 16px Roboto";
      context.fillStyle = foregroundColor;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(this.getText, canvas.width / 2, canvas.height / 1.8);

      return canvas.toDataURL("image/png");
    },

    
  },
};
</script>

<style>
#avatar {
  border-radius: 50%;
}
</style>
