import requests

PISTON_URL = "https://emkc.org/api/v2/piston/execute"

LANGUAGE_MAP = {
    "python": "python",
    "javascript": "javascript",
    "java": "java",
    "sql": "sqlite3",
}

def run_code(code: str, language: str) -> str:
    piston_lang = LANGUAGE_MAP.get(language.lower(), "python")
    payload = {
        "language": piston_lang,
        "version": "*",
        "files": [{"content": code}],
    }
    try:
        resp = requests.post(PISTON_URL, json=payload, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        run = data.get("run", {})
        output = run.get("stdout", "")
        error = run.get("stderr", "")
        if error:
            return f"Execution error: {error}"
        return output or "No output."
    except requests.RequestException as e:
        return f"Execution failed: {str(e)}"