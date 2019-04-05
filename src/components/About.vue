<template>
  <div class="about">
    <h1>{{ msg }}</h1>
    <p>
      This project uses recent advances in text generation
      <a href="https://arxiv.org/abs/1901.02860" target="_blank">source code</a> to generate pop music from midi files.
    </p>
    <!-- <ol>
      <li>Search for a song on our archives to seed the model</li>
      <li>Edit the sequence if you'd like</li>
      <li>Predict!</li>
    </ol> -->
    <!-- <h3>Example output</h3>
    <ul>
      <li><a href="https://github.com/bearpelican/vue_midi_generator" target="_blank">Web App</a></li>
      <li><a href="https://github.com/bearpelican/midi_generator" target="_blank">Training</a></li>
    </ul> -->
    <h3>Source Code</h3>
    <ul>
      <li><a href="https://github.com/bearpelican/vue_midi_generator" target="_blank">Web App</a></li>
      <li><a href="https://github.com/bearpelican/midi_generator" target="_blank">Training</a></li>
    </ul>
    <h3>Data Sources</h3>
    <ul>
      <li><a href="https://www.hooktheory.com/" target="_blank">Hook Theory</a></li>
      <li><a href="http://www.piano-e-competition.com/" target="_blank">Yamaha Piano E-Comp</a></li>
      <li><a href="https://musescore.org/en" target="_blank">Musescore</a></li>
      <li><a href="https://www.reddit.com/r/datasets/comments/3akhxy/the_largest_midi_collection_on_the_internet/" target="_blank">Midi Man</a></li>
      <li><a href="https://freemidi.org/genre-dance-eletric" target="_blank">Free Midi</a></li>
    </ul>
    <h3>Acknowledgements</h3>
    <ul>
      <li><a href="https://github.com/shundroid/vue-midi-sequencer/" target="_blank">shundroid</a></li>
      <li><a href="https://github.com/wayne391/Lead-Sheet-Dataset" target="_blank">wayne391</a></li>
      <li><a href="https://www.fast.ai/" target="_blank">Fast.Ai</a></li>
      <li><a href="https://github.com/huggingface/" target="_blank">Hugging Face</a></li>
    </ul>
    <h3>Sponsors =)</h3>
    <ul>
      <li><a href="https://www.jurassictechnologies.com/" target="_blank">Jurassic Tech</a></li>
      <li><a href="https://www.southparkcommons.com/" target="_blank">South Park Commons</a></li>
      <li><a href="https://www.palapavc.com/" target="_blank">Palapa Ventures</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'About',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  li {
    display: inline-block;
    margin: 0 10px;
  }
}

a {
  color: #42b983;
}
</style>
