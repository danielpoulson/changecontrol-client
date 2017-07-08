import { removeByName, sortUtcDates } from '../utils/data-functions';

const UserList = ['Daniel Ricciardo', 'Sebastian Vettel', 'Lewis Hamilton', 'Valtteri Bottas'];

test('When passed a name the name will be removed from the index', () => {
  const NewUserList = ['Daniel Ricciardo', 'Sebastian Vettel', 'Valtteri Bottas'];
  const newArray = removeByName(UserList, 'Lewis Hamilton');
  expect(NewUserList).toEqual(newArray);
});

const oldDatesArray = [
  {
    _id: '588fa26ab8875527703d91b3',
    CC_ActDate: '2017-01-30T20:30:34.002Z',
    CC_Action: 'Created'
  },
  {
    _id: '59220c5e8189594aa9ca8ff6',
    CC_Action: '**** File Deleted **** - CC170001 - Investigation Strikeguard Clean.docx',
    CC_ActDate: '2017-05-21T21:53:34.550Z'
  },
  {
    _id: '5920ad5ec3574a43890d23d0',
    CC_Action: '**** File Deleted **** - CC170001 - react-ebook-pdf.pdf',
    CC_ActDate: '2017-05-20T20:55:58.284Z'
  }
];

const ForDatesArray = [
  {
    _id: '588fa26ab8875527703d91b3',
    CC_ActDate: '2017-01-30T20:30:34.002Z',
    CC_Action: 'Created'
  },
  {
    _id: '5920ad5ec3574a43890d23d0',
    CC_Action: '**** File Deleted **** - CC170001 - react-ebook-pdf.pdf',
    CC_ActDate: '2017-05-20T20:55:58.284Z'
  },
  {
    _id: '59220c5e8189594aa9ca8ff6',
    CC_Action: '**** File Deleted **** - CC170001 - Investigation Strikeguard Clean.docx',
    CC_ActDate: '2017-05-21T21:53:34.550Z'
  }
];

const revDatesArray = [
  {
    _id: '59220c5e8189594aa9ca8ff6',
    CC_Action: '**** File Deleted **** - CC170001 - Investigation Strikeguard Clean.docx',
    CC_ActDate: '2017-05-21T21:53:34.550Z'
  },
  {
    _id: '5920ad5ec3574a43890d23d0',
    CC_Action: '**** File Deleted **** - CC170001 - react-ebook-pdf.pdf',
    CC_ActDate: '2017-05-20T20:55:58.284Z'
  },
  {
    _id: '588fa26ab8875527703d91b3',
    CC_ActDate: '2017-01-30T20:30:34.002Z',
    CC_Action: 'Created'
  }
];

test('UTC dates can be sorted in reverse order given an array of objects', () => {
  expect(revDatesArray).toEqual(sortUtcDates(oldDatesArray, 'CC_ActDate', 'reverse'));
});

test('UTC dates can be sorted in forward order given an array of objects', () => {
  expect(ForDatesArray).toEqual(sortUtcDates(oldDatesArray, 'CC_ActDate'));
});
