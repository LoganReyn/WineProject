import pickle
import warnings
import os

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from sklearn.ensemble import RandomForestClassifier

from transformations import (wine_data, 
                             label_prediction)

####################################################################################
# configurations
app = FastAPI()
templates = Jinja2Templates(directory="app/ui")
FILE_NAME = os.path.join(os.path.dirname(__file__), 'random_forest.pkl')
warnings.filterwarnings("ignore")
####################################################################################


app.mount("/ui", StaticFiles(directory='app/ui'), name='static')

# open pickle file containing model
with open(f"{FILE_NAME}", 'rb') as file:
    model: RandomForestClassifier = pickle.load(file)

class WineData(BaseModel):
    volatile_acidity: float
    sulphates: float
    alcohol: float


@app.get("/", response_class=HTMLResponse)
async def get_form(request: Request):
    """ Serve the index page with sliders """
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/predict")
async def predict_wine_quality(data: WineData):
    """ Get wine data from the sliders and predict quality """
    data_array = wine_data(data.volatile_acidity, data.sulphates, data.alcohol)
    prediction = label_prediction(model, data_array)
    return {"prediction": prediction}

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    """ Serve the favicon """
    return FileResponse("app/ui/favicon.ico")


if __name__ == "__main__":
    ...