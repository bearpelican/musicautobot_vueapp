<template>
  <div class="about">
    <github-ribbon />
    <div class="about-header">
      <h1>MusicAutobot - The Pop Music Generator</h1>
      <span class="about-subtext">Give it a few notes, and it'll autocomplete your song!</span>
    </div>
    <div class="about-content">
      <h2>Instructions</h2>
      <div class="content-body">
        <ol id="instruction-list">
          <li>Search and select a pop song you like. This will give the model a good idea of what style to play in.</li>
          <li>
            Press the <v-btn
              color="red darken-2"
              dark
              small
              fab
            >
              <v-icon>cached</v-icon>
            </v-btn> generate button. This will create a new variation on the song you selected.
          </li>
          <li>
            Press <v-btn
              color="blue darken-2"
              dark
              small
              fab
            >
              <v-icon>play_arrow</v-icon>
            </v-btn> play to hear the output!
          </li>
          <li>Repeat as many times as you want. You'll get a different variation each time.</li>
        </ol>
      </div>

      <h2>Cool Examples</h2>
      <div class="content-body">
        <v-btn-toggle
          v-model="window"
          class="control-group-toggle"
          mandatory
        >
          <v-btn
            v-for="(ptype, index) in predictionTypes"
            :key="ptype.name"
            text
            :value="index"
            color="red"
          >
            {{ ptype.displayName }}
          </v-btn>
        </v-btn-toggle>

        <v-window
          v-model="window"
          class="elevation-1"
        >
          <v-window-item :key="0">
            <v-card flat>
              <v-card-text>
                <div class="title">
                  Start with few notes and continue the idea.
                </div>
                <ul>
                  <li>
                    <router-link to="/predict/e06828d196b2d5182cd459c273d609ac">
                      Cannon in D - Pachelbel
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/predict/3a68d55f76b2900ac1441ca357b057ab">
                      Wake Me Up - Avicii
                    </router-link>
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item :key="1">
            <v-card flat>
              <v-card-text>
                <!-- <h4>Melody from Chords</h4> -->
                <div class="title">
                  Generate a new melody on top of an existing chord progression.
                </div>
                <ul>
                  <li>
                    <router-link to="/predict/551ca93cda1d2bdaa6e4d87888de893f">
                      The Middle - Zedd
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/predict/2674406ddc3eed0adaa47355d92a7e8f">
                      Scary Monsters and Nice Sprites - Skrillex
                    </router-link>
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item :key="2">
            <v-card flat>
              <v-card-text>
                <!-- <h4>Harmonization</h4> -->
                <div class="title">
                  Add chords to your melody
                </div>
                <ul>
                  <li>
                    <router-link to="/predict/2b4f5e6613f366bad7b4f39c61be32b9">
                      Where Is The Love - Black Eyed Peas
                    </router-link>
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item :key="3">
            <v-card flat>
              <v-card-text>
                <!-- <h4>Note Remixing</h4> -->
                <div class="title">
                  Generate a completely new song in the exact same tempo as the original
                </div>
                <ul>
                  <li>
                    <router-link to="/predict/1bbfcb942133414a5664a35a7e7b5612">
                      Levels - Avicii
                    </router-link>
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item :key="4">
            <v-card flat>
              <v-card-text>
                <!-- <h4>Rhythm Remixing</h4> -->
                <div class="title">
                  Same song, but with a remixed rhythm
                </div>
                <ul>
                  <li>
                    <router-link to="/predict/dd79fa52adaaed58a2945c1992ecada6">
                      Fur Elise - Beethoven
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/predict/71d7ff59f67fffa98614c841101e1b6b">
                      Scary Monsters and Nice Sprites - Skrillex
                    </router-link>
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </div>

      <h2>Note Types</h2>
      <div class="content-body">
        Here's what all the colors on the grid mean:
        <ul>
          <li><div class="note seed" /> = Seed notes. The model uses these to predict the next sequence.</li>
          <li><div class="note generated" /> = Generated notes - they get replaced on every new prediction.</li>
          <li><div class="note original" /> = Original notes of the song.</li>
        </ul>
      </div>

      <h2>What is it?</h2>
      <div class="content-body">
        <p>MusicAutobot is a music model trained on a bunch of MIDI music found on the internet.</p>
        <h4>Deep Learning Model</h4>
        Recent advances in deep learning has produced amazing <a href="https://transformer.huggingface.co/">results</a> in generating text.
        <p>We apply those same principles to music generation. Our model is based on several different variations of the transformer (<a href="https://ai.googleblog.com/2019/01/transformer-xl-unleashing-potential-of.html">TransformerXL</a>, <a href="">SequenceToSequence</a>, and <a href="https://ai.googleblog.com/2018/11/open-sourcing-bert-state-of-art-pre.html">BERT</a>)</p>
        <p>This allows us to do really cool things like song generation, harmonization, generating melodies, and remixing existing songs.</p>
        <h4>Data</h4>
        MIDI files gathered from the internet to train the model. Sources include - classical, jazz, pop and edm.
        <br>
        <h4>Blog Series</h4>
        Inner workings are explained in more detail in this 4 part blog post:
        <ul>
          <li><a href="https://medium.com/@andrew.t.shaw/5867511b382a">Part I - Music Models</a></li>
          <li><a href="https://medium.com/@andrew.t.shaw/755c62560ec2">Part II - Deep Dive</a></li>
          <li><a href="https://medium.com/@andrew.t.shaw/3d80bd2ea08e">Part III - Multitask Models</a></li>
          <li><a href="https://medium.com/@andrew.t.shaw/6b920359248c">Part IV - Remixing a Drop</a></li>
        </ul>
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
          <br><div class="note seed" /> notes are used to predict the next sequence.
          <br><div class="note generated" /> notes are overwritten with new predicted notes.
        </div>
        <h4>
          Grid editor
        </h4>
        The grid is a basic MIDI sequencer. Edit the song notes to generate even cooler music!
        <br>
        <ul>
          <li>Add a note by clicking any spot in the grid</li>
          <li>Change the note pitch by draging it up or down</li>
          <li>Change the note length by draging the ends of the note longer or shorter</li>
          <li>Remove a note by collapsing the note ends.</li>
        </ul>
        <h4 id="header-random">
          Creativity
        </h4>
        Alter how wild and creative you want the generated music should be.
        <ul>
          <li>Pitch - amount of random variation in note pitch (C2, D2, E2, ..., F6, G6, A6)</li>
          <li>Rhythm - amount of random variation in note length (sixteenth, quarter, half notes)</li>
        </ul>
        <h4 id="header-playback">
          Playback controls
        </h4>
        <ul>
          <li>Change the BPM to play faster/slower.</li>
          <li>Playback instrument. More coming soon!</li>
        </ul>
      </div>

      <h2>
        What's with the name? <img
          id="icon-autobot"
          src="@/assets/autobot_optimus.png"
        >
      </h2>
      <div class="content-body">
        This project is powerd by a Music Transformer<br>
        Autobots are the coolest of all Transfromers.<br>
        Music Transformer = MusicAutobot<br>
      </div>

      <h2>Source Code</h2>
      <ul class="variation-list">
        <li>
          <a
            href="https://github.com/bearpelican/musicautobot_vueapp"
            target="_blank"
          >Vue App</a>
        </li>
        <li>
          <a
            href="https://github.com/bearpelican/musicautobot"
            target="_blank"
          >Python Model</a>
        </li>
      </ul>

      <h2>Acknowledgements</h2>

      <ul class="variation-list">
        <li>
          <a
            href="https://www.fast.ai/"
            target="_blank"
          >Fast.Ai</a>
        </li>
        <li>
          <a
            href="https://www.hooktheory.com/"
            target="_blank"
          >HookTheory</a>
        </li>
        <li>
          <a
            href="https://www.southparkcommons.com/"
            target="_blank"
          >South Park Commons</a>
        </li>
        <li>
          <a
            href="https://www.palapavc.com/"
            target="_blank"
          >Palapa Ventures</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { PredictionType } from '@/lib/config'
import GithubRibbon from '@/components/GithubRibbon'

export default {
  name: 'About',
  components: {
    GithubRibbon
  },
  data () {
    return {
      predictionTypes: this._.values(PredictionType),
      window: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.title {
  margin-bottom: 10px;
  color: #0000008a;
}

.about-header {
  text-align: center;
  margin-top: 20px;
  .about-subtext {
    font-size: 1.5em;
    color: #444444;
  }
}

.v-window-item {
  min-height: 130px;
}
.v-card__text {
  font-size: 1.2rem;
  line-height: 1.5;
  // letter-spacing: 1em;
}

#instruction-list {
  .v-btn {
    margin: 0px 5px 5px;
    width: 25px;
    height: 25px;
    pointer-events: none;
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
  &.original {
    background: repeating-linear-gradient(
      45deg,
      #56c721,
      #54c021 10px,
      #fffeb0 10px,
      #fffeb0 20px
    );
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
  margin: 20px 0 0 0;
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

#icon-autobot {
  width: 34px;
  height: 34px;
  margin-left: 10px;
}

a {
  color: #42b983 !important;
}

#header-random {
  color: #FF5252;
}

#header-playback {
  color: #2196F3;
}
</style>
