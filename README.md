## Installation  

For Windows

#### 1. Setup Python Virtual Environment 
```bash
# create in current working directory
python -m venv .venv

# activate the venv
.venv\Scripts\activate

# use requirements.txt to install necessary libraries
pip install -r requirmenets.txt
```

#### 2. Install Dependancies Using 'requirements.txt'
```bash
# use requirements.txt to install necessary libraries
pip install -r requirmenets.txt
```


#### 3. Run From CLI
```bash
# navigate to url after running 
fastapi dev app/main.py
```
![image](https://github.com/user-attachments/assets/efd05761-bc77-405e-a697-57170453018e)
<figcaption> Should see something similar </figcaption>

### Prerequsite 
```bash
# install fastapi with ability to use dev
pip install fastapi[standard]
```

### Use FastAPI CLI
```bash
# run app and see updates in realtime after CNTRL + S on file
fastapi dev <path_to_FastAPI()>

# example: if 'app = FastAPI()' declared in 'main.py' and stored in directory 'app'
fastapi dev app/main.py
```
