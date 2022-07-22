import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { PaginatedResponse } from "types/responses";

interface ServiceFunction<ReturnType> {
  (page: number, limit: number, ...args: any[]): Promise<
    AxiosResponse<PaginatedResponse<ReturnType>>
  >;
}

export default function <DataType, T extends ServiceFunction<DataType>>(
  serviceAction: T,
  dependencies: any[],
  ...args: Parameters<T>
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setData([]);
    setLoading(true);
    setError(false);

    serviceAction(args[0], args[1], ...args.slice(2))
      .then(({ data: resData }) => {
        setData((prev) => [...new Set<DataType>([...prev, ...resData.data])]);
        setHasMore(Boolean(resData.pageData.nextPage));
        setLoading(false);
      })
      .catch((e) => setError(true));
  }, [args[0], args[1], ...dependencies]);

  return { loading, error, data, hasMore };
}
