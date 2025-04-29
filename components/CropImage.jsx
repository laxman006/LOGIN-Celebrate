import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { getCroppedImg } from '../utils/cropImage';

const CropImage = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((_, croppedArea) => {
    setCroppedAreaPixels(croppedArea);
  }, []);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const handleCrop = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      setCroppedImage(croppedImg);
    } catch (error) {
      console.error('Cropping failed:', error);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const saveImage = useCallback(async () => {
    if (!croppedImage) return;

    try {
      const response = await fetch(croppedImage);
      const blob = await response.blob();

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1];
        await Filesystem.writeFile({
          path: `cropped-image-${Date.now()}.jpg`,
          data: base64data,
          directory: Directory.Documents,
        });
        alert('Image saved successfully!');
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Saving image failed:', error);
      alert('Failed to save the image.');
    }
  }, [croppedImage]);

  const resetCrop = () => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setAspect(1);
    setCroppedImage(null);
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
              onCropComplete={onCropComplete}
            />
          </div>
          <div style={styles.controls}>
            <label>
              Zoom
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
              />
            </label>
            <label>
              Rotation
              <input
                type="range"
                min={0}
                max={360}
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
              />
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
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={handleCrop} style={styles.button}>Crop</button>
              <button onClick={resetCrop} style={{ ...styles.button, backgroundColor: 'gray' }}>Reset</button>
            </div>
          </div>
        </>
      )}

      {croppedImage && (
        <div style={styles.previewContainer}>
          <h3 style={{ fontWeight: 'bold' }}>Preview</h3>
          <img src={croppedImage} alt="Cropped" style={styles.previewImage} />
          <button onClick={saveImage} style={{ ...styles.button, backgroundColor: 'green' }}>
            Save Image
          </button>
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
