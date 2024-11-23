# Temperature Data Visualization

## Overview

The **Temperature Data Visualization** is a web-based application that allows users to upload temperature data (in CSV format), visualize temperature trends through interactive charts, and customize display options. The project utilizes **React** and **Highcharts** for a dynamic, user-friendly experience.

---

## Features

- **CSV File Upload**: Parse and process CSV files containing temperature data.
- **Interactive Charts**: Visualize temperature trends using Highcharts, with support for zooming and interactive tooltips.
- **Customization Panel**: Adjust display settings like:
  - Group data by yearly averages.
  - Overlay ±1σ (Standard Deviation) for yearly averages.
  - Toggle legends on or off (optional).
- **Responsive Design**: Optimized for both large and small screens.
- **Loading State**: Displays a loader while processing data.
- **Export Options**: Download charts in multiple formats (PNG, SVG, PDF) or view them in fullscreen.

---

## Tech Stack

- **Frontend**: React, Material-UI
- **Charting**: Highcharts, Highcharts React Official
- **CSV Parsing**: PapaParse
- **Development Tools**: React Scripts, Testing Library

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/temperature-data-visualization.git
cd temperature-data-visualization
```

### Install the Dependencies

```bash
npm install
```
Installs all the required dependencies

### Initialize the Project

```bash
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
