---
layout: post
title: "Random imputation by group using pandas library"
author: "Michael J. Moon"
categories: post
tags: [kaggle, bokeh, python, data-visualization, imputation, pandas]
date: 2018-02-12 00:00:00 -0500
---
Kaggle's introductory competition - [Titanic: Machine learning from disaster competition](https://www.kaggle.com/c/titanic){:target="_blank"} - provides datasets of passengers who were on board of the RMS Titanic. One of the features `age` is missing a good chunk of data - `177` values out of `891` rows in the training data. Below is an attempt to fill those gaps using random imputation based on logical groups.


```python
import numpy as np
import pandas as pd
import re

train = pd.read_csv('../data/raw/train.csv')
train.columns = [x.lower() for x in train.columns]
# identify rows with no age
train['missingage'] =\
    [pd.isnull(x) for x in train['age']]
train['missingage'].value_counts()
```




    False    714
    True     177
    Name: missingage, dtype: int64



## Extract title
First, we extract people's titles from their names following the feature engineering steps from [Titanic best working classifier by Sina](https://www.kaggle.com/sinakhorami/titanic-best-working-classifier){:target="_blank"}.

1. Individual titles are extracted using a regular expression
1. Similar titles (e.g., Miss, Ms, and Mlle) are grouped and other rare occurrence titles are grouped separately


```python
def getTitle(name):
    title = re.search('([A-Za-z]+)\.', name)
    # check if title exists
    if title:
        return title.group(1)
    return ''

train['title'] = train['name'].apply(getTitle)
pd.crosstab(train['sex'], train['title'])
```


<div class="tablecontainer">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th>title</th>
      <th>Capt</th>
      <th>Col</th>
      <th>Countess</th>
      <th>Don</th>
      <th>Dr</th>
      <th>Jonkheer</th>
      <th>Lady</th>
      <th>Major</th>
      <th>Master</th>
      <th>Miss</th>
      <th>Mlle</th>
      <th>Mme</th>
      <th>Mr</th>
      <th>Mrs</th>
      <th>Ms</th>
      <th>Rev</th>
      <th>Sir</th>
    </tr>
    <tr>
      <th>sex</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>female</th>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>182</td>
      <td>2</td>
      <td>1</td>
      <td>0</td>
      <td>125</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>male</th>
      <td>1</td>
      <td>2</td>
      <td>0</td>
      <td>1</td>
      <td>6</td>
      <td>1</td>
      <td>0</td>
      <td>2</td>
      <td>40</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>517</td>
      <td>0</td>
      <td>0</td>
      <td>6</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>




```python
train['title'] = train['title'].replace(
    {
        # group non-common titles as 'other'
        r'^(?:(?!Mlle|Miss|Ms|Mme|Mr|Mrs|Master).)*$': 'Other',
        # replace Mlle and Miss with Ms
        r'^(Mlle|Miss)': 'Ms',
        # replace Mme with Mrs
        'Mme': 'Mrs'
    }, regex=True)
pd.crosstab(train['sex'], train['title'])
```




<div class="tablecontainer">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th>title</th>
      <th>Master</th>
      <th>Mr</th>
      <th>Mrs</th>
      <th>Ms</th>
      <th>Other</th>
    </tr>
    <tr>
      <th>sex</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>female</th>
      <td>0</td>
      <td>0</td>
      <td>126</td>
      <td>185</td>
      <td>3</td>
    </tr>
    <tr>
      <th>male</th>
      <td>40</td>
      <td>517</td>
      <td>0</td>
      <td>0</td>
      <td>20</td>
    </tr>
  </tbody>
</table>
</div>



## Examine relationship

We will use the extracted feature `title` to impute missing `age` values in groups. Before we perform the imputation, we examine their relationship with the following scatterplots over box plots.


```python
# load necessary plotting libraries and
# function from src.visualization
import os
import sys
src_dir = os.path.join(os.getcwd(), os.pardir, 'src')
sys.path.append(src_dir)
from visualization import visualize as viz
from bokeh.palettes import Set2
from bokeh.io import output_notebook, output_file
output_notebook()
output_file('../blog/plots/0.2-mm-age-by-title.html')
# create the plot
viz.plotAgeByTitleSex(train, Set2[3])
```

{% include plots/2018-02-12-plot-01.html %}

1. **Master**  
Below is a small piece of history on addressing young males from [Wikipedia](https://en.wikipedia.org/wiki/Master_&#40;form_of_address&#41;){:target="_blank"} which explains the `age` distribution of _Masters_ in the data.

> After its replacement in common speech by Mister, Master was retained as a form of address only for boys who have not yet entered society. By the late 19th century, etiquette dictated that men be addressed as Mister, and boys as Master.

1. **Mrs. vs. Ms.**  
_Mrs_ is used to address married females in general whereas _Ms_ or _Miss_ are  used for young and/or single - females. The difference in age distributions shows that passengers with title _Mrs_ are generally older which aligns with their common usage.

1. **Other**  
The plot shows that passengers with other titles are all adults. These included noble (e.g., _Countess_) and professional (e.g., _Dr_) titles.

## Impute by group
Knowing that passengers with different titles have different `age` distribution, we randomly impute the missing values per `title` following the steps below.

Per `title`:
1. Calculate mean and standard deviation of `age`
2. Randomly generate `age` values between `mean - std` and `mean + std`
3. Assign the randomly generated values to the missing values


```python
ageImputed = \
    train[['age', 'title']].groupby('title')['age'].apply(
        lambda x: x.fillna(x.mean()))
```

Within `pandas`, we could use `groupby`, `apply`, and `fillna` together to fill missing values per group. As an example, the code block above imputes with the mean of `age` per `title`. However, combining `apply` and `fillna` can only assign a single value to all missing values within the group. In order to assign random values for each record, we generate an array of random values and assign per group.


```python
grps = train[['age', 'title']].groupby('title').agg(['mean', 'std'])
ageImputed = train['age'].copy()
for grp in grps.index:
    missing_x = train.loc[train['title']==grp, 'missingage']
    ageImputed.iloc[missing_x[missing_x].index] = np.random.randint(
        grps.loc[grp, ('age', 'mean')] - grps.loc[grp, ('age', 'std')],
        grps.loc[grp, ('age', 'mean')] + grps.loc[grp, ('age', 'std')],
        sum(missing_x)
    )
# ensure age is not negative
ageImputed.apply(lambda x: max(0, x))
train['ageImputed'] = ageImputed
```

The plot below shows the result of the random imputation. We can see the imputed values (in orange) are contained within each group while showing some levels of uncertainties.

Clicking the items in the legend will turn on and off the points from the plot. The `bokeh` codes used for generating these plots are available on my [Github repository](https://github.com/mjmoon/mms_titanic/blob/mm_blog/src/visualization/visualize.py){:target="_blank"}.


```python
output_file('../blog/plots/0.2-mm-imputed-age-by-title.html')
viz.plotAgeByTitleImputed(train, Set2[3])
```

{% include plots/2018-02-12-plot-02.html %}


## Discussion
* By identifying logical groups with similar distributions, the imputation method seems to generate a more realistic data.
* The uniform random generation may be improved by using estimated densities instead
* During model building, it would be interesting to see if the grouped random imputation yields a better result compared using 1) mean imputation, 2) simple random imputation, or the missing value indicator without imputation
