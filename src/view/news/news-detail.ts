import { NewsDto } from '../../news/news.interface';
import { Comment } from '../../news/comments/comments.interface';

const renderComments = (comments: Comment[]): string => {
  let commentListHtml = '';

  for (const comment of comments) {
    commentListHtml += `
    <div style="display: flex; gap: 10px; margin-bottom: 10px;">
      <div>
        <div style="background-image: url(${comment.avatar}); background-size: cover; background-color: #ccc; width: 75px; height: 75px" class="rounded-circle"></div>
      </div>
      <div style="text-align: start;">
          <div>Автор: ${comment.author}</div>
          <div>${comment.message}</div>
      </div>
    </div>
    `;
  }
  return commentListHtml;
};

export const renderNews = (news: NewsDto): string => {
  return `
  <div style="text-align: center; padding: 0 40px">
    <h1 class="mb-4">${news.title}</h1>
    <div style="display: flex; gap: 40px">
      <img src=${
        news.cover
      } class="card-img-top" alt="cat" style="height: 400px; width: 400px; object-fit: cover" />
      <p class="card-text">${news.description}</p>
    </div>
    <div class="mt-2">${
      news.comments ? renderComments(news.comments) : ''
    }</div>
  </div>
  `;
};
