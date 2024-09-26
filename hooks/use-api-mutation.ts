import { useMutation } from "convex/react";
import { useState } from "react"


export const useApiMutation = (mutationFunction:any) => {


    const [pending, setPending] = useState(false);
    const apiMuattion = useMutation(mutationFunction);

    const mutate = (payload?:any) => {

        setPending(true);

        return apiMuattion(payload)
            .finally(() => setPending(false))
            .then((result) => { return result })
            .catch((error) => { throw error })
    }

    return { pending, mutate }


}