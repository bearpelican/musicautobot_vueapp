// function renderSequencer (midiFile) {

function enableGUI (flag) {
  var elements = document.querySelectorAll('input, select')
  var maxi = elements.length

  for (var i = 0; i < maxi; i++) {
    var element = elements[i]
    element.disabled = !flag
  }
}

function renderSequencerGUI (sequencer, song) {
  // var sequencer = window.sequencer
  // var console = window.console
  // var alert = window.alert
  var requestAnimationFrame = window.requestAnimationFrame

  var btnPlay = document.getElementById('play')
  var btnStop = document.getElementById('stop')
  var btnPrev = document.getElementById('prev')
  var btnNext = document.getElementById('next')
  var btnLast = document.getElementById('last')
  var btnFirst = document.getElementById('first')

  var sliderScale = document.getElementById('scale-slider')
  var labelSliderScale = document.getElementById('scale-label')

  // var divControls = document.getElementById('controls')
  var divBarsBeats = document.getElementById('time-bars-beats')
  var divSeconds = document.getElementById('time-seconds')
  var divMouseX = document.getElementById('mouse-x')
  var divMouseY = document.getElementById('mouse-y')
  var divPageNumbers = document.getElementById('page-numbers')

  var divEditor = document.getElementById('editor')
  var divScore = document.getElementById('score')
  var divBarLines = document.getElementById('bar-lines')
  var divBeatLines = document.getElementById('beat-lines')
  var divSixteenthLines = document.getElementById('sixteenth-lines')
  var divPitchLines = document.getElementById('pitch-lines')
  var divNotes = document.getElementById('notes')
  var divPlayhead = document.getElementById('playhead')

  var allNotes // stores references to all midi notes
  var allNoteDivs // stores references to all divs that represent a midi note

  var keyEditor
  // var song

  function render () {
    var snapshot = keyEditor.getSnapshot('key-editor')
    var divNote

    divPlayhead.style.left = keyEditor.getPlayheadX() - 10 + 'px'
    divPageNumbers.innerHTML = 'page ' + keyEditor.currentPage + ' of ' + keyEditor.numPages

    divBarsBeats.innerHTML = song.barsAsString
    divSeconds.innerHTML = song.timeAsString

    snapshot.notes.removed.forEach(function (note) {
      allNoteDivs[note.id].removeEventListener('mousedown', noteMouseDown)
      divNotes.removeChild(document.getElementById(note.id))
    })

    snapshot.notes.new.forEach(function (note) {
      drawNote(note)
    })

    snapshot.notes.recorded.forEach(function (note) {
      drawNote(note)
    })

    snapshot.notes.recording.forEach(function (note) {
      updateElement(allNoteDivs[note.id], note.bbox)
    })

    // events.changed, notes.changed, parts.changed contain elements that have been moved or transposed
    snapshot.notes.changed.forEach(function (note) {
      updateElement(allNoteDivs[note.id], note.bbox, 0)
    })

    // stateChanged arrays contain elements that have become active or inactive
    snapshot.notes.stateChanged.forEach(function (note) {
      divNote = document.getElementById(note.id)
      if (note.part.mute === false) {
        if (note.active) {
          divNote.className = 'note note-active'
        } else if (note.active === false) {
          divNote.className = 'note'
        }
      }
    })

    if (snapshot.hasNewBars) {
      // set the new width of the score
      divScore.style.width = snapshot.newWidth + 'px'

      // clear the horizontal lines because the lines have to be drawn longer
      divPitchLines.innerHTML = ''

      // reset the index of the iterator because we're starting from 0 again
      keyEditor.horizontalLine.reset()
      while (keyEditor.horizontalLine.hasNext('chromatic')) {
        drawHorizontalLine(keyEditor.horizontalLine.next('chromatic'))
      }

      // the index of the vertical line iterator has already been set to the right index by the key editor
      // so only the extra barlines will be drawn
      while (keyEditor.verticalLine.hasNext('sixteenth')) {
        drawVerticalLine(keyEditor.verticalLine.next('sixteenth'))
      }
    }

    requestAnimationFrame(render)
  }

  // function resize () {
  //   var c = divControls.getBoundingClientRect().height
  //   var w = window.innerWidth
  //   var h = window.innerHeight - c

  //   // tell the key editor that the viewport has canged, necessary for auto scroll during playback
  //   keyEditor.setViewport(w, h)
  //   divEditor.style.width = w + 'px'
  //   divEditor.style.height = h + 'px'
  // }

  function draw () {
    allNotes = {}
    allNoteDivs = {}

    divNotes.innerHTML = ''
    divPitchLines.innerHTML = ''
    divBarLines.innerHTML = ''
    divBeatLines.innerHTML = ''
    divSixteenthLines.innerHTML = ''

    keyEditor.horizontalLine.reset()
    keyEditor.verticalLine.reset()
    keyEditor.noteIterator.reset()

    divScore.style.width = keyEditor.width + 'px'

    while (keyEditor.horizontalLine.hasNext('chromatic')) {
      drawHorizontalLine(keyEditor.horizontalLine.next('chromatic'))
    }

    while (keyEditor.verticalLine.hasNext('sixteenth')) {
      drawVerticalLine(keyEditor.verticalLine.next('sixteenth'))
    }

    while (keyEditor.noteIterator.hasNext()) {
      drawNote(keyEditor.noteIterator.next())
    }
  }

  function drawHorizontalLine (data) {
    var divLine = document.createElement('div')
    var pitchHeight = keyEditor.pitchHeight

    if (data.note.blackKey === true) {
      divLine.className = 'pitch-line black-key'
    } else {
      divLine.className = 'pitch-line'
    }
    divLine.id = data.note.fullName
    divLine.style.height = pitchHeight + 'px'
    divLine.style.top = data.y + 'px'
    divLine.y = data.y
    divPitchLines.appendChild(divLine)
  }

  function drawVerticalLine (data) {
    var type = data.type
    var divLine = document.createElement('div')

    divLine.id = data.position.barsAsString
    divLine.className = data.type + '-line'
    divLine.style.left = data.x + 'px'
    divLine.style.width = '5px' // if you make the with too small, the background image of sometimes disappears
    divLine.x = data.x

    switch (type) {
      case 'bar':
        divBarLines.appendChild(divLine)
        break
      case 'beat':
        divBeatLines.appendChild(divLine)
        break
      case 'sixteenth':
        divSixteenthLines.appendChild(divLine)
        break
    }
  }

  function drawNote (note) {
    var bbox = note.bbox
    var divNote = document.createElement('div')

    divNote.id = note.id
    divNote.className = 'note'
    // divNote.style.backgroundColor = 'rgb(' + 0 + ',' + 127 + ',' + (note.velocity * 2) + ')';
    updateElement(divNote, bbox, 0)

    // store note and div
    allNotes[note.id] = note
    allNoteDivs[note.id] = divNote
    divNote.addEventListener('mousedown', noteMouseDown, false)
    divNotes.appendChild(divNote)
  }

  function updateElement (element, bbox) {
    element.style.left = bbox.x + 'px'
    element.style.top = bbox.y + 'px'
    element.style.width = bbox.width + 'px'
    element.style.height = bbox.height + 'px'
  }

  function noteMouseDown (e) {
    var note = allNotes[e.target.id]
    if (e.ctrlKey) {
      keyEditor.removeNote(note)
    } else {
      keyEditor.startMoveNote(note, e.pageX, e.pageY)
      document.addEventListener('mouseup', noteMouseUp, false)
    }
  }

  function noteMouseUp () {
    keyEditor.stopMoveNote()
    document.removeEventListener('mouseup', noteMouseUp)
  }

  function init () {
    // var c = divControls.getBoundingClientRect().height
    var w = window.innerWidth - 200
    // var h = window.innerHeight - c
    var h = window.innerHeight - 200

    divEditor.style.width = w + 'px'
    divEditor.style.height = h + 'px'

    // song = sequencer.createSong(sequencer.getMidiFile('minute_waltz'))

    song.tracks.forEach(function (track) {
      track.setInstrument('piano')
      track.monitor = true
      track.setMidiInput('all')
    })

    song.addEventListener('play', function () {
      btnPlay.value = 'pause'
    })

    song.addEventListener('pause', function () {
      btnPlay.value = 'play'
    })

    song.addEventListener('stop', function () {
      btnPlay.value = 'play'
    })

    keyEditor = sequencer.createKeyEditor(song, {
      keyListener: true,
      viewportHeight: h,
      viewportWidth: w,
      lowestNote: 36,
      highestNote: 88,
      // lowestNote: 21,
      // highestNote: 108,
      barsPerPage: 16
    })

    // (AS) reset divEditor width to fit keyEditor
    divEditor.style.width = keyEditor.width + 'px'
    divEditor.style.height = h + 'px'

    sliderScale.min = 1// minimal 1 bar per page
    sliderScale.max = 64// maximal 64 bars per page
    sliderScale.value = 16// currently set to 16 bars per page
    sliderScale.step = 1

    // listen for scale and draw events, a scale event is fired when you change the number of bars per page
    // a draw event is fired when you change the size of the viewport by resizing the browser window
    keyEditor.addEventListener('scale draw', function () {
      draw()
    })

    // listen for scroll events, the score automatically follows the song positon during playback: as soon as
    // the playhead moves off the right side of the screen, a scroll event is fired
    keyEditor.addEventListener('scroll', function (data) {
      divEditor.scrollLeft = data.x
    })

    // you can set the playhead at any position by clicking on the score
    divScore.addEventListener('mousedown', function (e) {
      var className = e.target.className
      if (className.indexOf('part') !== -1 || className.indexOf('note') !== -1) {
        return
      }
      keyEditor.setPlayheadToX(e.pageX)
      // you could also use:
      // song.setPlayhead('ticks', keyEditor.xToTicks(e.pageX));
    })

    // if you scroll the score by hand you must inform the key editor. necessary for calculating
    // the song position by x coordinate and the pitch by y coordinate
    divEditor.addEventListener('scroll', function () {
      keyEditor.updateScroll(divEditor.scrollLeft, divEditor.scrollTop)
    }, false)

    divScore.addEventListener('mousemove', function (e) {
      e.preventDefault()
      var x = e.pageX - divEditor.offsetLeft
      var y = e.pageY - divEditor.offsetTop
      var pos = keyEditor.getPositionAt(x)
      var part = keyEditor.selectedPart
      var note = keyEditor.selectedNote

      // show the song position and pitch of the current mouse position; handy for debugging
      divMouseX.innerHTML = 'x ' + pos.barsAsString
      divMouseY.innerHTML = 'y ' + keyEditor.getPitchAt(y).number

      // move part or note if selected
      if (part !== undefined) {
        keyEditor.movePart(x, y)
      }
      if (note !== undefined) {
        keyEditor.moveNote(x, y)
      }
    }, false)

    btnPlay.addEventListener('click', function () {
      song.pause()
    })

    btnStop.addEventListener('click', function () {
      song.stop()
    })

    btnNext.addEventListener('click', function () {
      keyEditor.scroll('>')
    })

    btnPrev.addEventListener('click', function () {
      keyEditor.scroll('<')
    })

    btnFirst.addEventListener('click', function () {
      keyEditor.scroll('<<')
    })

    btnLast.addEventListener('click', function () {
      keyEditor.scroll('>>')
    })

    sliderScale.addEventListener('change', function (e) {
      var bpp = parseFloat(e.target.value)
      labelSliderScale.innerHTML = '#bars ' + bpp
      keyEditor.setBarsPerPage(bpp)
    }, false)

    // window.addEventListener('resize', resize, false) // disabling resize for now since we have a bunch of components
    enableGUI(true)

    draw()
    render()
  }
  // sequencer.addMidiFile({url: '../static/minute_waltz.mid'})
  // sequencer.addMidiFile({ url: midiFile })
  return init
}

