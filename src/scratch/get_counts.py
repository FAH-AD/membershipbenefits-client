import json

file_path = r'd:\webdevelopment\Maury Work\Jobs-Events Portal Live\frontend\src\category_wise_data_updated_headers.json'
with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for key, value in data.items():
    print(f"{key}: {len(value)}")
