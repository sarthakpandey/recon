import numpy as np
from sklearn.externals import joblib
import sys

#CLeaning the text
import re
import nltk

nltk.download('stopwords')

from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

TEXT_CLEANING_RE = "@\S+|https?:\S+|http?:\S|[^A-Za-z0-9]+"

post = sys.argv[1]
path = str(sys.argv[2])

post = re.sub(TEXT_CLEANING_RE, ' ', post)
post = post.lower()
post = post.split()
ps = PorterStemmer()
post = [ps.stem(word) for word in post if not word in set(stopwords.words('english'))]
post = ' '.join(post)

post = [str(post)]

cv = joblib.load(path.concat('/tfid_vectorizer.pkl'))
post = cv.transform(post).toarray()

sc = joblib.load(path.concat('/standard_scalar.pkl'))
post = sc.transform(post)

classifier = joblib.load(path.concat('/classifier.pkl'))
sentiment = classifier.predict(post)

print(sentiment)

