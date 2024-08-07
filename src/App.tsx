import { useReducer, useEffect, useMemo } from "react"
import Form from "./Components/Form"
import { ActivityReducer, initialState } from "./reducers/activity-reducer"
import AcitivityList from "./Components/AcitivityList"
import CalorieTracker from "./Components/CalorieTracker"

function App() {
  const [state, dispatch] = useReducer(ActivityReducer, initialState )

  useEffect( () => {
    localStorage.setItem('activities', JSON.stringify(state.Activities))
  },[state.Activities])

  const CanRestarApp = () => useMemo( () => state.Activities.length, [state.Activities])

  return (
    <>
      <header className="bg-lime-600 py-3">  
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de Calorias
          </h1>
          <button
            className="bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-lg font-bold uppercase text-sm disabled:opacity-10"
            disabled={!CanRestarApp()}
            onClick={() => dispatch({type: 'restar-App'})}
          >
            Restar App
          </button>
        </div>
      </header>
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto flex justify-between ">
          <Form 
            dispatch = {dispatch}
            state = {state}
          />
        </div>
      </section>
      <section className="bg-gray-800 p-10 ">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker 
            Activities = {state.Activities}
          />
        </div>
      </section>
      <section className="p-10 mx-auto max-w-4xl">
        <AcitivityList
            activities = {state.Activities}
            dispatch = {dispatch}
        />
      </section>
    </>
  )
}

export default App
