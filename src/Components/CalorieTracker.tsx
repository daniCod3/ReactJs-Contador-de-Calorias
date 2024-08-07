import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    Activities: Activity[]
}
const CalorieTracker = ({Activities} : CalorieTrackerProps) => {
  //Contador
  const caloriesConsumed = useMemo( () => Activities.reduce((total, Activity) => Activity.category === 1 ? total + Activity.calories : total, 0), [Activities])
  const caloriesBurned = useMemo( () => Activities.reduce((total, Activity) => Activity.category === 2 ? total + Activity.calories : total, 0), [Activities])
  const TotalCalories = useMemo( () => caloriesConsumed - caloriesBurned , [Activities])
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">Resumen de Calories</h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay 
          calories={caloriesConsumed}
          text="Consumidas"
        />
        <CalorieDisplay 
          calories={caloriesBurned}
          text="Quemadas"
        />
        <CalorieDisplay 
          calories={TotalCalories}
          text="Diferencia"
        />
      </div>
    </>
  )
  }
export default CalorieTracker
