import database from '@react-native-firebase/database';

export const senderMsg = async (
  msgValue,
  image,
  currentUserId,
  guestUserId,
  date,
) => {
  try {
    return await database()
      .ref('chatList')
      .child(currentUserId)
      .child(guestUserId)
      .child('message')
      .push({
        //   sender: currentUserId,
        //   reciever: guestUserId,
        createdAt: date,
        text: msgValue,
        // _id: currentUserId,

        user: {
          _id: currentUserId,
          avatar:
            // ? image
            'https://www.pngkey.com/png/detail/950-9501315_katie-notopoulos-katienotopoulos-i-write-about-tech-user.png',
          name: 'salman khan',
        },
      });
  } catch (error) {
    console.log('error', error);
    return error;
  }
};

export const recieverMsg = async (
  msgValue,
  image,
  currentUserId,
  guestUserId,
  date,
) => {
  try {
    return await database()
      .ref('chatList')
      .child(guestUserId)
      .child(currentUserId)
      .child('message')
      .push({
        //   sender: currentUserId,
        //   reciever: guestUserId,
        createdAt: date,
        text: msgValue,
        // _id: currentUserId,

        user: {
          _id: currentUserId,
          avatar: image
            ? image
            : 'https://www.pngkey.com/png/detail/950-9501315_katie-notopoulos-katienotopoulos-i-write-about-tech-user.png',
          name: 'shahrukh',
        },
      });
  } catch (error) {
    console.log('error', error);
    return error;
  }
};
