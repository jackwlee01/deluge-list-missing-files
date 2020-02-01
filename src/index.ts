import fs from 'fs'
import glob from 'glob'
import XML from 'xml2js'

var args = process.argv.slice(2);
console.log(args)
const $path = args[0];

check($path, `/SYNTHS/**/*.XML`);
check($path, `/KITS/**/*.XML`);
check($path, `/SONGS/**/*.XML`);

console.log("DONE");


async function parseString(xml:string):Promise<any>{
    return new Promise(resolve => {
      XML.parseString(xml, (err, result) => {
            resolve(result);
        })
    })
}


async function check(argPath:string, globPath:string){
    if(argPath[argPath.length] == "/") argPath = argPath.slice(0, argPath.length-1)
    const resolvedPath = argPath + globPath;
    const xmlFiles = glob.sync(resolvedPath);

    for(var i = 0; i < xmlFiles.length; i++){
        const filePath = xmlFiles[i]
        
        const xml = fs.readFileSync(filePath, 'utf-8');
        let data:any;
        try{
            data = await parseString(xml);
        }catch(e){
            console.warn("Invalid XML: " + filePath);
        }

        if(!data) continue;

        const files:string[] = [];

        // Synth 
        try{ data.sound.osc1.forEach((osc:any) => osc.sampleRanges.forEach((sr:any) => sr.sampleRange.forEach((ssr:any) => files.push(ssr.$.fileName)))) }catch(e){}
        try{ data.sound.osc2.forEach((osc:any) => osc.sampleRanges.forEach((sr:any) => sr.sampleRange.forEach((ssr:any) => files.push(ssr.$.fileName)))) }catch(e){}
     
        // Kit
        try{ data.kit.soundSources.forEach((sound:any) => sound.sound.forEach((sound:any) => sound.osc1.forEach((osc:any) => files.push(osc.$.fileName)))) }catch(e){}
        try{ data.kit.soundSources.forEach((sound:any) => sound.sound.forEach((sound:any) => sound.osc2.forEach((osc:any) => files.push(osc.$.fileName)))) }catch(e){}

        // Song
        try{ data.song.instruments.forEach((ins:any) => ins.sound.forEach((sound:any) => sound.osc1.forEach((osc:any) => files.push(osc.$.fileName)))) }catch(e){}
        try{ data.song.instruments.forEach((ins:any) => ins.sound.forEach((sound:any) => sound.osc2.forEach((osc:any) => files.push(osc.$.fileName)))) }catch(e){}
        
        try{ data.song.instruments.forEach((ins:any) => ins.kit.forEach((kit:any) => kit.soundSources.forEach((ss:any) => ss.sound.forEach((s:any) => s.osc1.forEach((osc:any) => files.push(osc.$.fileName)))))) }catch(e){}
        try{ data.song.instruments.forEach((ins:any) => ins.kit.forEach((kit:any) => kit.soundSources.forEach((ss:any) => ss.sound.forEach((s:any) => s.osc2.forEach((osc:any) => files.push(osc.$.fileName)))))) }catch(e){}

        try{ data.song.sessionClips.forEach((sc:any) => sc.audioClip.forEach((ac:any) => files.push(ac.$.filePath))) }catch(e){}
        
        const missingFiles = files.filter(file => file != "" && file != undefined && !fs.existsSync(file));
        if(missingFiles.length > 0){
            console.log("MISSING FOR " + filePath);
            missingFiles.forEach(file => console.log("    " + file));
        }
    }
}

