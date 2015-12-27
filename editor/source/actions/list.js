import { ACTION } from './index';
import * as editorAction from './editor';

const apiURL = 'http://localhost:8000/api';

export function showLoading(flag) {
    return {
        type: ACTION.SHOW_LOADING,
        flag
    }
}

function refreshList(data) {
    return {
        type: ACTION.REFRESH_LIST,
        data
    }
}

export function fetchList() {
    return dispatch => {
        dispatch(showLoading(true));
        fetch(`${apiURL}/articles`).then(function(response) {
            return response.json();
        }).then(function(data) {
            dispatch(refreshList(data));
            dispatch(showLoading(false));
        }).catch(function(error) {
            alert(JSON.stringify(error));
        });
    };
}

export function showList() {
    return {
        type: ACTION.SHOW_LIST
    }
}

export function hideList() {
    return {
        type: ACTION.HIDE_LIST
    }
}

export function openArticle(id) {
    return dispatch => {
        dispatch(showLoading(true));
        fetch(`${apiURL}/articles/${id}`).then(function(response) {
            return response.json();
        }).then(function(data) {
            dispatch(editorAction.setEditor(data));
            dispatch(showLoading(false));
        }).catch(function(error) {
            alert(JSON.stringify(error));
        });
    };
}
