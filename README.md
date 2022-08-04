# Project

This project aims to practice web development concepts with react and also to apply image processing methods with python.

Its general idea is to add images via their url and view them on a wall. It is possible to delete and edit these images, the editing includes the most common filters, such as brightness, blur and saturation. However it's also possible to apply filtering by frequency (Gaussian, High-Pass and Low-Pass), perform a histogram equalization and Halftoning with Floyd, Sierra and Burkes techniques.

Concepts:
- Redux to control photo state;
- Firebase Realtime Database (Non-Relation Database) and Storage;
- React Router at navigation;
- Integration with python API;
- Image processing methods.

## PhotoWall pages

![GIF pages](./assets/GIF_Photowall_Pages.gif)

## Start Front-End

In the Front-End directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Start Back-End

In the Back-End directory, you can run:

### `python main.py`

Make sure that you have all libraries used in this project installed in your machine.
Please visit this pip documentation if you are not familiar with this tool [Pip documentation](https://pip.pypa.io/en/stable/getting-started/).