//Đọc và ghi file JSON
const fs = require('fs/promises');

async function readJsonFile() {
    try {
        const fileContent = await fs.readFile('./data.json', 'utf8');
        const data = JSON.parse(fileContent);
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error reading or parsing JSON file:', error);
    }
    // Cách khác
    // fs.readFile('./data.json', 'utf8').then((data)=>{
    // }).catch((e) => {
    // })
}
// readJsonFile();


function writeFile(data, path = 'data.json') {
    const jsonData = JSON.stringify(data);
    fs.writeFile(path, jsonData, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('Data successfully written to data.json');
    });
};

module.exports = {
    readJsonFile,
    writeFile
}