# VueApp for MusicAutobot.com

This is the front-end source code for musicautobot.com.  
It's a full featured MIDI sequencer that serves predictions from our deep learning music model.

![Screenshot](images/musicautobot_screenshot.png)

#### Installation

Install Yarn

```bash
git clone https://github.com/bearpelican/musicautobot_vueapp.git
pushd musicautobot_vueapp
yarn install
popd
```

### Run

```bash
yarn serve
```

To enable predictions, you must have the backend server running on localhost:5000.
See instructions [here](https://github.com/bearpelican/musicautobot#flask-server)

### Acknowledgements

* MIDI sequencer inspired by [shundroid](https://github.com/shundroid/vue-midi-sequencer/)  
* Playback made possible by [tonejs](https://tonejs.github.io)
* Powered by Vue and Vuetify
