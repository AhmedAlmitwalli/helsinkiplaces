


let map;
let service;
let infowindow;

//global place
let helsinki;
let place;
let mymarkers;
//image icon
const iconImage = "images/myplacesIcon.png";

// marker result function
  const form = document.getElementById("form");
  const id = document.getElementById("id");
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const coordinatesLa = document.getElementById("coordinatesLa");
  const coordinatesLo = document.getElementById("coordinatesLo");
  const opening = document.getElementById("opening");
  const keywords = document.getElementById("keywords");

//main btns
  const myplacesBtn = document.getElementById("myplaces-btn");
  const endMode = document.getElementById("end-myplaces-btn");
  const chooseMapBtn = document.getElementById("choosefrommap-btn");
  const clearBtn = document.getElementById("clearmap-btn");

  
  const input = document.getElementById("search-input");

//places in helsinki
  const keywordsBtn = document.querySelectorAll(".keyword-btns");

//result div btns  
  const showResultdiv = document.getElementById("showResults");
  const resultEditBtn = document.getElementById("resultEditBtn");
  const resultDeleteBtn = document.getElementById("resultDeleteBtn");
  const resultMyBtn = document.getElementById("resultMyBtn");







//-------------------
//init start
//--------------------
function initMap() 
{
  //show Helsinki in map
  helsinki = new google.maps.LatLng(60.171, 24.941);
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: helsinki,
    zoom: 13,
  });
 
  //search section
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);
  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29),
      icon: iconImage,
  });

// Get place from search and add ventListener
autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    clearResultDiv();
    //placedata 
    place = autocomplete.getPlace();
  
    //check if place in helsinki
    var helsinkiPlaces = place.formatted_address;  
      
      //if place not in helsinki echo alert
        if (!place.geometry || (helsinkiPlaces.search("Helsinki") < 0)) {
            clearResultDiv();
            window.alert("This place is not in Helsinki");
            input.value = "";
            input.placeholder = "Search for place";
              map = new google.maps.Map(document.getElementById("map"), {
              center: helsinki,
              zoom: 13,
            });           
            return;
        }


        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }


          //marker settings
         
          marker.setIcon(({
              url: iconImage,
              size: new google.maps.Size(50, 50),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(25, 30),
              scaledSize: new google.maps.Size(50, 50)
          }));
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);
    
          //icon and infowindo show in map
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.formatted_address);
          infowindow.open(map, marker);
  
          //marker click events
          marker.addListener("click", () => {
   
              showResultdiv.style.display = "block";

              // check if result new or it saved by latitude number
              const counter = "";

                for (var i=0; i < latitudearr.length; i++) {

                  if (place.geometry.location.lat() == latitudearr[i]){
                    alert("This Location in Your Places, You can Edit or Delete it");
                    resultMyBtn.style.visibility = "hidden";
                    resultEditBtn.style.visibility = "visible";
                    resultDeleteBtn.style.visibility = "visible";

                    id.value = dbResults[i].id;
                    title.value = dbResults[i].title;
                    description.value = dbResults[i].description;
                    coordinatesLa.value = dbResults[i].latitude;
                    coordinatesLo.value = dbResults[i].longitude;
                    opening.value = dbResults[i].open;
                    keywords.value = dbResults[i].keywords;
                    return;
                  }
                }
                  
                resultMyBtn.style.visibility = "visible";
                resultEditBtn.style.visibility = "hidden";
                resultDeleteBtn.style.visibility = "hidden";

                title.value = place.name;
                description.value = place.formatted_address;
                coordinatesLa.value = place.geometry.location.lat();
                coordinatesLo.value = place.geometry.location.lng();
                opening.value = open;
                keywords.value = place.types[0];
                    
    
                
          });

    //get opening time from object
    try{
      open = place.opening_hours.periods[3].open.time;
    }
    catch(e){
      open='No work time';
    }

});//end of eventlistener 





  //------------------------------------
  //myplaces button function
  //------------------------------------
  myplacesBtn.addEventListener("click", function()
  {
    document.getElementById("showinfo").style.display = "none";
    myplacesBtn.style.display= "none"; 
    endMode.style.display= "initial";
    endMode.style.backgroundColor = "#dd1414";
    input.disabled = true;

    //marker names array and infowindow
    let mymarkers = [];
    let myinfowindow = [];

    //show Helsinki in map
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: helsinki,
    });

    //marker settings
    
    //var to get i value    
    const count = "";

    //loop in myplaces from db
    for (var i=0; i < dbResults.length; i++){
      //Use marker animation to drop the icons incrementally on the map.
        mymarkers[i] = new google.maps.Marker({
          position: { lat: Number(dbResults[i].latitude), lng: Number(dbResults[i].longitude)},
          animation: google.maps.Animation.DROP,
          map,
          icon: iconImage,
          title: count.toString()+i,
        });

        //icon and infowindo show in map
        myinfowindow[i] = new google.maps.InfoWindow();
        myinfowindow[i].setContent('<div><strong>' + dbResults[i].title + '</strong></div>');
        myinfowindow[i].open(map, mymarkers[i]);

     
        //marker click events
        mymarkers[i].addListener("click", function(){
          document.getElementById("showResults").style.display = "block";
          resultMyBtn.style.visibility = 'hidden';
          resultEditBtn.style.visibility = "visible";
          resultDeleteBtn.style.visibility = "visible";
         
          id.value = dbResults[this.getTitle()].id;
          title.value = dbResults[this.getTitle()].title;
          description.value = dbResults[this.getTitle()].description;
          coordinatesLa.value = dbResults[this.getTitle()].latitude;
          coordinatesLo.value = dbResults[this.getTitle()].longitude;
          opening.value = dbResults[this.getTitle()].open;
          keywords.value =dbResults[this.getTitle()].keywords;
        }); 

        //end mode and back to normal
        endMode.addEventListener("click", function(){
            myplacesBtn.style.display= "initial"; 
            endMode.style.display= "none";
            input.disabled = false;

            //clear markers
            for (var i=0; i < dbResults.length; i++){
                mymarkers[i].setMap(null);
            }
                
            location.reload()         
        });

        
    }//End loop in myplaces from db

  });//End myplaces button function

}//init end




