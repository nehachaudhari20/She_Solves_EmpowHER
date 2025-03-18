import logging
from transformers import pipeline
import spacy
from dotenv import load_dotenv
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

class SeverityAnalyzer:
    def __init__(self):
        self.nlp = None
        self.classifier = None
        self.initialize_models()

    def initialize_models(self):
        try:
            self.nlp = spacy.load("en_core_web_sm")
            self.classifier = pipeline(
                "text-classification",
                model="distilbert-base-uncased-finetuned-sst-2-english",
                device=-1
            )
            logger.info("NLP models loaded successfully")
        except Exception as e:
            logger.error(f"Error loading models: {e}")
            raise

    def classify_severity(self, text):
        """Classifies severity using NLP and sentiment analysis."""
        try:
            logger.info(f"Analyzing text: {text[:100]}...")
            sentiment = self.classifier(text)[0]
            logger.info(f"Sentiment analysis result: {sentiment}")

            severity_keywords = [
                'assault', 'violence', 'threat', 'harassment',
                'abuse', 'rape', 'attack', 'stalking', 'fear'
            ]
            
            has_severity_terms = any(keyword in text.lower() for keyword in severity_keywords)
            doc = self.nlp(text)

            logger.info(f"Has severity terms: {has_severity_terms}")
            logger.info(f"Sentiment score: {sentiment['score']}")

            if (sentiment['label'] == 'NEGATIVE' and sentiment['score'] > 0.75) or has_severity_terms:
                logger.info("Classified as HIGH severity")
                return "HIGH"
            else:
                logger.info("Classified as LOW severity")
                return "LOW"
        except Exception as e:
            logger.error(f"Error in severity classification: {e}")
            raise


analyzer = SeverityAnalyzer()