// Load sequencer and asset pack only once. Otherwise there will be midi playback distortion
function loadSequencer (init) {
  var sequencer = window.sequencer
  if (sequencer == null) {
    require('../public/js/heartbeat')
    window.sequencer.addAssetPack({ url: '../static/asset_pack_piano_predict.json' }, init)
  } else {
    init()
  }
}

function loadMidiFile (midiFile, name) {
  loadSequencer(() => {
    var sequencer = window.sequencer
    enableGUI(false)
    // sequencer.removeAssetPack('../static/asset_pack_piano_predict.json')
    sequencer.addMidiFile({ url: midiFile, name: name }, () => {
      var song = sequencer.createSong(sequencer.getMidiFile(name))
      var it = renderSequencerGUI(sequencer, song)
      it()
      // sequencer.addAssetPack({ url: '../static/asset_pack_piano_predict.json' }, it)
    })
  })
}

function loadArrayBuffer (arraybuffer) {
  var sequencer = window.sequencer
  enableGUI(false)
  // sequencer.removeAssetPack('../static/asset_pack_piano_predict.json')
  sequencer.createMidiFile({ arraybuffer: arraybuffer }).then(
    function onFulfilled (midifile) {
      var song = sequencer.createSong(midifile, 'arraybuffer')
      var it = renderSequencerGUI(sequencer, song)
      sequencer.addAssetPack({ url: '../static/asset_pack_piano_predict.json' }, it)
    },
    function onRejected (e) {
      console.log('Failed to create midi file', e)
    })
}

export { loadMidiFile, loadArrayBuffer, renderSequencerGUI }
// export default renderSequencer
