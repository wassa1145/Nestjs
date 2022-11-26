import { NewsDto } from '../../news/news.interface';
import { Comment } from '../../news/comments/comments.interface';

const renderComments = (comments: Comment[]) => {
  let commentListHtml = '';

  for (const comment of comments) {
    commentListHtml += `
    <div class="d-flex">
      <p>${comment.author}:&emsp;</p>
      <p> ${comment.message}</p>
    </div>
    `;
  }

  return commentListHtml;
};

export const renderNews = (news: NewsDto) => {
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
