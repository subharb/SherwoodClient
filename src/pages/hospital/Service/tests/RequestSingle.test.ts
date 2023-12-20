import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook, act } from '@testing-library/react-hooks';

// This function represents your hook
function useFetchSubmission(uuidInvestigation, request) {
  // ... your state variables like loading and submissionData

  async function fetchSubmission() {
    setLoading(true);

    const response = await axios(`${import.meta.env.VITE_APP_API_URL}/researcher/investigation/${uuidInvestigation}/submission/${request?.submissionPatient.id}?findRequests=true`, { headers: {"Authorization" : localStorage.getItem("jwt")} })
      .catch(err => {console.log('Catch', err); return err;});

    if(response.status === 200){
      setSubmissionData(response.data);
    }
    setLoading(false);
  }

  return { fetchSubmission, loading, submissionData };
}

describe('fetchSubmission', () => {
  it('fetches submission data successfully', async () => {
    const mock = new MockAdapter(axios);
    const data = { response: true };
    mock.onGet(`${import.meta.env.VITE_APP_API_URL}/researcher/investigation/test-uuid/submission/test-id?findRequests=true`).reply(200, data);

    const { result, waitForNextUpdate } = renderHook(() => useFetchSubmission('test-uuid', { submissionPatient: { id: 'test-id' } }));

    act(() => {
      result.current.fetchSubmission();
    });

    await waitForNextUpdate();

    expect(result.current.submissionData).toEqual(data);
    expect(result.current.loading).toBe(false);
  });

  it('handles error', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${import.meta.env.VITE_APP_API_URL}/researcher/investigation/test-uuid/submission/test-id?findRequests=true`).networkError();

    const { result, waitForNextUpdate } = renderHook(() => useFetchSubmission('test-uuid', { submissionPatient: { id: 'test-id' } }));

    act(() => {
      result.current.fetchSubmission();
    });

    await waitForNextUpdate();

    expect(result.current.submissionData).toBeUndefined();
    expect(result.current.loading).toBe(false);
  });
});