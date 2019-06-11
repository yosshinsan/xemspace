describe("Validator", function() {
  let validator;
  let str;

  beforeEach(function() {
    validator = new Validator();
  });

  describe('escapeHtmlのテスト', () => {
    
    it("＆のエスケープ", function() {
      str = '&&';
      expect(validator.escapeHtml(str)).toEqual('&amp;&amp;');
    
    });

    it(">のエスケープ", function() {
      str = '>>';
      expect(validator.escapeHtml(str)).toEqual('&gt;&gt;');
    
    });
  
    it("<のエスケープ", function() {
      str = '<<';
      expect(validator.escapeHtml(str)).toEqual('&lt;&lt;');
    
    });

    it('"のエスケープ', function() {
      str = '""';
      expect(validator.escapeHtml(str)).toEqual('&quot;&quot;');
    
    });

    it("'のエスケープ", function() {
      str = "''";
      expect(validator.escapeHtml(str)).toEqual('&#x27;&#x27;');
    
    });

    it("`のエスケープ", function() {
      str = '``';
      expect(validator.escapeHtml(str)).toEqual('&#x60;&#x60;');
    
    });

  });

  describe('isNumericFirstCharacterのテスト', () => {
    
    it("先頭文字が数字", function() {
      str = '1A'
      expect(validator.isNumericFirstCharacter(str)).toEqual(true);
    });

    it("先頭文字が数字以外", function() {
      str = 'A1'
      expect(validator.isNumericFirstCharacter(str)).toEqual(false);
    });
  
  });

  describe('isInculdeZenkakuCharacterのテスト', () => {
    
    it("全角文字を含む", function() {
      str = 'aaaaaあaaaaaaaaaaaaaaaaaaa'
      expect(validator.isInculdeZenkakuCharacter(str)).toEqual(true);
    });

    it("全角文字を含まない", function() {
      str = 'abcd12345'
      expect(validator.isInculdeZenkakuCharacter(str)).toEqual(false);
    });
  
  });

  describe('isNameSpacesReservedWordのテスト', () => {
 
    it("nemと一致", function() {
      str = 'nem'
      expect(validator.isNameSpacesReservedWord(str)).toEqual(true);
    });
    
    it("userと一致", function() {
      str = 'user'
      expect(validator.isNameSpacesReservedWord(str)).toEqual(true);
    });

    it("accountと一致", function() {
      str = 'account'
      expect(validator.isNameSpacesReservedWord(str)).toEqual(true);
    });

    it("orgと一致", function() {
      str = 'org'
      expect(validator.isNameSpacesReservedWord(str)).toEqual(true);
    });

    it("comと一致", function() {
      str = 'com'
      expect(validator.isNameSpacesReservedWord(str)).toEqual(true);
    });

    it("bizと一致", function() {
      str = 'biz'
      expect(validator.isNameSpacesReservedWord(str)).toEqual(true);
    });
  
    it("netと一致", function() {
      str = 'net'
      expect(validator.isNameSpacesReservedWord(str)).toEqual(true);
    });

    it("eduと一致", function() {
      str = 'edu'
      expect(validator.isNameSpacesReservedWord(str)).toEqual(true);
    });

    it("milと一致", function() {
      str = 'mil'
      expect(validator.isNameSpacesReservedWord(str)).toEqual(true);
    });

    it("govと一致", function() {
      str = 'gov'
      expect(validator.isNameSpacesReservedWord(str)).toEqual(true);
    });

    it("infoと一致", function() {
      str = 'info'
      expect(validator.isNameSpacesReservedWord(str)).toEqual(true);
    });

    it("予約語と一致しない", function() {
      str = 'japan'
      expect(validator.isNameSpacesReservedWord(str)).toEqual(false);
    });


  });

  

});