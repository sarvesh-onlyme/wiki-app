import datetime
import json

def Default(o):
    if type(o) is datetime.date or type(o) is datetime.datetime:
        return o.isoformat()

def jsonDumps(o):
    return json.dumps(o, default=Default)