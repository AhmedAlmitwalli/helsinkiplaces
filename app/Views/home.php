

<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Helsinki-map</title>
  <meta content="width=device-width, initial-scale=1" name="viewport">

<link rel = "stylesheet" type = "text/css" 
   href = "<?php echo base_url(); ?>/css/style.css">

  <link href="images/logo-icon.png" rel="shortcut icon" type="image/x-icon">
  <link href="images/hp-logo.png" rel="apple-touch-icon">
</head>









<body class="body" onload="myPlacesNumber()">





<!-- Header Section -->
  <div class="header-sec">

    <div class="right-sec">
      <div class="logo-container">
        <div class="logo-svg"></div>
        <a href="#" class="logo-div">
          <h1 class="logo-div">Helsinki Places</h1>
        </a>
      </div>


      <div class="links-sec">
        <button id="myplaces-btn" class="links-btn"><span class="icon-span"></span>My Places <span id="myPlacesNumber" class="links-btn"></span></button>
        <button id="end-myplaces-btn" class="links-btn" style="display: none;"><span class="icon-span"></span>End My Places Mode</button>
        <button id="choosefrommap-btn" class="links-btn"><span class="icon-span"></span>Click & Info</button>
        <button id="clearmap-btn" class="links-btn"><span class="icon-span"></span>Clear</button>
       
      </div>


      <div class="search-div">       
          
            <input id="search-input" class="searchform-search" type="text" maxlength="256" name="search" placeholder="Search for place">
                  
      </div>


      <div class="filter-sec">

        <button class="keyword-btns" name="lodging" onclick="placesinHelsinki(this.name)"><span></span>Hotels</button>
        <button class="keyword-btns" name="restaurant" onclick="placesinHelsinki(this.name)"><span></span>Restaurants</button>
        <button class="keyword-btns" name="bank" onclick="placesinHelsinki(this.name)"><span></span>Banks</button>
        <button class="keyword-btns" name="supermarket" onclick="placesinHelsinki(this.name)"><span></span>Supermarkets</button>
        <button class="keyword-btns" name="library" onclick="placesinHelsinki(this.name)"><span></span>Libraries</button>
        <button class="keyword-btns" name="art_gallery" onclick="placesinHelsinki(this.name)"><span></span>Art Galleries</button>
        <button class="keyword-btns" name="cafe" onclick="placesinHelsinki(this.name)"><span></span>Cafe</button>
        <button class="keyword-btns" name="car_wash" onclick="placesinHelsinki(this.name)"><span></span>Car wash</button>
        <button class="keyword-btns" name="furniture_store" onclick="placesinHelsinki(this.name)"><span></span>Furniture</button>
        <button class="keyword-btns" name="gas_station" onclick="placesinHelsinki(this.name)"><span></span>Gas Station</button>
        <button class="keyword-btns" name="gym" onclick="placesinHelsinki(this.name)"><span></span>Sports</button>
        <button class="keyword-btns" name="movie_theater" onclick="placesinHelsinki(this.name)"><span></span>Cinema</button>
        <button class="keyword-btns" name="museum" onclick="placesinHelsinki(this.name)"><span></span>Museum</button>
        <button class="keyword-btns" name="night_club" onclick="placesinHelsinki(this.name)"><span></span>Night Club</button>
        <button class="keyword-btns" name="park" onclick="placesinHelsinki(this.name)"><span></span>Parks</button>
        <button class="keyword-btns" name="hospital" onclick="placesinHelsinki(this.name)"><span></span>Hospital</button>
        <button class="keyword-btns" name="pharmacy" onclick="placesinHelsinki(this.name)"><span></span>Pharmacy</button>
        <button class="keyword-btns" name="post_office" onclick="placesinHelsinki(this.name)"><span></span>Post offices</button>
        <button class="keyword-btns" name="school" onclick="placesinHelsinki(this.name)"><span></span>Schools</button>
        <button class="keyword-btns" name="university" onclick="placesinHelsinki(this.name)"><span></span>University</button>
        <button class="keyword-btns" name="beauty_salon" onclick="placesinHelsinki(this.name)"><span></span>Beauty</button>

      </div> 

    </div>



    <div id="resultdiv" class="keyword-div">

      <div id="showinfo">
        <h1 style="font-size: 30px; color : #fff; text-align: center; margin-bottom: 40px;">Clicked Location Information</h1>
        <h3 class="result-titles">Address : <input id="address" name="address" class="result-input" type="text"></h3>
        <h3 class="result-titles">Latitude : <input id="Latitude" name="Latitude" class="result-input" type="text" ></h3>
        <h3 class="result-titles">Longitude : <input id="Longitude" name="Longitude" class="result-input" type="text" ></h3>
        <h3 class="result-titles">Location type: <input id="loctype" name="loctype" class="result-input" type="text" ></h3>
      </div>



      <div id="showResults">
        
        <form id="form" action="" method="POST">
          <input id="id" name="id" class="result-input" type="hidden" >
          <h3 class="result-titles">Title: <input id="title" name="title" class="result-input" type="text" ></h3>
          <h3 class="result-titles">Description: <input id="description" name="description" class="result-input" type="text" ></h3>
          <h3 class="result-titles">Latitude: <input id="coordinatesLa" name="coordinatesLa" class="result-input" type="text" readonly></h3>
          <h3 class="result-titles">Longitude: <input id="coordinatesLo" name="coordinatesLo" class="result-input" type="text" readonly></h3>      
          <h3 class="result-titles">Opening Hours: <input id="opening" name="open" class="result-input" type="text" ></h3>
          <h3 class="result-titles">Keywords: <input id="keywords" name="keywords" class="result-input" type="text" ></h3>
        </form> 
        <div id="resultBtns">

          <button id="resultEditBtn" name="resultEditBtn" class="resultChangBtns" type="submit">Edit</button>
          <button id="resultDeleteBtn" name="resultDeleteBtn" class="resultChangBtns" type="submit">Delete</button>
          <button id="resultMyBtn" name="submit" class="resultChangBtns" type="submit">Save to My Places</button>    

        </div>
       
      </div>
    </div>
  </div>



  




