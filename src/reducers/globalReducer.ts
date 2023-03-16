export type InitStateType = {
  isBottomSheet: boolean;
  showAs: 'icon' | 'grid';
  sortBy: 'name' | 'updated' | 'created';
  fileUpload: Array<any>;
  activeTab: string;
  hiddenBottomTab: boolean;
  selectedFileState: boolean;
};

type ActionType = {
  type: string;
  payload: any;
};

const initialState: InitStateType = {
  isBottomSheet: false,
  showAs: 'icon',
  sortBy: 'name',
  fileUpload: [],
  activeTab: 'home',
  hiddenBottomTab: false,
  selectedFileState: false,
};

export default function globalReducer(
  state = initialState,
  action: ActionType,
) {
  switch (action.type) {
    case 'SET_BOTTOM_SHEET':
      return {...state, isBottomSheet: action.payload};
    case 'SET_SHOW_AS':
      return {...state, showAs: action.payload};
    case 'SET_SORT_BY':
      return {...state, sortBy: action.payload};
    case 'SET_FILE_UPLOAD':
      return {...state, fileUpload: action.payload};
    case 'SET_ACTIVE_TAB':
      return {...state, activeTab: action.payload};
    case 'SET_HIDDEN_BOTTOM_TAB':
      return {...state, hiddenBottomTab: action.payload};
    case 'SET_SELECTED_FILE_STATE':
      return {...state, selectedFileState: action.payload};
    default:
      return state;
  }
}
