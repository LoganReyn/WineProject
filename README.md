# Wine Quality Deployment 

## Table of Contents
1. [Demo](#demo)  
2. [Background](#background)  
3. [Installation](#installation)  
    1. [Clone Repository](#1-clone-repository)  
    2. [Setup Python Virtual Environment](#2-setup-python-virtual-environment)  
    3. [Install Dependencies Using 'requirements.txt'](#3-install-dependencies-using-requirementstxt)  
    4. [Run Locally Using FastAPI](#4-run-locally-using-fastapi)


## Demo
Video Demonstration of Product
https://github.com/user-attachments/assets/7b55ef73-eb9b-48f1-9c0a-9bc6acce0050


## Background 
This project was made for Installation Assignment 2 in ARTI 405: A.I. Architecture & Design. 
These predictions come from a Random-Forest model based on a wine quality dataset found on 
[Kaggle](https://www.kaggle.com/datasets/yasserh/wine-quality-dataset). After attempting to model my own wine bottle
in Blender, I realized I could get a free one online.

In the future, it would be interesting to add animation based on the prediction. Also, finishing my own models would be 
cool too. 

## Installation  

*Windows OS*

#### 1. Clone Repository 
```bash
# clone repository to current working directory 
git clone https://github.com/LoganReyn/WineProject

# navigate to repo
cd WineProject
```


#### 2. Setup Python Virtual Environment 
```bash
# create in current working directory
python -m venv .venv

# activate the venv
.venv\Scripts\activate

# use requirements.txt to install necessary libraries
pip install -r requirmenets.txt
```

#### 3. Install Dependancies Using 'requirements.txt'
```bash
# use requirements.txt to install necessary libraries
pip install -r requirmenets.txt
```


#### 4. Run Locally Using FastAPI
```bash
# navigate to url after running 
fastapi dev app/main.py



## there is an issue 'using fastapi run'. The 3D model doesn't render
## why this is, I don't know.
```

![image](https://github.com/user-attachments/assets/efd05761-bc77-405e-a697-57170453018e)
<figcaption> ^ Should see something similar </figcaption>
