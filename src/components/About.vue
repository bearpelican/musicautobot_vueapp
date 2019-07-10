<template>
  <div class="about">
    <div class="about-header">
      <h1>{{ msg }}</h1>
      <span class="about-subtext">Using AI to generate pop music. Give it a few notes, and it'll continue the idea!</span>
    </div>
    <div class="about-content">
      <h2>Examples</h2>
      <ul class='variation-list'>
        La Bamba - Richie Valen
        <li><router-link to="/predict/f00bd0f1289b5f5afd74229569fa74ef">Variation 1</router-link></li>
        <li><router-link to="/predict/3e104b9b949ec39a9504b59b19f01a56">Variation 2</router-link></li>
        <li><router-link to="/predict/87007c17f23405e9a094433da09ed8e6">Variation 3</router-link></li>
        <li><router-link to="/song/369a7d99f70ad06d4e916bfa5193a84d">Original</router-link></li>
      </ul>
      <ul class='variation-list'>
        Thousand Miles - Vanessa Carlton
        <li><router-link to="/predict/2761a7d3a888dfe85fc4dfb620a4b895">Variation 1</router-link></li>
        <li><router-link to="/predict/c91a4267e77ba18ba2f4530133b0609f">Variation 2</router-link></li>
        <li><router-link to="/song/c1092b155ff5cb68cd21b6d921d98bbc">Original</router-link></li>
      </ul>
      <ul class='variation-list'>
        Levels - Avicii
        <li><router-link to="/predict/971e9ccd61b95f286684d5316940b423">Variation</router-link></li>
        <li><router-link to="/song/0b940945ef3fa4b568931772712d9079">Original</router-link></li>
      </ul>
      <ul class='variation-list'>
        Power - Kanye
        <li><router-link to="/predict/4498998698b32bb884f4c973c727e4fa">Variation</router-link></li>
        <li><router-link to="/song/908fcf4de48442b59dc6910b96932aa3">Original</router-link></li>
      </ul>
      <ul class='variation-list'>
        Cannon in D - Pachelbel
        <li><router-link to="/predict/e06828d196b2d5182cd459c273d609ac">Variation</router-link></li>
        <li><router-link to="/song/201d91f48dccc9ae55a675cd3d9d5eed">Original</router-link></li>
      </ul>

      <div class='about-instructions'>
        <h2>Instructions</h2>
        <div class="content-body">
        <ol>
          <li>Search and select a pop song you like. This will give the model a good idea of what style to play in.</li>
          <li>Press the <v-btn color="red darken-2" dark small fab><v-icon>cached</v-icon></v-btn> generate button. This will create a new variation on the song you selected.</li>
          <li>Press <v-btn color="blue darken-2" dark small fab><v-icon>play_arrow</v-icon></v-btn> play and hear the output!</li>
          <li>Repeat steps 1 or 2 as many times as you want. You'll get a different variation each time.</li>
        </ol>
        </div>
      </div>

    <h2>Advanced Controls</h2>
      <div class="content-body">
        <h4>Seed length</h4>
            <ul>
              <li>Choose how much of the original song gets sent to the model for prediction</li>
              <li>Longer snippets give the model a better idea of the style to play in. It'll generate something more coherent, but less creative</li>
            </ul>
        <div id="about-seed">
            &larr; Drag the brown dotted vertical line to change the seed length.
            <br>Seed notes are in blue <div class="note seed"></div>. The model uses these to predict the next sequence.
            <br>The red notes <div class="note generated"></div> are the generated notes - they get replaced on every new prediction.
        </div>
        <h4>Grid editor
        </h4>
          The blue grid with notes is actually a basic MIDI sequencer. You can add and remove notes and predict off of that!
          <br><br>
          <ul>
            <li>Add a note by clicking any spot in the grid</li>
            <li>Change the note key by draging it up or down</li>
            <li>Change the note duration by draging the ends of the note longer or shorter</li>
            <li>Remove a note by collapsing the note ends.</li>
          </ul>
        <h4>Prediction Randomness <v-btn color="grey lighten-5" small fab><v-icon>shuffle</v-icon></v-btn></h4>
        Alter how wild you want the generated music should be. These settings in top right of the grid
        <ul>
          <li>Note randomness: amount of variation in note keys</li>
          <li>Tempo randomness: amount of variation in note durations (sixteenth, quarter, half notes)</li>
        </ul>
        <h4>
          File controls<v-btn color="grey lighten-5" small fab><v-icon>folder_open</v-icon></v-btn>
        </h4>
          <ul>
            <li>
              <v-btn fab dark small color="green lighten-1"><v-icon>save</v-icon></v-btn>
              Save and export your creation to MIDI. Open it up in your favorite DAW
            </li>
            <li><v-btn fab dark small color="green lighten-1"><v-icon>cloud_upload</v-icon></v-btn>
              Import an existing song from your computer to play around with
            </li>
            <li>
              <v-btn fab dark small color="green lighten-1"><v-icon>clear</v-icon></v-btn>
              Start from scratch with a <router-link to="/?skip=1">blank grid</router-link>
            </li>
          </ul>
        <h4>Playback controls <v-btn color="grey lighten-5" small fab><v-icon>settings</v-icon></v-btn></h4>
          <ul>
            <li>Change the BPM to play your creation faster/slower.</li>
            <li>Playback instrument - piano or synth. More coming soon!</li>
          </ul>
      </div>
    <h2>How does it work?</h2>
      We've trained a deep learning model on a bunch of MIDI music found on the internet.

      <div class="content-body">
        <h4>Model</h4>
          Recent advances in NLP has produced amazing <a href="https://openai.com/blog/better-language-models/">results</a> in generating text.
          <p>We apply those same principles to music generation. Our model is based on the <a href="https://arxiv.org/abs/1901.02860" target="_blank">Transformer-XL</a> and trained using the <a href="https://www.fast.ai/">fast.ai</a> library</p>
        <h4>Data</h4>
          MIDI files gathered from the internet to train the model. Sources include - classical, jazz, pop and edm.
      </div>
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
    <h2>Source Code</h2>
    <ul class="variation-list">
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

.about-header {
  text-align: center;
  margin: 0 400px;
  .about-subtext {
    font-size: 1.5em;
    color: #444444;
  }
}
.about {
  .v-btn {
    margin: 0px 5px 5px;
    width: 25px;
    height: 25px;
  }
}

#about-seed {
  border-left-width: 6px;
  border-left-style: dotted;
  border-left-color: #4e2319be;
  margin-left: 20px;
  margin: 10px 20px;
  padding-left: 20px;
}

.note {
  width: 40px;
  height: 15px;
  display: inline-block;

  &.seed {
    background-color: #64b5f6;
  }
  &.generated {
    background-color: #FF5252;
  }
}
.about-content {
  text-align: left;
  width: 800px;
  font-size: 1.2em;
  margin: auto;
}
.content-body {
  margin-left: 20px;
  margin-right: 20px;
}

h2 {
  margin: 30px 0 10px 0;
}
h4 {
  margin: 10px 0 0 0;
}
.variation-list {
  list-style-type: none;
  margin: 10px 20px;
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
