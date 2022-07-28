import os
from flask import Flask
from flask import request
import cv2 as cv
from firebase_config import storage
from PIL import Image
import requests
from io import BytesIO
import numpy as np
from histogram import get_hist_equal
from filter import get_filter_image 
from halftone import get_halftone_image
from basic_edit import get_edited_image

app = Flask(__name__)

app.config['SERVER_NAME'] = 'localhost:3000'

@app.route("/addImage", methods=["POST"])
def addImage():

    req = request.get_json()
    url = req.get("imageLink")
    id = req.get("id")
    print(req)
    print(url)
    response = requests.get(url, stream=True)
    image = Image.open(BytesIO(response.content))
    image_array = np.array(image)
    rgb_img =  cv.cvtColor(image_array, cv.COLOR_BGR2RGB)

    cv.imwrite(str(id)+'.png', rgb_img)
    blob = storage.blob(str(id)+'.png')
    blob.upload_from_filename(str(id)+'.png')
    blob.make_public()
    url = blob.public_url
    print(url)

    if os.path.exists(str(id)+'.png'):
        os.remove(str(id)+'.png')
    
    return url

@app.route("/applyBasicEdits", methods=["POST"])
def applyBasicEdits():

    req = request.get_json()
    url = req.get("imageLink")
    new_id = req.get("new_id")
    style = req.get("style")

    response = requests.get(url, stream=True)
    image = Image.open(BytesIO(response.content))
    image_array = np.array(image)

    new_img = get_edited_image(image_array)

    cv.imwrite(str(new_id)+'.png', new_img)

    blob = storage.blob(str(new_id)+'.png')
    blob.upload_from_filename(str(new_id)+'.png')
    blob.make_public()
    url = blob.public_url
    print(url)

    if os.path.exists(str(new_id)+'.png'):
        os.remove(str(new_id)+'.png')
    
    return url

@app.route("/applyHistEqual", methods=["POST"])
def applyHistEqual():

    req = request.get_json()
    url = req.get("imageLink")
    new_id = req.get("new_id")
    print(req)
    print(url)

    response = requests.get(url, stream=True)
    image = Image.open(BytesIO(response.content))
    image_array = np.array(image)

    new_img = get_hist_equal(image_array)
    cv.imwrite(str(new_id)+'.png', new_img)

    blob = storage.blob(str(new_id)+'.png')
    blob.upload_from_filename(str(new_id)+'.png')
    blob.make_public()
    url = blob.public_url
    print(url)

    if os.path.exists(str(new_id)+'.png'):
        os.remove(str(new_id)+'.png')
    
    return url

@app.route("/applyFilter", methods=["POST"])
def applyFilter():

    req = request.get_json()
    url = req.get("imageLink")
    new_id = req.get("new_id")
    option = req.get("option")
    print(req)

    response = requests.get(url, stream=True)
    image = Image.open(BytesIO(response.content))
    image_array = np.array(image)

    new_img = get_filter_image(image_array, option)
    cv.imwrite(str(new_id)+'.png', new_img)

    blob = storage.blob(str(new_id)+'.png')
    blob.upload_from_filename(str(new_id)+'.png')
    blob.make_public()
    url = blob.public_url
    print(url)

    if os.path.exists(str(new_id)+'.png'):
        os.remove(str(new_id)+'.png')
    
    return url

@app.route("/applyHalftone", methods=["POST"])
def applyHalftone():

    req = request.get_json()
    url = req.get("imageLink")
    new_id = req.get("new_id")
    option = req.get("option")
    print(req)

    response = requests.get(url, stream=True)
    image = Image.open(BytesIO(response.content))
    image_array = np.array(image)

    new_img = get_halftone_image(image_array, option)
    cv.imwrite(str(new_id)+'.png', new_img)

    blob = storage.blob(str(new_id)+'.png')
    blob.upload_from_filename(str(new_id)+'.png')
    blob.make_public()
    url = blob.public_url
    print(url)

    if os.path.exists(str(new_id)+'.png'):
        os.remove(str(new_id)+'.png')
    
    return url


if __name__ == "__main__":
    app.run()