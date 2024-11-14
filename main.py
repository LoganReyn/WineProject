import pickle
import warnings
import os

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from sklearn.ensemble import RandomForestClassifier

from .transformations import wine_data, label_prediction

####################################################################################
# configurations
app = FastAPI()
templates = Jinja2Templates(directory="app/templates")
FILE_NAME = os.path.join(os.path.dirname(__file__), 'random_forest.pkl')
warnings.filterwarnings("ignore")
####################################################################################


app.mount("/static", StaticFiles(directory='app/static'), name='static')

# open pickle file containing model
with open(f"{FILE_NAME}", 'rb') as file:
    model: RandomForestClassifier = pickle.load(file)

@app.get("/", response_class=HTMLResponse)
async def get_form(request: Request):
    """ Serve the index page with sliders """
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/")
async def predict_wine_quality(volatile_acidity: float, sulphates: float, alcohol: float):
    """ Get wine data from the sliders and predict quality """
    data = wine_data(volatile_acidity, sulphates, alcohol)
    prediction = label_prediction(model, data)
    return {"prediction": prediction}


if __name__ == "__main__":
    ...