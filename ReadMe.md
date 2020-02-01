Only tested on Mac OS. 

## Overview

This program will look at all XML files for kits, synths, and songs and identifiy which files are missing. See below for an example log output.

## Usage

1. Install Node.js'
2. cd to this folder
3. npm install
4. Run the following command, substituting the name of your SD Card:
```
node index.js '/Volumes/NAME_OF_SD_CARD/'
```


## Example Log Output

```
MISSING FOR /Volumes/NO NAME/SONGS/SONG511.XML
    SAMPLES/REPHAZER/RUST/Rwave29.wav
    SAMPLES/DRUMS/Kick/909 Kick.wav
    SAMPLES/DRUMS/Snare/909 Snare.wav
    SAMPLES/DRUMS/HatC/909 Closed hihat.wav
    SAMPLES/DRUMS/HatO/909 Open hihat.wav
    SAMPLES/DRUMS/Ride/909 Ride.wav
    SAMPLES/DRUMS/Crash/909 Crash.wav
    SAMPLES/DRUMS/Clap/909 Clap.wav
    SAMPLES/DRUMS/Rim/909 Rim.wav
    SAMPLES/DRUMS/TomL/909 Tom low.wav
    SAMPLES/DRUMS/TomM/909 Tom medium.wav
    SAMPLES/DRUMS/TomH/909 Tom high.wav
    SAMPLES/CLIPS/REC00043.WAV
MISSING FOR /Volumes/NO NAME/SYNTHS/X02.XML
    SAMPLES/GAME/sonic/angel/04/sonic3_angel_4-C1-127-OOGA.aif
    SAMPLES/GAME/sonic/angel/04/sonic3_angel_4-E1-127-5W0W.aif
    SAMPLES/GAME/sonic/angel/04/sonic3_angel_4-G#1-127-G1JZ.aif
    SAMPLES/GAME/sonic/angel/04/sonic3_angel_4-C2-127-GT2X.aif
    SAMPLES/GAME/sonic/angel/04/sonic3_angel_4-E2-127-FLOI.aif
    SAMPLES/GAME/sonic/angel/04/sonic3_angel_4-G#2-127-PQRH.aif
    SAMPLES/GAME/sonic/angel/04/sonic3_angel_4-C3-127-K9L7.aif
    SAMPLES/GAME/sonic/angel/04/sonic3_angel_4-E3-127-0W8N.aif
    SAMPLES/GAME/sonic/angel/04/sonic3_angel_4-G#3-127-N33E.aif
    SAMPLES/GAME/sonic/angel/04/sonic3_angel_4-C4-127-EU1K.aif
    SAMPLES/GAME/sonic/angel/04/sonic3_angel_4-E4-127-LBRU.aif
    SAMPLES/GAME/sonic/angel/04/sonic3_angel_4-G#4-127-DOB2.aif
    SAMPLES/GAME/sonic/angel/04/sonic3_angel_4-C5-127-0IWU.aif
    SAMPLES/GAME/sonic/angel/04/sonic3_angel_4-E5-127-M1MM.aif
    SAMPLES/GAME/sonic/angel/04/sonic3_angel_4-G#5-127-7E3Y.aif
    SAMPLES/GAME/sonic/angel/04/sonic3_angel_4-B5-127-7PWP.aif
    ```