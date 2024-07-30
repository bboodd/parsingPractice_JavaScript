
// multipart/form-data 파싱 하기
//
// <예시>
// File multipartData = new File("request-dummy.txt");
// MyMultipartRequest myMultipartRequest = parse(multipartData);
//
// assertEquals( "POST",  myMultipartRequest.getMethod() );
// assertEquals( "localhost:8080",  myMultipartRequest.getHeader("Host") );
// assertEquals( "Apache-HttpClient/4.3.4 (java 1.5)",  myMultipartRequest.getHeader("User-Agent") );


class MyMultipartRequest {
    parse(multipartData) {this.multipartData = multipartData;}

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
}

var fs = require('fs');

var multipartData = fs.readFileSync('./request-dummy.txt', 'utf8');

let myMultipartRequest = new MyMultipartRequest();
myMultipartRequest.parse(multipartData);

console.log(myMultipartRequest.getMethod());

console.log(myMultipartRequest.getHeader("Host"));

console.log(myMultipartRequest.getHeader("User-Agent"));