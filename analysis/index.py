import resource
import pymongo
import matplotlib.pyplot as plt
import numpy as np

# connect to mongodb
connection = pymongo.MongoClient("mongodb+srv://NgocBan:Ban280401@cluster0.twmss.mongodb.net/retryWrites=true&w=majority")
db = connection.vrfSuvery

# get collection
collections = db.results

# print collection func
def printCollection():
    for x in collections.find():
        print(x['responseTimestamp'])

# get requestId , requestTimestamp, responseTimestamp from collections and push to list
def getResource():
    list = []
    for x in collections.find():
        list.append([x['requestId'],x['responseTimestamp'] - x['requestTimestamp'] ])
    return list

# scatterplot with list data
def scatterplot(list):
    x = np.array(list)
    plt.scatter(x[:,0], x[:,1])
    plt.show()
    
    
 
# main 
if __name__ == "__main__":
    # printCollection()
    list = getResource()
    scatterplot(list)
       
    