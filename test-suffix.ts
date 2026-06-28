import { stringToHex, concatHex } from 'viem';

const builderCode = "bc_kdf087np";
const encodedApp = stringToHex(builderCode);
const suffix = concatHex(["0x07", encodedApp, "0x0080218021802180218021802180218021"]);
console.log("Calculated:", suffix);
