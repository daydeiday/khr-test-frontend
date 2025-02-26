import { defineStore } from 'pinia';
import axios from 'axios';

export const useBoardStore = defineStore('board', {
    state: () => ({
        boardList: [],
        currentBoard: null,
        loading: false,
        error: null
    }),

    getters: {
        getBoardList: (state) => state.boardList,
        getCurrentBoard: (state) => state.currentBoard,
        isLoading: (state) => state.loading,
        hasError: (state) => state.error !== null
    },

    actions: {
        async fetchBoardList() {
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.get('/api/board/list');
                // console.log('Fetched board list:', response.data);
                this.boardList = response.data;
                //console.log('Updated boardList: ', this.boardList);
            } catch (err) {
                this.error = err.message || '게시글 목록을 불러오는데 실패했습니다.';
                console.error('Error fetching board list:', err);
            } finally {
                this.loading = false;
            }
        },

        async fetchBoardDetail(idx) {
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.get(`/api/board/read/${idx}`);
                console.log('Fetched board detail:', response.data);
                this.currentBoard = response.data;
            } catch (err) {
                this.error = err.message || '게시글 상세 정보를 불러오는데 실패했습니다.';
                console.error('Error fetching board detail:', err);
            } finally {
                this.loading = false;
            }
        },

        async createBoard(title, content, writer) {
            try {
                const response = await axios.post('http://192.0.5.33:8080/board/register', {
                    title,
                    content,
                    writer,
                });

                console.log('Created board:', response.data);

                this.boardList.push(response.data); // 새 게시글 추가
                return response.data;
            } catch (err) {
                this.error = err.message || '게시글 등록에 실패했습니다.';
                console.error('Error creating board:', err);
                throw err;
            }
        },

        clearCurrentBoard() {
            this.currentBoard = null;
        },

    }
});