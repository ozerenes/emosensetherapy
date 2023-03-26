import openai
import cv2
import requests
import json

# API Anahtarları
openai.api_key = "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"

# ChatGPT Modeli
model_engine = "text-davinci-002"
prompt = "Beni bugün nasıl hissettiğinizi anlatın."

# Kullanıcının yüzünü tanıma ve analiz etme işlemleri için fonksiyonlar
def detect_face(image):
    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    return faces

def analyze_emotions(image):
    # Azure Cognitive Services API için gerekli bilgileri ayarlayın
    subscription_key = "46f4952b38b447ffbdf5857ea801f2e7"
    endpoint = "https://emosensetherapy.cognitiveservices.azure.com"
    emotion_api_url = endpoint + "/face/v1.0/detect"

    # Resim dosyasını yükleyin ve yüzleri algılayın
    image_path = image
    image_data = cv2.imencode('.jpg', image)[1].tobytes()
    headers = {'Ocp-Apim-Subscription-Key': subscription_key,
            'Content-Type': 'application/octet-stream'}
    params = {'detectionModel': 'detection_03',
            'returnFaceAttributes': 'emotion',
            'returnFaceId': 'false'}
    response = requests.post(emotion_api_url, headers=headers,
                            params=params, data=image_data)
    response.raise_for_status()

    # Algılanan yüzlerin duygularını yazdırın
    results = response.json()
    for result in results:
        emotions = result['faceAttributes']['emotion']
        print(emotions)

    return emotions

# Terapi Oturumu Fonksiyonu
def start_therapy_session():
    # Kullanıcının kamerasını açma
    cap = cv2.VideoCapture(0)
    while True:
        # Kullanıcının yüzünü tanıma ve analiz etme işlemleri
        ret, frame = cap.read()
        faces = detect_face(frame)
        if len(faces) > 0:
            print(f"faces: {len(faces)}")
            emotional_state = analyze_emotions(frame)
        else:
            print("no face")
            emotional_state = None
        
        # ChatGPT ile iletişim kurma
        # if emotional_state is not None:
        #     prompt_with_emotion = f"{prompt} Benim hissettiklerim: {emotional_state}"
        # else:
        #     prompt_with_emotion = prompt
        # response = openai.Completion.create(
        #     engine=model_engine,
        #     prompt=prompt_with_emotion,
        #     max_tokens=1024,
        #     n=1,
        #     stop=None,
        #     temperature=0.7,
        # )
        # message = response.choices[0].text.strip()
        
        # # Kullanıcının mesajını yazdırma
        # print(message)
        
        # # Oturumdan çıkma işlemi
        # if "çık" in message:
        #     break
    cap.release()
    cv2.destroyAllWindows()

# Terapi oturumunu başlatma
start_therapy_session()
