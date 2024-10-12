let wind= document.querySelector("#wind-img");
let sun=document.querySelector("#sun");
let humidity=document.querySelector("humidity-img");
let aqi=document.querySelector("aqi-img");

let mycity;


let city = document.querySelector("#city");
let search = document.querySelector("#img-search");

search.addEventListener("click", () => {
   mycity=city.value;
    main(mycity);
    main2();
    city.value="";
})


async function changeData(callapi) {
    let x = await fetch(callapi);
    let data = await x.json();
    return data;
}

async function changeAQi(callaqi) {
    
    let y=await fetch(callaqi);
    let value=await y.json();
    //let a=await main2(value);
    return value;
}

async function main(cityname) {

    let call = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=1ee362d664e7b9fae132506f96253508&units=metric`;
    let mydata = await changeData(call);
   
    console.log("After receiving in main : " + cityname);
    console.log(mydata);
    
    weatherIcon(mydata);
    temp(mydata);
    editRest(mydata);
   
}

async function main2(z) {
    let m= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${mycity}&appid=1ee362d664e7b9fae132506f96253508&units=metric`);
    let mycall=await m.json();

    let call1=`https://api.openweathermap.org/data/2.5/air_pollution?lat=${mycall.coord.lat}&lon=${mycall.coord.lon}&appid=1ee362d664e7b9fae132506f96253508`;
    let b= await fetch(call1);
    let mydata2=await b.json();
    console.log(mydata2);
    editAQI(mydata2);
    // city.value="";
   // return 505
}

function weatherIcon(val){
     if(val.weather[0].main==="Clear")
        sun.src="sun.png";
    else if(val.weather[0].main==="Clouds")
        sun.src="Overcast.png";
    else if(val.weather[0].main==="Rain")
            sun.src="Rainy.png";
    else if(val.weather[0].main==="Haze")
        sun.src="mist.png";
}

function temp(val){
    document.getElementById("h1").innerHTML=`${val.name}`;
    let t=Math.round(val.main.temp);
    let ft=Math.round(val.main.feels_like);
    document.getElementById("h2").innerHTML=`${t}°C`;
    document.getElementById("h3").innerHTML=`Feels Like ${ft}°C`;
}

function editRest(val){
    document.getElementById("windtxt").innerHTML=`${Math.round(val.wind.speed)} km/hr`;
    document.getElementById("humtxt").innerHTML=`&nbsp;&nbsp;${val.main.humidity}%`;
    
}

function editAQI(val){
    document.getElementById("aqitxt").innerHTML=`&nbsp; &nbsp;&nbsp;${val.list[0].main.aqi}`
}

