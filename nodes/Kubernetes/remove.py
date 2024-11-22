import json

def replace_star_with_application_json(file_path: str, output_file: str):
    # Открываем и читаем JSON-файл
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    # Проходим по всем операциям в paths
    for path, methods in data.get("paths", {}).items():
        for method, operation in methods.items():


            parameters = operation.get("parameters", [])
            # Удаляем параметр sendInitialEvents, если он есть
            operation["parameters"] = [
                param for param in parameters if param.get("name") != "sendInitialEvents"
            ]


            # Проверяем наличие requestBody
            if "requestBody" in operation:
                request_body = operation["requestBody"]
                if "content" in request_body and "*/*" in request_body["content"]:
                    # Сохраняем ссылку на схему, если она есть
                    schema = request_body["content"]["*/*"].get("schema")
                    
                    # Удаляем */* и заменяем на application/json
                    del request_body["content"]["*/*"]
                    request_body["content"]["application/json.*"] = {}
                    
                    # Переносим схему, если она была
                    if schema:
                        request_body["content"]["application/json.*"]["schema"] = schema

    # Сохраняем измененный JSON в новый файл
    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=2, ensure_ascii=False)
    print(f"Измененный файл сохранен в {output_file}")

# Укажите путь к вашему openapi.json и куда сохранить результат
input_file = "openapi.json"
output_file = "openapi_fixed.json"

replace_star_with_application_json(input_file, output_file)
