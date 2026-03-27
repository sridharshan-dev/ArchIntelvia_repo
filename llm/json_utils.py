import json
import ast


def safe_json_parse(text):
    """
    Robust parser that handles:
    - dict (already parsed)
    - JSON string
    - Python dict string
    """

    # ✅ CASE 1 — Already a dict
    if isinstance(text, dict):
        return text

    # ✅ CASE 2 — JSON string
    try:
        return json.loads(text)
    except:
        pass

    # ✅ CASE 3 — Python dict string
    try:
        return ast.literal_eval(text)
    except:
        pass

    # ✅ CASE 4 — Extract substring
    try:
        start = text.find("{")
        end = text.rfind("}") + 1

        if start != -1 and end != -1:
            snippet = text[start:end]
            return ast.literal_eval(snippet)
    except:
        pass

    return None