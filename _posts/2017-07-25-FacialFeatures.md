---
layout: portfolio_entry
title: Facial Features Tracker & Facial Filter
image: /img/facialfeatures/sunglasses.gif
---

# Facial Features (OpenCV & CNN)
**I created an end-to-end facial feature detector and a facial filter app using OpenCV & custom CNN.  OpenCV was used to detect faces.  CNN was used to train facial feature positions.  These were combined to create a facial filter app.**

*Keywords*: Python, OpenCV, CNN, TensorFlow, Keras, Numpy, Pyplot  
*Related projects*: [Dog Breed Classifier](http://adrianyi.com/2017/07/DogBreedClassifier.html), [Emoji Mimicking Game](https://adrianyi.com/2017/06/CVMimic.html)

## Face & eye detection using OpenCV
OpenCV provides a fast face detection algorithm using [Haar cascades](http://docs.opencv.org/trunk/d7/d8b/tutorial_py_face_detection.html).  There are actually several other [pre-trained cascades](https://github.com/opencv/opencv/tree/master/data/haarcascades) available.

Here is a GIF of me with my face and eyes tracked:  
<img src="/img/facialfeatures/face_eye_tracker.gif">  

Here is a code snippet for face detection:
``` Python
# You first have to turn the image into a gray-scale image. OpenCV also uses BGR color space.
gray = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
# Create cascade classifier
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
# Detect the faces in image
faces = face_cascade.detectMultiScale(gray, 1.1, 6)
```
Similarly for eyes:  
``` Python
eye_cascade = cv2.CascadeClassifier('haarcascade_eye.xml')
faces = face_cascade.detectMultiScale(gray, 1.1, 6)
```

### Facial blurring

You can use this to do something like blur your face:  
<img class="picture" src="/img/facialfeatures/facial_blur.gif">  
``` Python
for x, y, w, h in faces:
    image[y:y+h,x:x+w] = cv2.blur(image[y:y+h,x:x+w], (50,50))
```

## Facial feature detection using CNN
Here's a [dataset from Kaggle](https://www.kaggle.com/c/facial-keypoints-detection/data) that has 7049 human labeled images with positions for 30 facial features.  Here's an example from that dataset:  
<img class="picture" src="/img/facialfeatures/mcdreamy.png" title="McDreamy :P">
We can use this to train a CNN to track those features!  My other project, [Emoji Mimicking Game](https://adrianyi.com/2017/06/CVMimic.html), uses an API by Affectiva that basically does this.  There are definitely much more complex ones, but the concept is the same and this is sufficient for our purposes.

Here is a very small vanilla-version CNN, with repeating convolution layer (with ReLu activation) & max pooling.  It outputs a bottleneck feature vector of length 128.
```
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
conv2d_1 (Conv2D)            (None, 96, 96, 8)         80        
_________________________________________________________________
max_pooling2d_1 (MaxPooling2 (None, 32, 32, 8)         0         
_________________________________________________________________
conv2d_2 (Conv2D)            (None, 32, 32, 16)        528       
_________________________________________________________________
max_pooling2d_2 (MaxPooling2 (None, 16, 16, 16)        0         
_________________________________________________________________
conv2d_3 (Conv2D)            (None, 16, 16, 32)        2080      
_________________________________________________________________
max_pooling2d_3 (MaxPooling2 (None, 8, 8, 32)          0         
_________________________________________________________________
conv2d_4 (Conv2D)            (None, 8, 8, 64)          8256      
_________________________________________________________________
max_pooling2d_4 (MaxPooling2 (None, 4, 4, 64)          0         
_________________________________________________________________
conv2d_5 (Conv2D)            (None, 4, 4, 128)         32896     
_________________________________________________________________
global_average_pooling2d_1   (None, 128)               0         
_________________________________________________________________
dropout_1 (Dropout)          (None, 128)               0         
_________________________________________________________________
dense_1 (Dense)              (None, 30)                3870      
=================================================================
Total params: 47,710
Trainable params: 47,710
Non-trainable params: 0
_________________________________________________________________
```
Training this model on the dataset above gives the following learning curve.  I ran it for 200 epochs, which only took a couple minutes (<1s/epoch).  We can use more complicated model, but this is sufficient for our purposes here.  
<img class="picture" src="/img/facialfeatures/learning_curve.png" title="Learning curve! Not so exciting...">  
The loss is RMS with the positions normalized to [-1,1] for both x and y.  Both training and validation losses are below 0.002, which is pretty good for such a simple model.

We can test this on my video feed again!  
<img class="picture" src="/img/facialfeatures/facial_features.gif">  
It has a little trouble with the reflections on my glasses, and it is slightly off when my head is tilted.  However, it performs pretty well overall.  What can we do with this?  We already saw that you can try to [interpret emotions](https://adrianyi.com/2017/06/CVMimic.html).  
Below is a facial filter using sunglasses!
<img class="picture" src="/img/facialfeatures/sunglasses.gif" title="Tada.">  
Now you know how Snapchat implements their facial filters!

Thanks for reading! :smiley:

<style>
.picture {align: center;}
</style>
