const fs = require("fs");
const origin = require('./origin.json')

function arr2Obj(arr, lang = 'zh'){
  const res = {}
  return arr.filter(y => y.id).reduce((acc, x) => ({ ...acc, [x.id]: x[lang] || x.id }), {})
}

const zh = arr2Obj(origin, 'zh')
const en = arr2Obj(origin, 'en')
const ja = arr2Obj(origin, 'ja')

fs.writeFile('zh.json', JSON.stringify(zh), ()=>{})
fs.writeFile('en.json', JSON.stringify(en), ()=>{})
fs.writeFile('ja.json', JSON.stringify(ja), ()=>{})