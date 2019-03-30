<template>
  <div>
    <div v-if="type === 'payment'" class="timeline-item is-success">
      <div class="timeline-marker is-icon is-success">
        <i class="fa fa-dollar-sign"></i>
      </div>
      <div class="timeline-content">
        <p class="heading">{{date.toDateString()}} : {{account}}</p>
        {{content}}
      </div>
    </div>

    <div v-else-if="type === 'in-person'" class="timeline-item is-primary">
      <div class="timeline-marker is-primary is-icon">
        <i class="fas fa-user-friends"></i>
      </div>
      <div class="timeline-content">
        <p class="heading">{{date.toDateString()}} : {{account}}</p>
        {{content}}
      </div>
    </div>

    <div v-else-if="type === 'email'" class="timeline-item is-dark">
      <div class="timeline-marker is-icon is-dark">
        <i class="fas fa-envelope"></i>
      </div>
      <div class="timeline-content">
        <p class="heading">{{date.toDateString()}} : {{account}}</p>
        {{content}}
      </div>
    </div>

    <div v-else-if="type === 'phone'" class="timeline-item is-link">
      <div class="timeline-marker is-icon is-link">
        <i class="fas fa-phone"></i>
      </div>
      <div class="timeline-content">
        <p class="heading">{{date.toDateString()}} : {{account}}</p>
        {{content}}
      </div>
    </div>
    <div v-else class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <p class="heading">{{date.toDateString()}} : {{account}}</p>
        {{content}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimelineItem",
  props: ["date", "account", "type", "content"]
};
</script>


<style lang="scss" scoped>
</style>
