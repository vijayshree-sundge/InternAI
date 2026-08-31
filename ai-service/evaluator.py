from google import genai
import json
import os
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

PROMPT = """You are a strict code reviewer. Given the code and test results below, score 0-100 on
Logic, Style, and Practices, and give 2-3 concrete suggestions. Reply as JSON only, no markdown fences:
{{"logic": int, "style": int, "practices": int, "suggestions": [str]}}

CODE:
{code}

TEST RESULTS:
{results}
"""

def evaluate(code: str, results: str) -> dict:
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=PROMPT.format(code=code, results=results)
    )
    text = response.text.strip()
    if text.startswith("```"):
        text = text.strip("`").replace("json", "", 1).strip()
    return json.loads(text)