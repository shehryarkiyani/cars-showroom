/* eslint-disable @typescript-eslint/no-explicit-any */
// core/config/queryClient.ts
"use client";

import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const isBrowser = typeof window !== "undefined";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnWindowFocus: true,
    },
  },
});

export const persister = isBrowser
  ? createSyncStoragePersister({
      storage: window.localStorage,
      serialize: (data: any) => {
        const filteredData = {
          ...data,
          queries: data?.queries?.filter(
            (query: any) => query?.meta?.persist === true
          ),
        };
        return JSON.stringify(filteredData);
      },
      deserialize: (data) => JSON.parse(data),
    })
  : undefined;
