import {atom} from "recoil";

const selectedChatState = atom({
    key: 'selectedChatState',
    default: 1
});

const selectedChatNameState = atom({
    key: 'selectedChatNameState',
    default: ''
});

export { selectedChatState, selectedChatNameState }
