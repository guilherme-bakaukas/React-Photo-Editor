from matplotlib.pyplot import gray
from skimage import io
import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt
import copy

def apply_filter(img, filter, size):

    g = copy.deepcopy(img)

    for x in range(size, img.shape[0] - size):
        for y in range(size, img.shape[1] - size):

            sum = 0
            for i in range(filter.shape[0]):
                for j in range(filter.shape[1]):

                    sum += img[x+i-size][y+j-size][2]*filter[i][j]
            
            g[x][y][2] = sum
    return g


def get_filter_image(img, option):

    HSV_img = cv.cvtColor(img, cv.COLOR_BGR2HSV)
    
    # Low-pass
    if (option == '1'):

        filter = np.ones((5, 5))/25
        new_img = apply_filter(HSV_img, filter, 2)

        return cv.cvtColor(new_img, cv.COLOR_HSV2RGB)
    
    # High-pass
    elif (option == '2'):

        filter = np.array([[0,-1,0],[-1,4,-1],[0,-1,0]])
        new_img = apply_filter(HSV_img, filter, 1)

        return cv.cvtColor(new_img, cv.COLOR_HSV2RGB)
    
    # Gaussian
    elif (option == '3'):

        a = np.array([[1,4,6,4,1]])
        b = np.array([[1],[4],[6],[4],[1]])
        filter = (a*b)/256
        new_img = apply_filter(HSV_img, filter, 2)

        return cv.cvtColor(new_img, cv.COLOR_HSV2RGB)





