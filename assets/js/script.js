function goclick(){
    document.getElementById("space").innerHTML="<img src='assets/img/load.gif' id='load'>";
    var tNum = document.getElementById("trainNum").value;
    var tDate = document.getElementById("date").value;
    var apiKey = "0635a562bd54f0c3e60114d4f000b0e4";
    var pref = "";
    var src ="";
    var dest = "";
    for(var i=0;i<5;i++)
        tDate = tDate.replace("-","");
    if(tNum == 12675 || tNum == 12676)
        pref="2S";
    else
        pref="SL";
    var xhr = new XMLHttpRequest();
    src = localStorage.getItem('src');
    dest = localStorage.getItem('dest');
    var url = "https://indianrailapi.com/api/v2/SeatAvailability/apikey/"+apiKey+"/TrainNumber/"+tNum+"/From/"+src+"/To/"+dest+"/Date/"+tDate+"/Quota/GN/Class/"+pref;
    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200){ 
        var jsonData = JSON.parse(xhr.responseText);  
        shows(jsonData);
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
    function shows(data){
        document.getElementById("space").innerHTML="";
        if(data.ResponseCode==200){
        console.log(data);
        for(var i=0;i<data.Availability.length;i++){
            var date = data.Availability[i].JourneyDate;
            var avail = data.Availability[i].Availability;
            var conf = data.Availability[i].Confirm; 
            var a = "<div class='cards'><h5 class='date'>Date :</h5>"+date+"<br><h5 class='avail'>Availability :</h5>"+avail+" <br><h5 class='confirm'>Confirm Percent:&nbsp;</h5>"+conf+"<br></div>";
            document.getElementById("space").innerHTML += a;
        }
    }
    else{
        console.log(data);
        document.getElementById("space").innerHTML = "<img src='https://static.wixstatic.com/media/277447_1dbe12da6ebc48c9bc1ba4aef3d3bdf0~mv2.gif'>";
        // document.getElementById("space").innerHTML = "Error";
        }
    }
}
function reload(){
    location.reload();
}

function shift(d){
    tName = "";
    if(d=="Y" && src=="MAS")
        tNum = 22649
    else if(d=="Y" && src=="ED")
        tNum = 22650
    else if(d=="K" && src=="MAS")
        tNum = 12675
    else if(d=="K" && src=="ED")
        tNum = 12676
    document.getElementById("trainName").innerHTML="<h5 class='inline'>Train Number :</h5>"+tNum+"<br><h5 class='inline'>Train Name :</h5>"+("Y"?"Yercaud Exp":"Kovai Exp")+"<br><button onclick='reload()' class='btn btn-danger btn-sm'>Change Train&nbsp;<i class='fas fa-times'></i></button>";
    document.getElementById("trainNum").value = tNum;
}
    function routeShift(d){
    if(d=="C"){
        localStorage.setItem("src","MAS");
        localStorage.setItem("dest","ED");
    }
    else{
        localStorage.setItem("src","ED");
        localStorage.setItem("dest","MAS");
    }    
    src = localStorage.getItem("src");
    dest = localStorage.getItem("dest");
    console.log("src : "+localStorage.getItem("src")+" dest : "+localStorage.getItem("dest"));
    document.getElementById("route").innerHTML="<h5 class='inline'>From : </h5>"+(src=="MAS"?"CHENNAI":"ERODE")+"<br><h5 class='inline'>To : </h5>"+(dest=="MAS"?"CHENNAI":"ERODE")+"<br><button onclick='reload()' class='btn btn-danger btn-sm'>Change Route&nbsp;<i class='fas fa-times'></i></button>";
}
$('#datepicker').datepicker({
    uiLibrary: 'bootstrap4'
});
