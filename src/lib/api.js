import Axios from 'axios';
const axios = Axios.create({
  baseURL: 'https://intechsol.co/social/api',
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
});
const authorizedHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: '',
};
const login = payload => {
  const request = `/login`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch login', e);
    });
};
const register = payload => {
  const request = `/register`;
  return axios
    .post(request, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in register', e);
    });
};
const followList = payload => {
  const request = `/follow-list/${payload.type}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list', e);
    });
};
const submitEmail = payload => {
  const request = `/forget-password`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in Submit email', e);
    });
};
const otp = payload => {
  console.log('in api', payload);
  const request = `/otp-verify?token=${payload.token}`;
  return axios
    .post(request)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in otp', e);
    });
};
const changePassword = payload => {
  const request = `/reset-password`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in change password', e);
    });
};
const updatePassword = payload => {
  const request = `/password-change`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in update password', e);
    });
};
const EditProfile = (payload, data1) => {
  const request = `/profile/edit`;
  return axios
    .post(request, data1, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch edit', e.response.data);
    });
};
const Post = payload => {
  const request = `/show`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      // console.log('data from api', data);
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in edit profile', e);
    });
};
const createPosts = (payload, data1) => {
  const request = `/posts`;
  return axios
    .post(request, data1, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in create post', e);
    });
};
const showComments = payload => {
  const request = `/comment/${payload.id}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      // console.log('data from api', data);
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in Show comments', e);
    });
};
const addComments = payload => {
  const request = `/comment`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      // console.log('data from api', data);
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in add comments', e);
    });
};
const search = payload => {
  // console.log('payload', payload.searchUser);
  const request = `/searchData`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      // console.log('data from api', data);
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in add comments', e);
    });
};
const usersProfile = payload => {
  const request = `/profile/${payload.id}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in profile', e);
    });
};
const like = payload => {
  const request = `/posts/like`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in like', e);
    });
};
const follow = payload => {
  const request = `/user`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in follow', e);
    });
};
const video = payload => {
  const request = `/posts/video/${payload.id}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in video', e);
    });
};
const deletePost = payload => {
  const request = `/deletePost/${payload.id}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      console.log('come from heres');
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in delete post');
    });
};
const blockUser = payload => {
  const request = `/block`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in block user', e);
    });
};
const showNotification = payload => {
  const request = `/notification-list`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in show notification', e);
    });
};

const userProfile = payload => {
  const request = `/post/${payload.id}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in post user', e);
    });
};
const updateToken = payload => {
  const request = `/save-token`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in updateToken', e);
    });
};
const homeAd = payload => {
  const request = `/homeCommercial`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in HomeAd', e);
    });
};
const videoAd = payload => {
  const request = `/videosCommercial`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in Videoad', e);
    });
};
const chatAd = payload => {
  const request = `/chatCommercial`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in Chatad', e);
    });
};
export {
  login,
  register,
  homeAd,
  videoAd,
  chatAd,
  submitEmail,
  createPosts,
  EditProfile,
  otp,
  followList,
  userProfile,
  showNotification,
  blockUser,
  deletePost,
  video,
  search,
  usersProfile,
  follow,
  updateToken,
  showComments,
  addComments,
  changePassword,
  updatePassword,
  Post,
  like,
};
