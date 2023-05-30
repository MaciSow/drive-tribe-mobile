import { useState } from 'react';
import { UseApiReturn, ApiWithBodyArgs, ApiBasicArgs } from '../../services/api/interfaces';
import {
  apiGet as sApiGet,
  apiPost as sApiPost,
  apiPut as sApiPut,
  apiPatch as sApiPatch,
  apiDelete as sApiDelete,
} from '../../services/api';

export const useApi = (): UseApiReturn => {
  const [inProgress, setInProgress] = useState(false);

  const beforeRequest = () => setInProgress(true);
  const afterRequest = () => setInProgress(false);

  const apiGet = <T,>(args: ApiBasicArgs<T>) => {
    beforeRequest();

    return sApiGet<T>(args).finally(afterRequest);
  };

  const apiPost = <T, K>(args: ApiWithBodyArgs<T, K>) => {
    beforeRequest();

    return sApiPost<T, K>(args).finally(afterRequest);
  };

  const apiPut = <T, K>(args: ApiWithBodyArgs<T, K>) => {
    beforeRequest();

    return sApiPut<T, K>(args).finally(afterRequest);
  };

  const apiPatch = <T, K>(args: ApiWithBodyArgs<T, K>) => {
    beforeRequest();

    return sApiPatch<T, K>(args).finally(afterRequest);
  };

  const apiDelete = <T,>(args: ApiBasicArgs<T>) => {
    beforeRequest();

    return sApiDelete<T>(args).finally(afterRequest);
  };

  return {
    inProgress,
    apiGet,
    apiPost,
    apiPut,
    apiPatch,
    apiDelete,
  };
};
