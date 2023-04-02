import AWS from 'aws-sdk';

AWS.config.update({
    region: 'eu-central-1',
    accessKeyId: 'AKIAWCN3YKOJYAHBWZC5',
    secretAccessKey: '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'
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