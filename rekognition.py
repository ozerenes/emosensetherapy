import boto3

def analyze_emotions(img_bytes, region='eu-central-1'):
    session = boto3.Session(region_name=region)
    client = session.client('rekognition', 
        region_name=region,
        aws_access_key_id='AKIAWCN3YKOJYAHBWZC5',
        aws_secret_access_key='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')

    response = client.detect_faces(Image={'Bytes': img_bytes},
                                   Attributes=['ALL'])

    return str(response['FaceDetails'][0]['Emotions'][0]['Type'])
