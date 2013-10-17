import sys
import getopt
import requests
import json
import urllib2
import datetime
import os
import glob
import time

os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'

auth_token = '3iXVQ7Kl7LZpyJf6WU0tNfHRp0vZuZbifZNvWuIU'

url = "http://fermbot.meteor.com"
#url = "http://localhost:3000"

dthandler = lambda obj: obj.isoformat() if isinstance(obj, datetime.datetime)  or isinstance(obj, datetime.date) else None


def get_players():
    r = requests.get(url + "/api/players", headers={'X-Auth-Token': auth_token})
    json = r.json()
    if "message" in json:
        return []
    return json


def add_reading(sensor, temp_f):
    payload = {
        'sensor': sensor,
        'temp_f': temp_f,
        'date_time': datetime.datetime.now()
    }
    r = requests.post(url + "/api/readings", data=json.dumps(payload, default=dthandler), headers={'X-Auth-Token': auth_token})
    print "Temp: " + str(temp_f)
    return r.text


def read_temp_raw():
        f = open(device_file, 'r')
        lines = f.readlines()
        f.close()
        return lines


def read_temp():
        lines = read_temp_raw()
        while lines[0].strip()[-3:] != 'YES':
                time.sleep(0.2)
                lines = read_temp_raw()
                print("ERROR")
        equals_pos = lines[1].find('t=')
        if equals_pos != -1:
                temp_string = lines[1][equals_pos+2:]
                temp_c = float(temp_string) / 1000.0
                temp_f = temp_c * 9.0 / 5.0 + 32.0
                return temp_f


add_reading("fermentor 1", read_temp())