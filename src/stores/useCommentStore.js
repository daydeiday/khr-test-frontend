import { defineStore } from 'pinia';
import axios from 'axios';

export const useCommentStore = defineStore('comment', {
    state: () => ({
        comments: [],
        error: null,
    }),

    actions: {
        async createComment(content, writer, boardIdx) {
            try {
                const response = await axios.post('/api/comment/register', {
                    content,
                    writer,
                    boardIdx,
                });

                console.log('Created comment:', response.data);

                // 성공적으로 등록된 댓글을 기존 댓글 리스트에 추가
                this.comments.push(response.data);

                return response.data;
            } catch (err) {
                this.error = err.message || '댓글 등록에 실패했습니다.';
                console.error('Error creating comment:', err);
                throw err;
            }
        },
    },
});
