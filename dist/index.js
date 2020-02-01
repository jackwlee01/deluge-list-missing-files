"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var glob_1 = __importDefault(require("glob"));
var xml2js_1 = __importDefault(require("xml2js"));
var args = process.argv.slice(2);
console.log(args);
var $path = args[0];
check($path, "/SYNTHS/**/*.XML");
check($path, "/KITS/**/*.XML");
check($path, "/SONGS/**/*.XML");
console.log("DONE");
function parseString(xml) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    xml2js_1.default.parseString(xml, function (err, result) {
                        resolve(result);
                    });
                })];
        });
    });
}
function check(argPath, globPath) {
    return __awaiter(this, void 0, void 0, function () {
        var resolvedPath, xmlFiles, _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (argPath[argPath.length] == "/")
                        argPath = argPath.slice(0, argPath.length - 1);
                    resolvedPath = argPath + globPath;
                    xmlFiles = glob_1.default.sync(resolvedPath);
                    _loop_1 = function () {
                        var filePath, xml, data, e_1, files, missingFiles;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    filePath = xmlFiles[i];
                                    xml = fs_1.default.readFileSync(filePath, 'utf-8');
                                    data = void 0;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, parseString(xml)];
                                case 2:
                                    data = _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_1 = _a.sent();
                                    console.warn("Invalid XML: " + filePath);
                                    return [3 /*break*/, 4];
                                case 4:
                                    if (!data)
                                        return [2 /*return*/, "continue"];
                                    files = [];
                                    // Synth 
                                    try {
                                        data.sound.osc1.forEach(function (osc) { return osc.sampleRanges.forEach(function (sr) { return sr.sampleRange.forEach(function (ssr) { return files.push(ssr.$.fileName); }); }); });
                                    }
                                    catch (e) { }
                                    try {
                                        data.sound.osc2.forEach(function (osc) { return osc.sampleRanges.forEach(function (sr) { return sr.sampleRange.forEach(function (ssr) { return files.push(ssr.$.fileName); }); }); });
                                    }
                                    catch (e) { }
                                    // Kit
                                    try {
                                        data.kit.soundSources.forEach(function (sound) { return sound.sound.forEach(function (sound) { return sound.osc1.forEach(function (osc) { return files.push(osc.$.fileName); }); }); });
                                    }
                                    catch (e) { }
                                    try {
                                        data.kit.soundSources.forEach(function (sound) { return sound.sound.forEach(function (sound) { return sound.osc2.forEach(function (osc) { return files.push(osc.$.fileName); }); }); });
                                    }
                                    catch (e) { }
                                    // Song
                                    try {
                                        data.song.instruments.forEach(function (ins) { return ins.sound.forEach(function (sound) { return sound.osc1.forEach(function (osc) { return files.push(osc.$.fileName); }); }); });
                                    }
                                    catch (e) { }
                                    try {
                                        data.song.instruments.forEach(function (ins) { return ins.sound.forEach(function (sound) { return sound.osc2.forEach(function (osc) { return files.push(osc.$.fileName); }); }); });
                                    }
                                    catch (e) { }
                                    try {
                                        data.song.instruments.forEach(function (ins) { return ins.kit.forEach(function (kit) { return kit.soundSources.forEach(function (ss) { return ss.sound.forEach(function (s) { return s.osc1.forEach(function (osc) { return files.push(osc.$.fileName); }); }); }); }); });
                                    }
                                    catch (e) { }
                                    try {
                                        data.song.instruments.forEach(function (ins) { return ins.kit.forEach(function (kit) { return kit.soundSources.forEach(function (ss) { return ss.sound.forEach(function (s) { return s.osc2.forEach(function (osc) { return files.push(osc.$.fileName); }); }); }); }); });
                                    }
                                    catch (e) { }
                                    try {
                                        data.song.sessionClips.forEach(function (sc) { return sc.audioClip.forEach(function (ac) { return files.push(ac.$.filePath); }); });
                                    }
                                    catch (e) { }
                                    missingFiles = files.filter(function (file) { return file != "" && file != undefined && !fs_1.default.existsSync(file); });
                                    if (missingFiles.length > 0) {
                                        console.log("MISSING FOR " + filePath);
                                        missingFiles.forEach(function (file) { return console.log("    " + file); });
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < xmlFiles.length)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=index.js.map