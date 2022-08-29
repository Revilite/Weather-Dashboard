var counter = 0;



var load = function(num){
var cities = JSON.parse(localStorage.getItem("cities"));
//Loads Default
if (counter == 0){
    q = "Matthews";
    counter++;
}
else{
    q = cities[num];
}


console.log(q)

var appId = "485bbc753e29e9770f09ca55c32c6d79";
var geoLocation = `https://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appId}`;

//Gets current weather readings
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
            var date = $("#date");
            var cityTitle = $("#title");
            var temp = $("#temp");
            var wind = $("#wind");
            var humidity = $("#humidity");
            var icon = $("#image")
            var image = data.current.weather[0].icon;
            icon.attr("src", `https://openweathermap.org/img/wn/${image}@2x.png`);
            icon.attr("height", "50px");
            var UV = $("#UV");

            date.text(moment().format("MMMM Do, YYYY"));
            if(area.state != undefined){
            cityTitle.text(area.name + ", " + area.state);
            }
            else if(area.state == undefined){
                cityTitle.text(area.name + ", " + area.country);
            }
            temp.text("Temperature: " + data.current.temp + "°F");
            wind.text("Wind: " + data.current.wind_speed + " MPH");
            humidity.text("Humidity: " + data.current.humidity + "%");
            UV.text("UV: " + data.current.uvi);
            UV.attr("class", "rounded")

            if(data.current.uvi <= 3){
                UV.attr("class", "bg-success rounded p-2");
            }
            else if (data.current.uvi > 3 && data.current.uvi < 6){
                UV.attr("class", "bg-warning rounded p-2");
            }
            else {
                UV.attr("class", "bg-danger rounded p-2");
            }
        })
    

        .then(function(locations){
            console.log("latitude 2 ", area.lat);
            console.log("longitude 2 ", area.lon);
            
           var oneCall = `https://api.openweathermap.org/data/2.5/forecast?lat=${area.lat}&lon=${area.lon}&appid=a83cd16f45a517250a52f83592bb80be&cnt=6&units=imperial`;
            //Gets 5 day weather readouts
          fetch(oneCall)
          .then(function(response){
               return response.json();
           })
           .then(function (data){
            console.log(data);

            for(var i = 1; i < 6; i++){
                var dates = moment().add(i, "days").format("MMMM Do, YYYY");
                $("#date" + i).text(dates);

                var icon = $("#image" + i)
                var image = data.list[i].weather[0].icon;
                icon.attr("src", `https://openweathermap.org/img/wn/${image}@2x.png`);
                icon.attr("height", "50px");
                icon.attr("width", "50px");
               
                $("#temp" + i).text("Temperature: " + data.list[i].main.temp + "°F");
                $("#wind" + i).text("Wind Speed: " + data.list[i].wind.speed + " MPH");
                $("#humidity" + i).text("Humidity: " + data.list[i].main.humidity + "%");
                
            }

          })

    })
})
}

var input = $("#inputButton");
var cities = [];
//adds and renders search bar value
input.on("click", function(event){
    event.preventDefault();
    addLS(); 
    $("li").remove();
    renderList();
}) 

//adds to local storage
var addLS = function(){    
    if($("#input").val() != null){
    cities.push($("#input").val());
    localStorage.setItem("cities", JSON.stringify(cities))
    load(cities.length - 1);
    }

}

//renders list items to call back to
var renderList = function(){
    var cities = JSON.parse(localStorage.getItem("cities"));

    for(var i = 0; i < cities.length; i++){
        var listItem = document.createElement("li");
        listItem.setAttribute("list-style-type", "none");
        listItem.setAttribute("class", "bg-dark text-white m-2 rounded p-2");
        listItem.setAttribute("id", "cityList")
        listItem.setAttribute("data-number", i);
        listItem.textContent = cities[i];
        console.log(cities[i])
        $("#list").append(listItem);

    }
}

//Listens for clickon list then runs load function
$("#list").on("click", function(event){
     var click = event.target;
    if(click.matches("li") == true){
        var value =  click.getAttribute("data-number");
        console.log(value);
        load(value)
    }


})


//initial run and render
load(0);
renderList();