---
layout: portfolio_entry
title: Dog Breed Classifier
title-long: Dog Breed Classifier - Convolutional Neural Networks
image: /img/portfolio-dog.jpg
---

# Dog Breed Classifier

**Try the app!** Check out the app on the newer post [here](/2017/11/DogBreedApp.html)


In this project, convolutional neural networks (CNNs) are used to classify an image into one of 133 dog breeds.  
[First](#cnn-from-scratch), I made a CNN from scratch with random initialization (38.6% test accuracy).  
[Second](#transfer-learning-on-resnet50), I made a transfer learning CNN using bottleneck features from ResNet50 pre-trained on ImageNet (85.5% test accuracy).  

In the final product, the app should do the following:  
1. Detect either a dog or a clearly visible human face (OpenCV Haars Cascade)  
2. If it detects one, go to #3.  If not, given an error message.  
3. Classify the image into one of the 133 dog breeds.

Below is an example of an image and its output. See below for [more examples](#examples)!

<img src="/img/dogbreedclassifier/Brownie.jpg" height="224" title="This is an Australian Shepherd we adore named Brownie!">

Dog breed detected is an *Australian shepherd*!

All models were created on Python using Keras with TensorFlow backend.
The dog images were split into 6680 training images, 835 validation images, and 836 test images.  
Some data augmentation was used (translation, rotation, horizontal flip, zoom), but it will not be discussed in this post.


## CNN from scratch

A 5-layer CNN was created with each layer containing the following:  
1. 2x2 convolution  
2. relu activation  
3. 2x2 max pooling  
4. dropout

The resulting tensor is followed by the following:  
- global average pooling  
- fully-connected layer  
- relu activation  
- dropout  
- softmax  

The CNN takes 224 x 224 RGB (3 channels) image and outputs a vector of length 133, corresponding to the probability for each dog breed.

It was trained with RMSProp optimizer and categorical cross-entropy loss function.  
After 100 epochs (>1.5hrs), best performing model based on the validation loss score was chosen, corresponding to *38.3%* training accuracy and *39.5%* validation accuracy.  
Its performance on the test set was **38.6%**.


## Transfer learning on ResNet50  
So the CNN performed >50 times better than random, but it still did not work so well :(  
This shows how hard it is to create and train a new CNN!

Lucky for us, there is a competition that is very similar to what we're doing---[ImageNet Challenge](http://www.image-net.org/). It contains images that are millions of pre-labeled images.  
We can take a model that already performs well in this challenge and tweak it slightly.  
Here, I used 50-layer Residual Network (ResNet50), a shorter version of a model that won the ImageNet classification challenge back in 2015.

We remove the last fully-connected layer, and add our own!  
In this case, I added an additional layer.  
- fully-connected layer (1024 units with L2 regularization)  
- relu activation  
- dropout  
- softmax (with L2 regularization)  

Training required pre-processed images on the ResNet50 model (output before the last fully-connected layer), which took a while.  
However, the new model is much smaller, making the training extremely fast! Each epoch took <1s, allowing me to run many epochs.  
Below is the learning curve.  
<img src="/img/dogbreedclassifier/resnet50_learning_curve.png" style="max-width: 80%" title="Learning curve with ResNet50 transfer learning">

The accuracy quickly rises within the first ~50 epochs, whereas the loss continues to decrease for few more hundred epochs.

As you can see from the learning curve, the training and validation accuracies reach around *99.7%* and *86.4%*, respectively.  
It performs well on the test set as well---**85.5%**.  
Great! This is very good for our purposes!

## Examples
Now we can incorporate a dog detector (using full ImageNet ResNet50 results) and a human face detector (using OpenCV Haar cascade classifier) into the app.  
I tested few images, take a look below!

<img src="/img/dogbreedclassifier/Gatsby.jpg" height="224" title="This is another dog we adore named Gatsby! He's a Welsh Pembroke Corgi.">  
Dog breed detected is a . . . Pembroke_welsh_corgi  
**Correct!**

<img src="/img/dogbreedclassifier/Wishbone.jpg" height="224" title="If you don't know this dog, you're too young! Wishbone! He's a Jack Russel Terrier.">  
Dog breed detected is a . . . American_staffordshire_terrier  
**Wrong :( But it's pretty close!** It probably got confused with all the clothing.

<img src="/img/dogbreedclassifier/Adrian.jpg" height="224" title="This is me. Not a dog.">  
The person looks like a . . . Basenji  
**I'm satisfied**, below is a picture of a basenji.  
<img src="/img/dogbreedclassifier/Basenji.jpg" height="224" title="This is a Basenji!">

## Try the app
I deployed the app on AWS, and it is available to test on a newer post [here](/2017/11/DogBreedApp.html).

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
