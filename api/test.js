//read file in JSON format
var fs=require('fs');
var data = fs.readFileSync('package.json');
var words =JSON.parse(data);
console.log(words);


var user={
    name:"Ahmed",
    degree:41
}

//write fine in JSON format
var convertor=JSON.stringify(user,null,2);
var writer=fs.writeFileSync('words.json',convertor);
