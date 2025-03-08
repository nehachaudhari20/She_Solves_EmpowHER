from transformers import pipeline
import spacy
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
try:
    nlp = spacy.load("en_core_web_sm")
    classifier = pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english")
    logger.info("NLP models loaded successfully")
except Exception as e:
    logger.error(f"Error loading NLP models: {e}")
    raise

'''def analysis_severity(text):
    sentiment = sentiment_model(text)[0]
    doc = spacy_model(text)
    if sentiment["label"] == "NEGATIVE" or any(ent.label == "THREAT")'''

def extract_keywords(text):
    doc = nlp(text)
    return [token.text for token in doc if token.pos_ in ["NOUN", "PROPN", "VERB"]]

def classify_severity(text):
    try:
        logger.info(f"Processing text: {text[:50]}...")
        result = classifier(text)[0]

        label = result["label"]
        score = result["score"]

        doc = nlp(text)
        threat_detected = any(ent.label_ == "THREAT" for ent in doc.ents)

        logger.info(f"Classification result: {label} (score: {score})")
        logger.info(f"Threat detected: {threat_detected}")

        if label == "NEGATIVE" or threat_detected:
            return "HIGH"
        return "LOW"
    except Exception as e:
        logger.error(f"Error classifying severity: {e}")
        raise
    '''print("your text is being processsing...")
    result = classifier(text)[0]

    label = result["label"]
    doc = nlp(text)
    threat_detected = any(ent.label_ == "THREAT" for ent in doc.ents)

    if label == "NEGATIVE" or threat_detected:
        print("Classified as HIGH severity")
        return "HIGH"
    print("Classified as LOW severity")
    return "LOW"'''