//------------------------------------------------
//Clear btn function
//------------------------------------------------

//clear btn
clearBtn.addEventListener('click', function(){
  map = new google.maps.Map(document.getElementById("map"), {
    center: helsinki,
    zoom: 13,
  });
    document.getElementById("showResults").style.display = "none";
    document.getElementById("showinfo").style.display = "none";
    myplacesBtn.style.display= "initial"; 
    endMode.style.display= "none";
    input.value = "";
    input.placeholder = "Search for place";
    input.disabled = false;

});







//---------------------
//choose from map btn event
//-----------------------
chooseMapBtn.addEventListener('click', function(){

  //set divs show
  document.getElementById("showResults").style.display = "none";
    myplacesBtn.style.display= "initial"; 
    endMode.style.display= "none";
    input.value = "";
    input.placeholder = "Search for place";
    input.disabled = true;

  //set map in view
  helsinki = new google.maps.LatLng(60.171, 24.941);
  map = new google.maps.Map(document.getElementById("map"), {
    center: helsinki,
    zoom: 15,
    draggableCursor: 'crosshair'
  });

  // Create the initial InfoWindow.
  let infoWindow ;


    //click and get 
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {

      // Create a new InfoWindow with clicked place in map
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });
      infoWindow.setContent(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      );
  
      //get lat and ling from click and store in variable
      var lat = mapsMouseEvent.latLng.toJSON().lat;
      var lng = mapsMouseEvent.latLng.toJSON().lng;

      //set variables for search and get data
      var latlng = new google.maps.LatLng(lat, lng);
      var geocoder = geocoder = new google.maps.Geocoder();

      
          
        //search for place info 
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {

          //check status
          if (status == google.maps.GeocoderStatus.OK) {
                  
            //get the 1st result
            if (results[0]) {

            //check if location in helsinki
              //var for helsinki address
              var helsinkiPlace = results[0].formatted_address;
              //search in result address if there helsinki or not
              if (helsinkiPlace.search("Helsinki") > -1 || helsinkiPlace.search("Helsingfors") > -1) {


                


                // create marker from clicked place
                var marker2 = new google.maps.Marker({
                    position: latlng,
                    map,
                    icon: iconImage
                  });

                //create new infowindow with new result data
                var infowindow2 = new google.maps.InfoWindow();
                //icon and infowindo show in map
                infowindow2.setContent('<div><strong>' + results[0].address_components[1].long_name + '</strong><br>' + results[0].formatted_address);
                infowindow2.open(map, marker2);

                //get location types
                var loctypes = results[0].types;
                //init string for types input 
                var loctypesstr = "";  
                //loop in location arr
                for (var i=0; i < loctypes.length; i++) {
                  //add to string
                  loctypesstr += loctypes[i];
                  loctypesstr += ", ";
                  }
                  //delete last coma
                  loctypesstr = loctypesstr.split('_').join(' ');
                 
                  //show showinfo div
                  document.getElementById("showinfo").style.display = "block";
                  //show info abot cliced place of new place and echo it
                  document.getElementById("address").value = results[0].formatted_address;
                  document.getElementById("Latitude").value = results[0].geometry.location.lat();
                  document.getElementById("Longitude").value = results[0].geometry.location.lng();
                  document.getElementById("loctype").value =  loctypesstr.slice(0, -2);     
              } else 
              {alert("This place is not in Helsinki");}

            }//get the 1st result
          }//check status
        });//End search for place info 

    });  // end Configure the click listener.

});//End choose from map btn event





