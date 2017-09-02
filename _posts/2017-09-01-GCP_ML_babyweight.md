---
layout: portfolio_entry
title: Google Cloud Platform BigQuery & Machine Learning - Guessing Baby Weight
image: /img/GCP_ML_babyweight/GCP.png
---

**I used Google Cloud Platform to extract data from a database in [BigQuery](https://bigquery.cloud.google.com) (using BigQuery API and Dataflow), analyze it using Jupyter notebook on [DataLab](https://cloud.google.com/datalab/), and trained a DNN regressor on its [Cloud Machine Learning Engine](https://cloud.google.com/products/machine-learning/).**

*Keywords*: Google Cloud Platform (BigQuery, Dataflow, Datalab, Cloud Machine Learning), Python, SQL, Pandas, Matplotlib, TensorFlow, Deep neural networks
*Related projects*: [Titanic Survival Predictor](https://adrianyi.com/2016/11/titanic_survival.html)

![](/img/GCP_ML_babyweight/GCP.png)

I've been meaning to learn cloud computing for some time... I also wanted to continue working on one of my previous projects that used Google BigQuery (I'll actually do this and post about it later... It was with [GDELT](https://www.gdeltproject.org/).)  

I noticed BigQuery had a public dataset called 'natality' with all sorts of information about babies born in the United States.  Here are the first few rows of **137.8M** rows:

<div style="overflow-x: auto;">
    <table>
        <tr>
            <th>Row</th>
            <th>source_year</th>
            <th>year</th>
            <th>month</th>
            <th>day</th>
            <th>wday</th>
            <th>state</th>
            <th>is_male</th>
            <th>child_race</th>
            <th>weight_pounds</th>
            <th>plurality</th>
            <th>apgar_1min</th>
            <th>apgar_5min</th>
            <th>mother_residence_state</th>
            <th>mother_race</th>
            <th>mother_age</th>
            <th>gestation_weeks</th>
            <th>lmp</th>
            <th>mother_married</th>
            <th>mother_birth_state</th>
            <th>cigarette_use</th>
            <th>cigarettes_per_day</th>
            <th>alcohol_use</th>
            <th>drinks_per_week</th>
            <th>weight_gain_pounds</th>
            <th>born_alive_alive</th>
            <th>born_alive_dead</th>
            <th>born_dead</th>
            <th>ever_born</th>
            <th>father_race</th>
            <th>father_age</th>
            <th>record_weight</th>
        </tr>
        <tr>
            <th>1</th>
            <th>2005</th>
            <th>2005</th>
            <th>7</th>
            <th>null</th>
            <th>3</th>
            <th>null</th>
            <th>false</th>
            <th>null</th>
            <th>8.62889293468</th>
            <th>1</th>
            <th>null</th>
            <th>9</th>
            <th>null</th>
            <th>78</th>
            <th>34</th>
            <th>41</th>
            <th>09262004</th>
            <th>true</th>
            <th>null</th>
            <th>false</th>
            <th>null</th>
            <th>false</th>
            <th>null</th>
            <th>57</th>
            <th>9</th>
            <th>0</th>
            <th>0</th>
            <th>10</th>
            <th>78</th>
            <th>38</th>
            <th>1</th>
        </tr>
        <tr>
            <th>2</th>
            <th>2005</th>
            <th>2005</th>
            <th>4</th>
            <th>null</th>
            <th>6</th>
            <th>null</th>
            <th>true</th>
            <th>null</th>
            <th>2.6786164833</th>
            <th>1</th>
            <th>null</th>
            <th>6</th>
            <th>null</th>
            <th>78</th>
            <th>36</th>
            <th>34</th>
            <th>09012004</th>
            <th>true</th>
            <th>null</th>
            <th>false</th>
            <th>null</th>
            <th>false</th>
            <th>null</th>
            <th>23</th>
            <th>7</th>
            <th>0</th>
            <th>0</th>
            <th>8</th>
            <th>78</th>
            <th>39</th>
            <th>1</th>
        </tr>
        <tr>
            <th>3</th>
            <th>2006</th>
            <th>2006</th>
            <th>5</th>
            <th>null</th>
            <th>1</th>
            <th>null</th>
            <th>true</th>
            <th>null</th>
            <th>11.06279630716</th>
            <th>1</th>
            <th>null</th>
            <th>9</th>
            <th>null</th>
            <th>68</th>
            <th>38</th>
            <th>41</th>
            <th>08082005</th>
            <th>true</th>
            <th>null</th>
            <th>false</th>
            <th>null</th>
            <th>false</th>
            <th>null</th>
            <th>11</th>
            <th>null</th>
            <th>null</th>
            <th>null</th>
            <th>8</th>
            <th>68</th>
            <th>41</th>
            <th>1</th>
        </tr>
        <tr>
            <th>4</th>
            <th>2007</th>
            <th>2007</th>
            <th>3</th>
            <th>null</th>
            <th>2</th>
            <th>null</th>
            <th>false</th>
            <th>null</th>
            <th>5.43659938092</th>
            <th>2</th>
            <th>null</th>
            <th>9</th>
            <th>null</th>
            <th>78</th>
            <th>42</th>
            <th>38</th>
            <th>99999999</th>
            <th>true</th>
            <th>null</th>
            <th>false</th>
            <th>null</th>
            <th>false</th>
            <th>null</th>
            <th>10</th>
            <th>null</th>
            <th>null</th>
            <th>null</th>
            <th>8</th>
            <th>78</th>
            <th>42</th>
            <th>1</th>
        </tr>
    </table>
</div>

If you're curious what the columns mean, you can read their description [here](https://bigquery.cloud.google.com/table/bigquery-public-data:samples.natality).

Here, we will use various columns to see if we can predict what the weight of the baby will be.  Other people have looked at this data too.  Here's an [interesting article](https://medium.com/@ImJasonH/exploring-natality-data-with-bigquery-ed9b7fc6478a) that looks at gestation period in days to see the distribution of births as a function of gestation days.   Another [blog](https://research.googleblog.com/2012/01/cdc-birth-vital-statistics-in-bigquery.html) looks at the increase in the mother's age when she has her first child.  
I also found useful guides from [Google Developers Codelabs](https://codelabs.developers.google.com/cloud-quest-scientific-data).  As a part of the datalab, there's a nicely organized [Jupyter notebook](https://github.com/GoogleCloudPlatform/training-data-analyst/blob/master/blogs/babyweight/babyweight.ipynb), where I borrowed a lot of code from.

Something that may be a quick follow-up after this project is to predict when the person would give birth.  I'm not sure if it can produce any accurate results, but it would be pretty useful information.

Anyways, let's get started.

## Data Exploration

After many hours on BigQuery's UI to learn how to run SQL queries and exploring the dataset, I wrote up Python scripts to automatically import the average weight and the standard deviation by a feature.  This was all done on Google Cloud's Datalab virtual machine instance, which includes in-browser Jupyter notebook (so convenient!).  You can connect to it through SSH with [little more work](https://cloud.google.com/datalab/docs/how-to/lifecycle).  Some features required extra tweaking, but here's the generic SQL query:  
``` SQL
SELECT
  column_name,
  AVG(weight_pounds) AS avg_wt,
  STDDEV(weight_pounds) AS std_wt
FROM
  publicdata.samples.natality
WHERE
  year > 2000
GROUP BY
  column_name
```
where *column_name* is a column name from the table, such as *is_male*, *child_race*, *plurality*, *gestation_weeks*, etc.  
You can combine this with BigQuery API:
``` Python
import google.datalab.bigquery as bq
df = bq.Query(query).execute().result().to_dataframe()
```  
and you end up with Pandas dataframe.  I did this with various features.  Here's sample of 9:

**Average weight vs. features**  
<img id='image' src="/img/GCP_ML_babyweight/weight_by_features.png" title="Anyone notice the 99 cigarettes/day or 99 drinks/week?" style="max-width:80%">

**Average APGAR score vs. features**  
[APGAR score](https://en.wikipedia.org/wiki/Apgar_score) is a basic 5-category health indicator showing if the baby needs any medical attention or not.  I didn't end up studying APGAR score, but rest of this study can be copied almost exactly to APGAR score instead of weight.  Here's the same plot as above, but for APGAR score (just for fun):  
<img id='image' src="/img/GCP_ML_babyweight/APGAR_by_features.png" title="Um... how about that age range for both mothers and fathers..." style="max-width:80%">  

So some of these features are pretty relevant, although the difference is within the standard deviation for a lot of them.  Boys are slightly heavier than girls, pre-mature babies are lighter, twins are lighter, and triplets are even lighter.  There is some relationship with the mother's age to the baby's weight, too.

## Machine Learning
Something I didn't mention earlier... You need to sign up for Google Cloud Platform and figure out how things work, which is not too bad.  Follow the instructions about Datalab [here](https://codelabs.developers.google.com/codelabs/scd-babyweight1/).  You'll need to [create a storage bucket](https://cloud.google.com/storage/docs/creating-buckets).  
When you sign up, Google gives you $300.00 free to spend over a trial period of a year.  You can do this project for under $10 from that pool.

Next, we'll download some dataset as CSV files so that we can easily manage train and evaluation sets, and be able to shuffle during read easily.  This was done by using Apache Beam and Dataflow.  Note that at the time of this writing, Apache Beam is still only available with Python 2.7.

If you're interested in the code, look [here](https://github.com/GoogleCloudPlatform/training-data-analyst/blob/master/blogs/babyweight/babyweight.ipynb) for now, which is where I adapted my code from.  I will clean up my code and put it on Github as well.

I'll note one thing here.  I wanted to use the cigarettes/day and drinks/week, so I made queries like the following:  
``` SQL
SELECT
  IF(cigarette_use,cigarettes_per_day,0) as cigarettes_per_day,
  IF(alcohol_use,drinks_per_week,0) as drinks_per_week
```

Dataflow automatically scales the number of workers for your job.  Here's what it looks like for the query job I ran:
<img src="/img/GCP_ML_babyweight/Dataflow.png" style="max-width: 80%">  
My job was capped at 8 workers, because I'm on a free trial.  So that took about 50 minutes.

Here is a summary of the machine learning part based on [wide and deep model](https://www.tensorflow.org/versions/master/tutorials/wide_and_deep):  

![](/img/GCP_ML_babyweight/wide_and_deep_model.svg "See the tutorial at https://www.tensorflow.org/versions/master/tutorials/wide_and_deep")  

"Wide features": [state,is_male, mother_race, plurality, mother_married]  
"Deep features": [month, mother_age, gestation_weeks, mother_race (embedded), cigarettes_per_day, drinks_per_week]  
Using TensorFlow's DNNLinearCombinedClassifier.  Features were added as one of the following: real_valued_column, sparse_column_with_keys, or bucketized_column.  The fully connected neural network had [64, 64, 32, 32] hidden units.

You have to write out a pipeline to feed to ```gcloud ml-engine jobs submit training JOBNAME```.  Most of it can be followed from the [notebook](https://github.com/GoogleCloudPlatform/training-data-analyst/blob/master/blogs/babyweight/babyweight.ipynb) mentioned above.  My code is basically the same with some extra preprocessing, changes in some inputs, and folder names.

Here's what you can expect to see in the [Machine Learning Engine page](https://console.cloud.google.com/mlengine) logs:  
![](/img/GCP_ML_babyweight/MLEngine.png)

Once the job is finished, you can view some metrics on TensorBoard by calling
``` Python
from google.datalab.ml import TensorBoard
TensorBoard().start('gs://YOURBUCKET/PROJECT_FOLDER/trained_model')
```

Here's a screenshot of the RMSE over the 3M training steps (dark green is smoothed):  
![](/img/GCP_ML_babyweight/TensorBoard_rmse.png)

So it's not that great at the moment, ~1lb RMSE.  That's about the same as what the GCP's training analysis gets, so not much improvement.  However, this is not finished yet.  I'll try improve these results when I get the time.

Before I go!  Another nice thing about Google Cloud Platform is it's easy to deploy your model.  I'm not sure how to incorporate it with my website yet, but I'll put it up when I learned how to do it. :)
