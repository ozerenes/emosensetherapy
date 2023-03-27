import json
import openai
from flask import Flask, request
from rekognition import analyze_emotions

openai.api_key = "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"
model_engine = "text-davinci-002"

app = Flask(__name__)

@app.route('/process_image', methods=['POST'])
def process_image():
    try:
        image_bytes = request.files.get("image").stream.read()
        
        emotion = analyze_emotions(image_bytes)

        prompt_with_emotion = f"I am now feeling {emotion}. What's your advice?"
        print(f"User: {prompt_with_emotion}")
        response = openai.Completion.create(
            engine=model_engine,
            prompt=prompt_with_emotion,
            max_tokens=1024,
            n=1,
            stop=None,
            temperature=0.7,
        )
        message = response.choices[0].text.strip()

        response_data = {'status': 'success', 
            'emotion': emotion,
            'gpt': message}
        return json.dumps(response_data), 200
    
    except Exception as e:
        response_data = {'status': 'error', 'message': str(e)}
        return json.dumps(response_data), 400

if __name__ == '__main__':
    app.run(debug=True)


# # API Anahtarları
# openai.api_key = "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"

# # ChatGPT Modeli
# model_engine = "text-davinci-002"

# # Kullanıcının yüzünü tanıma ve analiz etme işlemleri için fonksiyonlar
# def detect_face(image):
#     face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
#     gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#     faces = face_cascade.detectMultiScale(gray, 1.3, 5)
#     return faces

# # Terapi Oturumu Fonksiyonu
# def start_therapy_session():
#     # Kullanıcının kamerasını açma
#     cap = cv2.VideoCapture(0)
#     cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
#     cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

#     while True:
#         # Kullanıcının yüzünü tanıma ve analiz etme işlemleri
#         ret, frame = cap.read()
#         _, buffer = cv2.imencode('.png', frame)

#         faces = detect_face(frame)
#         if len(faces) > 0:
#             print(f"faces: {len(faces)}")
#             emotional_state = analyze_emotions(buffer.tobytes())
#         else:
#             print("no face")
#             emotional_state = None
        
#         # ChatGPT ile iletişim kurma
#         if emotional_state is not None:
#             prompt_with_emotion = f"I am now feeling {emotional_state}. What's your advice?"
#             print(f"User: {prompt_with_emotion}")
#             response = openai.Completion.create(
#                 engine=model_engine,
#                 prompt=prompt_with_emotion,
#                 max_tokens=1024,
#                 n=1,
#                 stop=None,
#                 temperature=0.7,
#             )
#             message = response.choices[0].text.strip()
            
#             # Kullanıcının mesajını yazdırma
#             print(f"GPT: {message}")
#             time.sleep(5)
        
#             # Oturumdan çıkma işlemi
#             if "çık" in message:
#                 break
#     cap.release()
#     cv2.destroyAllWindows()

# # Terapi oturumunu başlatma
# start_therapy_session()
