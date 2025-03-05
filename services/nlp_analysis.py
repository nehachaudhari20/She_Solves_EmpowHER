from transformers import pipeline
import spacy

nlp = spacy.load("en_core_web_sm")
classifier = pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english")

'''def analysis_severity(text):
    sentiment = sentiment_model(text)[0]
    doc = spacy_model(text)
    if sentiment["label"] == "NEGATIVE" or any(ent.label == "THREAT")'''

def extract_keywords(text):
    doc = nlp(text)
    return [token.text for token in doc if token.pos_ in ["NOUN", "PROPN", "VERB"]]

def classify_severity(text):
    print("your text is being processsing...")
    result = classifier(text)[0]

    label = result["label"]
    doc = nlp(text)
    threat_detected = any(ent.label_ == "THREAT" for ent in doc.ents)

    if label == "NEGATIVE" or threat_detected:
        print("Classified as HIGH severity")
        return "HIGH"
    print("Classified as LOW severity")
    return "LOW"