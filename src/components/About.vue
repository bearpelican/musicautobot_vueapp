<template>
  <div class="about">
    <h1>{{ msg }}</h1>
    <p>
      This project uses AI to generate pop music. Give it a few notes, and it'll continue the idea!
    </p>

    <h2>Generated Examples</h2>
    <p>
      Variations on <router-link to="/song/369a7d99f70ad06d4e916bfa5193a84d">La Bamba</router-link>
        - <router-link to="/predict/f00bd0f1289b5f5afd74229569fa74ef">1</router-link>,
        <router-link to="/predict/3e104b9b949ec39a9504b59b19f01a56">2</router-link>, <router-link to="/predict/87007c17f23405e9a094433da09ed8e6">3</router-link>
      Variations on <router-link to="/song/c1092b155ff5cb68cd21b6d921d98bbc">Thousand Miles</router-link>
        - <router-link to="/predict/2761a7d3a888dfe85fc4dfb620a4b895">1</router-link>, <router-link to="/predict/c91a4267e77ba18ba2f4530133b0609f">2</router-link>
      Variations on <router-link to="/song/908fcf4de48442b59dc6910b96932aa3">Power</router-link>
        - <router-link to="/predict/4498998698b32bb884f4c973c727e4fa">1</router-link>
      Variations on <router-link to="/song/201d91f48dccc9ae55a675cd3d9d5eed">Cannon in D</router-link>
        - <router-link to="/predict/e06828d196b2d5182cd459c273d609ac">1</router-link>
      Variations on <router-link to="/song/0b940945ef3fa4b568931772712d9079">Levels</router-link>
        - <router-link to="/predict/971e9ccd61b95f286684d5316940b423">1</router-link>
    </p>

    <h2>Instructions</h2>
    <ol>
      <li>1. Search and select a pop song you like. This will give the model a good idea of what style to play in.</li>
      <li>2. Press the generate button. This will create a new variation on the song you selected.</li>
      <li>3. Press play and hear the output!</li>
      <li>4. Repeat step 2 (or 1) as many times as you want.</li>
      <li>You should get a slightly different variation each time. Happy generating!</li>
    </ol>

    <h2>Advanced</h2>
      <h4>Prediction controls:</h4>
        1. Choose a longer/shorter seed - Drag the brown dotted vertical line (behind the red generate button) to change the seed length.
          You'll see notes change from blue to red. The blue notes are what we send to the model to start predicting. The red notes are not sent and get replaced by the new variation.
          Longer seed lengths give the model a better idea of the style to play in, however, it becomes less creative.
        2. Choose randomness - You can alter how conservative you want the predictions should be. In the shuffle settings on the top right, you'll see "Note" and "Tempo" sliders.
          You'll see notes with more keys with high note randomness. You'll see notes with different durations (whole, half, quarter, etc.) with high tempo randomness.
      <h4>Sequence controls:</h4>
        1. The blue grid with notes is actually a basic MIDI sequencer. You can add and remove notes and predict off of that!
          Editing notes:
            1. Add a note by clicking any spot in the grid
            2. Change the note key by draging it up or down
            3. Change the note duration by draging the ends of the note longer or shorter
            4. Remove a note by setting the duration to 0. Drag the note end to the beginning.
      <h4>File controls:</h4>
        Blank canvas:
          1. If you don't want to choose a seed song, start with a blank canvas <router-link to="/?skip=1">here</router-link>
        Saving
          1. If you like your new creation, you can save your song in midi format
        Load MIDI
          You can also load midi from your computer and generate predictions from there.
      <h4>Playback controls:</h4>
        Change the BPM to play your creation faster/slower.
        Instrument: can choose the type of sound to play back - piano, alien synth. More coming soon!
    <p>

      We've trained a deep learning model on a bunch of music taken from the internet.

      Data:
        We use MIDI files gathered from the internet to train the model. Sources include - classical, jazz, pop and edm.

      AI:
        Recent advances in NLP has produced amazing <a href="https://openai.com/blog/better-language-models/">results</a> in generating text.
        We apply those same principles to music generation. Our model is based on <a href="https://arxiv.org/abs/1901.02860" target="_blank">Transformer-XL</a>.
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
    <!-- <h3>Data Sources</h3>
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
    </ul> -->
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
