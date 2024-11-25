# **Wine Quality Prediction Deployment**

## **Details**
- **Author**: Logan Reynolds
- **Course**: ARTI 405: A.I. Architecture & Design
- **Instructor**: Professor Gogolin
- **Semester**: Fall 2024

## **Additional Details**
- **Project Objective**: "Deploy a model with a rich user interface"
- **Dataset Used**: [Wine Quality Dataset](https://www.kaggle.com/datasets/yasserh/wine-quality-dataset)
- **Technologies**: Python, HTML, CSS, Javascript
- **Libraries**: FastAPI, Three.js, scikit-learn, NumPy

## Table of Contents
1. [Video Demo](#video-demo)  
2. [Background](#background)  
3. [Installation](#installation)  
    1. [Clone Repository](#1-clone-repository)  
    2. [Setup Python Virtual Environment](#2-setup-python-virtual-environment)  
    3. [Install Dependencies Using 'requirements.txt'](#3-install-dependencies)  
    4. [Run Locally Using FastAPI](#4-run-locally-using-fastapi)
4. [Docker](#docker)


## Video-Demo
[![Prediction Overview](https://img.youtube.com/vi/8QKP7paU2tU/0.jpg)](https://www.youtube.com/watch?v=8QKP7paU2tU)


## Background 
This project was made for Installation Assignment 2 in ARTI 405: A.I. Architecture & Design. 
These predictions come from a Random-Forest model based on a wine quality dataset found on 
[Kaggle](https://www.kaggle.com/datasets/yasserh/wine-quality-dataset). After attempting to model my own wine bottle
in Blender, I realized I could get a free one online. I used Three.js to load the model. FastAPI was used for the backend. NumPy was used for transforming the data before getting passed to the model. 


In the future, it would be interesting to add animation based on the prediction. Also, finishing my own 3D model would be 
cool too. 

## Installation  

*For Windows OS*

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
pip install -r requirements.txt.txt
```

#### 3. Install Dependencies
```bash
# use requirements.txt to install necessary libraries
pip install -r requirmenets.txt
```


#### 4. Run Locally Using FastAPI
```bash
# navigate to url after running 
fastapi dev app/main.py
```

![image](https://github.com/user-attachments/assets/33133e91-4804-4925-bae5-b569dc20f646)


<figcaption> ^ Should see something similar </figcaption>

## Docker

After this project was developed using FastAPI's developer mode,
it was setup in a Docker container. 

#### 1. Build Docker Image
```PS 
# should have docker desktop open before running
docker build -t wine .
```

#### 2. Build Docker Container
```PS
docker run --name wineapp -p 8000:8000 wine
```

#### 3. Launch Container in Future
- Building the Container in Step 2 starts the program
- To run in the future, navigate to 'Containers' in Docker Desktop and click the play button under 'Actions'