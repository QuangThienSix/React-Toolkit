import { urlLink } from 'helper/route';
import axiosClient from './axiosClient';

const usersApi = {
  postLogin: (body: any) => {
    return axiosClient.post(urlLink.auth.sign_in, body, {
      headers: {
        access_token: 'Thien',
      },
    });
  },
};

export default usersApi;
