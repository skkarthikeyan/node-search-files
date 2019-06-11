const port = process.env.PORT || 3001;
const http = require('http');
const fs = require('fs');
const url = require('url');
const dir_config = "src"; // example: "src/dir1" 

const getAllFiles = async (dir, word, filelist) => {
    if (dir[dir.length - 1] != '/') dir = dir.concat('/')
    let files = fs.readdirSync(dir);
    filelist = filelist || [];
    await Promise.all(files.map(async (file) => {
        if (fs.statSync(dir + file).isDirectory()) {
            filelist = await getAllFiles(dir + file + '/', word, filelist);
        }
        else {
            let result = await searchWordFromFile(dir + file, word);
            if(result != -1){
            filelist.push(dir + file);
            }
        }
    }));
    return filelist;
};

const searchWordFromFile = (file, word) => {
    let p = new Promise ((resolve, reject)=>{
        fs.readFile(
            file,
            (err, data) => {
                if (err) {
                    console.log(`Error reading file`);
                    reject(err);
                } else {
                    if ((data.toString().toLowerCase()).indexOf(word.toLowerCase()) != -1){
                        resolve(file);
                    }
                    else
                    resolve(-1);
                }
            }
        );
    })
    return p;
}

const searchWord = async (req, res) => {
    try {
        if(req.query != null || req.query != undefined){
            let fileList = await getAllFiles(dir_config, req.query);
            res.write(JSON.stringify(fileList));
            res.end();
        }
        else{
            res.write("Nothing to search");
            res.end();
        }
        
    }
    catch (err) {
        res.end('error: '+ JSON.stringify(err));
    }
}

var server = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    var parts = url.parse(request.url); 
    if (parts.pathname == '/search') {
        searchWord(parts, response);
    }
    else{
        response.write("Invalid Url");
        response.end();
    }

});
server.listen(port, function () {
    console.log(`server start at port ${port}`);
});

module.exports = {getAllFiles: getAllFiles};