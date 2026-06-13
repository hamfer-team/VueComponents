<template>
  <img alt="description ?? value" src="source" />
</template>

<script lang="ts">

  class ValueSource {
    value: string;
    source: string;
    constructor(value: string, source: string){
      this.value = value;
      this.source = source;
    }
  }

  export default {
    name: "HamferIcon",
    props: {
      value: {
        type: String,
        required: true,
      },
      valueSources: {
        type: Array<ValueSource>,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
    },
    setup(props) {
      const source = props.valueSources.find(w => w.value.toLocaleLowerCase() === props.value.toLocaleLowerCase());
      return {
        source,
      };
    },
  };
</script>
