import pymongo

# connect to mongodb
connection = pymongo.MongoClient("mongodb+srv://NgocBan:Ban280401@cluster0.twmss.mongodb.net/retryWrites=true&w=majority")
db = connection.vrfSuvery

# get collection
collections = db.results

# print collection func

def printCollection():
    for x in collections.find():
        print(x)
