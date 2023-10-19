import { readFile } from 'fs/promises';

const dataJSON = JSON.parse(await readFile(new URL('./db.json', import.meta.url)));

const transformedData = {
  code: dataJSON.code,
  msg: dataJSON.msg,
  data: {}
};

dataJSON.data.forEach(item => {
  const [category, action] = item.name.split('.');

  if (!transformedData.data[category]) {
    transformedData.data[category] = [];
  }

  transformedData.data[category].push({
    id: item.id,
    name: action,
    html_id: item.name
  });
});

const newJsonString = JSON.stringify(transformedData, null, 2);
console.log(newJsonString);