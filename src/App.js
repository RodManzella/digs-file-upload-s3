
import './App.css';

function App() {
  return (
    <>
      <ImageContainer></ImageContainer>
    </>
  );
}




function ImageContainer(){

  async function handleFile(event){
    const file = event.target.files[0];
    if (!file) return;
    console.log(file);

    const bucketUrl = `https://${process.env.REACT_APP_S3_NAME}.s3.sa-east-1.amazonaws.com/${encodeURIComponent(file.name)}`;

    try{
      const response = await fetch(bucketUrl,{
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type || 'application/octet-stream' }
      })

      if(response.ok){
        console.log("upload successful:", bucketUrl);
      }else{
        console.error('Error uploading file:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  return(
    <div className="image-container">
      <Letreiro></Letreiro>
      <img src="/images/bro-is-captured.jpg" className="cute-cat" alt="cat-funny-pic" />

      <label htmlFor="file-upload" className="upload-button">
        Upload
      </label>

      <input
       id="file-upload"
       type="file" 
       onChange={handleFile}
       />
    </div>
  );
}

function Letreiro(){
  return(
    <h1 className="Letreiro">Dig's Upload </h1>
  );
}



export default App;
