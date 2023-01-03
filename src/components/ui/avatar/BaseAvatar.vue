<template>
  <img
    id="avatar"
    alt="Avatar"
    :src="generateAvatar('white', '#009578')"
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
  },
  computed: {
    getText() {
        // eslint-disable-next-line
        // let x = this.username
        // .match(/(^\S|\S$)?/g)
        
      let name =  this.username
        .match(/(\b\S)?/g)
        .join("")
        .match(/(^\S|\S$)?/g)
        .join("")
        .toUpperCase();
        return name
    },
  },
  methods: {
    /**
     *
     * @param {string} text --tên
     * @param {string} foregroundColor --màu chữ
     * @param {*} backgroundColor -- màu background
     */
    generateAvatar(foregroundColor, backgroundColor) {
        this.getText
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = 32;
      canvas.height = 32;

      // Draw background
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw text
      context.font = "bold 16px Roboto";
      context.fillStyle = foregroundColor;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(this.getText, canvas.width / 2, canvas.height / 2);

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
