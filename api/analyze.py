import os
import yandex.cloud.ai.foundation_models.v1.foundation_models_service_pb2 as foundation_models_service_pb2
import yandex.cloud.ai.foundation_models.v1.foundation_models_service_pb2_grpc as foundation_models_service_pb2_grpc
import yandex.cloud.ai.foundation_models.v1.text_generation.text_generation_service_pb2 as text_generation_service_pb2
import yandex.cloud.ai.foundation_models.v1.text_generation.text_generation_service_pb2_grpc as text_generation_service_pb2_grpc
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import grpc

load_dotenv()

app = Flask(__name__)
CORS(app)

# Аутентификация в Yandex.Cloud
def create_grpc_channel():
    api_key = os.getenv("YANDEX_API_KEY")
    if not api_key:
        raise RuntimeError("YANDEX_API_KEY is not set")
    
    cred = grpc.ssl_channel_credentials()
    return grpc.secure_channel(
        'llm.api.cloud.yandex.net:443',
        grpc.composite_channel_credentials(
            cred,
            grpc.access_token_call_credentials(f'Api-Key {api_key}')
        )
    )

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data.get('text')

    if not text or len(text.strip()) < 10:
        return jsonify({"error": "Недостаточно текста для анализа. Опишите вашу ситуацию подробнее."}), 400

    try:
        channel = create_grpc_channel()
        stub = text_generation_service_pb2_grpc.TextGenerationServiceStub(channel)

        prompt_request = text_generation_service_pb2.CompletionRequest(
            model_uri=f"gpt://{os.getenv('YANDEX_FOLDER_ID')}/yandexgpt-lite",
            completion_options=text_generation_service_pb2.CompletionOptions(
                stream=False,
                temperature=0.6,
                max_tokens=2000
            ),
            messages=[
                {
                    "role": "system",
                    "text": "Ты — опытный Agile-коуч и фасилитатор. Твоя задача — проанализировать краткое описание проблемы от пользователя и дать одну конкретную, практическую рекомендацию в коучинговом стиле. Ответ должен быть коротким (2-3 предложения), позитивным и предлагать конкретный первый шаг или технику."
                },
                {
                    "role": "user",
                    "text": text
                }
            ]
        )

        response = stub.Complete(prompt_request)
        analysis_result = response.alternatives[0].message.text

        return jsonify({"analysis": analysis_result})

    except Exception as e:
        print(f"Error calling Yandex AI: {e}")
        return jsonify({"error": "Произошла ошибка при анализе. Пожалуйста, попробуйте позже."}), 500

if __name__ == '__main__':
    app.run(port=3000)
