import { toast } from 'react-toastify';


export const responseCatcher = (error) => {
 
  const status = error.response ? error.response.status : null;
  const errorMessage = error.response ? error.response.data.message || error.response.data.error : null;

  switch (status) {
    case 200:
      toast.success('Success message', commonToastOptions);
      break;

    case 201:
      toast.success('Resource created successfully', commonToastOptions);
      break;

    case 204:
      toast.info('No content found', commonToastOptions);
      break;

    case 400:
      toast.error(errorMessage || 'Bad request', commonToastOptions);
      break;

    case 401:
      toast.error(errorMessage || 'Unauthorized', commonToastOptions);
      localStorage.removeItem('authToken');
      window.location = '/login';
      break;

    case 403:
      toast.error(errorMessage || 'Forbidden', commonToastOptions);
      break;

    case 404:
      toast.error(errorMessage || 'Not found', commonToastOptions);
      break;

    case 422:
      const validationErrors = error.response.data.errors;
      for (const fieldName in validationErrors) {
        if (validationErrors.hasOwnProperty(fieldName)) {
          toast.error(validationErrors[fieldName][0], commonToastOptions);
        }
      }
      break;

    case 500:
      toast.error(errorMessage || 'Internal server error', commonToastOptions);
      break;

    case 502:
      toast.error('Bad Gateway', commonToastOptions);
      break;

    case 503:
      toast.error('Service Unavailable', commonToastOptions);
      break;

    case 504:
      toast.error('Gateway Timeout', commonToastOptions);
      break;

    default:
      toast.error(status ? `An error occurred with status code ${status}` : 'Network error', commonToastOptions);
      break;
  }
};

export const handleApiResponse = async (apiRequest, successMessage) => {
  try {
      const response = await apiRequest();

      if (successMessage !== '') {
        toast.success(successMessage);
      }

      return response.data || false;
  } catch (error) {
      responseCatcher(error);
      throw error;
  }
};

const commonToastOptions = {
  position: 'top-right',
  autoClose: 3000,
};
