#!/usr/bin/env python2.7
# Import flask and pandas
from flask import Flask, render_template
import pandas as pd

# Import pyxley stuff
from pyxley import UILayout
from pyxley.filters import SelectButton
from pyxley.charts.mg import LineChart, Figure
import requests
import json

# Create the flask app
app = Flask(__name__)

def fetch_data(kind, channel="", username="", params=""):
    if channel != "":
        channel = "/" + channel
    if username != "":
        username = "/" + username
    print kind, channel, username
    url = "http://shane.gg/api/" + kind + channel + username
    resp = requests.get(url)
    data = resp.content
    return data

# Read in the data and stack it, so that we can filter on columns
def read_data():
    df = pd.read_json(fetch_data(kind="pokemon", username="singlerider"))
    print df[['party']]
    #sf = sf.rename(columns={"level_1": "Data", 0: "value"})
    return df

# Make a UI
def render_ui():
    ui = UILayout(
        "FilterChart",
        "./static/bower_components/pyxley/build/pyxley.js",
        "component_id")
    return ui

# Make a Button
def make_button(df):
    cols = [c for c in df.columns if c != "Date"]
    btn = SelectButton("Data", cols, "Data", "Steps")

    # Make a FilterFrame and add the button to the UI
    ui.add_filter(btn)

# Make a Figure, add some settings, make a line plot
def make_figure(sf):
    fig = Figure("/mgchart/", "mychart")
    fig.graphics.transition_on_update(True)
    fig.graphics.animate_on_load()
    fig.layout.set_size(width=450, height=200)
    fig.layout.set_margin(left=40, right=40)
    lc = LineChart(sf, fig, "Date", ["value"], init_params={"Data": "Steps"}, timeseries=True)
    ui.add_chart(lc)

    sb = ui.render_layout(app, "./static/layout.js")

@app.route('/', methods=["GET"])
def index():

    return  read_data()#render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
