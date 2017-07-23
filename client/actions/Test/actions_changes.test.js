import moxios from 'moxios';
import config from '../../../configEnv';
import { addLogComment, createLog } from '../actions_changes';

const logComment = {
  CC_No: 'CC0001',
  CC_Id: 4,
  CC_Action: '**** File Deleted **** - CC0001'
};

test('addLogComment', () => {
  expect(addLogComment).toMatchSnapshot();
});

test('createLog', (done: Function) => {
  const dispatchMock = jest.fn();
  moxios.withMock(() => {
    createLog(logComment)(dispatchMock);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: logComment
        })
        .then(() => {
          expect(request.url).toEqual(`${config.serverURL}/api/changes/changelog/${logComment.CC_No}`);
          expect(dispatchMock).toBeCalledWith(addLogComment(logComment));
          done();
        });
    });
  });
});
