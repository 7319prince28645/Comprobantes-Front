import { ApiContext } from "../../Service/GetApi"
import { useContext } from "react"
function RazonSocial() {
  const { datosRuc } = useContext(ApiContext)
  return (
    <p className="font-bold font-inter text-xl text-center py-1">
    {" "}
    {datosRuc.razonSocial}
  </p>
  )
}

export default RazonSocial