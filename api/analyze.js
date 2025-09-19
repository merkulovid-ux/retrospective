export default function handler(request, response) {
  const { text } = request.body;

  response.status(200).json({
    analysis: `Это эхо-ответ от serverless-функции. Вы отправили: ${text}`,
  });
}
