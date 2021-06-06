var camera=document.getElementById("camera");
Webcam.set({
    width:360,height:250,image_format:'jpeg',jpeg_quality:90
});
Webcam.attach(camera);

function takephoto(){
    Webcam.snap(function(data_uri){
    document.getElementById("selfie").innerHTML='<img id="takenselfie" src="'+data_uri+'"/>';
    });
}
console.log("ml5version",ml5.version);
var classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/6F5zI17r5/model.json",modelLoaded);
function modelLoaded(){
console.log("modelLoaded");
}

var prediction1="";
var prediction2="";

function prediction(){
    var synthesis=window.speechSynthesis;
    var speech1="prediction 1                            is             "+prediction1;
    var speech2="prediction 2                            is             "+prediction2;
    var newsynthesis=new SpeechSynthesisUtterance(speech1+speech2);
    synthesis.speak(newsynthesis);
    
    
  
    }

    function check(){
        var img=document.getElementById("takenselfie");
        classifier.classify(img,gotresult);
        
    }

function gotresult(error,results){
if (error){
    console.error(error);
}
else{
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML="prediction1:"+results[0].label;
   
    document.getElementById("result_emotion_name2").innerHTML="prediction2:"+results[1].label;
    prediction1=results[0].label;
    prediction2=results[1].label;
    prediction();
    
    if (prediction1=="happy"){
     document.getElementById("update_emoji").innerHTML="&#128522;";   
    }
    if (prediction1=="sad"){
        document.getElementById("update_emoji").innerHTML="&#128532;";   
       }
       if (prediction1=="angry"){
        document.getElementById("update_emoji").innerHTML="&#128548;";   
       }

       if (prediction2=="happy"){
        document.getElementById("update_emoji2").innerHTML="&#128522;";   
       }
       if (prediction2=="sad"){
           document.getElementById("update_emoji2").innerHTML="&#128532;";   
          }
          if (prediction2=="angry"){
           document.getElementById("update_emoji2").innerHTML="&#128548;";   
          }
}

}



