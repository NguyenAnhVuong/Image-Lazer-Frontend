interface User {
  id: string;
  fullName: string;
  avatar: string;
  email: string;
  userName: string;
}

const MockUser: User[] = [
  {
    id: '628cb867c4845b60213722a4',
    email: 'irenee@gmail.com',
    fullName: 'Irene',
    userName: '@irenee_628cb867c4845b60213722a4',
    avatar: 'avatar-irenee.jpg',
  },
  {
    id: '62734f062c44d2db460234b8',
    email: 'naheedo@gmail.com',
    fullName: 'Ngo',
    userName: 'alo',
    avatar: 'avatar-naheedo.jpg',
  },
];

export default MockUser;
