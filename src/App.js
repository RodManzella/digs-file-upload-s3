
import { useEffect, useRef, useState } from 'react';
import './App.css';

const sound = new Audio('/dry-fart.mp3');

function App() {
  return (
    <>
      <ImageContainer></ImageContainer>
    </>
  );
}




function ImageContainer(){
  const [loadingAnimation, setLoadingAnimation] = useState(0);

  async function handleFile(event){
    const file = event.target.files[0];
    if (!file) return;

    setLoadingAnimation((animation) => animation + 1);
    event.target.value = '';
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
      <div className="image-wrapper">
        <img src="/images/bro-is-captured.jpg" className="cute-cat glow" alt="cat-funny-pic" />

      </div>
      

      <label htmlFor="file-upload" className="upload-button">
        Upload
      </label>

      <input
       id="file-upload"
       type="file" 
       onChange={handleFile}
       
       />
      <LoadingBar
        key={loadingAnimation}
        shouldAnimate={loadingAnimation > 0}
      ></LoadingBar>
       
    </div>
    

  
  );
}

function Letreiro(){
  return(
    <h1 className="Letreiro">Dig's Upload </h1>
  );
}

function LoadingBar({ shouldAnimate }){
  const [isAnimating, setIsAnimating] = useState(shouldAnimate);
  const resetTimer = useRef(null);

  useEffect(() => {
    return () => clearTimeout(resetTimer.current);
  }, []);

  function handleAnimationEnd(){
    sound.currentTime = 0;
    sound.play().catch((error) => {
      console.error('Error playing sound:', error);
    });

    resetTimer.current = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  }

  return(
    <div className="loading-bar-container">
      <div 
        className={`loading-bar ${isAnimating ? 'play-animation' : ''}`}
        onAnimationEnd={handleAnimationEnd}  
        >
        
      </div>
    </div>
  );
}



export default App;
