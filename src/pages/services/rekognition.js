import AWS from 'aws-sdk';

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const rekognition = new AWS.Rekognition();

export async function analyzeEmotions(base64Image) {
    const imgBytes = Buffer.from(base64Image, 'base64');

    const params = {
        Image: {
            Bytes: imgBytes
        },
        Attributes: ['ALL']
    };

    const data = await rekognition.detectFaces(params).promise();
    const emotionType = data.FaceDetails[0].Emotions[0].Type;

    return { emotionType };
}