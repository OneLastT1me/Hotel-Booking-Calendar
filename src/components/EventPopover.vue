<template>
  <div v-if="selectedEvent" class="popover" :style="{ top: positionTop + 'px', left: positionLeft + 'px' }">
    <div>
    <h3>{{ selectedEvent.nameClient }}</h3>
    <p>Phone: {{ selectedEvent.phone }}</p>
    <p>email: {{ selectedEvent.email }}</p>
    <h4>{{ selectedEvent.roomDetails.name }}</h4>
    <p>adults: {{ selectedEvent.guestInfo.adults }}</p>
    <p>children: {{ selectedEvent.guestInfo.children }}</p>
    <button @click="closePopover" class="butttonClose">Close</button>
  </div>
  
</div>
</template>

<script>
export default {
  props: {
    selectedEvent: {
      type: Object,
      required: true,
    },
    onClose: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      positionTop: 0,
      positionLeft: 0,
    };
  },
  mounted() {
    this.updatePosition();
    window.addEventListener('resize', this.updatePosition);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updatePosition);
  },
  methods: {
    updatePosition() {
      const popover = this.$el;
      const rect = popover.getBoundingClientRect();
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      this.positionTop = centerY - rect.height / 2;
      this.positionLeft = centerX - rect.width / 2;
    },
    closePopover() {
      this.onClose();
    },
  },
};
</script>

<style scoped>
.popover {
  position: fixed;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 25px;
}
.butttonClose{
  border-radius: 10px;
  background-color: #000000;
  color: aliceblue;
}
</style>
