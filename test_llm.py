from llm.llm_client import call_llm
from llm.prompts import PARAM_OPT_PROMPT
from llm.schemas import PARAM_OPT_SCHEMA
from llm.parser import safe_parse

prompt = PARAM_OPT_PROMPT.format(
    user_input="DATA_WIDTH=32, ADDR_WIDTH=10, BANKS=4",
    context="Use power-of-2 sizes. Banks improve throughput."
)

raw_response = call_llm(prompt)

validated = safe_parse(raw_response, PARAM_OPT_SCHEMA)

print(validated)