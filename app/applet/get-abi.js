const address = "0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3";
async function run() {
  const res = await fetch(`https://api.basescan.org/api?module=contract&action=getabi&address=${address}`);
  const json = await res.json();
  console.log(json.result);
}
run();
