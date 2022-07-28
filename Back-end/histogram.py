from matplotlib.pyplot import gray
from skimage import io
import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt

def get_hist_equal(img):
    HSV_img = cv.cvtColor(img, cv.COLOR_BGR2HSV)
    hist = get_histogram(HSV_img, "original_hist_plot.png")
    equalize_img = equalize_histogram(HSV_img, hist)
    hist = get_histogram(HSV_img, "equalized_hist_plot.png")
    return cv.cvtColor(equalize_img, cv.COLOR_HSV2RGB)

# Equalizar com HSL (alteramos apenas a coluna L)

def get_histogram(img, name):
    
    array = []
    hist = np.zeros(256)
    for x in range(img.shape[0]):
        for y in range(img.shape[1]):
            hist[img[x][y][2]] +=1
            array.append(img[x][y][2])

    #plt.hist(array, bins = 256)
    #plt.savefig(name)
    #plt.close()

    return hist

def equalize_histogram(img, hist):
    prob = np.zeros(256)
    prob = hist/sum(hist)
    
    g = np.zeros(256)
    g[0] = prob[0]

    for i in range(1, len(prob)):
        g[i] = g[i-1] + prob[i]

    for i in range(len(g)):
        g[i] = round(g[i]*256)

    print(g)

    for x in range(img.shape[0]):
        for y in range(img.shape[1]):
            img[x][y][2] = g[img[x][y][2]]

    return img





