
// <input>
//     "https://www.ebrainsoft.com/?id=kmc774&favorite=001&favorite=002"
//
//     <예시>
//         MyRequest reqest = parse(queryString);
//
//         assertEquals( "kmc774",  reqest.getParam("id") );
//         assertEquals( Array.class ,  reqest.getParams("favorite").class );
//         assertEquals( 2 ,  reqest.getParams("favorite").size() );
//         assertEquals( "001" ,  reqest.getParams("favorite")[0] );
//         assertEquals( "002" ,  reqest.getParams("favorite")[1] );

class MyRequest{
    parse(queryString) {this.queryString = queryString.split("?")[1].split("&");}

    getParam(param){

        for(const element of this.queryString){
            var key = element.split("=")[0];
            var value = element.split("=")[1];
            if(key === param){return value;}
        }
    }

    getParams(params){
        var values = new Array();
        for(const element of this.queryString){
            var key = element.split("=")[0];
            var value = element.split("=")[1];
            if(key === params){values.push(value);}
        }
        return values;
    }
}

var input = "https://www.ebrainsoft.com/?id=kmc774&favorite=001&favorite=002";

let request = new MyRequest();

request.parse(input);

console.log(request.getParam("id"));

console.log(typeof request.getParams("favorite"));

console.log(request.getParams("favorite").length);

console.log(request.getParams("favorite")[0]);

console.log(request.getParams("favorite")[1]);