<!-- Map Section -->
  <div id="mapSection" class="map-section">
    
    <div id="map"></div>

  </div>






<!--   Myplaces Edit Section -->
<div id="choices-container" class="myplaces-edit-container">
  <div class="edit-text"><span id="title-span"></span></div>
  <div class="edit-choices">
    <button id="edit-yes" class="edit-btn-choices">Yes</button>
    <button id="edit-no" class="edit-btn-choices">No</button>

  </div>

</div>





<script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyABPiKI2F25sFWDlMMOARlqiBtnbR_Dt7U&callback=initMap&libraries=places&v=weekly"></script>
<script type = 'text/javascript' src = "<?php echo base_url(); 
   ?>/js/app.js"></script>

<script>

// Get db data and store it in js
const dbResults = <?php echo json_encode($subjects); ?>;

//array to store lat and id
let latitudearr = [];
let idarr = [];

for (var i=0; i < dbResults.length; i++) {
  latitudearr.push(dbResults[i].latitude);
  idarr.push(dbResults[i].id);
}


//result save to my places function
resultMyBtn.addEventListener("click", function(){

  document.getElementById("choices-container").style.display = "block";
  document.getElementById("title-span").innerText = "Save " + title.value + " to Your Places";

  //if user click yes
  document.getElementById("edit-yes").addEventListener("click", function(){
    form.action = '<?= base_url('Home/saveMyPlaces') ?>';
    form.method = 'POST';
    form.submit();
    
  });
  //if user click no
    document.getElementById("edit-no").addEventListener("click", function(){
    document.getElementById("choices-container").style.display = "none";
  });
});





//result edit btn function
resultEditBtn.addEventListener("click", function(){
  
  document.getElementById("choices-container").style.display = "block";
  document.getElementById("title-span").innerText = "Edite and Save (" + title.value + ") to Your Places";

  //if user click yes
  document.getElementById("edit-yes").addEventListener("click", function(){
    form.action = '<?= base_url('Home/editMyPlaces') ?>';
    form.method = 'POST';
    form.submit();
    
  });
  //if user click no
    document.getElementById("edit-no").addEventListener("click", function(){
    document.getElementById("choices-container").style.display = "none";
  });


});




//result delete btn function
resultDeleteBtn.addEventListener("click", function(){
  
  document.getElementById("choices-container").style.display = "block";
  document.getElementById("title-span").innerText = "Delete (" + title.value + ") From Your Places";

  //if user click yes
  document.getElementById("edit-yes").addEventListener("click", function(){
    form.action = '<?= base_url('Home/deleteMyPlaces') ?>';
    form.method = 'POST';
    form.submit();
    
  });
  //if user click no
    document.getElementById("edit-no").addEventListener("click", function(){
    document.getElementById("choices-container").style.display = "none";
  });


});


</script>


</body>
</html>