import yaml
import json
from pathlib import Path
from typing import Optional, Any


def load_config(filename: str) -> Optional[Any]:
    config_dir = Path(__file__).resolve().parent.parent / "config"
    file_path = config_dir / filename
    try:
        file_extension = filename.rpartition(".")[-1]
        with open(file_path, "r", encoding="utf-8") as f:
            match file_extension:
                case "yaml" | "yml":
                    data = yaml.safe_load(f)
                case "json":
                    data = json.load(f)
                case _:
                    raise ValueError(f"Unsupported config file type: {file_extension}")
        return data

    except Exception as e:
        print(e)
        return None
