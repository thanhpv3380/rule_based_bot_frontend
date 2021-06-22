import API from './authApi';

export async function uploadFile({ formData }) {
  try {
    const response = await API({
      method: 'POST',
      url: `${process.env.REACT_APP_UPLOAD_FILE_DOMAIN}/api/v1/uploads/file`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
