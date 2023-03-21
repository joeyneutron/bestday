function main (){ 
  const longitude = Number(5);
  const latitude = Number(5);
  let start_date= new Date(2023,01,02);
  const endDate = getEndDate(start_date, 6);
  const endString = formatDate(endDate);
  const startString = formatDate(start_date);
  //let display = answer;
  
  const ans= getfull(longitude,latitude,startString,endString);  
  ans.then((result) =>{
    const keys = result;
    let score =[0,0,0,0,0,0,0];
    //temperature_2m_max
    const tmax=hightest(keys.daily.temperature_2m_max);
    //score[tmax]= score[tmax] + 1;
    console.log(score[tmax]);  
    //temperature_2m_min
    const tmin= hightest(keys.daily.temperature_2m_min);
    //score[tmin]= score[tmin]+1;
    console.log(score[tmin]);
    //apparent_temperature_max
    const amax= hightest(keys.daily.apparent_temperature_max);
    //score[amax]=score[amax]+1;
    console.log(score[amax]);
    //apparent_temperature_min
    const amin= hightest(keys.daily.apparent_temperature_min);
    //score[amin]= score[amin]+1;      
    console.log(score[amin]);   
    //snowfall_sum
    const snow= lowest(keys.daily.snowfall_sum);
    //score[snow]+=1;
    console.log(score[snow]);    
    //precipitation_hours
    const rain= lowest(keys.daily.precipitation_hours);
    //score[rain]+=1;
    //console.log(score[rain]);

    score[tmax]=score[tmax]+1;
    score[tmin]=score[tmin]+1;
    score[amax]=score[amax]+1;
    score[amin]= score[amin]+1;
    score[snow]=score[snow]+1;
    score[rain]=score[rain]+1;

    console.log(score);
    const mscore=Object.values(keys.daily.time);
    const highest = Math.max.apply(Math,score);
    const bestdayIndex=score.indexOf(highest);
    const bestday = mscore[bestdayIndex];
    console.log(bestday);
    return bestday; 

  });
  
}    
   
 //get end date
function getEndDate(beginning, days) {
   var end = new Date(beginning);
   end.setDate(end.getDate() + days);
   return end;
}
    
//format date
function formatDate(date) {
  var d = new Date(date),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();
  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;
  return [year, month, day].join('-');
}
function getfull(lo, la, st, en,ans){
  //let querystring = new URLSearchParams;
  const daily = ['temperature_2m_max','temperature_2m_min','apparent_temperature_max','apparent_temperature_min','snowfall_sum','precipitation_hours'];
  const dailyStr = daily.toString();
  console.log(dailyStr);
  const parameters = new URLSearchParams ({
    'latitude':la,
    'longitude':lo,
    'daily':daily,
    'timezone':'auto',
    'start_date':st,
    'end_date':en,
    });
  
  // GET parameters as query string : "?id=123&type=post"
  const get_request_args = parameters.toString().replace(/%2C/g,',');;
  console.log(get_request_args);
  const url = "https://api.open-meteo.com/v1/forecast?" + get_request_args;
  return fetch(url)
   .then(function(response) {
     return response.json()
   }).then(function(json) {
     console.log('parsed json', json);
     return json;
   }).catch(function(ex) {
     console.log('parsing failed', ex)
   })
  
}
    
//find highest
function hightest(myArray){
  const myArray1=Object.values(myArray);
  const myArray2=Math.max.apply(Math,myArray1);
  const myIndex = myArray1.indexOf(myArray2);
  return myIndex;
}
  
//find lowest
function lowest(myArray){
  const myArray1=Object.values(myArray);
  const myArray2=Math.min.apply(Math,myArray1);
  const myIndex = myArray1.indexOf(myArray2);
  return myIndex;
}  

main();