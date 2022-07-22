import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { SuccessDataResponse } from "types/responses";

export default function <DataType>(serviceAction: Promise<AxiosResponse<SuccessDataResponse<DataType>>>, dependencies: any[], initial?: DataType) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<DataType | null>(initial || null);

  useEffect(() => {
    serviceAction.then(({ data: resData }) => {
      console.log('DATAY: ', resData.data);
      setLoading(false);
      setData(resData.data);
    }).catch((e) => {
      setError(e);
    })
  }, dependencies);

  return { data, error, loading }
}