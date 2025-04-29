import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropImage';

const CropImage = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [filter, setFilter] = useState('none');

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCrop = async () => {
    try {
      const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels, rotation, filter);
      setCroppedImage(croppedImg);
    } catch (e) {
      console.error(e);
    }
  };

  const resetCrop = () => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setAspect(1);
    setCroppedImage(null);
    setFilter('none');
  };

  return (
    <div style={styles.container}>
      {!imageSrc ? (
        <div style={styles.uploadContainer}>
          <h2>Upload an Image</h2>
          <input type="file" accept="image/*" onChange={handleImageUpload} style={styles.input} />
        </div>
      ) : (
        <>
          <div style={styles.cropContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect || undefined}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
            />
          </div>
          <div style={styles.controls}>
            <label>
              Zoom
              <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(e.target.value)} />
            </label>
            <label>
              Rotation
              <input type="range" min={0} max={360} value={rotation} onChange={(e) => setRotation(e.target.value)} />
            </label>
            <label>
              Aspect Ratio
              <select value={aspect} onChange={(e) => setAspect(Number(e.target.value))}>
                <option value={1}>1:1</option>
                <option value={4 / 3}>4:3</option>
                <option value={16 / 9}>16:9</option>
                <option value={0}>Free</option>
              </select>
            </label>
            <label>
              Filter
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="none">None</option>
                <option value="grayscale(1)">Grayscale</option>
                <option value="sepia(1)">Sepia</option>
                <option value="contrast(1.5)">High Contrast</option>
                <option value="blur(2px)">Blur</option>
              </select>
            </label>
            <button onClick={handleCrop} style={styles.button}>Crop</button>
            <button onClick={resetCrop} style={{ ...styles.button, backgroundColor: 'gray' }}>Reset</button>
          </div>
        </>
      )}
      {croppedImage && (
        <div style={styles.previewContainer}>
          <h3 style={{ fontWeight: 'bold' }}>Preview</h3>
          <img src={croppedImage} alt="Cropped" style={{ ...styles.previewImage, filter }} />
          <a href={croppedImage} download="cropped-image.jpg" style={{ ...styles.button, backgroundColor: 'green' }}>
            Download Cropped Image
          </a>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f0f3f7',
  },
  uploadContainer: {
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  cropContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
    height: '400px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  controls: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
  },
  input: {
    marginTop: '10px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
  },
  previewContainer: {
    marginTop: '20px',
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '300px',
    borderRadius: '8px',
  },
};

export default CropImage;
