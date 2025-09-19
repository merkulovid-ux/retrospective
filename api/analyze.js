import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // Убедитесь, что node-fetch установлен, если используете Node < 18
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

const YANDEX_API_KEY = process.env.YANDEX_API_KEY;
const YANDEX_FOLDER_ID = process.env.YANDEX_FOLDER_ID;
const YANDEX_URL = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';

app.use(cors());
app.use(express.json());

app.post('/api/analyze', async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim().length < 10) {
    return res.status(400).json({ error: 'Недостаточно текста для анализа. Опишите вашу ситуацию подробнее.' });
  }

  if (!YANDEX_API_KEY || !YANDEX_FOLDER_ID) {
    return res.status(500).json({ error: 'Сервер ИИ не настроен: отсутствуют ключи API.' });
  }

  const prompt = {
    modelUri: `gpt://${YANDEX_FOLDER_ID}/yandexgpt-lite`,
    completionOptions: {
      stream: false,
      temperature: 0.6,
      maxTokens: '2000'
    },
    messages: [
      {
        role: 'system',
        text: `Ты — опытный Agile-коуч и фасилитатор. Твоя задача — проанализировать краткое описание проблемы от пользователя и дать одну конкретную, практическую рекомендацию в коучинговом стиле. Ответ должен быть коротким (2-3 предложения), позитивным и предлагать конкретный первый шаг или технику.`
      },
      {
        role: 'user',
        text: text
      }
    ]
  };

  try {
    const response = await fetch(YANDEX_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Api-Key ${YANDEX_API_KEY}`
      },
      body: JSON.stringify(prompt)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error from Yandex AI:', errorData);
      throw new Error(`Yandex AI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const analysisResult = data.result.alternatives[0].message.text;

    res.json({ analysis: analysisResult });

  } catch (error) {
    console.error('Error calling Yandex AI:', error);
    res.status(500).json({ error: 'Произошла ошибка при анализе. Пожалуйста, попробуйте позже.' });
  }
});

app.listen(port, () => {
  console.log(`AI analysis server (YandexGPT) listening on port ${port}`);
});