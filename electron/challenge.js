//مێسۆدی هەنگاوی کۆتای بۆ کلیک کردن لە بەتنی ڕیگیستێر
async function registeration(){
  try{
    var msg = await document.querySelector('.msg').children[0].innerText;
    //بانگ کردنەوەی مێسۆدی ریکوێست و ناردنی داتاکان بۆ سێرڤەرەکەمان
  const reslt = await httpPostReq('POST','http://localhost:5000',{
     "name":name,
     "pass":pass,
     "status":msg
   }).then(responseData =>{
     
   })
      //clikc() دیاری کردنی بەتنی تۆمار بوون و دروستکردنی فەنکشنی 
     var buutonReg = document.querySelector('.btn');
     buutonReg.click();

  }catch(err){
    
  }
}

//ناردنی ڕیکوێست بۆ لۆکاڵ سێرڤەرەکەمان بۆ تۆمار کردنی ناو و پاسۆردەکان لە فایلی جەیسۆنا
const httpPostReq = (method, url,data) => {
   // بۆ ئەوەی تاکوو داتاکە تۆمار نەبێت نەچێتە هەنگاوی دواتر  promise   بەکار هێنانی
 const promise = new Promise((resolve,reject)=>{
     const httpXhr = new XMLHttpRequest();
     httpXhr.open(method,url);
     httpXhr.responseType = 'json';
     httpXhr.setRequestHeader('Content-Type','application/json');
     httpXhr.onload = ()=>{
         resolve(httpXhr.response)
     }
     httpXhr.send(JSON.stringify(data));
 })
return promise;
}

function randomName(lengthname){
 var name='';
 //ئەو کارەکتەرانەی ئەمانەوێت لە ناوەکەیا هەبێت
 let nameExp ='qwertyuiopasdfghjklzxcvbnm';
 for(var i =0 ; i<lengthname;i++){
   name += nameExp.charAt(Math.floor(Math.random() * nameExp.length))
 }

console.log("Name : "+name)
return name

}

//مێسۆدی دروست کردنی پاسۆرد
function randomPass(lengthPass){
 var pass='';
 let passExp ='qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^&*()';
 for(var x =0 ; x<lengthPass;x++){
   pass += passExp.charAt(Math.floor(Math.random() * passExp.length))
 }
 console.log("Pass : "+pass)
 return pass

}


//دروست کردنی پاسۆردی ڕاندۆمی
 var pass =  randomPass(10);
 //دروست کردنی ناوێکی ڕاندۆمی 
 var name =  randomName(10);
function setInputValues(){
 var nameInput =  document.querySelectorAll('.form-control');
 nameInput[0].value =  name;
 nameInput[1].value = pass;
 nameInput[2].value = pass;

}




function getNumbers(){
 //وەرگرتنەوەی هەموو لەیبڵەکان 
 var labels  = document.getElementsByTagName('label');
  //ئەڕەیەک بۆ ئەو لەیبڵانەی کە ژمارەن
 var nums = [];
 //لووپ کردنی لەیبڵەکان بۆ جیاکردنەوەی ئەو لەیبڵانەی کە ژمارەن و پێویستمانە 
 for (const key in labels) {

  if (labels.hasOwnProperty(key)) {
   const element = labels[key];

    //دیاری کردنی لەیبڵی ژمارەکان لەڕێگەی  Number()
    if(Number(element.innerText)){
     //تۆمار کردنی ژمارەکە لە ناو ئەو ئەڕەیەی بۆ ژمارەکانمان درووست کردوە
     nums.push(Number(element.innerText));
   }
 }
}
console.log("Numbers : "+nums)
return nums;
}



async function findOperators(){
 const nums = await getNumbers()
 //ئەڕەیەک بۆ کردارەکانمان
var op = ['+','-','/','*'];

// ئەڕەیەک بۆ ریسۆڵتەکەمان 
const res = await findop(op,nums)

console.log("Result Operator : "+res)
setTimeout(() => {
 
setOperatorToInput(res)
}, 1000);


}

findop = (op,nums)=>{
 var res ='';
 //  وەرگرتنی ئەنجامە راستەکە کە ئەکاتە کۆتا ژمارە
var ccourectRes = nums[nums.length-1];
 //بولیەنێک بۆ ئەوەی کە کردارەکانمان دۆزیەوە لووپەکە ڕاگرین
var flag = true;
 // لەبەرە ئەوەی ٤ کردارمەن هەیەو وە چوار خانەشمان هەیە بۆ پڕکردنەوە بە کردارەکەن بۆیە  ئەکاتە  ٤*٤   واتا پێویستمان بە ٤ لووپە بۆی هەموو جاڵەتەکان وەرگرین 
for(var i =0; i <4;i++){
 //مەرجێک بۆ ئەوەی بزانین کردارەکان دۆزراونەتەوە یاخوود نا 
 if(flag){
   for(var x =0; x <4;x++){
     for(var y =0; y <4;y++){
       for(var k =0; k <4;k++){

         //  ئەیگۆڕین بۆ هاوکێشەی بیرکاری وە بەراودی ئەکەین بە ئەنجامە ڕاستەکە eval() لە ڕێگەی ژمارەکان و کردارەکانەوە سترینگێک درووست ئەکەین و پاشان بە مێسۆدی 
         if(eval(nums[0]+''+op[i]+''+nums[1]+''+op[x]+''+nums[2]+''+op[y]+''+nums[3]+''+op[k]+''+nums[4]) === ccourectRes){

           // کرداری هاوکێشە ڕاستەکە ئەکەینە ناو ڤارێبڵەکەمانەوە 
           res = op[i]+''+op[x]+''+op[y]+''+op[k];
           // بۆ وەستاندنی لووپەکە
           flag = false;
           break;
         }
        }
      }
   }
 }else{
   break;
 }
}
return res;
}

function setOperatorToInput(operators){
//ئەرگرتنی ئینپوتی کردارەکەن و دانانی کردارە ڕاستەکان
var opInput = document.querySelectorAll('.op')
opInput[0].value = operators.split('')[0];
opInput[1].value = operators.split('')[1];
opInput[2].value = operators.split('')[2];
opInput[3].value = operators.split('')[3];

setInputValues();
registeration();
}


findOperators();
