'use strict';

var PREV_RESULT_SIZE = 30;
var NEXT_RESULT_SIZE = 15;
var MAX_USER_MENTION_COUNT = 10;
var MAX_USER_SUGGESTION_COUNT = 15;
var USER_MENTION_TEMP_CHAR = '@';
exports.ThreadReplySelectType = void 0;

(function (ThreadReplySelectType) {
  ThreadReplySelectType["PARENT"] = "PARENT";
  ThreadReplySelectType["THREAD"] = "THREAD";
})(exports.ThreadReplySelectType || (exports.ThreadReplySelectType = {}));

exports.MAX_USER_MENTION_COUNT = MAX_USER_MENTION_COUNT;
exports.MAX_USER_SUGGESTION_COUNT = MAX_USER_SUGGESTION_COUNT;
exports.NEXT_RESULT_SIZE = NEXT_RESULT_SIZE;
exports.PREV_RESULT_SIZE = PREV_RESULT_SIZE;
exports.USER_MENTION_TEMP_CHAR = USER_MENTION_TEMP_CHAR;
//# sourceMappingURL=const-43cebab9.js.map
