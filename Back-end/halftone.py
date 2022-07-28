from matplotlib.pyplot import gray
from skimage import io
import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt
import copy

def limit_number(num):
    if num > 255: num = 255
    if num < 0: num  = 0
    return (num)

def get_halftone_image(img, option):
    
    HSV_img = cv.cvtColor(img, cv.COLOR_BGR2HSV)
    
    # Floyd
    if (option == '1'):

        copy_hsv_img = copy.deepcopy(HSV_img)
        g = Floyd_and_Steinberg_alternada(copy_hsv_img)
        copy_hsv_img[:,:,2] = g[:,:,2]

        new_img = cv.cvtColor(copy_hsv_img, cv.COLOR_HSV2RGB)
        new_img = new_img[:-1,:-1,:]

        return new_img
    
    # Sierra
    elif (option == '2'):

        copy_hsv_img = copy.deepcopy(HSV_img)
        g = Sierra_alternada(copy_hsv_img)
        copy_hsv_img[:,:,2] = g[:,:,2]

        new_img = cv.cvtColor(copy_hsv_img, cv.COLOR_HSV2RGB)
        new_img = new_img[:-2,:-2,:]

        return new_img
    
    # Burkes
    elif (option == '3'):

        copy_hsv_img = copy.deepcopy(HSV_img)
        g = Burkes_alternada(copy_hsv_img)
        copy_hsv_img[:,:,2] = g[:,:,2]

        new_img = cv.cvtColor(copy_hsv_img, cv.COLOR_HSV2RGB)
        new_img = new_img[:-1,:-2,:]

        return new_img



def Floyd_and_Steinberg_alternada(img):

    g = np.zeros_like(img)
    for x in range(0, img.shape[0]-1):
        if (x%2) == 0:
            initial = 0
            final = img.shape[1]-1
            step = 1
        else:
            initial = img.shape[1]-2
            final = 0
            step = -1
        for y in range(initial, final, step):

            if img[x][y][2] < 128: g[x][y][2] = 0
            else: g[x][y][2] = 255

            error = int(int(img[x][y][2]) - int(g[x][y][2]))
            if (step == 1):
                img[x][y+1][2] = limit_number( int(img[x][y+1][2]) + (7/16)*error )
                img[x+1][y-1][2] = limit_number(int(img[x+1][y-1][2]) + (3/16)*error)
                img[x+1][y][2] = limit_number(int(img[x+1][y][2]) + (5/6)*error)
                img[x+1][y+1][2] = limit_number(int(img[x+1][y+1][2]) + (1/6)*error)
            else: 
                img[x][y-1][2] = limit_number(int(img[x][y-1][2]) + (7/16)*error)
                img[x+1][y+1][2] = limit_number(int(img[x+1][y+1][2]) + (3/16)*error)
                img[x+1][y][2] = limit_number(int(img[x+1][y][2]) + (5/6)*error)
                img[x+1][y-1][2] = limit_number(int(img[x+1][y-1][2]) + (1/6)*error)
            
    return g


