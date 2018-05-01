---
layout: portfolio_entry
title: Dog Breed App
title-long: Dog Breed Classifier - Web App<br>(See what breed you look like! Webcam supported)
image: /img/portfolio-dog.jpg
featured: true
---

# Dog Breed Classifier

### Try the app! Either upload a file or take a snap from your webcam!
<div class="app center-block row">
    <div class="canvas col-sm-8">
        <canvas class="center-block" id="canvas" width="256" height="256" style="border:4px solid; border-radius: 5px; margin-top: 10px;"></canvas>
    </div>
    <div class="apptext col-sm-4">
        <div>
            <input type="file" value="Pick a file" accept="image/*" id="input_file" style="margin: 10px; margin-top: 30px;" class="btn btn-default" style="display: inline-block;">
        </div>
        <div>
            <video style="display: none; visibility: hidden" id="video"></video>
            <button type="button" class="btn btn-default" id="webcam" style="margin: 10px;">From webcam</button>
        </div>
        <div class="">
            <a href="#" id="submit" class="btn btn-default" style="margin: 10px;"><span style=""> Predict breed </span></a>
        </div>
        <div class="" style="margin: 10px; margin-bottom: 100px;">
            Predicted dog breed: <strong><span id="result"></span></strong>
        </div>
    </div>
</div>

## Example

<img src="/img/dogbreedclassifier/Adrian.jpg" height="224" title="This is me. Not a dog.">  
Predicted dog breed: Basenji  
**I'm satisfied**, below is a picture of a basenji.  
<img src="/img/dogbreedclassifier/Basenji.jpg" height="224" title="This is a Basenji!">


## More about the product

This is based on a convolutional neural network (CNN) I trained previously.
For more implementation details, see the [previous post](/2017/07/DogBreedClassifier.html).

<script type="text/javascript">
    window.onload = function(){
        $("#submit").click(function(){
            var canvasObj = document.getElementById("canvas");
            var image = canvasObj.toDataURL();

            $("#result").text("...thinking... (this might take some time...)");
            $.ajax({
                type: "POST",
                url: "https://apps.adrianyi.com/predict_dog_breed",
                data: image,
                success: function(data){
                    $("#result").text(data.result).wrapInner("<a href='https://www.google.com/search?q="+data.result+"' target='_blank'></a>");
                },
                error: function(jqxhr, textStatus, error){
                    $("#result").text('Oh no! Error occurred :[ Try again in a minute or see console for error.');
                    console.log(jqxhr.responseJSON);
                }
            });
        });
    }
</script>
<script src="/js/dogbreed/dogbreed.js" charset="utf-8"></script>
