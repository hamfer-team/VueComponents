<template>
  <span :class="[type.toLocaleLowerCase(), color.toLocaleLowerCase()]">
    {{ value }}
  </span>
</template>

<style lang="css" scoped>
  .normal, .body {
    font-size: 16px;
    font-weight: 400;
  }
  .small, .body-small {
    font-size: 14px;
    font-weight: 400;
  }
  .little, .body-little {
    font-size: 12px;
    font-weight: 400;
  }
  .tiny, .body-tiny {
    font-size: 10px;
    font-weight: 400;
  }
  .medium, .body-medium {
    font-size: 16px;
    font-weight: 500;
  }
  .bold, .body-bold {
    font-size: 16px;
    font-weight: 700;
  }
  .heavy, .body-heavy {
    font-size: 16px;
    font-weight: 900;
  }
  .h1 {
    font-size: 28px;
    font-weight: 700;
  }
  .h2 {
    font-size: 24px;
    font-weight: 700;
  }
  .h3 {
    font-size: 20px;
    font-weight: 700;
  }
  .title {
    font-size: 32px;
    font-weight: 700;
  }
  .subtitle {
    font-size: 24px;
    font-weight: 500;
  }
  .column-item {
    font-size: 16px;
    font-weight: 400;
  }
  .black { color: #000000; }
  .blue-bg { color: #E5EDF3; } 
  .blue-dark { color: #1E77C5 }
  .blue-darker { color: #1A6AAF }
  .gold { color: #FFCC33 }
  .gold-bg { color: #F6F2E6 }
  .gold-dark { color: #E6B82E }
  .gold-darker { color: #CCA329 }
  .gray { color: #888888 }
  .gray-bg { color: #EDEDED }
  .gray-extra-light { color: #EEEEEE }
  .gray-dark { color: #444444 }
  .gray-light { color: #BBBBBB }
  .gray-light-af { color: #F9F9F9 }
  .gray-super-light { color: #DDDDDD }
  .gray-super-dark { color: #222222 }
  .green { color: #1EA13F }
  .green-bg { color: #E4EFE7 }
  .green-dark { color: #1B9139 }
  .green-darker { color: #188133 }
  .hamfer-black { color: #261E1D }
  .hamfer-red { color: #B22222 }
  .orange { color: #FF8D28 }
  .orange-bg { color: #F6EDE5 }
  .orange-dark { color: #E67F24 }
  .orange-darker { color: #CC711F }
  .red { color: #EB292D }
  .red-bg { color: #F5E5E6 }
  .red-dark { color: #D42529 }
  .red-darker { color: #BC2124 }
  .soft-border { color: #E8E8E8 }
  .transparent { color: #00000000 }
  .white { color: #FFFFFF }
  .white-bg { color: #F9FAFB }
</style>

<script lang="ts">
import { STATIC_COLOR } from '../../core/constants/colorConstants';


const validTypes = ["normal", "body", "small", "body-small", "little", "body-little", "tiny", "body-tiny", "medium", "body-medium", "bold", "body-bold", "heavy", "body-heavy", "h1", "h2", "h3", "title", "subtitle", "column-item"];
const validColors = Object.keys(STATIC_COLOR).map((key) => key.replace("_", "-").toLocaleLowerCase());

export default {
  name: "HamferText",
  props: {
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "normal",
      validator: (value: string) => {
        return validTypes.includes(value.toLocaleLowerCase());
      },
    },
    color: {
      type: String,
      default: "black",
      validator: (value: string) => {
        return validColors.includes(value.toLocaleLowerCase());
      },
    },
  },
};
</script>
