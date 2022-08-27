var appId = "485bbc753e29e9770f09ca55c32c6d79";
var q = "matthews";

$("#input").on("submit", function(){
    q = $("#input").value;
})

console.log(q);

var geoLocation = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appId}`;





fetch(geoLocation)
    .then(function(response){
        return response.json();
    })
    .then(function(locations){
        var area = locations[0];
        console.log("latitude", area.lat);
        console.log("longitude", area.lon);

        var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${area.lat}&lon=${area.lon}&appid=${appId}&units=imperial&exclude=hourly,minutely`;
        

        fetch(oneCall)
        .then(function(reponse){
            return reponse.json();
        })
        .then(function (data){
            console.log(data);
            var date = document.createElement("h2");
            var cityTitle = document.createElement("h1");
            var temp = document.createElement("p");
            var wind = document.createElement("p");
            var humidity = document.createElement("p");
            
            date.textContent = moment().format("MMMM Do, YYYY") +" "+ data.current.weather[0].icon;
            cityTitle.textContent = area.name;
            temp.textContent = "temperature: " + data.current.temp + "F";
            wind.textContent = "wind: " + data.current.wind_speed + " MPH";
            humidity.textContent = "humidity : " + data.current.humidity + "%";

            $("#weather").append(date);
            $("#weather").append(cityTitle);
            $("#weather").append(temp);
            $("#weather").append(wind);
            $("#weather").append(humidity);
        })
    

        .then(function(locations){
            console.log("latitude 2 ", area.lat);
            console.log("longitude 2 ", area.lon);

           var oneCall = `http://api.openweathermap.org/data/2.5/forecast?lat=${area.lat}&lon=${area.lon}&appid=a83cd16f45a517250a52f83592bb80be&cnt=6&units=imperial`;

          fetch(oneCall)
          .then(function(response){
               return response.json();
           })
           .then(function (data){
            console.log(data);
            
          })

    })
})