//---------------------------------------
// search by keywords
//----------------------------------------

function placesinHelsinki(name)
{

//clear other options
    document.getElementById("showResults").style.display = "none";
    document.getElementById("showinfo").style.display = "none";
    myplacesBtn.style.display= "initial"; 
    endMode.style.display= "none";
    input.value = "";
    input.placeholder = "Search for place";
    input.disabled = true;

//set map in view
  map = new google.maps.Map(document.getElementById("map"), {
    center: helsinki,
    zoom: 10,
  });

//request settings and change type with clicked btn name value
  var request = {
    location: new google.maps.LatLng(60.2364177, 24.9286332),
    radius: "50000",
    type: [name]
  };

  //get request
  service = new google.maps.places.PlacesService(map);
  //request function
  service.nearbySearch(request, function (results, status) {
    
    //check if request ok
    if (status == google.maps.places.PlacesServiceStatus.OK) {

      //loop results
      for (var i = 0; i < results.length; i++) {
      
        //marker names array and infowindow 
        let keymarkers = [];
        let keyinfowindow = [];
        const count2 = "";


        //check in result object if place in helsinki or not
        if (results[i].vicinity.search("Helsinki") > -1) {
          
          //console.log(results[i].vicinity);
        
          //Use marker animation to drop the icons incrementally on the map.
          keymarkers[i] = new google.maps.Marker({
            position: { lat: Number(results[i].geometry.location.lat()), lng: Number(results[i].geometry.location.lng())},
            animation: google.maps.Animation.DROP,
            map,
            icon: iconImage,
            title: count2.toString()+i,
          });//End Use marker animation to drop the icons incrementally on the map.

          //icon and infowindo show in map
          keyinfowindow[i] = new google.maps.InfoWindow();
          keyinfowindow[i].setContent('<div><strong>' + results[i].name + '</strong></div>');
          keyinfowindow[i].close(map, keymarkers[i]);

          

          //marker click events
          keymarkers[i].addListener("click", function(){

            document.getElementById("showResults").style.display = "block";
            keyinfowindow[this.getTitle()].open(map, keymarkers[this.getTitle()]);
            
            //------------------------------------------------
              //must check if inputs change or not
            //------------------------------------------------
           
            for (var i=0; i < latitudearr.length; i++) {
              if (results[this.getTitle()].geometry.location.lat() == latitudearr[i]){

                  alert("This Location in Your Places, You can Edit or Delete it");
                  resultMyBtn.style.visibility = "hidden";
                  resultEditBtn.style.visibility = "visible";
                  resultDeleteBtn.style.visibility = "visible";

                  id.value = dbResults[i].id;
                  title.value = dbResults[i].title;
                  description.value = dbResults[i].description;
                  coordinatesLa.value = dbResults[i].latitude;
                  coordinatesLo.value = dbResults[i].longitude;
                  opening.value = dbResults[i].open;
                  keywords.value = dbResults[i].keywords;
              }else{

                resultMyBtn.style.visibility = "visible";
                resultEditBtn.style.visibility = "hidden";
                resultDeleteBtn.style.visibility = "hidden";

                id.value = '';
                title.value = results[this.getTitle()].name;
                description.value = results[this.getTitle()].vicinity;
                coordinatesLa.value = results[this.getTitle()].geometry.location.lat();
                coordinatesLo.value = results[this.getTitle()].geometry.location.lng();
                opening.value = "";
                keywords.value =results[this.getTitle()].types[0];

              }
            }        
        
          }); //End marker click events

        }//End check in result object if place in helsinki or not

      }//End loop results

    }//End check if request ok

  });//End request function

}//end placesinHelsinki fun







//clear result div
function clearResultDiv(){
  document.getElementById("showResults").style.display = "none";
}



//get myplaces number and show it in front
function myPlacesNumber(){
  document.getElementById("myPlacesNumber").innerText = dbResults.length;
}


