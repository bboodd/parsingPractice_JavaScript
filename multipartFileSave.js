
// 멀티파트 파일 읽어서 파일로 저장
// <예시>
// MultipartFile firstFile = myMultipartRequest.getMultipartFile("text1");
// firstFile.store("c:/output/first.txt);
//
// MultipartFile secondFile = myMultipartRequest.getMultipartFile("text2");
// secondFile.store("c:/output/second.txt);

var fs = require('fs');

class MultipartFile {

    constructor(fileContent) {
        this.fileContent = fileContent;
    }

    store(fileName){
        fs.writeFileSync(fileName, this.fileContent);

    }
}

class MyMultipartRequest {

    parse(multipartData) {
        this.multipartData = multipartData;
    }

    getMethod() {
        var method = this.multipartData.split('\n')[0].split(' ')[0];
        return method;
    }

    getHeader(headerName) {

        for(const headerData of this.multipartData.split('\n')){
            var header = headerData.split(': ')[0];
            var content = headerData.split(': ')[1];
            if(headerName === header) {return content; }
        }
    }

    getMultipartFile(findName, boundary){

        for(let i=2;i<this.multipartData.split(boundary).length;i++){
            var body = multipartData.split(boundary)[i].split('\n');
            var contentDisposition = body[1].split(': ')[1];
            var name = contentDisposition.split('; ')[1].split('=')[1];

            if(findName === name) {
                return new MultipartFile(body.at(-2));
            }
        }
    }
}

var multipartData = fs.readFileSync('./request-dummy.txt', 'utf8');

let myMultipartRequest = new MyMultipartRequest();
myMultipartRequest.parse(multipartData);

var boundary = myMultipartRequest.getHeader("Content-Type").split('boundary=')[1];

// console.log(myMultipartRequest.getMultipartFile("text1", boundary));

firstFile = myMultipartRequest.getMultipartFile("text1", boundary);
firstFile.store("first.txt");

secondFile = myMultipartRequest.getMultipartFile("text2", boundary);
secondFile.store("second.txt");