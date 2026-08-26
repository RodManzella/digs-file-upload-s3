import {s3Client, PutObjectCommand} from "@aws-sdk";

const s3 = new S3Client({region: "sa-east-1"});

(async () =>{
    await s3.
    putObject(new PutObjectCommand({
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: "arquivos/teste.txt",
        Body: "Hello World"
    })
    .promise()
)
})();

