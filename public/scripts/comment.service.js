angular.module('macrotrack')
  .service('CommentService', CommentService);

function CommentService($http) {

  //  /comment/food, /comment/recipe, /comment/profile

  let service = this;

  //  CREATE: commentType, userId, resourceId, commentDate, comment
  //  READ: commentType, resourceId
  //  UPDATE: commentType, id, resourceId, commentDate, comment
  //  DELETE: commentType, id

}
