import pyrebase
import firebase_admin
from firebase_admin import credentials, storage

# key.json not added to github for security reasons
cred = credentials.Certificate("../../key.json")
app = firebase_admin.initialize_app(cred, {"storageBucket": "photowall-ba0b3.appspot.com"})

#firebase_storage = pyrebase.initialize_app(config)
#storage = firebase_storage.storage()

storage = storage.bucket()