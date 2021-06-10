import {iso6392} from 'iso-639-2';

export default function getLanguageName (language) {
    const languageName = iso6392.find(item => item.iso6391 === language);
    return languageName?.iso6392B.toUpperCase() || language.toUpperCase()
}