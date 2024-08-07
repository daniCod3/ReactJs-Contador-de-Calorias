import { Activity } from "../types"

export type ActivityActions = 
    {type: 'save-activity', payload: {newActivity : Activity}} |
    {type: 'set-ActiveId', payload: {id : Activity['id']}} |
    {type: 'delete-Activity', payload: {id : Activity['id']}} |
    {type: 'restar-App'}

export type ActivityState = {
    Activities: Activity[],
    activeId: Activity['id']
}

const localStorageActivities = () => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState = {
    Activities: localStorageActivities(),
    activeId: ''
}

export const ActivityReducer = (
    state : ActivityState = initialState,
    action : ActivityActions
) => {
    if(action.type === 'save-activity' ){

        let updatedActivities: Activity[] =[]
        if(state.activeId){
            updatedActivities = state.Activities.map( activity => activity.id === state.activeId ? action.payload.newActivity:activity)
            
        }else{
            updatedActivities = [...state.Activities, action.payload.newActivity]
        }
        return{
            ...state,
            Activities: updatedActivities,
            activeId: ''
        }
    }
    if(action.type === 'set-ActiveId'){
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'delete-Activity'){
        return{
            ...state, 
            Activities: state.Activities.filter( activity => activity.id !== action.payload.id )
        }
    }

    if(action.type === 'restar-App'){
        return{
            Activities: [],
            activeId: ''
        }
    }
    return state
}