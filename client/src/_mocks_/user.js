import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  name: faker.name.findName(),
  nickname: faker.company.companyName(),
  // nickname: faker.username.userName(),
  isVerified: faker.datatype.boolean(),
  status: sample(['Online', 'Offline']),
  rang: sample([
    'Peon',
    'Scout',
    'Grunt',
    'First Sergeant',
    'Blood Guard',
    'Legionnare',
    'Centurion',
    'Champion',
    'General',
    'High Warlord'
  ])
}));

export default users;
