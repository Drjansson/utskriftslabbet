// Instructions:
// Run these helpers in the browser console to download a model file from the buffer object.
//
// To get the data, run:
//   select * from public.models where id = xx;
// and copy the stored binary field (for example "stl_file") into the bufferData variable below.
//
// Example:
// const bufferData = {
//   type: 'Buffer',
//   data: [65, 65, 65, 65, ...],
// };
//
// downloadSTLFromBuffer(bufferData, 'my-model.stl');
// download3MFFromBuffer(bufferData, 'my-model.3mf');

function decodeBufferToBytes(bufferObj) {
  if (!bufferObj || !Array.isArray(bufferObj.data)) {
    throw new Error('Expected a buffer-like object with a numeric data array.');
  }

  let base64String = '';
  for (let i = 0; i < bufferObj.data.length; i += 1) {
    base64String += String.fromCharCode(bufferObj.data[i]);
  }

  const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i += 1) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}

function downloadModelFromBuffer(bufferObj, filename, mimeType = 'application/octet-stream') {
  const bytes = decodeBufferToBytes(bufferObj);
  const blob = new Blob([bytes], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function downloadSTLFromBuffer2(bufferObj, filename = 'model.stl') {
  downloadModelFromBuffer(bufferObj, filename, 'application/octet-stream');
}

function download3MFFromBuffer(bufferObj, filename = 'model.3mf') {
  downloadModelFromBuffer(
    bufferObj,
    filename,
    'application/vnd.ms-package.3dmanufacturing-3dmodel+xml'
  );
}

window.downloadModelFromBuffer = downloadModelFromBuffer;
window.downloadSTLFromBuffer2 = downloadSTLFromBuffer2;
window.download3MFFromBuffer = download3MFFromBuffer;