
import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"


const useRole = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['role', user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/user/role`)
      console.log(result)
      return result.data.role
    },
  })

  const mappedRole =
    role === "customer" ? "user" :
    role === "seller" ? "vendor" :
    role



  //   return { role, isRoleLoading }
  return [mappedRole, isRoleLoading]

}

export default useRole
