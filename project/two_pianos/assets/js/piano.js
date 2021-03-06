export class Piano{

    constructor(piano_num, audio_dir_path="piano_notes/"){

        this.piano_num     = piano_num
        this.min_ring_time = 275
        this.notes         = {}

        this.keycodes = {
    
            // Octave 1
            '90': 'c-1-1',  // z
            '83': 'cs-1-1', // s
            '88': 'd-1-1',  // x
            '68': 'ds-1-1', // d
            '67': 'e-1-1',  // c
            '86': 'f-1-1',  // v
            '71': 'fs-1-1', // g
            '66': 'g-1-1',  // b
            '72': 'gs-1-1', // h
            '78': 'a-1-1',  // n
            '74': 'as-1-1', // j
            '77': 'b-1-1',  // m
    
            // Octave 2
            '87': 'c-2-1',  // w 
            '51': 'cs-2-1', // 3
            '69': 'd-2-1',  // e 
            '52': 'ds-2-1', // 4
            '82': 'e-2-1',  // r
            '84': 'f-2-1',  // t
            '54': 'fs-2-1', // 6
            '89': 'g-2-1',  // y
            '55': 'gs-2-1', // 7
            '85': 'a-2-1',  // u
            '56': 'as-2-1', // 8
            '73': 'b-2-1',  // i
    
            // High C
            '79': 'c-3-1'   // o
    
        }

        this.populate_html()
        this.fill_notes(audio_dir_path)
        this.init_keys()

    }

    // HELPERS
    populate_html(){

        let whites = ['c', 'd', 'e', 'f', 'g', 'a', 'b']
        let blacks = ['cs', 'ds', 'fs', 'gs', 'as']

        let piano_html = ''

        for(let octave = 1; octave <= 2; octave++) {

            for(let key in whites) piano_html += `<div id="${whites[key]}-${octave}-${this.piano_num}" class="white-key"></div>`
            for(let key in blacks) piano_html += `<div id="${blacks[key]}-${octave}-${this.piano_num}" class="black-key"></div>`

        }

        piano_html += `<div id="c-3-${this.piano_num}" class="white-key"></div>`

        document.getElementById(`piano-container-${this.piano_num}`).innerHTML = piano_html

    }

    fill_notes(path){

        let that = this

        // Build note objects
        let note_letters = ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs', 'a', 'as', 'b']

        for(let octave = 1; octave <= 2; octave++) {

            for(let i in note_letters) {

                let full_note_name = `${note_letters[i]}-${octave}-${this.piano_num}`
                this.notes[full_note_name] = this.build_note(path, note_letters[i], octave, full_note_name)

            }

        }

        let full_note_name = `c-3-${this.piano_num}` 
        this.notes[full_note_name] = this.build_note(path, 'c', 3, full_note_name)

    }

    build_note(path, note_letter, octave, full_note_name) {

        let note = {}
        
        note.audio      = new Audio()
        note.audio.src  = `${path}${note_letter}-${octave}.mp3`
        note.pressed    = false
        note.last_press = null
        note.div        = document.getElementById(full_note_name)

        let that = this
        if(this.piano_num == 1){
            note.div.addEventListener("mousedown", function(){that.press(full_note_name)}, false)
            note.div.addEventListener("mouseup", function(){that.release(full_note_name)}, false)
        }

        return note
    }

    init_keys() {

        if(this.piano_num != 1) return

        let input = document.getElementsByTagName("Input")[0]
    
        let that = this

        document.onkeydown = function(e) {
            e = e || window.event
    
            if (!e.repeat && e.keyCode in that.keycodes && !(input === document.activeElement)){
                that.press(that.keycodes[e.keyCode])
            }
        }
    
        document.onkeyup = function(e) {
            e = e || window.event
    
            if (e.keyCode in that.keycodes && !(input === document.activeElement)){
                that.release(that.keycodes[e.keyCode])
            }
        }
    
    }

    // API
    press(note){

        this.notes[note].pressed    = true
        this.notes[note].last_press = new Date().getTime()

        if(this.notes[note].div.className == 'white-key') this.notes[note].div.style.background = "lightgrey";
        else this.notes[note].div.style.background = "darkgrey";   

        this.notes[note].audio.pause()
        this.notes[note].audio.currentTime = 0
        this.notes[note].audio.play()
    }

    release(note){

        this.notes[note].pressed = false

        if(this.notes[note].div.className == 'white-key') this.notes[note].div.style.background = "white";
        else this.notes[note].div.style.background = "black";     

        let time_to_wait = this.min_ring_time - this.notes[note].audio.currentTime * 1000
    
        let that = this
        setTimeout(function(){
            that.stop(note)
        }, Math.max(time_to_wait, 0))

    }

    stop(note){

        let time_since_last = new Date().getTime() - this.notes[note].last_press

        if(!this.notes[note].pressed && (time_since_last >= this.min_ring_time)) {
            this.notes[note].audio.pause()
            this.notes[note].audio.currentTime = 0
        }

    }

    static get_keycodes(){

        return {
    
            // Octave 1
            '90': 'c-1',  // z
            '83': 'cs-1', // s
            '88': 'd-1',  // x
            '68': 'ds-1', // d
            '67': 'e-1',  // c
            '86': 'f-1',  // v
            '71': 'fs-1', // g
            '66': 'g-1',  // b
            '72': 'gs-1', // h
            '78': 'a-1',  // n
            '74': 'as-1', // j
            '77': 'b-1',  // m
    
            // Octave 2
            '87': 'c-2',  // w 
            '51': 'cs-2', // 3
            '69': 'd-2',  // e 
            '52': 'ds-2', // 4
            '82': 'e-2',  // r
            '84': 'f-2',  // t
            '54': 'fs-2', // 6
            '89': 'g-2',  // y
            '55': 'gs-2', // 7
            '85': 'a-2',  // u
            '56': 'as-2', // 8
            '73': 'b-2',  // i
    
            // High C
            '79': 'c-3'   // o
    
        }
    }

}