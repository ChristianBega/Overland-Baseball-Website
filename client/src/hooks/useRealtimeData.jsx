import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCMSItems, subscribeToCMSItems } from "../setup/utils/firebase/getItem";

export function useRealtimeData(collectionName) {
  const [realTimeData, setRealTimeData] = useState(null);
  const [firebaseError, setFirebaseError] = useState(null);

  const queryKey = `${collectionName}-cms`;

  const {
    data: initialData,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchCMSItems(collectionName),
    enabled: !!collectionName,
  });

  useEffect(() => {
    if (!collectionName) return;

    const unsubscribe = subscribeToCMSItems(collectionName, setRealTimeData, setFirebaseError);

    return () => unsubscribe();
  }, [collectionName]);

  const displayData = realTimeData || initialData;

  return {
    data: displayData,
    isLoading,
    error: queryError || firebaseError,
  };
}
