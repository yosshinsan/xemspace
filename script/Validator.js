/**
 *バリデート処理を行うクラスです。
 *
 * @class Validator
 */
class Validator {

    constructor() {

    }

    /**
     *HTML特殊文字をエスケープします。
     *
     * @param {string} str エスケープする文字列
     * @return {string} エスケープされた文字列
     * @memberof Validator
     */
    escapeHtml(str){
      str = str.replace(/&/g, '&amp;');
      str = str.replace(/>/g, '&gt;');
      str = str.replace(/</g, '&lt;');
      str = str.replace(/"/g, '&quot;');
      str = str.replace(/'/g, '&#x27;');
      str = str.replace(/`/g, '&#x60;');
      return str;
    }


    /**
     *文字列が、nullか空文字かを判定します。
     *空白のみの文字列は空文字と判定します。
     * @param {string} str 判定する文字列
     * @return {boolean} true:文字列がnullか空文字,false:文字列がnull、空文字ではない
     * @memberof Validator
     */
    isNullOrWhiteSpace(str){
      if (typeof str === 'undefined' || str === null) return true;
      return str.replace(/\s/g, '').length < 1;
    }

    /**
     *文字列の先頭が数字であるか判定します。
     *全角、半角の区別はしません。
     * @param {string} str 判定する文字列
     * @returns {boolean} true:先頭文字が数字,flase:先頭文字が数字でない
     * @memberof Validator
     */
    isNumericFirstCharacter(str){

      if(str.match(/^\d/)){
        return true;
      }
      return false;
    }  
    
    /**
     *文字列に全角文字が含まれるか判定します。
     *http://tokyo-wabisabi-boys.net/blog/javascriptjquery/js-string-regex-check
     * @param {string} str 判定する文字列
     * @returns {boolean} true:全角文字を含む,false:全角文字を含まない
     * @memberof Validator
     */
    isInculdeZenkakuCharacter(str){

      if(str.match(/[^\x01-\x7E\xA1-\xDF]/)){
        return true;
      }
      return false;
    }

    /**
     *文字列がネームスペースの予約語と一致するか判定します。
     *
     * @param {string} str 判定する文字列
     * @returns {boolean} true:予約語である,false:予約語ではない
     * @memberof Validator
     */
    isNameSpacesReservedWord(str){

      //ネームスペースの予約語をセット
      let reservedWords = ['nem', 'user', 'account', 'org', 'com', 'biz', 'net', 'edu', 'mil', 'gov', 'info'];

      for(var i=0; i<reservedWords.length; i++){
        
        if(reservedWords[i] === str){
          return true;
        }
      }
    
      return false;

    }
}



