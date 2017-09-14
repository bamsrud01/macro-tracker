angular.module('macrotrack')
  .service('CommentService', CommentService);

function CommentService($http) {

  //  /comment/food, /comment/recipe, /comment/profile

  let service = this;

  //  TEST CREATE: commentType, {userId, resourceId, commentDate, comment}
  //  TEST READ: commentType, resourceId
  //  TEST UPDATE: commentType, {id, resourceId, commentDate, comment}
  //  TEST DELETE: commentType, commentId

  //  commentType = 'food || recipe || profile'
  //  resourceId = foodId || recipeId || userId

  //  Get all comments
  service.getComments = (commentType, resourceId) => {
    return $http.get('/comment/' + commentType, {
      params: {
        id: resourceId
      }
    }).then(response => {
      return response.data;
    });
  }

  //  Post a comment
  service.postComment = (commentType, commentData) => {
    return $http({
      method: 'POST',
      url: '/comment/' + commentType,
      data: commentData
    }).then(response => {
      console.log('Posted comment:', response);
      return response.data;
    });
  }

  //  Update a comment
  service.updateComment = (commentType, commentData) => {
    return $http({
      method: 'PUT',
      url: '/comment/' + commentType,
      data: commentData
    }).then(response => {
      console.log('Updated comment:', commentData);
      return response.data;
    });
  }

  //  Delete a comment
  service.deleteComment = (commentType, commentId) => {
    return $http.delete('/comment/' + commentType, {
      params: {
        id: commentId
      }
    }).then(response => {
      console.log('Comment deleted:', response);
      return;
    });
  }

}