def Sierra_alternada(img):

    g = np.zeros_like(img)
    for x in range(0, img.shape[0]-2):
        if (x%2) == 0:
            initial = 0
            final = img.shape[1]-2
            step = 1
        else:
            initial = img.shape[1]-3
            final = 0
            step = -1
        for y in range(initial, final, step):

            if img[x][y][2] < 128: g[x][y][2] = 0
            else: g[x][y][2] = 255

            error = int(int(img[x][y][2]) - int(g[x][y][2]))
            if (step == 1):
                img[x][y+1][2] = limit_number( int(img[x][y+1][2]) + (5/32)*error )
                img[x][y+2][2] = limit_number( int(img[x][y+2][2]) + (3/32)*error )
                
                img[x+1][y-2][2] = limit_number(int(img[x+1][y-2][2]) + (2/32)*error)
                img[x+1][y-1][2] = limit_number(int(img[x+1][y-1][2]) + (4/32)*error)
                img[x+1][y][2] = limit_number(int(img[x+1][y][2]) + (5/32)*error)
                img[x+1][y+1][2] = limit_number(int(img[x+1][y+1][2]) + (4/32)*error)
                img[x+1][y+2][2] = limit_number(int(img[x+1][y+2][2]) + (2/32)*error)
                
                img[x+2][y-1][2] = limit_number(int(img[x+2][y-1][2]) + (2/32)*error)
                img[x+2][y][2] = limit_number(int(img[x+2][y][2]) + (3/32)*error)
                img[x+2][y+1][2] = limit_number(int(img[x+2][y+1][2]) + (2/32)*error)
        
            else:
                img[x][y-1][2] = limit_number( int(img[x][y-1][2]) + (5/32)*error )
                img[x][y-2][2] = limit_number( int(img[x][y-2][2]) + (3/32)*error )
                
                img[x+1][y-2][2] = limit_number(int(img[x+1][y-2][2]) + (2/32)*error)
                img[x+1][y-1][2] = limit_number(int(img[x+1][y-1][2]) + (4/32)*error)
                img[x+1][y][2] = limit_number(int(img[x+1][y][2]) + (5/32)*error)
                img[x+1][y+1][2] = limit_number(int(img[x+1][y+1][2]) + (4/32)*error)
                img[x+1][y+2][2] = limit_number(int(img[x+1][y+2][2]) + (2/32)*error)
                
                img[x+2][y-1][2] = limit_number(int(img[x+2][y-1][2]) + (2/32)*error)
                img[x+2][y][2] = limit_number(int(img[x+2][y][2]) + (3/32)*error)
                img[x+2][y+1][2] = limit_number(int(img[x+2][y+1][2]) + (2/32)*error)
        
    return g


def Burkes_alternada(img):

    g = np.zeros_like(img)
    for x in range(0, img.shape[0]-1):
        if (x%2) == 0:
            initial = 0
            final = img.shape[1]-2
            step = 1
        else:
            initial = img.shape[1]-3
            final = 0
            step = -1
        for y in range(initial, final, step):

            if img[x][y][2] < 128: g[x][y][2] = 0
            else: g[x][y][2] = 255

            error = int(int(img[x][y][2]) - int(g[x][y][2]))
            if (step == 1):
                img[x][y+1][2] = limit_number( int(img[x][y+1][2]) + (8/32)*error )
                img[x][y+2][2] = limit_number( int(img[x][y+2][2]) + (4/32)*error )
                
                img[x+1][y-2][2] = limit_number(int(img[x+1][y-2][2]) + (2/32)*error)
                img[x+1][y-1][2] = limit_number(int(img[x+1][y-1][2]) + (4/32)*error)
                img[x+1][y][2] = limit_number(int(img[x+1][y][2]) + (8/32)*error)
                img[x+1][y+1][2] = limit_number(int(img[x+1][y+1][2]) + (4/32)*error)
                img[x+1][y+2][2] = limit_number(int(img[x+1][y+2][2]) + (2/32)*error)
            else:
                img[x][y-1][2] = limit_number( int(img[x][y-1][2]) + (8/32)*error )
                img[x][y-2][2] = limit_number( int(img[x][y-2][2]) + (4/32)*error )
                
                img[x+1][y-2][2] = limit_number(int(img[x+1][y-2][2]) + (2/32)*error)
                img[x+1][y-1][2] = limit_number(int(img[x+1][y-1][2]) + (4/32)*error)
                img[x+1][y][2] = limit_number(int(img[x+1][y][2]) + (8/32)*error)
                img[x+1][y+1][2] = limit_number(int(img[x+1][y+1][2]) + (4/32)*error)
                img[x+1][y+2][2] = limit_number(int(img[x+1][y+2][2]) + (2/32)*error)
    return g