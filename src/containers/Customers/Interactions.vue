<template>
  <div>
    <div class="box has-background-white-ter">
      <app-interactions-form/>
    </div>

    <section>
      <div class="timeline">
        <header class="timeline-header">
          <span class="tag is-link">Most Recent</span>
        </header>
        <app-timeline-item
          type="payment"
          :date="dates[2]"
          account="Amanda"
          content="Timeline content - Can include any HTML element"
        />
        <app-timeline-item
          type="in-person"
          :date="dates[1]"
          account="Sarah"
          content="Timeline content - Can include any HTML element. Timeline content - Can include any HTML element. Timeline content - Can include any HTML element. Timeline content - Can include any HTML element."
        />
        <header class="timeline-header">
          <span class="tag is-link">2018</span>
        </header>
        <app-timeline-item
          type="email"
          :date="dates[0]"
          account="Liz"
          content="Timeline content - Can include any HTML element. Timeline content - Can include any HTML element."
        />
        <div class="timeline-header">
          <span class="tag is-link">First Contact</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import InteractionsForm from "@/components/Customers/Interactions/InteractionsForm.vue";
import TimelineItem from "@/components/Customers/Interactions/TimelineItem.vue";
export default {
  name: "Interactions",
  data: function() {
    return {
      dates: [new Date("10/20/18"), new Date("12/3/18"), new Date("1/19/19")]
    };
  },
  components: {
    "app-interactions-form": InteractionsForm,
    "app-timeline-item": TimelineItem
  }
};
</script>


<style lang="scss" scoped>
</style>
