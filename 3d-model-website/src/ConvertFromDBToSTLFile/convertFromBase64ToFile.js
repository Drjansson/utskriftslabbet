// Instructions:
// Run this function in the browser console to download the STL file from the buffer object.

//const bufferData = {
//  "type": "Buffer",
//  "data": [65, 65, 65, 65, ...]  // your data from DB here
//};

//downloadSTLFromBuffer(bufferData, 'my-model.stl');


const downloadSTLFromBuffer = (bufferObj, filename = 'model.stl') => {
  // Convert ASCII values back to base64 string without spread operator
  let base64String = '';
  for (let i = 0; i < bufferObj.data.length; i++) {
    base64String += String.fromCharCode(bufferObj.data[i]);
  }
  
  // Decode base64 to binary
  const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  // Create blob and download
  const blob = new Blob([bytes], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};