import numpy as np
from sklearn.externals import joblib
import sys
import os
from pathlib import Path

#CLeaning the text
import re
import nltk

nltk.download('stopwords')

from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer


TEXT_CLEANING_RE = "@\S+|https?:\S+|http?:\S|[^A-Za-z0-9]+"

post = str(sys.argv[1])

path = Path(sys.argv[2])

os.chdir(path)

post = re.sub(TEXT_CLEANING_RE, ' ', post)
post = post.lower()
post = post.split()
ps = PorterStemmer()
post = [ps.stem(word) for word in post if not word in set(stopwords.words('english'))]
post = ' '.join(post)

post = [str(post)]

tv = joblib.load('tfid_vectorizer.pkl')
post = tv.transform(post).toarray()

sc = joblib.load('standard_scalar.pkl')
post = sc.transform(post)

classifier = joblib.load('classifier.pkl')
sentiment = classifier.predict(post)

print(sentiment)

