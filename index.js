const fs = require('fs')
const glob = require('glob')
const XML = require('xml2js')

var args = process.argv.slice(2);
const $path = args[0];

check($path, `/SYNTHS/**/*.XML`);
check($path, `/KITS/**/*.XML`);
check($path, `/SONGS/**/*.XML`);

console.log("DONE");


async function parseString(xml){
    return new Promise(resolve => {
      XML.parseString(xml, (err, result) => {
            resolve(result);
        })
    })
}


async function check(argPath, globPath){
    if(argPath[argPath.length] == "/") argPath = argPath.slice(0, argPath.length-1)
    const resolvedPath = argPath + globPath;
    const xmlFiles = glob.sync(resolvedPath);

    for(var i = 0; i < xmlFiles.length; i++){
        const filePath = xmlFiles[i]
        
        const xml = fs.readFileSync(filePath, 'utf-8');
        let data;
        try{
            data = await parseString(xml);
        }catch(e){
            console.warn("Invalid XML: " + filePath);
        }

        if(!data) continue;

        const files = [];

        // Synth 
        try{ data.sound.osc1.forEach((osc) => osc.sampleRanges.forEach((sr) => sr.sampleRange.forEach((ssr) => files.push(ssr.$.fileName)))) }catch(e){}
        try{ data.sound.osc2.forEach((osc) => osc.sampleRanges.forEach((sr) => sr.sampleRange.forEach((ssr) => files.push(ssr.$.fileName)))) }catch(e){}
     
        // Kit
        try{ data.kit.soundSources.forEach((sound) => sound.sound.forEach((sound) => sound.osc1.forEach((osc) => files.push(osc.$.fileName)))) }catch(e){}
        try{ data.kit.soundSources.forEach((sound) => sound.sound.forEach((sound) => sound.osc2.forEach((osc) => files.push(osc.$.fileName)))) }catch(e){}

        // Song
        try{ data.song.instruments.forEach((ins) => ins.sound.forEach((sound) => sound.osc1.forEach((osc) => files.push(osc.$.fileName)))) }catch(e){}
        try{ data.song.instruments.forEach((ins) => ins.sound.forEach((sound) => sound.osc2.forEach((osc) => files.push(osc.$.fileName)))) }catch(e){}
        
        try{ data.song.instruments.forEach((ins) => ins.kit.forEach((kit) => kit.soundSources.forEach((ss) => ss.sound.forEach((s) => s.osc1.forEach((osc) => files.push(osc.$.fileName)))))) }catch(e){}
        try{ data.song.instruments.forEach((ins) => ins.kit.forEach((kit) => kit.soundSources.forEach((ss) => ss.sound.forEach((s) => s.osc2.forEach((osc) => files.push(osc.$.fileName)))))) }catch(e){}

        try{ data.song.sessionClips.forEach((sc) => sc.audioClip.forEach((ac) => files.push(ac.$.filePath))) }catch(e){}
        
        const missingFiles = files.filter(file => file != "" && file != undefined && !fs.existsSync(file));
        if(missingFiles.length > 0){
            console.log("MISSING FOR " + filePath);
            missingFiles.forEach(file => console.log("    " + file));
        }
    }
}

