import * as fs from 'node:fs';
let templateName = process.argv[2]
let templateText = fs.readFileSync(templateName, 'utf8')
let insideBlock = false;
let blockStartPosition=null;
let blockName=null;
let outerTemplate="";
for(var i=0;i<templateText.length;i++){
    if(templateText.charAt(i) == '<' &&
    templateText.charAt(i+1) == '!' &&
    templateText.charAt(i+2) == '-' &&
    templateText.charAt(i+3) == '-' &&
    templateText.charAt(i+4) == ' ' &&
    templateText.charAt(i+5) == 'b' &&
    templateText.charAt(i+6) == 'l' &&
    templateText.charAt(i+7) == 'o' &&
    templateText.charAt(i+8) == 'c' &&
    templateText.charAt(i+9) == 'k'
    ){
        if(!insideBlock){
            blockStartPosition=i;
            i=i+10; //advancing past the comment tag opening
            insideBlock=true;
            blockName=""
            for(;i<templateText.length;i++){
                if(templateText.charAt(i) == '-' &&
                templateText.charAt(i+1) == '-' &&
                templateText.charAt(i+2) == '>'){
                    i=i+3
                    blockName = blockName.trim();
                    break;
                }else{
                    blockName+=templateText.charAt(i)
                }
            }
        }else{
            for(;i<templateText.length;i++){
                if(templateText.charAt(i) == '-' &&
                templateText.charAt(i+1) == '-' &&
                templateText.charAt(i+2) == '>'){
                    i = i+3; //advancing past the comment tag closing
                    let block = templateText.substring(blockStartPosition,i);
                    outerTemplate += '<custom type="content" name="' + blockName + '">'
                    fs.writeFileSync(blockName + "-block-" + templateName,block);
                    insideBlock=false;
                    break;
                }
            }
        }
    }
    if(!insideBlock) outerTemplate += templateText.charAt(i);
}
fs.writeFileSync("outer-" + templateName,outerTemplate)