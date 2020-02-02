const fs = require('fs')
const glob = require('glob')
const XML = require('xml2js')


const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



function prompt(){
    rl.question("Enter location of SD card: ", function(name) {
        performCheck();
        async function performCheck(){
            if(name.toUpperCase() == "Q" || name.toUpperCase() == "QUIT" || name.toUpperCase() == "EXIT"){
                rl.close();
                process.exit(0);
                return;
            }

            //if(name == "") name = '/VOLUMES/NO NAME/';
            if(name[name.length-1] != "/") name = name + "/"

            if(fs.existsSync(name) == false){
                console.log("SD Card not found: " + name);
                console.log("Try again?");
                prompt();
                return;
            }

            console.log('Checking...');
            console.log('');
            console.log('');
            await check(name, `SYNTHS/**/*.XML`);
            await check(name, `KITS/**/*.XML`);
            await check(name, `SONGS/**/*.XML`);

            console.log('');
            console.log('');
            console.log("DONE");
            
            rl.question("Press ENTER to check again, or 'Q' to quit: ", function(s){
                if(s.toUpperCase() == "Q" || s.toUpperCase() == "QUIT" || s.toUpperCase() == "EXIT"){
                    rl.close();
                    process.exit(0);
                    return;
                }else{
                    performCheck();
                }
            })
            
        }

    });
}


prompt();



async function parseString(xml){
    return new Promise(resolve => {
      XML.parseString(xml, (err, result) => {
            resolve(result);
        })
    })
}


async function check(argPath, globPath){
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
        
        const missingFiles = files.filter(file => file != "" && file != undefined && !fs.existsSync(argPath + file));
        
        if(missingFiles.length > 0){
            console.log("MISSING: " + filePath);
            missingFiles.forEach(file => console.log("    - " + file));
        }
    }
}

