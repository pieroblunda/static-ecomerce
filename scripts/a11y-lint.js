// https://a11yproject.com/checklist/
const recursiveFiles = require('recursive-files');
const fs = require('fs');
const colors = require('colors');

var config = {
  langFlagOnHTMLTag: false,
  altOnImgTag: true
};

// Main file must have the lang attr
const langFlagOnHTMLTag = function(){
  console.log('Running langFlagOnHTMLTag: Main file must have the lang attr');
  
  let re = /^html\([\s\S]*lang="[a-zA-Z]{2}"[\s\S]*?\)$/gm;
  let contents = fs.readFileSync('src/index.pug', 'utf8');
  if(contents.match(re)){
    console.log(colors.green('✔ langFlagOnHTMLTag'));
  }else{
    console.log(colors.red('✗ langFlagOnHTMLTag'));
  }
}

const altOnImgTag = function(){
  console.log('Running altOnImgTag: ALT attr must be present');
  let counterErrors = 0;
  let dir = 'src';
  let filePath = 'src/partial.product-component-1.pug';
  let options = {
    hidden: false,
    ext: 'pug'
  };
  let re = /img[\s\S]*\([\s\S]*?\)/gm;
  //recursiveFiles(dir, options, function(err, filePath){
    let contentTxt = fs.readFileSync(filePath, 'utf8');+1
    let contentByLine = contentTxt.split('\n');
    contentByLine.forEach(function(line, lineNumber){
      let resultRE = line.match(re);
      if(resultRE){
        resultRE.forEach(function(imgTagItem, index){
          if(!imgTagItem.includes('alt')){
            console.log(colors.red('✗ There is an img element without the alt attr ') + filePath + ':');
          }
        });
      }  
    });    
  // });
};

// Running the script
Object.keys(config).forEach(function(key) {
  let isActive = config[key];
  if(isActive){
    eval(key + '()');
  }
});
