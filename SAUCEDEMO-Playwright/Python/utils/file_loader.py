import yaml
import json


def read_file(file_path: str):
    try:
        file_extension = file_path.rpartition(".")[-1]
        with open(file_path, "r") as file:
            match file_extension:
                case "yaml" | "yml":
                    data = yaml.safe_load(file)
                case "json":
                    data = json.load(file_path)
        return data

    except Exception as e:
        print(e)
